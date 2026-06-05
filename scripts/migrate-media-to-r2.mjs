import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

loadEnvFile(path.join(repoRoot, '.env.local'));
loadEnvFile(path.join(repoRoot, '.env'));

const args = new Set(process.argv.slice(2));
const write = args.has('--write');
const migrateAllHttpUrls = args.has('--all');
const sqlOutputPath = path.join(repoRoot, 'media-migration-updates.sql');

const uploadDriver = process.env.R2_UPLOAD_DRIVER || (
  process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.CLOUDFLARE_ACCOUNT_ID
    ? 's3'
    : 'wrangler'
);

const requiredEnv = ['VITE_SUPABASE_URL', 'R2_BUCKET', 'R2_PUBLIC_BASE_URL'];
if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.VITE_SUPABASE_ANON_KEY) {
  requiredEnv.push('SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY');
}
if (uploadDriver === 's3') {
  requiredEnv.push('CLOUDFLARE_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY');
}

const missing = requiredEnv.filter((key) => {
  if (key.includes(' or ')) {
    return !key.split(' or ').some((candidate) => process.env[candidate]);
  }
  return !process.env[key];
});
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

const r2 = uploadDriver === 's3'
  ? new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    })
  : null;

const mediaColumns = [
  { table: 'homepage', idColumn: 'id', columns: ['hero_video_url', 'hero_video_poster'] },
  { table: 'service_cards', idColumn: 'id', columns: ['image_url'] },
  { table: 'about_cards', idColumn: 'id', columns: ['image_url'] },
  { table: 'projects', idColumn: 'id', columns: ['cover_image', 'hero_video_url', 'hero_video_poster'] },
  { table: 'project_gallery', idColumn: 'id', columns: ['url'] },
];

const seen = new Map();
const updates = [];
let scanned = 0;
let skipped = 0;
let migrated = 0;

console.log(write ? 'Running R2 media migration.' : 'Running dry run. Add --write to upload and update Supabase.');
console.log(migrateAllHttpUrls ? 'Mode: all HTTP URLs.' : 'Mode: Supabase Storage URLs only.');
console.log(`Upload driver: ${uploadDriver}`);

for (const config of mediaColumns) {
  const selectColumns = [config.idColumn, ...config.columns].join(',');
  const { data, error } = await supabase.from(config.table).select(selectColumns);

  if (error) {
    throw new Error(`Failed to read ${config.table}: ${error.message}`);
  }

  for (const row of data || []) {
    for (const column of config.columns) {
      const url = row[column];
      scanned += 1;

      if (!shouldMigrateUrl(url)) {
        skipped += 1;
        continue;
      }

      const existing = seen.get(url);
      const nextUrl = existing || (await migrateUrl(url));
      seen.set(url, nextUrl);

      updates.push({
        table: config.table,
        idColumn: config.idColumn,
        id: row[config.idColumn],
        column,
        from: url,
        to: nextUrl,
      });
    }
  }
}

if (write && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  for (const update of updates) {
    const { error } = await supabase
      .from(update.table)
      .update({ [update.column]: update.to })
      .eq(update.idColumn, update.id);

    if (error) {
      throw new Error(`Failed to update ${update.table}.${update.column} (${update.id}): ${error.message}`);
    }
  }
  removeFileIfExists(sqlOutputPath);
} else if (write && updates.length > 0) {
  fs.writeFileSync(sqlOutputPath, buildUpdateSql(updates));
  console.log(`Wrote SQL update file: ${sqlOutputPath}`);
} else {
  removeFileIfExists(sqlOutputPath);
}

console.log(`Scanned fields: ${scanned}`);
console.log(`Skipped fields: ${skipped}`);
console.log(`Unique media uploaded: ${migrated}`);
console.log(`Database updates ${write ? 'written' : 'planned'}: ${updates.length}`);
if (write && !process.env.SUPABASE_SERVICE_ROLE_KEY && updates.length > 0) {
  console.log('Database updates were not applied locally because SUPABASE_SERVICE_ROLE_KEY is missing.');
}

