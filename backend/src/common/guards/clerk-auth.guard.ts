import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyToken } from '@clerk/backend';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Clerk JWT Guard
 *
 * Verifies the Clerk JWT supplied as `Authorization: Bearer <token>`.
 * In production, install @clerk/backend and call `verifyToken(token, { secretKey })`.
 *
 * For now this is a placeholder that:
 *   - Skips public routes (decorated with @Public())
 *   - Rejects requests without a Bearer token in protected routes
 *
 * Replace the TODO block below with actual Clerk JWT verification.
 */
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Skip authentication for public routes
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string>; user: any }>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) throw new UnauthorizedException('Token is empty');

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      // Fetch user from DB
      const user = await this.prisma.user.findUnique({
        where: { clerkId: payload.sub },
      });

      request.user = {
        id: user?.id,
        clerkId: payload.sub,
        email: payload.email,
        role: user?.role || 'USER', // default to USER if not in DB yet
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid token: ${(error as Error).message}`,
      );
    }

    return true;
  }
}
