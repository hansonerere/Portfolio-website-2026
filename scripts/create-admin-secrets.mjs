import fs from 'node:fs';
import { randomBytes, createHash } from 'node:crypto';

const secretsPath = '.migration-private/cloudflare-secrets.json';
fs.mkdirSync('.migration-private', { recursive: true, mode: 0o700 });
if (fs.existsSync(secretsPath)) {
  console.log('Existing admin secrets preserved.');
  process.exit(0);
}
const email = process.argv[2];
if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Pass the administrator email address.');
const password = randomBytes(24).toString('base64url');
const secrets = {
  ADMIN_EMAIL: email.toLowerCase(),
  ADMIN_PASSWORD_HASH: createHash('sha256').update(password).digest('hex'),
  SESSION_SECRET: randomBytes(48).toString('base64url'),
  R2_PUBLIC_BASE_URL: 'https://assets.podstudio.work',
};
fs.writeFileSync(secretsPath, JSON.stringify(secrets), { mode: 0o600 });
fs.writeFileSync('.dev.vars', Object.entries(secrets).map(([key, value]) => `${key}=${value}`).join('\n') + '\n', { mode: 0o600 });
fs.writeFileSync('.migration-private/admin-credentials.txt', `Website: https://podstudio.work/admin\nEmail: ${email}\nPassword: ${password}\n\nKeep this file private. The website stores only a password hash.\n`, { mode: 0o600 });
console.log('Admin credentials and deployment secrets created in the ignored .migration-private directory.');
