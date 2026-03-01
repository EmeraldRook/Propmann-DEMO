# Tech Choices

Why we chose specific libraries and tools, and how they fit together.

> For the full tech stack spec, see [documentation/requirements/tech-stack.md](../requirements/tech-stack.md).

---

### shadcn/ui — one library for both interfaces
*Updated: 2026-03-02*

**Context**: The Manager Dashboard is a desktop web app. The Resident Portal is a mobile-first PWA.

**Decision**: Use shadcn/ui + Tailwind CSS for both interfaces. shadcn components are copy-pasted into `src/components/ui/` and styled with Tailwind utilities.

**Why**:
- shadcn/ui provides accessible, unstyled primitives (built on Radix UI) that work at any screen size
- Tailwind utility classes make responsive design straightforward — same components, different layouts
- No runtime CSS-in-JS — zero bundle overhead from the component library itself
- Full control: components live in your codebase, not `node_modules`
- Manager uses shadcn Sidebar, Table, Card components; Resident uses Card, Badge, Button with mobile-specific Tailwind classes

**Trade-off**: More initial setup than a batteries-included library like Ant Design, but much more control over styling and smaller bundle size.

---

### Next.js App Router (not Pages Router)
*Added: 2026-02-27*

**Context**: Needed a React framework with routing, API support, and PWA capability.

**Decision**: Next.js with App Router — the newer file-based routing model.

**Why**:
- Route groups `(manager)` and `(resident)` give each interface its own layout without URL prefix
- Built-in `app/manifest.ts` for PWA — no third-party library needed
- Largest React ecosystem for components and tooling

---

### Built-in PWA via manifest.ts (not next-pwa or Serwist)
*Added: 2026-02-27*

**Context**: The Resident Portal needs to be installable and feel like a native app.

**Decision**: Use Next.js built-in support: `app/manifest.ts` with `display: "standalone"`. No service worker library.

**Why**:
- For the demo, we only need installability and standalone display (no browser chrome)
- Zero config, no webpack dependency, fully compatible with Turbopack
- If offline caching is needed later, Serwist (`@serwist/next`) can be added without changing existing code

---

### TanStack Table for data tables
*Added: 2026-03-02*

**Context**: Manager dashboard has three data-heavy pages (maintenance, residents, financials).

**Decision**: Use `@tanstack/react-table` with shadcn Table components for a reusable DataTable.

**Why**:
- Headless: renders into shadcn `Table` components, not its own DOM
- Built-in pagination, sorting, filtering — no custom logic needed
- Type-safe column definitions with TypeScript generics
- Composable toolbar: search input + select filters sit above the table

---

### TypeScript everywhere
*Added: 2026-02-27*

**Context**: Project has multiple interfaces sharing types and a mock data layer.

**Decision**: TypeScript for all code. Shared type definitions live in `src/types/`.

**Why**:
- Manager and Resident interfaces share the same data models (residents, properties, requests)
- Type safety catches mismatches between data and UI expectations
- Shared `types/` folder is the single source of truth for data shapes

---

### Tailwind CSS v4 with oklch colors
*Added: 2026-03-02*

**Context**: shadcn/ui uses CSS variables for theming, Tailwind v4 uses CSS-first configuration.

**Decision**: Use oklch color space for all theme variables, with teal (#0f766e) as the primary brand color.

**Why**:
- oklch provides perceptually uniform colors — semantic variants (success, warning, info) look visually consistent
- CSS-first config in Tailwind v4 means theme values live in `globals.css`, not a JS config file
- Custom semantic color variables (`--success`, `--warning`, `--info`) extend shadcn's default palette
- `@theme inline` block maps CSS variables to Tailwind utility classes automatically
