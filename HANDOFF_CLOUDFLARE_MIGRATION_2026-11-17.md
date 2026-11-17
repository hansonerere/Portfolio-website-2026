# Handoff: Complete Cloudflare Migration

Date: 2026-11-17

Repository: `hansonerere/Portfolio-website-2026`, branch `main`.

This supersedes the June media-only migration notes. The running application no
longer imports the Supabase SDK or calls Supabase Database, Auth, Storage, or Edge
Functions. The old project was paused after an unpaid invoice. It was not resumed,
deleted, upgraded, or paid during this migration.

## Production Resources

| Resource | Value |
| --- | --- |
| Website | https://podstudio.work |
| Admin | https://podstudio.work/admin |
| Cloudflare account | `e864cf1a4328e631e7739bfd04aad42f` |
| Pages project | `portfolio-website-2026` |
| D1 database | `podstudio-content` |
| D1 ID | `f8eeeaa4-8d29-4b80-85f2-aa3d1c56be67` |
| D1 binding | `DB` |
| R2 bucket | `podstudio-assets` |
| R2 binding | `MEDIA_BUCKET` |
| R2 public domain | https://assets.podstudio.work |

`wrangler.toml` is the binding source of truth. Do not add an account_id setting to
this Pages config; Wrangler Pages rejects it. Select the correct account at login.

## Recovered Content

A downloadable database backup dated 2026-09-30 was recovered from the old
Supabase dashboard without resuming the paused project. The exporter deliberately
selected only these public website tables:

| Table | Rows |
| --- | ---: |
| homepage | 1 |
| service_cards | 6 |
| about_page | 1 |
| about_cards | 4 |
| projects | 10 |
| project_sections | 2 |
| project_gallery | 90 |

The project count includes the legacy Info/About record and a preexisting "New
project" record. These were preserved, not silently deleted. The admin list hides
the legacy Info/About project because biography now has its own editing tab.

The old database biography was outdated. The latest public Notion biography and
all three experience entries were independently checked in the browser and copied
into D1: 6 years' experience; Polyhedra 2022-2026; Findora 2020-2022; Hangzhou
Weicai 2018-2020. Contacts were retained from that public page. The original raw
backup remains unchanged privately. Notion is no longer a runtime dependency.

The initial 115 referenced media URLs were checked successfully. After replacing
the outdated biography, the final audit checked all 114 current media URLs:
367,272,904 bytes total (about 367 MB), with zero failures. All were already in R2
under the custom asset domain. No old
Supabase media URL is needed. This is the referenced media size, not an inventory
of every unused object that might exist elsewhere in the account.

## Admin And Security

The previous Supabase/GitHub login has been replaced by an independent single-
administrator email/password login. Production email: `hansonerere@gmail.com`.

The randomly generated password is ONLY in the ignored local file
`.migration-private/admin-credentials.txt`. It is not in this repository. Transfer
it using a password manager when changing computers. Cloudflare stores its hash,
not a recoverable plaintext password. Do not include this file in screenshots.

Server secrets in Pages Production:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `SESSION_SECRET`
- `R2_PUBLIC_BASE_URL`

Sessions last 8 hours and use an HMAC signature, HttpOnly, SameSite=Strict, and
Secure in production. Mutations require same-origin requests. Login attempts are
rate limited in D1. The account is not based on frontend-only email checks.
CRUD, gallery ordering, publishing, and R2 uploads all verify the session on the
server. SQL uses bound parameters and fixed table/field allowlists.

To rotate credentials, create fresh secrets deliberately, deploy them with
`wrangler pages secret bulk`, and redeploy. A fresh SESSION_SECRET logs out all
existing sessions. Do not overwrite working production credentials just to set up
local development on another computer.

## Runtime And Resilience

- `functions/api/content.js`: published content, cached 60 seconds at the edge.
- `functions/api/admin/*`: protected CRUD, atomic gallery order, explicit publish.
- `functions/api/auth/*`: login/session/logout.
- `functions/api/upload.js`: authenticated R2 upload, max 50 MB per file.
- `functions/_lib/site.js`: shared data and snapshot helpers.
- `migrations/0001_content.sql`: D1 schema, indexes, foreign keys.
- `hooks/useContentData.ts`: shared one-request public content cache.
- `components/AdminAboutEditor.tsx`: native biography/experience/contact editing.

