# EventStay - Current Project Analysis

## 1. Frontend Audit
The current frontend (Next.js 16.3.2) is primarily a marketing and static demonstration layer. It is built using modern UI tools (Tailwind, Lucide, Framer Motion) and follows a feature-based architecture (`features/*`).

### Feature Inventory
| Feature | Frontend Location | Data Required | User Type | Backend Required | Current Mock/API |
|---------|-------------------|---------------|-----------|------------------|------------------|
| **Home** | `features/home` | Featured destinations, Hero assets | Guest/Any | No (Static content) | `data/destinations.ts` |
| **Product** | `features/product` | Value propositions | Any | No (Static content) | None |
| **Dashboard Demo** | `features/dashboard` | Steps/Workflow for booking management | Organizer | No (Static demo) | Hardcoded steps |
| **Destinations** | `features/destination` | Destinations catalog, gallery, activities | Guest/Any | Yes (Read-only catalog) | `data/destinations.ts` |
| **Event Microsite Demo**| `features/event-microsite`| Demo of what guests see (itinerary, rooms) | Guest | No (Static demo) | Hardcoded itinerary/rooms |
| **Create Event** | `features/create-event` | Marketing copy for creating events | Organizer | No | None |
| **Travel Support** | `features/travel-support` | Services list (VIP, Visa, Transfers) | Any | No | Hardcoded services |

## 2. Flight Support Analysis

**Conclusion: SEARCH-ONLY (Conceptual/Marketing)**

The prompt mentions that flight functionality has been added. However, a rigorous audit of the current frontend repository reveals that **there is absolutely no implemented flight search, selection, booking, or payment UI.**
- A search for "flight" across the frontend yields only marketing copy in `features/event-microsite/components/DevelopersSection.tsx`: *"Add hotel rooms, flights, and custom packages."*
- A search for "airline", "cabin", "passenger", and "ticket" yields zero relevant UI components.
- The "Travel Support" feature lists concierge services (VIP airport services, ground transfers, visa assistance) but contains no search fields for dates, origin, destination, or passenger counts.

**Actionable Outcome**: The backend should **not** implement a complex Flight Booking or Search domain (e.g., Sabre/Amadeus integrations, FlightBookings, FlightOffers tables) because there is no frontend to consume it. Flights remain a conceptual offering for travel concierges to handle off-platform or to be built in a future iteration.

## 3. External API & Authentication Analysis
- **External Flight API**: None currently implemented or referenced.
- **Authentication**: The frontend does not currently integrate with any auth provider (no Clerk, Auth.js, or Firebase configuration in `package.json`). However, the existing `backend/prisma/schema.prisma` contains `clerkId` on the `User` model, suggesting Clerk is the intended system. We will stick to Clerk for the backend.
- **Payment API**: The backend Prisma schema defines `PaymentStatus` and providers (Stripe, Razorpay, Paypal), but the frontend has no checkout forms implemented.

## 4. Backend Audit
The backend is a NestJS monolithic application utilizing Prisma with PostgreSQL.
Existing domains: `admin`, `auth`, `bookings`, `events`, `media`, `notifications`, `payments`, `reviews`, `search`, `stays`, `users`, `venues`.

The current Prisma schema implements:
- `User` (with Clerk integration)
- `Venue` (Physical location)
- `Event` (The main event with capacity and dates)
- `Stay` (Hotel/Accommodation linked to events)
- `Booking` (Tied to an Event and User)
- `Payment` (Tied to a Booking)
- `Review` (For Events or Stays)

**Gap Analysis**: The `Booking` model currently links only to `Event`, lacking native relations to `Stay` rooms (i.e. booking a specific room package at an event). The frontend Microsite demo shows booking "Sea View Room" or "Garden Villa". The backend schema needs an update to support Stay Booking/Packages under an Event.
