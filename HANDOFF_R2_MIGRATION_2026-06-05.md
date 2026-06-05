# Handoff: Cloudflare R2 Media Migration

Date: 2026-06-05

Repository: `hansonerere/Portfolio-website-2026`

Local path used during migration:

```txt
/Users/hanson/Coding/Portfolio website/Portfolio-website-2026
```

## Current State

The website media migration from Supabase Storage to Cloudflare R2 has been completed in production data.

Local commits created:

```txt
558705a feat: migrate media uploads to Cloudflare R2
0ae1c07 docs: add R2 migration handoff notes
c63fb7c chore: simplify R2 migration uploads
7b32459 chore: remove unused AWS SDK lock entries
```

Local GitHub HTTPS credentials were unavailable, so standard `git push` failed and the GitHub connector was used for remote updates.

Current local git state at the time of handoff:

```txt
main is ahead of origin/main locally because connector-created GitHub commits do not preserve local commit SHAs
```

Push error encountered:

```txt
fatal: could not read Username for 'https://github.com': Device not configured
```

## Migration Result

Cloudflare R2 bucket:

```txt
podstudio-assets
```

R2 public base URL:

```txt
https://assets.podstudio.work
```

Migrated:

```txt
115 unique media objects uploaded to R2
117 Supabase database URL references updated
```

Post-migration Supabase verification:

```txt
Supabase Storage URLs: 0
Cloudflare R2 URLs: 117
Other external URLs: 2
```

## Cloudflare State

Cloudflare account used by Wrangler:

```txt
Email: hansonerere@gmail.com
Account ID: e864cf1a4328e631e7739bfd04aad42f
```

Cloudflare Pages project:

```txt
portfolio-website-2026
```

Project domains:

```txt
portfolio-website-2026.pages.dev
podstudio.work
www.podstudio.work
```

R2 custom domain:

```txt
assets.podstudio.work
```

Cloudflare Pages production secrets set:

```txt
VITE_MEDIA_UPLOAD_ENDPOINT=/api/upload
R2_PUBLIC_BASE_URL=https://assets.podstudio.work
VITE_SUPABASE_URL=<set in Cloudflare>
VITE_SUPABASE_ANON_KEY=<set in Cloudflare>
VITE_ADMIN_EMAILS=<set in Cloudflare>
```

R2 binding configured in `wrangler.toml`:

```txt
MEDIA_BUCKET -> podstudio-assets
```

Cloudflare Pages was directly deployed with Wrangler after the code changes:

```bash
npx wrangler pages deploy dist --project-name portfolio-website-2026 --branch main
```

The direct deployment completed successfully and uploaded the Functions bundle.

## Supabase State

Supabase project used:

```txt
skccgzdelwvujfzphfur
```

Project name:

```txt
hansonerere's Project
```

Status during migration:

```txt
ACTIVE_HEALTHY
```

Database URL fields updated:

```txt
homepage.hero_video_url
homepage.hero_video_poster
service_cards.image_url
about_cards.image_url
projects.cover_image
projects.hero_video_url
projects.hero_video_poster
project_gallery.url
```

The generated SQL file `media-migration-updates.sql` was executed through the Supabase connector, then deleted locally. It should not be committed.

## Code Changes In Local Commit

Added:

```txt
CLOUDFLARE_R2_MIGRATION.md
functions/api/upload.js
scripts/migrate-media-to-r2.mjs
wrangler.toml
```

Modified:

```txt
.env.example
components/AdminCMS.tsx
lib/admin.ts
package.json
vite-env.d.ts
```

No new runtime dependency is required for the migration script. It uses Wrangler for R2 uploads.

New npm script:

```bash
npm run migrate:media:r2
```

## Verification Already Performed

Build:

```bash
npm run build
```

Result: passed.

Syntax checks:

```bash
node --check functions/api/upload.js
node --check scripts/migrate-media-to-r2.mjs
```

Result: passed.

Production checks:

```bash
curl -I https://podstudio.work
curl -s -i https://podstudio.work/api/upload
curl -I https://assets.podstudio.work/migrated/portfolio2025/home-page/podstudio-hero.mp4
```

Observed:

```txt
https://podstudio.work -> 200
https://podstudio.work/api/upload -> 405 Method not allowed for GET, expected
R2 hero video -> 200, content-type video/mp4
```

R2 sample image:

```txt
https://assets.podstudio.work/migrated/portfolio2025/home-page/01.jpg
```

Observed:

```txt
200
cache-control: public, max-age=31536000, immutable
```

## Local Preview

Preview server was started with:

```bash
npm run preview -- --host 127.0.0.1
```

Local URL:

```txt
http://127.0.0.1:4173/
```

The preview returned `200 OK`.

## Critical Next Step

The code must exist on GitHub so future Cloudflare Pages automatic deploys do not overwrite the manual Wrangler deployment.

Check GitHub before continuing:

```bash
git fetch origin
git status --short --branch
```

If the remote still does not contain the R2 migration files, push from a machine with valid GitHub credentials:

```bash
cd "/Users/hanson/Coding/Portfolio website/Portfolio-website-2026"
git push origin main
```

If GitHub HTTPS credentials are missing, configure them first:

```bash
git config --global credential.helper osxkeychain
```

Then push again:

```bash
git push origin main
```

If prompted:

```txt
Username: GitHub username
Password: GitHub Personal Access Token, not the GitHub account password
```

Alternative: configure SSH remote and push via SSH.

## Important Risk

Cloudflare Pages has the new code because it was deployed directly with Wrangler. GitHub must also contain the new code for future automatic deploys.

If Cloudflare Pages auto-deploys from old GitHub code, the site may revert to a build without the R2 upload Function and admin upload changes.

The database media URLs are already migrated to R2, so public media delivery should continue to work. The main risk is future admin uploads reverting to Supabase Storage if old GitHub code redeploys.

## Useful Commands For Continuation

Check status:

```bash
git status --short --branch
git log --oneline --decorate --max-count=5
```

Verify Cloudflare login:

```bash
npx wrangler whoami
```

List R2 buckets:

```bash
npx wrangler r2 bucket list
```

List Pages secrets:

```bash
npx wrangler pages secret list --project-name portfolio-website-2026
```

Deploy current local build manually:

```bash
npm run build
npx wrangler pages deploy dist --project-name portfolio-website-2026 --branch main
```

Dry run media migration:

```bash
R2_BUCKET=podstudio-assets R2_PUBLIC_BASE_URL=https://assets.podstudio.work npm run migrate:media:r2
```

Run migration with upload:

```bash
R2_BUCKET=podstudio-assets R2_PUBLIC_BASE_URL=https://assets.podstudio.work npm run migrate:media:r2 -- --write
```

Do not rerun `--write` unless you intentionally want to re-upload/rewrite the migrated media URLs.
