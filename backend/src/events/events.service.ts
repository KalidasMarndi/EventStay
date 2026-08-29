import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { paginate } from '../common/dto/pagination.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80);
  }

  async create(dto: CreateEventDto, organizerId: string) {
    if (new Date(dto.startDate) >= new Date(dto.endDate)) {
      throw new BadRequestException('startDate must be before endDate');
    }

    const baseSlug = this.slugify(dto.title);
    const slug = `${baseSlug}-${Date.now()}`;

    return this.prisma.event.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        category: dto.category,
        city: dto.city,
        venueId: dto.venueId,
        organizerId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        capacity: dto.capacity,
        availableSeats: dto.capacity,
        pricePerHead: dto.pricePerHead,
        featuredImage: dto.featuredImage,
        status: dto.status ?? 'DRAFT',
        tags: dto.tags ?? [],
      },
      include: {
        venue: true,
        organizer: { select: { id: true, name: true, avatar: true } },
      },
    });
  }

  async findAll(query: QueryEventsDto) {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      city,
      status,
      startDateFrom,
      startDateTo,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    const where: Prisma.EventWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(category && { category }),
      ...(city && { city: { contains: city, mode: 'insensitive' } }),
      ...(status && { status }),
      ...(startDateFrom || startDateTo
        ? {
            startDate: {
              ...(startDateFrom && { gte: new Date(startDateFrom) }),
              ...(startDateTo && { lte: new Date(startDateTo) }),
            },
          }
        : {}),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            pricePerHead: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          }
        : {}),
    };

    const [total, events] = await this.prisma.$transaction([
      this.prisma.event.count({ where }),
      this.prisma.event.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          venue: { select: { id: true, name: true, city: true } },
          organizer: { select: { id: true, name: true, avatar: true } },
          _count: { select: { bookings: true, reviews: true } },
        },
      }),
    ]);

    return paginate(events, total, page, limit);
  }

  async findById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        venue: true,
        organizer: { select: { id: true, name: true, avatar: true } },
        reviews: {
          take: 10,
          include: { user: { select: { id: true, name: true, avatar: true } } },
        },
        _count: { select: { bookings: true } },
      },
    });
    if (!event)
      throw new NotFoundException({
        code: 'EVENT_NOT_FOUND',
        message: 'Event not found',
      });
    return event;
  }

  async findBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: {
        venue: true,
        organizer: { select: { id: true, name: true, avatar: true } },
        reviews: {
          take: 10,
          include: { user: { select: { id: true, name: true, avatar: true } } },
        },
        _count: { select: { bookings: true } },
      },
    });
    if (!event)
      throw new NotFoundException({
        code: 'EVENT_NOT_FOUND',
        message: 'Event not found',
      });
    return event;
  }

  async update(id: string, dto: UpdateEventDto, organizerId: string) {
    await this.assertOwnershipOrAdmin(id, organizerId);
    return this.prisma.event.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async remove(id: string, organizerId: string) {
    await this.assertOwnershipOrAdmin(id, organizerId);
    return this.prisma.event.delete({ where: { id } });
  }

  private async assertOwnershipOrAdmin(id: string, requesterId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      select: { organizerId: true },
    });
    if (!event)
      throw new NotFoundException({
        code: 'EVENT_NOT_FOUND',
        message: 'Event not found',
      });
    if (event.organizerId !== requesterId) {
      throw new ConflictException({
        code: 'FORBIDDEN',
        message: 'You do not own this event',
      });
    }
  }
}
