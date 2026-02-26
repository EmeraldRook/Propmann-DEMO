# Tech Choices

Why we chose specific libraries and tools, and how they fit together.

> For the full tech stack spec, see [documentation/requirements/tech-stack.md](../requirements/tech-stack.md).

---

### Two UI libraries: antd (desktop) + antd-mobile (mobile)
*Added: 2026-02-27*

**Context**: The Manager Dashboard is a desktop web app. The Resident Portal is a mobile-first PWA. One UI library can't optimally serve both.

**Decision**: Use `antd` for the manager interface and `antd-mobile` for the resident interface. They're from the same Ant Design family, so visual language stays consistent.

**Why**:
- `antd` has rich enterprise components (tables, charts, forms, calendars) ideal for dashboards
- `antd-mobile` has touch-optimized, lightweight components built for mobile web
- Same design family = consistent visual identity without compromise on UX
- Forcing one library for both would mean either bloated mobile bundle or missing desktop features

---

### Next.js App Router (not Pages Router)
*Added: 2026-02-27*

**Context**: Needed a React framework with routing, API support, and PWA capability.

**Decision**: Next.js with App Router — the newer file-based routing model.

**Why**:
- File-based routing maps cleanly to our `manager/` and `resident/` route groups
- Route Handlers (`route.ts`) give us a mock API without a separate backend
- Built-in `app/manifest.ts` for PWA — no third-party library needed
- Largest React ecosystem for components and tooling

---

### Built-in PWA via manifest.ts (not next-pwa or Serwist)
*Added: 2026-02-27*

**Context**: The Resident Portal needs to be installable and feel like a native app.

**Decision**: Use Next.js built-in support: `app/manifest.ts` with `display: "standalone"`. No service worker library.

**Why**:
- For the demo, we only need installability and standalone display (no browser chrome)
- `next-pwa` is deprecated; Serwist is its successor but adds complexity we don't need
- Zero config, no webpack dependency, fully compatible with Turbopack
- If offline caching is needed later, Serwist (`@serwist/next`) can be added without changing existing code

---

### TypeScript everywhere
*Added: 2026-02-27*

**Context**: Project has multiple interfaces sharing types and a mock API layer.

**Decision**: TypeScript for all code. Shared type definitions live in `src/types/`.

**Why**:
- Manager and Resident interfaces share the same data models (residents, properties, requests)
- Type safety catches mismatches between API responses and UI expectations
- Shared `types/` folder is the single source of truth for data shapes
