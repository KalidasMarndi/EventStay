# EventStay - System Design Architecture

## 1. Current Feature Map
Based on the frontend and backend audit, the actual EventStay system is a high-end, event-centric booking platform. 
Features include:
- Browsing curated premium destinations.
- Event microsite generation for organizers.
- Private, invite-only event booking flows.
- Optional add-ons for event packages (e.g., hotel room reservations).
- Offline / concierge travel support services (VIP transit, visas).

## 2. Architecture & Domain Boundaries
The platform follows a modular monolith architecture using NestJS and Prisma.
- **Frontend**: Next.js 16 (App Router), deployed on Vercel. Static generation for high performance.
- **Backend**: NestJS REST API, deployed separately.
- **Database**: PostgreSQL (managed via Prisma).
- **Authentication**: Clerk (stateless JWTs verified by the backend).

## 3. Flight Architecture (Not Implemented)
A thorough frontend audit confirmed there is no flight search or booking capability present in the codebase. As such, the backend will **not** implement a flight integration (no Sabre/Amadeus, no caching of flight offers). Travel services are marketed as concierge support.

## 4. Database Architecture (Prisma)
The database focuses on `Event`, `Venue`, `Stay`, and `Booking`.
**Required Schema Updates:**
- `StayPackage` or `RoomType`: Needs to be added. `Stay` currently lacks the granularity to offer specific rooms (e.g., "Sea View Room") as shown in the frontend microsite.
- `BookingItem`: The `Booking` model should support nested items (Event Ticket, Stay Package).

## 5. API Proposal
APIs will be structured under `/api/v1/`.
- `/auth/*`: Webhooks from Clerk to sync `User` records.
- `/users/me`: Profile retrieval and update.
- `/events/*`: CRUD for organizers, public reads for guests.
- `/venues/*`: Read-only for organizers/guests.
- `/stays/*`: Read-only for organizers/guests.
- `/bookings/*`: Creation of unified bookings (event + stay packages).
- `/payments/*`: Stripe webhook ingestion and checkout session generation.

## 6. Authentication & Authorization
- **Authentication**: Delegated to Clerk. The frontend uses Clerk components (to be implemented), and the backend uses `@clerk/backend` to verify JWTs in guards.
- **Authorization**: Role-based access control (RBAC) via the `UserRole` enum (`USER`, `ORGANIZER`, `ADMIN`).

## 7. Booking & Payment Architecture
- **Flow**:
  1. User selects Event and optional Stay Package.
  2. Backend validates capacity (`availableSeats`, `availableRooms`) using a PostgreSQL transaction.
  3. Backend creates `Booking` in `PENDING` state and generates a Stripe Checkout Session.
  4. Frontend redirects to Stripe.
  5. Stripe webhook (`/api/v1/payments/webhook`) notifies the backend of success.
  6. Backend updates `Booking` and `Payment` to `CONFIRMED`/`COMPLETED` idempotently.

- **Idempotency**: Webhook processing will check the `idempotencyKey` and `providerPaymentId` to prevent double-processing.

## 8. Scalability Strategy
- **Current**: Monolithic NestJS application backed by a single PostgreSQL instance.
- **Caching**: 
  - Redis is NOT required at this stage. The frontend heavily utilizes Next.js static generation (SSG) for public catalog pages (Destinations, Features).
  - Dynamic routes (Booking, Dashboard) will hit the DB directly. Capacity constraints and indexing (already present in the schema) will handle the load effectively.
- **Future**: If read loads increase, Redis can be introduced for `Event` and `Venue` catalog caching. Microservices (e.g., splitting Payments or Search) are unnecessary premature optimizations.
