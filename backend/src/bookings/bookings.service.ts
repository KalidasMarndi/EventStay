import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto, userId: string) {
    // Use a transaction to atomically decrement seats and create the booking
    return this.prisma.$transaction(async (tx) => {
      // Use Postgres FOR UPDATE to lock the row and prevent race conditions
      const events = await tx.$queryRaw<any[]>`
        SELECT id, status, "availableSeats", "pricePerHead" 
        FROM events 
        WHERE id = ${dto.eventId} 
        FOR UPDATE
      `;

      if (!events || events.length === 0) {
        throw new NotFoundException({
          code: 'EVENT_NOT_FOUND',
          message: 'Event not found',
        });
      }
      
      const event = events[0];
      if (event.status !== 'PUBLISHED') {
        throw new BadRequestException({
          code: 'EVENT_NOT_AVAILABLE',
          message: 'Event is not accepting bookings',
        });
      }
      if (event.availableSeats < dto.quantity) {
        throw new BadRequestException({
          code: 'INSUFFICIENT_SEATS',
          message: `Only ${event.availableSeats} seat(s) available`,
        });
      }

      const pricePerHead = event.pricePerHead ?? 0;
      let totalAmount = pricePerHead * dto.quantity;
      let stayPackageAmount = 0;

      if (dto.stayPackageId && dto.stayPackageQuantity) {
        // Lock the stay package row
        const packages = await tx.$queryRaw<any[]>`
          SELECT id, price, "availableRooms" 
          FROM stay_packages 
          WHERE id = ${dto.stayPackageId} AND "eventId" = ${dto.eventId}
          FOR UPDATE
        `;
        if (!packages || packages.length === 0) {
          throw new NotFoundException({
            code: 'STAY_PACKAGE_NOT_FOUND',
            message: 'Stay package not found for this event',
          });
        }
        const stayPackage = packages[0];
        if (stayPackage.availableRooms < dto.stayPackageQuantity) {
          throw new BadRequestException({
            code: 'INSUFFICIENT_ROOMS',
            message: `Only ${stayPackage.availableRooms} room(s) available`,
          });
        }
        stayPackageAmount = stayPackage.price * dto.stayPackageQuantity;
        totalAmount += stayPackageAmount;

        await tx.stayPackage.update({
          where: { id: dto.stayPackageId },
          data: { availableRooms: { decrement: dto.stayPackageQuantity } },
        });
      }

      const booking = await tx.booking.create({
        data: {
          userId,
          eventId: dto.eventId,
          quantity: dto.quantity,
          stayPackageId: dto.stayPackageId,
          stayPackageQuantity: dto.stayPackageQuantity ?? 0,
          totalAmount,
          notes: dto.notes,
          status: 'PENDING',
        },
        include: {
          event: { select: { id: true, title: true, startDate: true } },
          stayPackage: { select: { id: true, name: true } },
        },
      });

      await tx.event.update({
        where: { id: dto.eventId },
        data: { availableSeats: { decrement: dto.quantity } },
      });

      return booking;
    });
  }

  async findAllForUser(userId: string, query: PaginationDto) {
    const { page = 1, limit = 20 } = query;
    const [total, bookings] = await this.prisma.$transaction([
      this.prisma.booking.count({ where: { userId } }),
      this.prisma.booking.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              startDate: true,
              featuredImage: true,
            },
          },
          stayPackage: {
            select: { id: true, name: true, price: true },
          },
          payments: { select: { id: true, status: true, amount: true } },
        },
      }),
    ]);
    return paginate(bookings, total, page, limit);
  }

  async findById(id: string, userId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, userId },
      include: { event: true, payments: true },
    });
    if (!booking)
      throw new NotFoundException({
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking not found',
      });
    return booking;
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, userId },
    });
    if (!booking)
      throw new NotFoundException({
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking not found',
      });
    if (booking.status === 'CANCELLED') {
      throw new BadRequestException({
        code: 'ALREADY_CANCELLED',
        message: 'Booking is already cancelled',
      });
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
      await tx.event.update({
        where: { id: booking.eventId },
        data: { availableSeats: { increment: booking.quantity } },
      });
      if (booking.stayPackageId && booking.stayPackageQuantity > 0) {
        await tx.stayPackage.update({
          where: { id: booking.stayPackageId },
          data: { availableRooms: { increment: booking.stayPackageQuantity } },
        });
      }
      return updated;
    });
  }
}
