# Cloudflare R2 Media Migration

This project can migrate existing Supabase Storage media URLs to Cloudflare R2 and use R2 for future admin uploads.

## Cloudflare Pages Settings

Add these production environment variables:

```env
VITE_MEDIA_UPLOAD_ENDPOINT=/api/upload
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAILS=you@example.com
R2_PUBLIC_BASE_URL=https://media.example.com
```

Add an R2 bucket binding:

```txt
Variable name: MEDIA_BUCKET
Bucket: podstudio-media
```

`R2_PUBLIC_BASE_URL` should be the public custom domain attached to the same R2 bucket.

## Local Migration Env

Add these values to `.env.local` before running the migration:

```env
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
R2_BUCKET=podstudio-media
R2_PUBLIC_BASE_URL=https://media.example.com
```

The migration script uploads through Wrangler. Run `npx wrangler login` first on the machine doing the migration.

## Commands

Dry run:

```bash
npm run migrate:media:r2
```

Upload to R2 and update Supabase database URLs:

```bash
npm run migrate:media:r2 -- --write
```

By default, the script migrates only Supabase Storage URLs. To migrate every HTTP media URL in the configured media fields:

```bash
npm run migrate:media:r2 -- --write --all
```

## Fields Migrated

- `homepage.hero_video_url`
- `homepage.hero_video_poster`
- `service_cards.image_url`
- `about_cards.image_url`
- `projects.cover_image`
- `projects.hero_video_url`
- `projects.hero_video_poster`
- `project_gallery.url`
