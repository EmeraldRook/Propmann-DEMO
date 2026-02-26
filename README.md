# Propmann

A SaaS property management platform demo. Managers subscribe to manage their properties and residents from a web dashboard. Residents interact through a mobile-first PWA.

## Interfaces

| Interface            | User       | Platform         | Status   |
|----------------------|------------|------------------|----------|
| Manager Dashboard    | Managers   | Web              | Phase 1  |
| Resident Portal      | Residents  | Mobile-first PWA | Phase 1  |
| Admin Console        | Admin      | Web              | Phase 2  |

## Tech Stack

- **Next.js** (App Router) + TypeScript
- **Ant Design** (`antd`) — Manager Dashboard
- **Ant Design Mobile** (`antd-mobile`) — Resident Portal
- **PWA** via built-in `app/manifest.ts`
- Mock data via Route Handlers (no database)

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── manager/        # Manager dashboard pages
│   ├── resident/       # Resident portal pages (PWA entry point)
│   └── api/            # Mock Route Handlers
├── components/
│   ├── manager/        # Manager-specific components
│   ├── resident/       # Resident-specific components
│   └── shared/         # Shared components
├── data/               # Mock/seed data
└── types/              # TypeScript type definitions
```

## Documentation

Full specs live in [`documentation/`](./documentation/):

- [Project Overview](./documentation/requirements/project-overview.md)
- [Roles & Permissions](./documentation/requirements/roles-and-permissions.md)
- [Manager Dashboard](./documentation/requirements/manager-dashboard.md)
- [Resident Portal](./documentation/requirements/resident-portal.md)
- [Tech Stack](./documentation/requirements/tech-stack.md)
