# Tech Stack

## Framework
- **Next.js** (App Router) with built-in PWA support (`app/manifest.ts`)
- **TypeScript** for type safety

## UI
- **shadcn/ui** — headless component primitives built on Radix UI, styled with Tailwind CSS
- **Tailwind CSS v4** — utility-first CSS framework for all styling
- **Radix UI** — accessible, unstyled primitives (used under the hood by shadcn/ui)
- **lucide-react** — consistent icon library
- **@tanstack/react-table** — headless data table for the Manager Dashboard

## Backend (Demo)
- No API routes — all data is imported directly from `src/data/` mock files
- No database — hardcoded data is sufficient for demo purposes

## PWA
The resident portal is delivered as a Progressive Web App using **Next.js built-in PWA support** (no third-party library):
- `app/manifest.ts` provides the web app manifest (installability, app name, icons, theme)
- `display: "standalone"` for app-like navigation (no browser chrome)
- Add-to-home-screen for mobile-first experience
- Single codebase serves both manager dashboard and resident portal
- Share via URL — no app store needed for demos

> **Note:** If offline caching or precaching is needed later, [Serwist](https://serwist.pages.dev) (`@serwist/next`) is the recommended option. Not needed for this demo since we only require installability and app-like navigation.

## Project Structure
```
src/
├── app/
│   ├── (manager)/       # Manager dashboard (SidebarProvider layout)
│   │   └── manager/     # Dashboard pages
│   ├── (resident)/      # Resident portal (mobile wrapper layout)
│   │   └── resident/    # Resident pages
│   ├── layout.tsx       # Root layout (Inter font, TooltipProvider)
│   ├── page.tsx         # Landing page
│   └── manifest.ts      # PWA manifest
├── components/
│   ├── ui/              # shadcn/ui primitives (auto-generated)
│   ├── manager/         # Manager-specific components
│   ├── resident/        # Resident-specific components
│   └── shared/          # Shared components (Logo)
├── context/             # React contexts (PropertyContext)
├── data/                # Mock/seed data files
├── hooks/               # Custom hooks (use-mobile)
├── lib/                 # Utilities (cn, format)
└── types/               # TypeScript type definitions
```

## Why These Choices
- **Next.js**: App Router with file-based routing, route groups for separate layouts, built-in manifest support for PWA
- **shadcn/ui**: Copy-paste component primitives — full control over styling, no runtime CSS-in-JS, tree-shakes perfectly, built on accessible Radix UI primitives
- **Tailwind CSS v4**: Modern utility-first styling with CSS-first configuration, oklch colors, container queries. No separate config file needed
- **One UI library for both interfaces**: shadcn/ui + Tailwind works for both desktop (manager sidebar layout) and mobile (resident max-width wrapper) without separate component libraries
- **TanStack Table**: Headless data table — works with shadcn/ui Table components for full control over rendering
- **Mock data**: Fastest path to a visual demo — looks real without backend complexity
- **Built-in PWA**: Next.js natively supports `app/manifest.ts` — zero config, no webpack dependency
