import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { BookingsService } from '../src/bookings/bookings.service';
import { CreateBookingDto } from '../src/bookings/dto/create-booking.dto';

describe('Booking Concurrency (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let bookingsService: BookingsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
    bookingsService = app.get<BookingsService>(BookingsService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should prevent overselling seats when multiple users book concurrently', async () => {
    // 1. Setup Data: Create a fresh event with exactly 1 available seat
    const organizer = await prisma.user.findFirst({ where: { role: 'ORGANIZER' } });
    const customer1 = await prisma.user.findFirst({ where: { email: 'customer@eventstay.com' } });
    
    // We need a second customer for concurrency
    const customer2 = await prisma.user.upsert({
      where: { email: 'customer2@eventstay.com' },
      update: {},
      create: {
        email: 'customer2@eventstay.com',
        name: 'Customer Two',
        clerkId: 'user_cust2',
        role: 'USER'
      }
    });

    const venue = await prisma.venue.findFirst();

    const event = await prisma.event.create({
      data: {
        title: 'Concurrency Test Event',
        slug: 'concurrency-test-' + Date.now(),
        description: 'Test',
        category: 'OTHER',
        city: 'Test City',
        startDate: new Date(),
        endDate: new Date(),
        capacity: 10,
        availableSeats: 1, // Only 1 seat left!
        pricePerHead: 100,
        status: 'PUBLISHED',
        organizerId: organizer!.id,
        venueId: venue!.id,
      }
    });

    // 2. Perform Concurrent Bookings
    const dto1: CreateBookingDto = { eventId: event.id, quantity: 1 };
    const dto2: CreateBookingDto = { eventId: event.id, quantity: 1 };

    // Fire both booking requests at exactly the same time
    const results = await Promise.allSettled([
      bookingsService.create(dto1, customer1!.id),
      bookingsService.create(dto2, customer2.id)
    ]);

    // 3. Assertions
    const fulfilled = results.filter(r => r.status === 'fulfilled');
    const rejected = results.filter(r => r.status === 'rejected');

    // Exactly ONE booking should succeed
    expect(fulfilled.length).toBe(1);
    // Exactly ONE booking should fail (Insufficient seats)
    expect(rejected.length).toBe(1);

    // Verify DB State
    const finalEvent = await prisma.event.findUnique({ where: { id: event.id } });
    expect(finalEvent!.availableSeats).toBe(0); // Cannot go below 0

    // Cleanup
    await prisma.booking.deleteMany({ where: { eventId: event.id } });
    await prisma.event.delete({ where: { id: event.id } });
    await prisma.user.delete({ where: { id: customer2.id } });
  });
});
