# Vitra Agent Guidance

Vitra is a TypeScript + React + Vite starter for a pragmatic routed frontend app. Work like a senior TypeScript engineer in an existing codebase: prefer clarity, runtime correctness, maintainability, and consistency with this repository over personal style.

## Project Shape

- Runtime: browser React app, ESM package mode, built with Vite `8` using Rolldown/Oxc.
- Package manager: Yarn classic, with `yarn.lock` committed.
- UI stack: React `19.2`, Chakra UI `3`, next-themes, and `@phosphor-icons/react`.
- Routing: TanStack Router `1`, with code-based routing under `src/app/router`.
- Data/state: TanStack React Query `5` for server state and Zustand `5` for global UI state.
- App entrypoint: `src/main.tsx` mounts `src/App.tsx`.
- Provider composition lives in `src/app/providers/AppProviders.tsx`.
- Theme setup lives in `src/app/theme`.
- Auth session, guards, and role permissions live in `src/app/auth`.
- Route-area layouts live in `src/layouts`: `RootLayout`, `PublicLayout`, `AppLayout`, and `AdminLayout`.
- Pages are grouped by access area under `src/pages/public`, `src/pages/app`, and `src/pages/admin`.
- Reusable UI, hooks, infra helpers, and stores live under `src/shared`.
- Global styles live in `src/styles`.

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

## Tooling Source Of Truth

- Let `oxfmt` own mechanical formatting and import ordering.
- Let `oxlint` own primary lint rules.
- Keep ESLint available as a secondary compatibility check through `yarn lint:eslint`.
- Do not hand-enforce formatter-owned details such as quote style, semicolons, trailing commas, line width, or import sorting.
- Follow the TypeScript project configs for semantics: strict mode, `erasableSyntaxOnly`, `verbatimModuleSyntax`, `moduleResolution: "bundler"`, `moduleDetection: "force"`, `noUncheckedSideEffectImports`, and React JSX transform.
- Use Vite's native `resolve.tsconfigPaths` support for `~/*` path aliases.

## Before Changing Code

Check, in order:

1. Is there already a local pattern, module, or README section for this area?
2. Does `std-kit` already provide a suitable utility? Prefer it before adding a new helper: https://github.com/luastoned/std-kit
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

## React And Architecture Rules

- Keep provider composition in `src/app/providers/AppProviders.tsx`.
- Keep route context, route tree, and router instance in `src/app/router`.
- Keep route guards in `src/app/auth/auth-guards.ts` and role permissions in `src/app/auth/permissions.ts`.
- Keep auth session helpers in `src/app/auth/auth-session.ts`.
- Keep area shell concerns in layouts, not pages.
- Keep public, authenticated app, and admin/moderation pages in their existing page folders.
- Keep reusable presentational UI under `src/shared/ui`.
- Keep reusable hooks under `src/shared/hooks`.
- Keep infra helpers such as React Query and toast setup under `src/shared/lib`.
- Keep global UI state in Zustand stores under `src/shared/stores`.
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
- Do not extract shared helpers until a pattern repeats enough to justify it, unless the local design already establishes the abstraction.
- Prefer early returns over deep nesting.
- Prefer options objects over positional arguments once a function has 3+ parameters or multiple booleans.
- Do not silently swallow errors. Preserve causes and useful context when wrapping or logging.

## Commit Style

Follow Conventional Commits with emoji, matching existing history.
Use this subject format: `<type>[optional scope][optional !]: <gitmoji> <description>`.

## Default Decision Rule

When unsure, choose the option that is:

- more consistent with the repository
- more explicit at boundaries
- easier to test
- easier to read in six months
- less surprising to the next engineer
- easier for one maintainer to operate and change
