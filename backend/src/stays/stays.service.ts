import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';

@Injectable()
export class StaysService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  async create(dto: CreateStayDto) {
    const slug = `${this.slugify(dto.name)}-${Date.now()}`;
    return this.prisma.stay.create({
      data: {
        ...dto,
        slug,
        images: dto.images ?? [],
        amenities: dto.amenities ?? [],
      },
    });
  }

  async findAll(
    query: PaginationDto & {
      city?: string;
      minPrice?: number;
      maxPrice?: number;
    },
  ) {
    const { page = 1, limit = 20, city, minPrice, maxPrice } = query;
    const where = {
      ...(city && { city: { contains: city, mode: 'insensitive' as const } }),
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        pricePerNight: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }),
    };
    const [total, stays] = await this.prisma.$transaction([
      this.prisma.stay.count({ where }),
      this.prisma.stay.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { rating: 'desc' },
      }),
    ]);
    return paginate(stays, total, page, limit);
  }

  async findById(id: string) {
    const stay = await this.prisma.stay.findUnique({
      where: { id },
      include: { reviews: { take: 10 } },
    });
    if (!stay)
      throw new NotFoundException({
        code: 'STAY_NOT_FOUND',
        message: 'Stay not found',
      });
    return stay;
  }

  async update(id: string, dto: Partial<CreateStayDto>) {
    return this.prisma.stay.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.stay.delete({ where: { id } });
  }
}
