import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryLockerService } from './inventory-locker.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lockerService: InventoryLockerService,
  ) {}

  async create(dto: CreateInventoryDto) {
    return this.prisma.stayPackage.create({
      data: {
        ...dto,
        bookingDeadline: dto.bookingDeadline ? new Date(dto.bookingDeadline) : null,
        inclusions: dto.inclusions ?? [],
      },
      include: {
        stay: true,
      }
    });
  }

  async findAllByEvent(eventId: string) {
    const packages = await this.prisma.stayPackage.findMany({
      where: { eventId },
      include: {
        stay: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Populate dynamic held rooms from Redis
    for (const pkg of packages) {
      const activeHeld = await this.lockerService.getHeldQuantity(pkg.id);
      pkg.heldRooms = activeHeld;
    }

    return packages;
  }

  async getStats(eventId: string) {
    const packages = await this.findAllByEvent(eventId);

    const totalAllocation = packages.reduce((sum, p) => sum + p.availableRooms, 0);
    const booked = packages.reduce((sum, p) => sum + p.bookedRooms, 0);
    const held = packages.reduce((sum, p) => sum + p.heldRooms, 0);
    
    // Calculate available safely, preventing negative
    const available = Math.max(0, totalAllocation - booked - held);

    const utilization = totalAllocation > 0 
      ? Math.round(((booked + held) / totalAllocation) * 100)
      : 0;

    const activeEvents = await this.prisma.event.count({ where: { status: 'PUBLISHED' } });
    const uniqueHotels = new Set(packages.map(p => p.stayId)).size;
    const roomTypesCount = packages.length;

    const lowAvailability = packages.filter(p => {
      const avail = p.availableRooms - p.bookedRooms - p.heldRooms;
      return avail > 0 && avail <= 10;
    }).length;

    return {
      totalAllocation,
      booked,
      held,
      available,
      utilization,
      activeEvents,
      hotels: uniqueHotels,
      roomTypes: roomTypesCount,
      lowAvailability,
    };
  }

  async findOne(id: string) {
    const pkg = await this.prisma.stayPackage.findUnique({
      where: { id },
      include: { stay: true },
    });
    if (!pkg) throw new NotFoundException('Inventory package not found');
    
    pkg.heldRooms = await this.lockerService.getHeldQuantity(pkg.id);
    return pkg;
  }

  async update(id: string, dto: UpdateInventoryDto) {
    const pkg = await this.findOne(id); // validates existence

    return this.prisma.stayPackage.update({
      where: { id },
      data: {
        ...dto,
        bookingDeadline: dto.bookingDeadline ? new Date(dto.bookingDeadline) : undefined,
      },
      include: { stay: true }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.stayPackage.delete({
      where: { id },
    });
  }

  async holdInventory(inventoryId: string, quantity: number, userId: string) {
    // 1. Fetch current Postgres data using FOR UPDATE to prevent race conditions
    return this.prisma.$transaction(async (tx) => {
      const packages = await tx.$queryRaw<any[]>`
        SELECT id, "eventId", "availableRooms", "bookedRooms"
        FROM stay_packages 
        WHERE id = ${inventoryId}
        FOR UPDATE
      `;

      if (!packages || packages.length === 0) {
        throw new NotFoundException('Inventory package not found');
      }

      const pkg = packages[0];
      
      // 2. Fetch active holds from Redis dynamically
      const activeHeld = await this.lockerService.getHeldQuantity(inventoryId);
      
      // 3. Verify availability
      const available = pkg.availableRooms - pkg.bookedRooms - activeHeld;
      
      if (available < quantity) {
        throw new BadRequestException(`Only ${Math.max(0, available)} room(s) available to hold.`);
      }

      // 4. Create the hold
      return this.lockerService.acquireHold(inventoryId, pkg.eventId, userId, quantity);
    });
  }

  async releaseHold(holdId: string, userId?: string) {
    // Optional userId to verify ownership if needed
    // In a fully authenticated system, we'd check if the hold belongs to the user
    await this.lockerService.releaseHold(holdId);
    return { success: true };
  }
}
