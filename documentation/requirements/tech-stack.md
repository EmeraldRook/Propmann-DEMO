# Tech Stack

## Framework
- **Next.js** with PWA support via `next-pwa`
- **TypeScript** for type safety

## UI
- **Ant Design** — component library for both dashboard and portal
- **Ant Design tokens** — theming and customization

## Backend (Demo)
- **Next.js API routes** with mock/seed data
- No database — hardcoded data is sufficient for demo purposes

## PWA
The resident portal is delivered as a Progressive Web App:
- Add-to-home-screen for mobile-first experience
- App-like navigation (no browser chrome)
- Single codebase serves both manager dashboard and resident portal
- Share via URL — no app store needed for demos

## Project Structure (Planned)
```
src/
├── app/
│   ├── manager/        # Manager dashboard pages
│   ├── resident/       # Resident portal pages (PWA entry point)
│   └── api/            # Mock API routes
├── components/
│   ├── manager/        # Manager-specific components
│   ├── resident/       # Resident-specific components
│   └── shared/         # Shared components
├── data/               # Mock/seed data
└── types/              # TypeScript type definitions
```

## Why These Choices
- **Next.js**: File-based routing, API routes for mock data, PWA plugin, largest React ecosystem
- **Ant Design**: Rich dashboard components out of the box (tables, charts, forms, calendars), enterprise-grade look
- **Mock data**: Fastest path to a visual demo — looks real without backend complexity
- **PWA**: Mobile-first for residents without the overhead of a native app or app store deployment
