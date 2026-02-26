# Roles & Permissions

## Roles

### Resident
Users who live in a managed property.
- Submit and track maintenance requests
- View and pay rent / fees
- View payment history
- See announcements from management
- Book shared amenities (gym, BBQ area, meeting room, etc.)
- View their lease and documents
- Message management

### Manager
Users who manage one or more properties.
- View dashboard overview (occupancy, open tickets, upcoming payments)
- Manage multiple properties from a single account
- Handle maintenance requests (assign, track, close)
- Post announcements to residents (per-property or broadcast)
- Onboard and offboard residents
- Manage amenities and bookings
- View financial overview (rent collection, arrears, expenses)
- Communicate with residents

### Admin
The platform operator who runs the SaaS business. Phase 2 — not in initial demo scope.
- Onboard new managers and assign properties
- View system-wide analytics across all properties
- Manage subscriptions and billing for managers
- Configure platform branding
- Full access override to any property

## Permission Hierarchy
```
Admin
  └── Manager (scoped to assigned properties)
        └── Resident (scoped to own unit and property)
```

Each role only sees data relevant to their scope. Managers cannot see other managers' properties. Residents cannot see other residents' data.
