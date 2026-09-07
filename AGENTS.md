# Vitra Agent Guidance

Vitra is a TypeScript + React + Vite starter for a pragmatic routed frontend app. Work like a senior TypeScript engineer in an existing codebase: prefer clarity, runtime correctness, maintainability, and consistency with this repository over personal style.

## Scope And Completion

- This repository owns one frontend project; root commands and configs apply throughout. Check for nearer instructions when working in newly added areas.
- Preserve unrelated work. Stage or commit only when authorized, and review changed paths before staging.
- Carry the requested change through relevant verification and fixes. A local change does not by itself authorize a commit, deployment, or release; carry forward authorization already given in the conversation.
- Ask only when a missing decision cannot be discovered or reasonably inferred and would materially affect scope or behavior. Continue independent work while that decision is pending.
- Report changed behavior, checks actually run, and remaining limitations. Update the README when a change affects its documented setup, commands, or architecture.

## Project Shape

- Runtime: browser React app, ESM package mode, built with Vite `8` using Rolldown/Oxc.
- Package manager: Yarn classic, with `yarn.lock` committed.
- UI stack: React `19.2`, Chakra UI `3`, next-themes, and `@phosphor-icons/react`.
- Routing: TanStack Router `1`, with code-based routing under `src/app/router`.
- Data/state: TanStack React Query `5` for server state and Zustand `5` for global UI state.
- App entrypoint: `src/main.tsx` mounts `src/App.tsx`.
- Provider composition lives in `src/app/providers/AppProviders.tsx`.
- Theme setup lives in `src/app/theme`.
- Capability-specific UI, behavior, API calls, queries, and types live in `src/features/<capability>`.
- Auth session, guards, and role permissions live in `src/app/auth`.
- Route-area layouts live in `src/layouts`: `RootLayout`, `PublicLayout`, `AppLayout`, and `AdminLayout`.
- Pages are grouped by access area under `src/pages/public`, `src/pages/app`, and `src/pages/admin`.
- Reusable UI, hooks, infra helpers, and stores live under `src/shared`.
- Global styles live in `src/styles`.
- Use `package.json` and `yarn.lock` for dependency versions; do not infer installed versions from README badges or stack tables.

## Commands

- Install: `yarn`
- Develop with Vite: `yarn dev`
- Build with typecheck: `yarn build`
- Run baseline checks: `yarn check:all`
- Preview built output: `yarn preview`
- Typecheck: `yarn typecheck`
- Lint: `yarn lint`
- Lint with fixes: `yarn lint:fix`
- ESLint compatibility lint: `yarn lint:eslint`
- Format check: `yarn format:check`
- Format write: `yarn format`
- Add Chakra snippets: `yarn snippets`

There is no test script currently. Do not invent a test command unless you add one to `package.json`.

Run the smallest relevant check for the change. For broader edits, run `yarn check:all` when practical. Before committing, run at least `yarn check:all`; `yarn lint:eslint` and `yarn build` are recommended for tooling, dependency, and routing changes.

`yarn typecheck` uses `tsc -b` to check both app and Vite configs through the root project references. Keep build mode: `tsc --noEmit` against the root's empty `files` list does not traverse those references. Do not typecheck individual source files outside their project config.

For guidance-only edits, use `yarn format:check AGENTS.md` and review the diff. Reuse valid check results unless further changes or failures justify rerunning them.

## Runtime And Local Services

- Keep browser code under `src` free of Node-only APIs. `tsconfig.app.json` owns browser compilation; `tsconfig.node.json` owns `vite.config.ts`. Preserve `pm2.config.cjs` as CommonJS within the ESM package.
- `vite.config.ts` defines dev port `5173`, preview port `5174`, and the `/api` proxy to `https://localhost:5170`. The backend is external to this repository; both proxy configurations must stay coherent when changing local API setup.
- `pm2.config.cjs` launches the Vite development command. It is not a production deployment configuration, and `yarn preview` is a local build preview.
- Treat browser-exposed Vite environment values as public; keep credentials out of client code and tracked files.

## Tooling Source Of Truth

- Let `oxfmt` own mechanical formatting and import ordering.
- Let `oxlint` own primary lint rules.
- Keep ESLint available as a secondary compatibility check through `yarn lint:eslint`.
- Do not hand-enforce formatter-owned details such as quote style, semicolons, trailing commas, line width, or import sorting.
- Separate HTML/JSX sibling blocks on separate lines with one blank line, including self-closing elements and conditional or mapped JSX blocks. Oxfmt preserves this spacing but does not insert it; add it when editing markup. Keep inline text and whitespace-sensitive content unchanged, and do not add blank lines between a parent tag and its children solely for this rule.
- Follow the TypeScript project configs for semantics: strict mode, `erasableSyntaxOnly`, `verbatimModuleSyntax`, `moduleResolution: "bundler"`, `moduleDetection: "force"`, `noUncheckedSideEffectImports`, and React JSX transform.
- Use Vite's native `resolve.tsconfigPaths` support for `~/*` path aliases.

## Before Changing Code

Read [docs/architecture.md](docs/architecture.md) when changing ownership or composition, and [src/features/README.md](src/features/README.md) when adding a feature.

Check, in order:

1. Is there already a local pattern, module, or README section for this area?
2. If a utility is needed, does `std-kit` provide suitable semantics? It is the preferred utility layer, but is not currently a dependency; ordinary edits do not require adding it: https://github.com/luastoned/std-kit
3. Can the change be solved simply without adding a new abstraction?
4. Does the change preserve ESM, Vite 8, React 19, Chakra UI, and browser runtime assumptions?