The prior full/half-width gallery and clean drag-and-drop admin changes are
preserved. Gallery reorder uses one validated atomic batch, not stale whole-item
saves. No numeric gallery order input is required.

Saving content invalidates the local edge cache and asynchronously publishes
`content/published.json` into R2. Publication retries rate-limit errors with
backoff, rereading the database on each attempt. A successful content save means
the D1 change succeeded; temporary snapshot publication failures are logged and
do not roll back the content. `/api/admin/publish` can republish explicitly.

If D1 is unavailable, the content API tries the R2 published snapshot. If the API
fails or takes over 4 seconds, the frontend tries its bundled static snapshot.
The bundled snapshot reflects the last code release, not automatically every
future CMS edit. Refresh it from the R2 published snapshot before later releases.
R2 and static fallbacks contain only public content, never authentication tables.
Cache propagation can take up to 60 seconds; refresh the website after CMS edits.

## Local Development On Another Computer

Follow README.md. `npm run setup:local` applies migrations and seeds an empty
local D1 database from the committed public snapshot. It preserves an existing
local database. Use `npm run preview:full` at http://127.0.0.1:8788 for the complete
app. Vite alone has no backend and cannot exercise admin login/uploads.

Private migration artifacts are deliberately NOT synchronized through GitHub:

- Original database backup (contains private auth schemas; never publish it).
- Public-table extraction and original import SQL.
- Migration verification baseline and audit reports.
- Admin plaintext password and deployment secrets.
- Local `.dev.vars` and Wrangler state.

The committed public snapshot is sufficient to bootstrap local content. For a
current production backup use `wrangler d1 export DB --remote --output ...` and
keep the resulting file private, because it also contains login-rate-limit data.

## Verification

Verified locally: all seven tables, authenticated login/session/logout, rejection
of anonymous writes/uploads/forged cookies, create/edit/delete, foreign-key
cascades, full/half gallery layout, atomic drag order/conflict handling, origin
checks, unsafe media URL/table-name rejection, and actual local R2 upload.

Verified in production: all seven tables and content fields, authenticated login,
anonymous write/upload denial, forged cookie denial, Secure session attributes,
actual R2 upload, and publication/readback of the R2 snapshot. Production CRUD
test records were not inserted. A tiny verification PNG exists under
`migration-verification/` and is not attached to any project.

`npm run build` and `git diff --check` passed. Build emits existing Browserslist
and PostCSS advisory warnings; they do not prevent deployment. The public site,
project navigation, and native About content were checked in a real browser.

`npm test` adds five repeatable, credential-free tests for password/session
verification, same-origin enforcement, request-size limits, nested contact
validation, and snapshot retry behavior. `public/_routes.json` restricts Pages
Functions to `/api/*`, leaving static files outside the dynamic-request quota.

Pages serves client-side routes with its built-in SPA fallback. There is no
`public/_redirects` or root `404.html`. Do not rewrite `/admin` to `/index.html`:
Pages canonicalizes the target to `/`, causing a 308 redirect and hiding the
login screen. Migration verification checks that `/admin` and `/admin/login`
both return the app with HTTP 200 and no redirect.

## Free-Tier Boundaries

No paid Workers/D1/Images/Stream plan was enabled during migration. Current
referenced media and content are small enough for the included quotas. This is
not unlimited hosting and is not a guarantee against future R2 charges.

- Workers Free / Pages Functions: 100,000 dynamic requests per day, shared with
  other account workloads. Static assets do not need the content Function.
- D1 Free: 5 million rows read/day, 100,000 rows written/day, 5 GB total storage.
- R2 Standard free allowance: 10 GB-month, 1 million Class A operations/month,
  10 million Class B operations/month; direct Internet egress is free.
- R2 is usage-priced beyond its allowance; it does not imply an automatic hard
  spending cap. Monitor account usage and billing notifications. Other resources
  on this account share quotas. The domain itself still has renewal fees.

Official references checked on 2026-11-17:

- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/d1/platform/pricing/
- https://developers.cloudflare.com/r2/pricing/

## Operational Notes

The old unpaid Supabase invoice is a separate account matter and was not erased
by moving the website. Do not delete the old project until any desired private
records/backups have been preserved. The public website can now operate while
that Supabase project remains paused.

Vercel is no longer the production backend. Deploying only the frontend there
without equivalent API routes will use the public snapshot, not the Cloudflare
admin API. Use the Cloudflare production URL for content management.
