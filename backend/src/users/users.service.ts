import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpsertUserDto } from './dto/upsert-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertFromClerk(dto: UpsertUserDto) {
    return this.prisma.user.upsert({
      where: { clerkId: dto.clerkId },
      update: {
        name: dto.name,
        email: dto.email,
        avatar: dto.avatar,
        phone: dto.phone,
      },
      create: {
        clerkId: dto.clerkId,
        name: dto.name,
        email: dto.email,
        avatar: dto.avatar,
        phone: dto.phone,
        role: dto.role ?? 'USER',
      },
    });
  }

  async findByClerkId(clerkId: string) {
    const user = await this.prisma.user.findUnique({ where: { clerkId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
