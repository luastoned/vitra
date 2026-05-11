# AGENTS.md

This document captures the current project conventions so future changes stay consistent.

## Guidance Scope

- Use this file as the entrypoint for repository engineering guidance.
- This is a TypeScript/React/Vite project. For TS, TSX, JavaScript, Node/tooling configs, package files, and frontend build code, follow the TypeScript guidance in this file.
- Prefer repository-local patterns and commands over generic guidance. If a rule conflicts with local config, the checked-in config wins.

## Stack

- React `19.2`
- TypeScript `6.0`
- Vite `8` (Rolldown/Oxc)
- Chakra UI `3`
- TanStack Router `1`
- TanStack React Query `5`
- Zustand `5`
- next-themes (color mode)
- @phosphor-icons/react (icons)

## Tooling

- Package manager: Yarn classic (`yarn.lock` v1).
- **Oxlint** for primary linting (`yarn lint`, `yarn lint:fix`)
- **Oxfmt** for formatting (`yarn format`, `yarn format:check`)
- **ESLint** remains available as a secondary compatibility lint (`yarn lint:eslint`)
- **TypeScript strict mode** (`yarn typecheck`)
- There is no test script currently. Do not invent a test command unless you add one to `package.json`.

## Scripts

- `yarn dev` – start dev server
- `yarn build` – typecheck (project refs) + build
- `yarn preview` – preview build
- `yarn lint` – Oxlint
- `yarn lint:fix` – Oxlint with safe fixes
- `yarn lint:eslint` – ESLint compatibility lint
- `yarn typecheck` – `tsc --noEmit`
- `yarn format` – Oxfmt write mode
- `yarn format:check` – Oxfmt check mode

## Engineering Rules

- Reuse existing modules, route patterns, Chakra wrappers, stores, and helpers before adding new abstractions.
- Before adding a generic utility, check whether `std-kit` already provides it and prefer that when it fits: https://github.com/luastoned/std-kit
- Keep modules focused and avoid framework-like abstractions. Extract shared helpers only after the same pattern appears at least three times, unless the local design already establishes the abstraction.
- Prefer named exports for application code. Use default exports only where the framework/tooling expects them.
- Prefer explicit return types for exported functions, hooks, route guards, and cross-module APIs. Local non-exported helpers may rely on inference when obvious.
- Do not introduce `any` or `as any` in application code. Use `unknown` at untrusted boundaries, narrow it, and convert to a typed shape quickly.
- Use `import type` for type-only imports. Let Oxfmt organize import order and grouping.
- Use `node:` specifiers for Node.js built-ins in config or Node-side code.
- Preserve runtime assumptions: ESM (`"type": "module"`), Vite 8 with Rolldown/Oxc, TS bundler module resolution, React 19, and browser-focused app code.

## Current Structure (code-based routing baseline)

- `src/app/auth/*` → auth session, guards, and role permissions
- `src/app/providers/*` → top-level provider composition
- `src/app/router/*` → router context, route tree, and router instance
- `src/app/theme/*` → Chakra theme system
- `src/layouts/*` → route-area layouts (`PublicLayout`, `AppLayout`, `AdminLayout`)
- `src/pages/public/*` → public pages
- `src/pages/app/*` → authenticated app pages
- `src/pages/admin/*` → admin/moderation pages
- `src/shared/ui/*` → reusable presentational UI
- `src/shared/hooks/*` → reusable hooks
- `src/shared/lib/*` → infra helpers (query client, toaster config)
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

- Oxfmt owns formatting, import organization, quote style, semicolons, trailing commas, and line width. Do not hand-enforce rules that tooling already owns unless the edit is semantically required.
- Single quotes in TS/TSX
- Semicolons required
- Trailing commas enabled
- 2-space indentation
- Keep modules focused (avoid mixing unrelated concerns)

## React/Architecture Notes

- Provider composition lives in `src/app/providers/AppProviders.tsx`
- Router is **code-based**:
  - Route context type: `src/app/router/route-context.ts`
  - Route tree: `src/app/router/route-tree.ts`
  - Router instance: `src/app/router/router.ts`
- Route guards are centralized in `src/app/auth/auth-guards.ts`
- Role permissions are centralized in `src/app/auth/permissions.ts`
- Auth session helpers are in `src/app/auth/auth-session.ts`
- Area layouts are split by concern:
  - `RootLayout` for app shell
  - `PublicLayout` for public pages
  - `AppLayout` for authenticated pages
  - `AdminLayout` for admin/moderation pages
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

3. `yarn format:check`
4. `yarn lint:eslint`
5. `yarn build`

## Commit Style

Use Conventional Commits with emoji (existing history style), e.g.:

- `feat: ✨ add ...`
- `fix: 🐛 resolve ...`
- `refactor: ♻️ restructure ...`
- `chore: 🔧 update ...`
