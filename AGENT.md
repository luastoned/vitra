# AGENT.md

This document captures the current project conventions so future changes stay consistent.

## Stack

- React `19.2`
- TypeScript `5.9`
- Vite `7` (via `rolldown-vite`)
- Chakra UI `3`
- TanStack Router `1`
- TanStack React Query `5`
- Zustand `5`
- next-themes (color mode)
- @phosphor-icons/react (icons)

## Tooling

- **ESLint** for linting (`yarn lint`)
- **Biome** for formatting + optional checks (`yarn format`, `yarn check`)
- **TypeScript strict mode** (`yarn typecheck`)

## Scripts

- `yarn dev` – start dev server
- `yarn build` – typecheck (project refs) + build
- `yarn preview` – preview build
- `yarn lint` – ESLint
- `yarn typecheck` – `tsc --noEmit`
- `yarn check` – Biome check on `src`
- `yarn format` – Biome format on `src`

## Current Structure (baseline)

- `src/app/*` → app-level setup (providers, router, theme)
- `src/pages/*` → page components
- `src/shared/ui/*` → reusable presentational UI
- `src/shared/hooks/*` → reusable hooks
- `src/shared/lib/*` → non-UI infra helpers (query client, toaster config)
- `src/shared/stores/*` → Zustand stores
- `src/styles/*` → global styles

## Naming Conventions

- **PascalCase** for React component files
  - Examples: `HomePage.tsx`, `ColorMode.tsx`, `AppProviders.tsx`
- **kebab-case** for non-component files
  - Examples: `router.ts`, `theme.ts`, `use-color-mode.ts`, `query-client.ts`, `app-store.ts`
- Keep folders lowercase and semantic (`app`, `pages`, `shared`, `styles`)

## Import Conventions

- Use path alias `~/*` for `src/*`
  - Example: `import { router } from '~/app/router/router';`
- Prefer absolute alias imports over deep relative chains.

## Code Style

- Single quotes in TS/TSX
- Semicolons required
- Trailing commas enabled
- 2-space indentation
- Keep modules focused (avoid mixing unrelated concerns)

## React/Architecture Notes

- Provider composition lives in `src/app/providers/AppProviders.tsx`
- Router instance lives in `src/app/router/router.ts`
- Theme system lives in `src/app/theme/theme.ts`
- Color mode hook is separated from Chakra components:
  - Hook: `src/shared/hooks/use-color-mode.ts`
  - UI wrapper: `src/shared/ui/chakra/ColorMode.tsx`
- Toaster setup is split into config + UI:
  - Config: `src/shared/lib/toast/toaster.ts`
  - UI: `src/shared/ui/chakra/Toaster.tsx`

## Baseline Data Layer

- React Query client is centralized in:
  - `src/shared/lib/query/query-client.ts`
- Global UI state baseline store is in:
  - `src/shared/stores/app-store.ts`

## Before Committing

Run at least:

1. `yarn lint`
2. `yarn typecheck`

Optional but recommended:

3. `yarn check`
4. `yarn build`

## Commit Style

Use Conventional Commits with emoji (existing history style), e.g.:

- `feat: ✨ add ...`
- `fix: 🐛 resolve ...`
- `refactor: ♻️ restructure ...`
- `chore: 🔧 update ...`
