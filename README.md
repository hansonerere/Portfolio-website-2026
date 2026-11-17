# POD Studio Portfolio

Production: https://podstudio.work/

Admin: https://podstudio.work/admin

This repository now runs entirely on Cloudflare. Supabase is not needed for
content, login, uploads, or rendering. The original Supabase SQL and setup guides
are retained only as historical reference. Do not follow their setup instructions.

## Architecture

- Cloudflare Pages: React/Vite frontend and same-origin Pages Functions.
- Cloudflare D1: homepage, services, biography, projects, sections, gallery order.
- Cloudflare R2: images, video, posters, and a published content backup.
- Server-side admin login: one email/password, HMAC-signed HttpOnly session.
- About me: native content from D1, no Notion iframe.
- Public fallback: D1 -> published R2 snapshot -> bundled static snapshot.

See [the migration handoff](HANDOFF_CLOUDFLARE_MIGRATION_2026-11-17.md) for
production IDs, recovery, security, and free-tier caveats.

## Local Development

Use Node.js 22 LTS or newer.

```sh
npm ci
npm run setup:local
node scripts/create-admin-secrets.mjs you@example.com
npm run build
npm run preview:full
```

Open http://127.0.0.1:8788. Full preview includes D1, login, and local R2.
`npm run dev` is frontend-only and uses the bundled public snapshot; it does not
provide an admin API. Local uploads do not create production R2 objects.

The secrets script preserves existing secrets. It writes private, ignored files:
`.dev.vars`, `.migration-private/admin-credentials.txt`, and
`.migration-private/cloudflare-secrets.json`. Do not commit these files.
Generated credentials on a new computer are local-only until explicitly deployed.

## Deploy

```sh
npm run cf -- login --scopes account:read user:read d1:write pages:write
npm run cf -- d1 migrations apply DB --remote
npm run deploy
```

Production resources and secrets are already configured. A normal code deployment
does not require reimporting content or rotating credentials. Do not rerun the
original SQL import against the existing production database.

For a new Pages project, configure the bindings in `wrangler.toml` and upload
server-only secrets using `wrangler pages secret bulk`. Never prefix admin secrets
with `VITE_`. Deploying a newly generated secrets file rotates production login
and invalidates existing sessions.

## Backups And Checks

```sh
npm test

# Check every media URL currently referenced by the bundled snapshot:
npm run audit:media

# Export production D1 before a major change (private output):
npm run cf -- d1 export DB --remote --output .migration-private/d1-backup.sql
```

The original migration verification needs the private baseline and credentials
used during migration. `npm run verify:migration` tests local CRUD/auth/uploads;
`npm run verify:migration -- https://podstudio.work` checks production data/auth
without editing production content. Do not run field-for-field checks against an
old baseline after intentional content changes.

The current public content backup is also available at
https://assets.podstudio.work/content/published.json. It is not an authentication
backup and contains no admin passwords. Update `public/content-snapshot.json`
from this published content before later code releases so the static emergency
fallback stays current.
