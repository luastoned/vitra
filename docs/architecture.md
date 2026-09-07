# Architecture

Vitra is a routed frontend organized by application wiring, business features, route composition, and reusable support.

## Ownership

| Area                         | Owns                                                                        |
| ---------------------------- | --------------------------------------------------------------------------- |
| `src/app/`                   | Providers, router composition, session and access policy, theme setup       |
| `src/features/<capability>/` | Capability-specific components, behavior, API calls, query hooks, and types |
| `src/layouts/`               | Route-area shells, navigation, and responsive layout                        |
| `src/pages/`                 | Routed screens that compose features and shared UI                          |
| `src/shared/`                | Domain-independent components, hooks, infrastructure, and shared UI state   |
| `src/styles/`                | Global CSS; Chakra tokens remain in `app/theme`                             |

`main.tsx` mounts `App.tsx`, which composes the providers and router. Pages remain grouped by access area (`public`, `app`, `admin`); features are grouped by capability, regardless of which area displays them.

## Dependencies

- Application composition wires routes, layouts, pages, and shared providers.
- Pages and layouts may compose features and shared UI. Features must not import pages or layouts.
- Features may use shared modules, React, Chakra, and React Query. They may consume the session helpers and permissions in `app/auth`; keep those modules independent of features and pages.
- Use router hooks and typed links for navigation. Keep the router instance, route tree, and access guards in `app/router` and `app/auth`; features must not import the router instance or route tree.
- Keep shared modules independent of `app`, `features`, `pages`, and `layouts`. A helper used across several pages still belongs to a feature if its meaning is specific to that capability.
- Compose independent features in a page. If one feature must consume another, use a small, intentional interface and avoid cycles or imports into implementation details. Extract cross-feature orchestration only when an actual workflow needs it.

These are ownership conventions, not automated import restrictions. Use direct imports and review dependency direction when adding modules.

## Growing a feature

The existing `features/auth/components/DemoLoginControls.tsx` owns the demo role-selection interaction. `pages/public/LoginPage.tsx` owns its screen heading and composition. Session persistence and role enforcement stay in `app/auth`.

For a real capability such as user management, add only the files its implementation needs:

```text
features/users/
  api.ts                  # Typed API calls and response validation
  queries.ts              # Query keys, query hooks, and mutations
  types.ts                # Feature contracts
  components/
    UsersTable.tsx
```

Keep pure calculations and validation near their feature. UI components may depend on those functions; pure business functions should not depend on React or Chakra. Feature folders are frontend modules and need not mirror backend domain internals, although corresponding capabilities should use consistent names.

Do not pre-create service, repository, workflow, or adapter layers. Add a shared HTTP client under `shared/lib` when real API calls establish a common transport need; endpoint-specific behavior stays in the owning feature.

## State and styling

- Use React Query for server data, with feature-owned query keys and invalidation.
- Use component state for local interactions and focused Zustand stores when state must be shared. Feature-specific stores stay in their feature; `shared/stores` is for domain-independent UI state. Session state stays in `app/auth`.
- Keep feature styles with the feature or use Chakra props. Reserve `styles` for global CSS and `app/theme` for theme configuration.

Auth is currently a localStorage demo. A real backend must enforce permissions; frontend access guards do not provide server authorization.
