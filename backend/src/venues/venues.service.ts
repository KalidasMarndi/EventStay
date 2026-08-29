import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';

@Injectable()
export class VenuesService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  async create(dto: CreateVenueDto) {
    const slug = `${this.slugify(dto.name)}-${Date.now()}`;
    return this.prisma.venue.create({
      data: {
        ...dto,
        slug,
        images: dto.images ?? [],
        amenities: dto.amenities ?? [],
      },
    });
  }

  async findAll(query: PaginationDto & { city?: string }) {
    const { page = 1, limit = 20, city } = query;
    const where = city
      ? { city: { contains: city, mode: 'insensitive' as const } }
      : {};
    const [total, venues] = await this.prisma.$transaction([
      this.prisma.venue.count({ where }),
      this.prisma.venue.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    return paginate(venues, total, page, limit);
  }

  async findById(id: string) {
    const venue = await this.prisma.venue.findUnique({
      where: { id },
      include: { events: { take: 5 } },
    });
    if (!venue)
      throw new NotFoundException({
        code: 'VENUE_NOT_FOUND',
        message: 'Venue not found',
      });
    return venue;
  }

  async update(id: string, dto: Partial<CreateVenueDto>) {
    return this.prisma.venue.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.venue.delete({ where: { id } });
  }
}