Keep changes small, predictable, and easy to review.

## TypeScript Rules

- Do not introduce `any` or `as any` in application code.
- Prefer `unknown` for untrusted values, then narrow safely.
- Type external boundaries, including API payloads, router context, auth state, persisted state, provider responses, and Vite env access.
- Prefer explicit return types for exported functions, hooks, route guards, and cross-module APIs.
- Allow obvious local non-exported helpers to rely on inference.
- Use `import type` for type-only imports.
- Use `node:` specifiers for Node.js built-ins in config or Node-side code.
- Use the existing `~/*` alias for source imports when appropriate.
- Follow the repository's local import convention; do not add or remove file extensions unless the toolchain requires it.
- Prefer named exports for application code. Use default exports only where a framework or tool requires them.
- Prefer literal unions, discriminated unions, and `as const` objects over `enum`.
- Prefer `satisfies` for typed constants and config objects.
- Avoid non-null assertions unless there is an immediately preceding runtime guarantee.
- Use runtime validation at trust boundaries when static types cannot prove the shape.
- Prefer readonly arrays and object shapes at external boundaries unless mutation is required.
- Prefer `@ts-expect-error` with a short reason over `@ts-ignore` when a suppression is unavoidable.
- Prefer direct module imports; avoid barrels that obscure ownership or introduce cycles.
- Avoid global augmentation unless required by the framework, as with TanStack Router's existing `Register` declaration.

## React And Architecture Rules

- Keep provider composition in `src/app/providers/AppProviders.tsx`.
- Keep route context, route tree, and router instance in `src/app/router`.
- Keep route guards in `src/app/auth/auth-guards.ts` and role permissions in `src/app/auth/permissions.ts`.
- Keep auth session helpers in `src/app/auth/auth-session.ts`.
- Auth currently simulates users and roles in localStorage. Preserve validation when reading stored users; client-side roles and route guards are not server authorization. Real API access must rely on backend-enforced permissions.
- Preserve the live `getAuthUser` router context and auth subscription that invalidates the router on session changes; do not replace them with a captured user snapshot.
- Define new pages in the code-based route tree with the existing named-export lazy loading pattern. Keep access checks in `beforeLoad` via shared guards; hiding navigation alone does not guard a route.
- Keep area shell concerns in layouts, not pages.
- Keep public, authenticated app, and admin/moderation pages in their existing page folders.
- Keep pages focused on screen composition. Put capability-specific interactions and data access in `src/features`; add folders only for implemented capabilities.
- Features may consume shared modules and the session/permission APIs in `app/auth`, but must not import pages, layouts, or the router instance/tree. Keep auth policy independent of features.
- Keep shared modules independent of app, feature, page, and layout modules. Capability-specific code remains in its feature even when several screens use it.
- Keep reusable presentational UI under `src/shared/ui`.
- Keep reusable hooks under `src/shared/hooks`.
- Keep infra helpers such as React Query and toast setup under `src/shared/lib`.
- Keep domain-independent shared UI state in focused Zustand stores under `src/shared/stores`; feature-specific stores belong in their feature. Use component state for local interactions and React Query for server data.
- Keep Chakra wrapper components thin. Business decisions and routing policy belong in app/auth/router modules, not generic UI components.
- Keep color mode split between `src/shared/hooks/use-color-mode.ts` and `src/shared/ui/chakra/ColorMode.tsx`.
- Keep toaster setup split between `src/shared/lib/toast/toaster.ts` and `src/shared/ui/chakra/Toaster.tsx`.

## Naming And Imports

- Use PascalCase for React component files, such as `HomePage.tsx`, `ColorMode.tsx`, and `AppProviders.tsx`.
- Use kebab-case for non-component files, such as `router.ts`, `theme.ts`, `use-color-mode.ts`, `query-client.ts`, and `app-store.ts`.
- Keep folders lowercase and semantic.
- Prefer absolute `~/*` imports over deep relative chains.

## Functions And Abstractions

- Prefer small, single-purpose functions and plain objects.
- Use classes only when they provide a clear boundary for cohesive state, dependencies, behavior, or a custom `Error` type.
- Avoid unnecessary helpers, wrappers, dependencies, and framework-like abstractions.
- Extract shared behavior when stable duplication, ownership, or a public contract justifies it; repetition counts are a heuristic, not a prerequisite.
- Prefer early returns over deep nesting.
- Prefer options objects over positional arguments once a function has 3+ parameters or multiple booleans.
- Do not silently swallow errors. Preserve causes and useful context when wrapping or logging.
- Prefer named `function` declarations for exported or shared module logic, matching existing auth helpers; use arrows for callbacks and short lexical closures.
- Keep resource lifetimes and cancellation explicit when adding subscriptions or I/O. Use the surrounding Query or React lifecycle and pass supported cancellation signals through to requests.

## Commit Style

Follow Conventional Commits with emoji. Explicit repository policy governs; use history as a consistency check.
Use this subject format: `<type>[optional scope][optional !]: <gitmoji> <description>`.

## Default Decision Rule

When unsure, choose the option that is:

- more consistent with the repository
- more explicit at boundaries
- easier to test
- easier to read in six months
- less surprising to the next engineer
- easier for one maintainer to operate and change
