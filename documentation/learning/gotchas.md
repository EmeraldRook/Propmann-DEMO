# Gotchas

Things that aren't obvious and would trip up a new developer.

---

### This is a DEMO — breadth over depth
*Added: 2026-02-27*

**Context**: PropmannDEMO exists to visually convey value to a client, not to be a production app.

**Gotcha**: Don't build deep workflows. Show many screens with realistic-looking data, not fully functional flows. A payment screen with a "Pay Now" button and a simulated success state is enough — no Stripe integration.

**Rule of thumb**: If it looks polished and tells the story, it's done.

---

### Admin Console is Phase 2 — don't build it
*Added: 2026-02-27*

**Context**: Three interfaces exist in the spec (Manager Dashboard, Resident Portal, Admin Console).

**Gotcha**: Admin Console is explicitly deferred to Phase 2. Don't create `app/admin/` routes, admin components, or admin-specific API endpoints. Focus on Manager + Resident only.

---

### shadcn components live in your codebase
*Added: 2026-03-02*

**Context**: shadcn/ui components are copied into `src/components/ui/` — they're not imported from `node_modules`.

**Gotcha**: Don't run `npx shadcn add` for a component you've already customized — it will overwrite your changes. Check `src/components/ui/` first. If you need to update a component, manually apply the changes.

---

### Tailwind v4 uses @theme, not tailwind.config
*Added: 2026-03-02*

**Context**: Tailwind CSS v4 uses CSS-first configuration.

**Gotcha**: There is no `tailwind.config.ts`. All theme customization happens in `src/app/globals.css` using `@theme inline {}`. If you add a new CSS variable (e.g., `--my-color`), you also need to add `--color-my-color: var(--my-color);` inside `@theme inline {}` to make it available as a Tailwind utility class.

---

### Route groups don't add URL segments
*Added: 2026-03-02*

**Context**: `(manager)` and `(resident)` are Next.js route groups — the parentheses mean they provide layouts without affecting the URL.

**Gotcha**: The URL is `/manager/maintenance`, not `/(manager)/manager/maintenance`. The route group just lets us give manager and resident pages different layouts (`SidebarProvider` vs mobile wrapper).

---

### SidebarProvider requires client components
*Added: 2026-03-02*

**Context**: shadcn's Sidebar uses React context (`SidebarProvider`) for open/collapsed state.

**Gotcha**: Any component that reads sidebar state (via `useSidebar()`) must be a client component (`'use client'`). The manager layout wraps everything in `SidebarProvider`, but individual page components that don't use sidebar state can remain server components.

---

### Service worker is manual — bump the cache version on changes
*Added: 2026-03-02*

**Context**: `public/sw.js` uses a versioned cache name (`propmann-v1`).

**Gotcha**: When you change which URLs are precached or modify caching logic, bump the version (e.g., `propmann-v2`). The activate handler automatically deletes old caches, but only if the name changes. Also, `next.config.ts` serves `sw.js` with `no-cache` headers so browsers always fetch the latest version — don't remove that.

---

### Documentation-first workflow
*Added: 2026-02-27*

**Context**: This project uses a documentation-first approach with specs written before code.

**Gotcha**: Before implementing a feature, check `documentation/requirements/` for the relevant spec. If your implementation diverges from the spec, flag it — don't silently deviate. If no spec exists for what you're building, that's worth discussing before writing code.
