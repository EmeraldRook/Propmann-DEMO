# Tech Stack

## Framework
- **Next.js** (App Router) with built-in PWA support (`app/manifest.ts`)
- **TypeScript** for type safety

## UI
- **Ant Design** (`antd`) — component library for the Manager Dashboard (desktop web)
- **Ant Design Mobile** (`antd-mobile`) — component library for the Resident Portal (mobile-first PWA)
- **Ant Design tokens / CSS variables** — theming and customization per interface

## Backend (Demo)
- **Next.js Route Handlers** (`app/api/` route.ts files) with mock/seed data
- No database — hardcoded data is sufficient for demo purposes

## PWA
The resident portal is delivered as a Progressive Web App using **Next.js built-in PWA support** (no third-party library):
- `app/manifest.ts` provides the web app manifest (installability, app name, icons, theme)
- `display: "standalone"` for app-like navigation (no browser chrome)
- Add-to-home-screen for mobile-first experience
- Single codebase serves both manager dashboard and resident portal
- Share via URL — no app store needed for demos

> **Note:** If offline caching or precaching is needed later, [Serwist](https://serwist.pages.dev) (`@serwist/next`) is the recommended option. It's the actively maintained successor to `next-pwa`, built on a Workbox fork, with Turbopack support in progress. Not needed for this demo since we only require installability and app-like navigation.

## Project Structure (Planned)
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

## Why These Choices
- **Next.js**: App Router with file-based routing, Route Handlers for mock data, built-in manifest support for PWA, largest React ecosystem
- **Ant Design (`antd`)**: Rich desktop components out of the box (tables, charts, forms, calendars), enterprise-grade look — ideal for the Manager Dashboard
- **Ant Design Mobile (`antd-mobile`)**: Touch-optimized, lightweight components built for mobile web — ideal for the Resident Portal PWA. Same design family as `antd` so visual language stays consistent
- **Two UI libraries**: Each interface gets components optimized for its target platform (desktop vs mobile) rather than forcing one library to do both
- **Mock data**: Fastest path to a visual demo — looks real without backend complexity
- **Built-in PWA**: Next.js natively supports `app/manifest.ts` — no third-party library needed for installability and standalone display. Zero config, no webpack dependency, fully compatible with Turbopack
