import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.stayPackage.findMany({
      where: { eventId },
      include: {
        stay: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getStats(eventId: string) {
    const packages = await this.prisma.stayPackage.findMany({
      where: { eventId },
    });

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
}