if (!write && updates.length > 0) {
  console.log('Preview:');
  for (const update of updates.slice(0, 12)) {
    console.log(`- ${update.table}.${update.column} ${update.id}: ${update.from} -> ${update.to}`);
  }
  if (updates.length > 12) {
    console.log(`...and ${updates.length - 12} more`);
  }
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const index = trimmed.indexOf('=');
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function shouldMigrateUrl(value) {
  if (!value || typeof value !== 'string') return false;

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) return false;
  if (isR2Url(parsed)) return false;
  if (migrateAllHttpUrls) return true;

  return parsed.hostname.endsWith('.supabase.co') && parsed.pathname.includes('/storage/v1/object/');
}

function isR2Url(parsed) {
  const publicBase = new URL(process.env.R2_PUBLIC_BASE_URL);
  return parsed.hostname === publicBase.hostname;
}

async function migrateUrl(url) {
  const key = objectKeyForUrl(url);
  const newUrl = publicUrlForKey(key);

  if (!write) {
    migrated += 1;
    return newUrl;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || contentTypeFromPath(key);
  const body = Buffer.from(await response.arrayBuffer());

  if (uploadDriver === 's3') {
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
  } else {
    uploadWithWrangler(key, body, contentType);
  }

  migrated += 1;
  console.log(`Uploaded ${key}`);
  return newUrl;
}

function uploadWithWrangler(key, body, contentType) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'r2-media-'));
  const tmpFile = path.join(tmpDir, path.basename(key) || 'asset');

  try {
    fs.writeFileSync(tmpFile, body);
    execFileSync(
      'npx',
      [
        'wrangler',
        'r2',
        'object',
        'put',
        `${process.env.R2_BUCKET}/${key}`,
        '--file',
        tmpFile,
        '--content-type',
        contentType,
        '--cache-control',
        'public, max-age=31536000, immutable',
        '--remote',
      ],
      { stdio: 'inherit' },
    );
  } finally {
    removeFileIfExists(tmpFile);
    try {
      fs.rmdirSync(tmpDir);
    } catch {
      // Ignore cleanup failures.
    }
  }
}

function buildUpdateSql(items) {
  const lines = [
    'begin;',
    '',
  ];

  for (const update of items) {
    lines.push(
      `update ${quoteIdentifier(update.table)} set ${quoteIdentifier(update.column)} = ${sqlLiteral(update.to)} where ${quoteIdentifier(update.idColumn)} = ${sqlLiteral(update.id)};`,
    );
  }

  lines.push('', 'commit;', '');
  return lines.join('\n');
}

function quoteIdentifier(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function sqlLiteral(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function removeFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function objectKeyForUrl(url) {
  const parsed = new URL(url);
  const storageMatch = parsed.pathname.match(/\/storage\/v1\/object\/(?:public|sign)\/([^/]+)\/(.+)$/);

  if (storageMatch) {
    const bucket = decodeURIComponent(storageMatch[1]);
    const key = decodeURIComponent(storageMatch[2]);
    return normalizeKey(`migrated/${bucket}/${key}`);
  }

  const fallbackName = path.basename(decodeURIComponent(parsed.pathname)) || 'asset';
  return normalizeKey(`migrated/external/${parsed.hostname}/${Date.now()}-${fallbackName}`);
}

function normalizeKey(value) {
  return value
    .replace(/[\\]+/g, '/')
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/{2,}/g, '/')
    .replace(/[^a-zA-Z0-9/._-]/g, '-');
}

function publicUrlForKey(key) {
  const base = process.env.R2_PUBLIC_BASE_URL.replace(/\/+$/g, '');
  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  return `${base}/${encodedKey}`;
}

function contentTypeFromPath(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  const contentTypes = {
    '.avif': 'image/avif',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.mp4': 'video/mp4',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webm': 'video/webm',
    '.webp': 'image/webp',
  };

  return contentTypes[extension] || 'application/octet-stream';
}
