import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { InventoryLockerService } from '../inventory/inventory-locker.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
    private lockerService: InventoryLockerService,
  ) {}

  async getOverview(userId: string, eventId?: string) {
    // Determine the scope of events for this planner
    const eventsQuery: any = { organizerId: userId };
    if (eventId) {
      eventsQuery['id'] = eventId;
      // Verify they own the event
      const evt = await this.prisma.event.findFirst({ where: eventsQuery });
      if (!evt) throw new NotFoundException('Event not found or unauthorized');
    }

    // 1. Event Metrics
    const totalEvents = await this.prisma.event.count({ where: { organizerId: userId } });
    const activeEventsCount = await this.prisma.event.count({
      where: { organizerId: userId, status: { in: ['PUBLISHED'] } },
    });

    const eventsList = await this.prisma.event.findMany({
      where: eventsQuery,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        startDate: true,
        endDate: true,
        city: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    const eventIds = eventsList.map((e) => e.id);

    // If no events in scope, return empty
    if (eventIds.length === 0) {
      return this.emptyState();
    }

    // 2. Booking Metrics
    const bookings = await this.prisma.booking.findMany({
      where: { eventId: { in: eventIds } },
      select: {
        status: true,
        quantity: true,
        stayPackageQuantity: true,
      },
    });

    let totalBookings = bookings.length;
    let confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED').length;
    let pendingBookings = bookings.filter((b) => b.status === 'PENDING').length;
    let cancelledBookings = bookings.filter((b) => b.status === 'CANCELLED').length;
    let totalGuests = bookings.reduce((sum, b) => sum + (b.quantity || 1), 0); // Simplified guest calculation

    // 3. Payment Metrics
    const payments = await this.prisma.payment.findMany({
      where: { booking: { eventId: { in: eventIds } } },
      select: {
        amount: true,
        status: true,
      },
    });

    let paymentsReceived = payments.filter((p) => p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0);
    let paymentsPending = payments.filter((p) => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0);
    let paymentsFailed = payments.filter((p) => p.status === 'FAILED').reduce((sum, p) => sum + p.amount, 0);

    // 4. Inventory Metrics
    const stayPackages = await this.prisma.stayPackage.findMany({
      where: { eventId: { in: eventIds } },
      select: {
        availableRooms: true,
        bookedRooms: true,
      },
    });

    let inventoryAvailable = stayPackages.reduce((sum, sp) => sum + sp.availableRooms, 0);
    let inventoryBooked = stayPackages.reduce((sum, sp) => sum + sp.bookedRooms, 0);
    let inventoryTotal = inventoryAvailable + inventoryBooked;

    // 5. Recent Activity
    // Since we don't have an activity model, we derive it from recent bookings and payments
    const recentBookings = await this.prisma.booking.findMany({
      where: { eventId: { in: eventIds } },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { event: { select: { title: true } }, stayPackage: { select: { name: true } } },
    });

    const recentPayments = await this.prisma.payment.findMany({
      where: { booking: { eventId: { in: eventIds } } },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      include: { booking: { select: { guestName: true, event: { select: { title: true } } } } },
    });

    // Map to unified activity format
    const activity = [
      ...recentBookings.map((b) => ({
        id: `book-${b.id}`,
        type: 'BOOKING',
        title: `New booking: ${b.guestName || 'Guest'}`,
        description: `${b.event.title} - ${b.stayPackage?.name || 'Ticket'}`,
        date: b.createdAt,
      })),
      ...recentPayments.filter(p => p.status === 'COMPLETED').map((p) => ({
        id: `pay-${p.id}`,
        type: 'PAYMENT',
        title: `Payment received`,
        description: `₹${p.amount} from ${p.booking.guestName || 'Guest'} (${p.booking.event.title})`,
        date: p.updatedAt,
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

    // 6. Alerts Calculation
    const alerts: Array<{ type: string; message: string }> = [];
    if (pendingBookings > 0) {
      alerts.push({ type: 'warning', message: `${pendingBookings} bookings awaiting payment` });
    }
    
    // Low inventory alert
    const lowInventoryEvents = await this.prisma.event.findMany({
      where: { id: { in: eventIds } },
      select: {
        title: true,
        stayPackages: { select: { name: true, availableRooms: true } }
      }
    });

    lowInventoryEvents.forEach(evt => {
      evt.stayPackages.forEach(sp => {
        if (sp.availableRooms > 0 && sp.availableRooms <= 3) {
          alerts.push({ type: 'warning', message: `${sp.name} inventory is running low (${sp.availableRooms} left)` });
        } else if (sp.availableRooms === 0) {
          alerts.push({ type: 'critical', message: `${sp.name} is completely sold out` });
        }
      });
    });

    if (eventsList.some(e => e.status === 'DRAFT')) {
      alerts.push({ type: 'info', message: `You have unpublished draft events` });
    }

    return {
      summary: {
        totalEvents,
        activeEvents: activeEventsCount,
        totalBookings,
        confirmedBookings,
        totalGuests,
        paymentsReceived,
        paymentsPending,
        paymentsFailed,
      },
      inventory: {
        total: inventoryTotal,
        booked: inventoryBooked,
        available: inventoryAvailable,
        held: 0, // Placeholder, requires Redis scanning to implement precisely
      },
      events: eventsList.map(e => {
        // Derive simple health
        let health = 'HEALTHY';
        if (e.status === 'DRAFT') health = 'NEEDS_ATTENTION';
        return { ...e, health };
      }),
      activity,
      alerts,
    };
  }

  private emptyState() {
    return {
      summary: {
        totalEvents: 0,
        activeEvents: 0,
        totalBookings: 0,
        confirmedBookings: 0,
        totalGuests: 0,
        paymentsReceived: 0,
        paymentsPending: 0,
        paymentsFailed: 0,
      },
      inventory: { total: 0, booked: 0, available: 0, held: 0 },
      events: [],
      activity: [],
      alerts: [],
      isEmpty: true,
    };
  }
}
