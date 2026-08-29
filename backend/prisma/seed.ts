import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create Users
  await prisma.user.upsert({
    where: { email: 'admin@eventstay.com' },
    update: {},
    create: {
      email: 'admin@eventstay.com',
      name: 'Admin User',
      clerkId: 'user_admin123',
      role: 'ADMIN',
    },
  });

  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@eventstay.com' },
    update: {},
    create: {
      email: 'organizer@eventstay.com',
      name: 'Event Organizer',
      clerkId: 'user_org123',
      role: 'ORGANIZER',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@eventstay.com' },
    update: {},
    create: {
      email: 'customer@eventstay.com',
      name: 'Regular Customer',
      clerkId: 'user_cust123',
      role: 'USER',
    },
  });

  // Create Venue
  const venue = await prisma.venue.upsert({
    where: { id: 'venue-1' },
    update: {},
    create: {
      id: 'venue-1',
      name: 'Grand Convention Center',
      slug: 'grand-convention-center',
      address: '123 Main St',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      capacity: 5000,
      description: 'The largest convention center in the city.',
    },
  });

  // Create Event
  const event = await prisma.event.upsert({
    where: { slug: 'delhi-music-festival' },
    update: {},
    create: {
      title: 'Delhi Music Festival',
      slug: 'delhi-music-festival',
      description: 'A 3-day music festival featuring top artists.',
      category: 'MUSIC',
      city: 'Delhi',
      startDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      endDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      capacity: 5000,
      availableSeats: 5000,
      pricePerHead: 199.99,
      status: 'PUBLISHED',
      organizerId: organizer.id,
      venueId: venue.id,
    },
  });

  // Create Stay
  await prisma.stay.upsert({
    where: { id: 'stay-1' },
    update: {},
    create: {
      id: 'stay-1',
      name: 'Luxury Hotel Delhi',
      slug: 'luxury-hotel-delhi',
      city: 'Delhi',
      address: 'Near Convention Center',
      description: 'A 5-star hotel near the convention center.',
      pricePerNight: 150.0,
      availableRooms: 100,
      rating: 4.8,
      amenities: ['Pool', 'WiFi', 'Gym', 'Breakfast'],
    },
  });

  // Create StayPackage
  const stayPackage = await prisma.stayPackage.upsert({
    where: { id: 'stay-package-1' },
    update: {},
    create: {
      id: 'stay-package-1',
      eventId: event.id,
      stayId: 'stay-1',
      name: 'Sea View Room',
      description: 'Beautiful sea view room for two guests.',
      price: 250.0,
      availableRooms: 50,
      capacity: 2,
    },
  });

  // Create Booking
  const booking = await prisma.booking.upsert({
    where: { id: 'booking-1' },
    update: {},
    create: {
      id: 'booking-1',
      userId: customer.id,
      eventId: event.id,
      stayPackageId: stayPackage.id,
      status: 'CONFIRMED',
      quantity: 2,
      stayPackageQuantity: 1,
      totalAmount: 649.98, // 2 tickets @ 199.99 + 1 room @ 250.0
      bookingReference: 'BKG-12345',
    },
  });

  // Create Payment
  await prisma.payment.upsert({
    where: { id: 'payment-1' },
    update: {},
    create: {
      id: 'payment-1',
      bookingId: booking.id,
      provider: 'STRIPE',
      providerPaymentId: 'pi_test123',
      amount: 399.98,
      currency: 'USD',
      status: 'COMPLETED',
    },
  });

  // Create Review
  await prisma.review.upsert({
    where: { id: 'review-1' },
    update: {},
    create: {
      id: 'review-1',
      userId: customer.id,
      eventId: event.id,
      rating: 5,
      comment: 'Amazing experience, cannot wait for the next one!',
    },
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
