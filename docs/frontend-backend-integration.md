# EventStay: Frontend-Backend Integration Map

This document maps the visual frontend features to the currently implemented backend endpoints. 

## Core Principles
- **Backend as Source of Truth**: The backend strictly dictates endpoint names, methods, response structures, and authorization.
- **Frontend as Visual Source of Truth**: The existing UI design, typography, animations, and structures are preserved.
- **Do Not Invent**: If a backend capability (e.g., Flights) is not implemented, the frontend integration is deferred.

## Integration Map

| Feature | Frontend Location | Backend Endpoint | Method | Status | Notes |
| ------- | ----------------- | ---------------- | ------ | ------ | ----- |
| **Authentication** | `Clerk Provider` | `@clerk/nextjs` -> `/v1/users/me` | GET | To Implement | Use `@clerk/nextjs` to pass Bearer tokens to the backend. |
| **Home (Hero Carousel)** | `features/home` | N/A | N/A | Retain Mock | Backend has no `Destination` catalog. Keep static data to preserve complex animations. |
| **Product** | `features/product` | N/A | N/A | Retain Mock | Value props are static marketing copy. |
| **Dashboard (User/Auth)** | `features/dashboard` | `/v1/users/me` | GET | To Implement | Fetch and display the authenticated user's profile. |
| **Dashboard (Bookings)** | `features/dashboard` | `/v1/bookings` | GET | To Implement | Fetch user's event/stay bookings. |
| **Event Microsite** | `features/event-microsite` | `/v1/events/slug/:slug` | GET | To Implement | Fetch Event, Venue, and StayPackages. |
| **Create Event** | `features/create-event` | `/v1/events` | POST | To Implement | Submit the event creation form. Requires `ORGANIZER` role. |
| **Travel Support (Flights)** | `features/travel-support` | N/A | N/A | Deferred | Flight search/booking is NOT implemented in the backend. Keep as static/marketing UI. |
| **Bookings (Event + Stay)** | `features/event-microsite` | `/v1/bookings` | POST | To Implement | Uses unified booking transaction. Prevents overbooking. |
| **Payment Session** | `features/event-microsite` | `/v1/payments/:bookingId/create-session` | POST | To Implement | Stripe checkout session creation. |

## Implementation Strategy
1. **API Client**: Create `Frontend/services/api.ts` using native `fetch` with an interceptor pattern to attach the Clerk JWT token.
2. **Type Definitions**: Create `Frontend/types/api.ts` representing the exact Prisma-generated DTOs.
3. **Feature Integration**: Update `Dashboard`, `Event Microsite`, and `Create Event` to use the API client.
4. **State/Error Handling**: Use consistent loading states and map HTTP error codes (e.g., 400, 401, 409) to friendly UI messages.
