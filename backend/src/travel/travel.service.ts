import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, ServiceType, ServiceStatus } from '@prisma/client';

@Injectable()
export class TravelService {
  constructor(private prisma: PrismaService) {}

  async getEventServices(eventId: string, organizerId: string) {
    const event = await this.prisma.event.findFirst({
      where: { id: eventId, organizerId },
    });
    if (!event) throw new NotFoundException('Event not found or unauthorized');

    return this.prisma.travelService.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPublicServices(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: {
        travelServices: {
          where: { isVisible: true, status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!event) throw new NotFoundException('Event not found');

    return event.travelServices;
  }

  async createService(eventId: string, organizerId: string, data: Prisma.TravelServiceUncheckedCreateWithoutEventInput) {
    const event = await this.prisma.event.findFirst({
      where: { id: eventId, organizerId },
    });
    if (!event) throw new UnauthorizedException('Unauthorized');

    return this.prisma.travelService.create({
      data: { ...data, eventId },
    });
  }

  async updateService(id: string, organizerId: string, data: Prisma.TravelServiceUpdateInput) {
    const service = await this.prisma.travelService.findUnique({
      where: { id },
      include: { event: true },
    });

    if (!service || service.event.organizerId !== organizerId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.prisma.travelService.update({
      where: { id },
      data,
    });
  }

  async deleteService(id: string, organizerId: string) {
    const service = await this.prisma.travelService.findUnique({
      where: { id },
      include: { event: true },
    });

    if (!service || service.event.organizerId !== organizerId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.prisma.travelService.delete({ where: { id } });
  }
}
