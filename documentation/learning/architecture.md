# Architecture

System structure and key architectural decisions.

> For full specs, see [documentation/requirements/](../requirements/).

---

### One Next.js app, two completely separate interfaces
*Added: 2026-02-27*

**Context**: Propmann serves two user types — managers (desktop web) and residents (mobile PWA) — with fundamentally different UI needs.

**Decision**: Both interfaces live in a single Next.js App Router project, split into separate route groups:
```
src/app/
├── manager/    # Desktop web dashboard
├── resident/   # Mobile-first PWA
└── api/        # Shared mock API routes
```
Each gets its own layout, navigation, and component library.

**Why**:
- Shared API layer and TypeScript types — no duplication
- Independent layouts and navigation per interface
- Deploy as a single app, no monorepo complexity for a demo

---

### Separate component trees per interface
*Added: 2026-02-27*

**Context**: Manager and Resident UIs use different component libraries (Ant Design vs Ant Design Mobile).

**Decision**: Components are split by interface, with a shared folder for cross-cutting concerns:
```
src/components/
├── manager/    # antd-based components
├── resident/   # antd-mobile-based components
└── shared/     # Types, utilities, anything both use
```

**Why**:
- Prevents accidental import of desktop components in mobile (or vice versa)
- Each folder uses its own design library conventions
- `shared/` is for non-UI code (types, helpers) that both interfaces need

---

### Multi-property from day one
*Added: 2026-02-27*

**Context**: Managers can manage multiple buildings/properties simultaneously.

**Decision**: Every data model and screen is scoped to a property. The manager dashboard includes a property selector/switcher on the home screen, and all data (residents, maintenance, amenities) is filtered by selected property.

**Why**:
- Retrofitting multi-property later would touch every data query and screen
- It's a key selling point for the demo ("manage all your buildings from one place")
- Roles cascade: Admin → Manager (property-scoped) → Resident (unit-scoped)

---

### Mock backend with Route Handlers
*Added: 2026-02-27*

**Context**: This is a visual demo, not a production app.

**Decision**: Use Next.js Route Handlers (`app/api/`) with hardcoded seed data. No database, no ORM, no migrations.

**Why**:
- Fastest path to realistic-looking screens
- API shape matches what a real backend would serve, so the frontend code is realistic
- Easy to swap for a real backend later if the demo converts to a product
