# Features

Group frontend behavior by business capability. A feature owns its components, API calls, query hooks, types, and local helpers as they become necessary.

`auth/components/DemoLoginControls.tsx` contains the existing demo sign-in interaction. Session storage and access policy remain under `app/auth`; the routed screen remains under `pages/public`.

Add real capabilities such as `users` or `billing` when implemented. Keep folders flat until their contents justify subfolders, and import modules directly instead of adding automatic re-export barrels. Do not create empty capability folders for placeholder pages.

See [architecture](../../docs/architecture.md) for dependency boundaries and state ownership.
