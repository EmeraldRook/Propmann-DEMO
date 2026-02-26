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

### antd and antd-mobile are different packages
*Added: 2026-02-27*

**Context**: Both come from the Ant Design family but they're separate npm packages with different APIs.

**Gotcha**: Don't import from `antd` in Resident Portal components (or `antd-mobile` in Manager components). They have different component names, props, and styling approaches. The folder structure (`components/manager/` vs `components/resident/`) exists specifically to prevent this.

---

### Documentation-first workflow
*Added: 2026-02-27*

**Context**: This project uses a documentation-first approach with specs written before code.

**Gotcha**: Before implementing a feature, check `documentation/requirements/` for the relevant spec. If your implementation diverges from the spec, flag it — don't silently deviate. If no spec exists for what you're building, that's worth discussing before writing code.
