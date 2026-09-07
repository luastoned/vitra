<h1 align="center">
  <br>
  ⚡ Vitra
  <br>
</h1>

<h4 align="center">Pragmatic React + TypeScript starter powered by Vite, Chakra UI, TanStack Router, and Oxc tooling</h4>

<p align="center">
  <a href="./LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License">
  </a>
  <a href="https://vite.dev" target="_blank">
    <img src="https://img.shields.io/badge/Vite-8-646CFF.svg?style=flat-square" alt="Vite 8">
  </a>
  <a href="https://react.dev" target="_blank">
    <img src="https://img.shields.io/badge/React-19-61DAFB.svg?style=flat-square" alt="React 19">
  </a>
  <a href="https://github.com/oxc-project/oxc" target="_blank">
    <img src="https://img.shields.io/badge/Oxc-ready-blueviolet.svg?style=flat-square" alt="Oxc ready">
  </a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-stack">Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-scripts">Scripts</a> •
  <a href="#-project-shape">Project Shape</a> •
  <a href="#-license">License</a>
</p>

<br>

## ✨ Features

- ⚡ **Vite 8 + Rolldown** — Fast dev server and production builds with Vite's modern Oxc/Rolldown pipeline.
- 🧭 **Code-based routing** — TanStack Router setup with explicit route context, route tree, and route guards.
- 🎨 **Chakra UI foundation** — Chakra UI `3`, next-themes color mode, toaster setup, and reusable UI wrappers.
- 🔐 **Auth baseline** — Session helpers, role permissions, and centralized route guards for public, app, and admin areas.
- 📦 **Data layer ready** — React Query client and Zustand store baseline wired through app providers.
- 🧰 **Modern checks** — Oxlint, Oxfmt, TypeScript strict mode, and ESLint compatibility linting.
- 🌱 **Starter-friendly** — Clone-free setup with `degit`, leaving the first real product free to define its own history.

## 🧱 Stack

| Area    | Tooling                                  |
| ------- | ---------------------------------------- |
| UI      | React `19`, Chakra UI `3`, next-themes   |
| Routing | TanStack Router `1`                      |
| Data    | TanStack React Query `5`, Zustand `5`    |
| Build   | Vite `8`, Rolldown/Oxc, TypeScript `7`   |
| Quality | Oxlint, Oxfmt, ESLint compatibility lint |
| Icons   | `@phosphor-icons/react`                  |
| Fonts   | Fontsource variable font packages        |

## 🚀 Quick Start

Create a new project from the starter:

```bash
npx degit luastoned/vitra app-name
cd app-name
git init
yarn
yarn dev
```

The dev server starts with Vite. By default, the app uses:

- dev port `5173`
- preview port `5174`
- `/api` proxy target `https://localhost:5170`

## 🧰 Scripts

| Command             | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `yarn dev`          | Start the Vite dev server.                           |
| `yarn build`        | Typecheck project references and build.              |
| `yarn preview`      | Preview the production build locally.                |
| `yarn check:all`    | Run typecheck, Oxlint, and Oxfmt check.              |
| `yarn typecheck`    | Check app and Vite project references with `tsc -b`. |
| `yarn lint`         | Run Oxlint.                                          |
| `yarn lint:fix`     | Run Oxlint with fixes.                               |
| `yarn lint:eslint`  | Run ESLint compatibility linting.                    |
| `yarn format`       | Format with Oxfmt.                                   |
| `yarn format:check` | Check formatting with Oxfmt.                         |
| `yarn snippets`     | Add Chakra snippets into `src/shared/ui/chakra`.     |

## 📁 Project Shape

```text
src/
  app/
    auth/       auth session, route guards, and role permissions
    providers/  top-level provider composition
    router/     route context, route tree, and router instance
    theme/      Chakra theme system
  features/     capability-specific UI, behavior, queries, and API calls
  layouts/      root, public, app, and admin shells
  pages/
    public/     public routes
    app/        authenticated app routes
    admin/      admin and moderation routes
  shared/
    hooks/      reusable hooks
    lib/        query client, toaster config, infra helpers
    stores/     domain-independent shared UI stores
    ui/         reusable presentational UI
  styles/       global styles
```

Pages compose routed screens; features own capability-specific behavior. The demo login controls are the first feature, while session and access policy remain in `app/auth`. Add other features when their real functionality arrives.

See [architecture](docs/architecture.md) for dependency boundaries and guidance on growing features.

## 🧭 Routing & Auth

Routes are defined in code under `src/app/router`. Route guards live in `src/app/auth/auth-guards.ts`, while role permissions are centralized in `src/app/auth/permissions.ts`.

Authentication is a local demo: the login page selects a role and stores the user in localStorage. When adding a real backend, enforce authorization there; browser roles and route guards only control the frontend. Session changes invalidate the router so guards read the current user.

The layout split keeps route-area concerns explicit:

- `PublicLayout` for marketing/auth pages.
- `AppLayout` for authenticated user pages.
- `AdminLayout` for admin and moderation pages.
- `RootLayout` for app-level shell composition.

## 🧰 Tooling Notes

- Oxfmt owns mechanical formatting and import ordering.
- Oxlint is the primary linter.
- `yarn lint:eslint` retains the secondary React hook and Vite refresh checks. The current `typescript-eslint` dependency rejects TypeScript `7`, so this command is blocked until that dependency compatibility is resolved.
- TypeScript uses strict mode with bundler module resolution.
- Typechecking uses build mode to traverse both project references; the app and Vite configs disable JavaScript emission.
- Vite resolves the `~/*` alias natively through `resolve.tsconfigPaths`.

## 📄 License

[MIT](./LICENSE) License © 2024-PRESENT [LuaStoned](https://github.com/luastoned)
