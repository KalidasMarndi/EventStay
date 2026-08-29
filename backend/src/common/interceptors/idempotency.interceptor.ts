import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  HttpException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as crypto from 'crypto';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: any,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const idempotencyKey = request.headers['idempotency-key'];

    if (!idempotencyKey) {
      return next.handle();
    }

    const userId =
      request.user?.id ??
      request.user?.clerkId ??
      'anonymous';

    const method = request.method;
    const path = request.url;

    const hash = crypto
      .createHash('sha256')
      .update(`${userId}:${method}:${path}:${idempotencyKey}`)
      .digest('hex');

    const cacheKey = `idempotency:${hash}`;

    const cachedResponse = await this.cacheManager.get(cacheKey);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    const lockKey = `${cacheKey}:lock`;

    const isLocked = await this.cacheManager.get(lockKey);

    if (isLocked) {
      throw new HttpException(
        'Request is already being processed',
        409,
      );
    }

    await this.cacheManager.set(
      lockKey,
      'locked',
      30000,
    );

    return next.handle().pipe(
      tap(async (response) => {
        await this.cacheManager.set(
          cacheKey,
          response,
          86400000,
        );

        await this.cacheManager.del(lockKey);
      }),
    );
  }
}