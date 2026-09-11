import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export interface InventoryHold {
  holdId: string;
  inventoryId: string;
  eventId: string;
  userId: string;
  quantity: number;
  expiresAt: number;
}

@Injectable()
export class InventoryLockerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(InventoryLockerService.name);
  private redis: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
    this.redis = new Redis(redisUrl);
    this.redis.on('connect', () => this.logger.log('Connected to Redis for inventory locker'));
    this.redis.on('error', (err) => this.logger.error('Redis error', err));
  }

  onModuleDestroy() {
    this.redis.quit();
  }

  private generateHoldId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  async getActiveHolds(inventoryId: string): Promise<InventoryHold[]> {
    const key = `inventory:${inventoryId}:holds`;
    const holdIds = await this.redis.smembers(key);
    
    if (holdIds.length === 0) return [];

    const activeHolds: InventoryHold[] = [];
    const pipeline = this.redis.pipeline();

    for (const holdId of holdIds) {
      pipeline.hgetall(`hold:${holdId}`);
    }

    const results = await pipeline.exec();
    const expiredHoldIds: string[] = [];
    
    if (results) {
      for (let i = 0; i < results.length; i++) {
        const [err, holdData] = results[i] as [Error | null, any];
        const holdId = holdIds[i];

        if (!err && holdData && Object.keys(holdData).length > 0) {
          const expiresAt = parseInt(holdData.expiresAt, 10);
          if (expiresAt > Date.now()) {
            activeHolds.push({
              holdId,
              inventoryId: holdData.inventoryId,
              eventId: holdData.eventId,
              userId: holdData.userId,
              quantity: parseInt(holdData.quantity, 10),
              expiresAt,
            });
          } else {
            expiredHoldIds.push(holdId);
          }
        } else {
          expiredHoldIds.push(holdId);
        }
      }
    }

    if (expiredHoldIds.length > 0) {
      await this.redis.srem(key, ...expiredHoldIds);
    }

    return activeHolds;
  }

  async acquireHold(inventoryId: string, eventId: string, userId: string, quantity: number, durationMinutes: number = 10): Promise<InventoryHold> {
    const holdId = this.generateHoldId();
    const expiresAt = Date.now() + durationMinutes * 60 * 1000;
    
    const holdData = {
      holdId,
      inventoryId,
      eventId,
      userId,
      quantity: quantity.toString(),
      expiresAt: expiresAt.toString(),
    };

    const pipeline = this.redis.pipeline();
    pipeline.hset(`hold:${holdId}`, holdData);
    pipeline.expire(`hold:${holdId}`, durationMinutes * 60);
    pipeline.sadd(`inventory:${inventoryId}:holds`, holdId);
    
    await pipeline.exec();

    return {
      holdId,
      inventoryId,
      eventId,
      userId,
      quantity,
      expiresAt,
    };
  }

  async releaseHold(holdId: string): Promise<void> {
    const holdData = await this.redis.hgetall(`hold:${holdId}`);
    if (holdData && holdData.inventoryId) {
      const pipeline = this.redis.pipeline();
      pipeline.del(`hold:${holdId}`);
      pipeline.srem(`inventory:${holdData.inventoryId}:holds`, holdId);
      await pipeline.exec();
    }
  }

  async getHeldQuantity(inventoryId: string): Promise<number> {
    const activeHolds = await this.getActiveHolds(inventoryId);
    return activeHolds.reduce((sum, hold) => sum + hold.quantity, 0);
  }

  async verifyHold(holdId: string, inventoryId: string, quantity: number, userId: string): Promise<boolean> {
    const holdData = await this.redis.hgetall(`hold:${holdId}`);
    
    if (!holdData || Object.keys(holdData).length === 0) return false;
    if (parseInt(holdData.expiresAt, 10) <= Date.now()) return false;
    if (holdData.inventoryId !== inventoryId) return false;
    if (parseInt(holdData.quantity, 10) < quantity) return false;
    if (holdData.userId !== userId) return false;

    return true;
  }
}
