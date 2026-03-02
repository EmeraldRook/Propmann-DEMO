# Architecture

System structure and key architectural decisions.

> For full specs, see [documentation/requirements/](../requirements/).

---

### One Next.js app, two completely separate interfaces
*Added: 2026-02-27 · Updated: 2026-03-02*

**Context**: Propmann serves two user types — managers (desktop web) and residents (mobile PWA) — with fundamentally different UI needs.

**Decision**: Both interfaces live in a single Next.js App Router project, split into route groups:
```
src/app/
├── (manager)/
│   ├── layout.tsx      # SidebarProvider + AppSidebar + SidebarInset
│   └── manager/        # All manager pages
├── (resident)/
│   ├── layout.tsx      # Max-width 430px wrapper + BottomTabBar
│   └── resident/       # All resident pages
├── layout.tsx          # Root: Inter font, TooltipProvider, SW register
└── page.tsx            # Landing page (links to both)
```
Each gets its own layout, navigation pattern, and styling approach.

**Why**:
- Shared data layer (`src/data/`, `src/types/`) — no duplication
- Independent layouts per interface via route groups
- Deploy as a single app, no monorepo complexity for a demo

---

### Component architecture with shadcn/ui
*Added: 2026-03-02*

**Context**: Both interfaces use shadcn/ui primitives but compose them differently.

**Decision**: Three-tier component structure:
```
src/components/
├── ui/              # shadcn primitives (Card, Button, Badge, Table, Sidebar...)
├── manager/         # Manager-specific composed components
│   ├── app-sidebar.tsx      # Navigation sidebar
│   ├── header.tsx           # Sticky header with property selector
│   ├── stat-card.tsx        # Dashboard stat card
│   ├── data-table.tsx       # Reusable TanStack + shadcn table
│   └── ...                  # Other dashboard components
├── resident/        # Resident-specific composed components
│   ├── resident-header.tsx  # Teal gradient header
│   └── bottom-tab-bar.tsx   # Fixed bottom navigation
└── shared/          # Cross-cutting components
    └── Logo.tsx             # Brand SVG logo
```

**Why**:
- `ui/` is the shared primitive layer — never import manager components into resident (or vice versa)
- Manager components compose `ui/` primitives with desktop-specific layouts (sidebar, tables, grids)
- Resident components compose `ui/` primitives with mobile-specific patterns (gradient headers, card lists, bottom tabs)

---

### Multi-property from day one
*Added: 2026-02-27*

**Context**: Managers can manage multiple buildings/properties simultaneously.

**Decision**: Every data model and screen is scoped to a property. `PropertyContext` provides the selected property to all manager components. The header includes a property selector (shadcn Select) for switching properties.

**Why**:
- Retrofitting multi-property later would touch every data query and screen
- It's a key selling point for the demo ("manage all your buildings from one place")
- Roles cascade: Admin → Manager (property-scoped) → Resident (unit-scoped)

---

### Static mock data (no API routes)
*Updated: 2026-03-02*

**Context**: This is a visual demo, not a production app.

**Decision**: Data lives in `src/data/` as TypeScript arrays with getter functions (e.g., `getMaintenanceByProperty()`). No API routes or Route Handlers.

**Why**:
- Simplest possible data layer — import and filter arrays directly
- Type-safe: data files export typed arrays matching `src/types/` interfaces
- Each data module provides scoped getters (by property, by resident)
- Pages import data directly — no fetch calls, loading states, or error handling needed for the demo

---

### Manager navigation: shadcn Sidebar
*Added: 2026-03-02*

**Context**: Manager dashboard needs collapsible navigation for 7 main pages.

**Decision**: Use shadcn's built-in Sidebar component pattern with `SidebarProvider`, `SidebarTrigger`, and `collapsible="icon"`.

**Structure**: `SidebarProvider` → `AppSidebar` + `SidebarInset` (main content). Sidebar collapses to icon-only mode. Active route highlighting via `SidebarMenuButton isActive`.

---

### Resident navigation: Bottom tab bar
*Added: 2026-03-02*

**Context**: Resident portal is mobile-first (max 430px), needs native-app-like navigation.

**Decision**: Fixed bottom tab bar with 5 tabs (Home, Requests, Payments, Amenities, Profile). Announcements page accessible via links from Home, not a tab.

**Why**: Bottom tabs are the standard mobile navigation pattern. 5 tabs is the iOS/Android sweet spot — more requires scrolling. The teal gradient header provides context (page title + property name).
