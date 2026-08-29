# EventStay - Domain Model

Based on the current project audit (Frontend UI and existing Backend Prisma schema), the actual supported domains map out as follows:

```mermaid
graph TD
    %% Main Domains
    USER[USER]
    ORGANIZER[ORGANIZER]
    ADMIN[ADMIN]
    
    %% User Interactions
    USER -->|Creates| EVENT_BOOKINGS[EVENT BOOKINGS]
    USER -->|Creates| STAY_BOOKINGS[STAY BOOKINGS]
    USER -->|Leaves| REVIEWS[REVIEWS]
    USER -->|Manages| PROFILE[PROFILE]
    
    %% Organizer Interactions
    ORGANIZER -->|Creates/Manages| EVENTS[EVENTS]
    ORGANIZER -->|Uploads| MEDIA[MEDIA]
    
    %% Admin Interactions
    ADMIN -->|Manages| USERS_ADMIN[USERS]
    ADMIN -->|Manages| EVENTS_ADMIN[EVENTS]
    ADMIN -->|Manages| BOOKINGS_ADMIN[BOOKINGS]
    ADMIN -->|Manages| VENUES[VENUES]
    ADMIN -->|Manages| STAYS[STAYS]
    
    %% Core Entities & Relations
    EVENTS ---|Hosted At| VENUES
    EVENTS ---|Includes| STAY_PACKAGES[STAY PACKAGES]
    STAY_PACKAGES ---|Belongs To| STAYS
    EVENT_BOOKINGS ---|Contains| STAY_BOOKINGS
    EVENT_BOOKINGS ---|Processed Via| PAYMENTS[PAYMENTS]
```

## Supported Domains

### USER
- **Profile**: Basic user details, synced via Clerk.
- **Bookings**: Unified booking interface. A single booking reference that encapsulates Event attendance and optional Stay packages.
- **Reviews**: Feedback for Events or Stays.

### ORGANIZER
- **Events**: Creation, management, capacity tracking, and publishing.
- **Media**: Uploading images/assets for events.

### ADMIN
- **Platform Management**: System-wide oversight.
- **Venues**: Management of physical venues.
- **Stays**: Management of accommodations/hotels that can be bundled into events.

### TRAVEL & FLIGHTS (Not Implemented)
- **Status**: Conceptual / Marketing Only.
- As confirmed by the frontend audit, there is no Flight Search or Flight Booking UI implemented. Flights are handled as off-platform "Concierge Services". Therefore, there is no domain modeled for flights at this stage.

## Unified Booking Architecture
The booking system is centered around the `Event`.
A single `Booking` represents a user's RSVP/Ticket to an `Event`.
Because the frontend demonstrates purchasing specific rooms (e.g., "Sea View Room"), the schema must be updated so a `Booking` can optionally include a `StayPackage` or `Room` reservation.

```text
Booking
 ├── EventBooking (Base attendee record)
 └── StayBooking (Optional room package selection)
```
