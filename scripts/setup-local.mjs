import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { CONTENT_TABLES } from '../functions/_lib/site.js';

const cli = 'node_modules/wrangler/bin/wrangler.js';
const run = args => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
console.log(run(['d1', 'migrations', 'apply', 'DB', '--local']));
const count = JSON.parse(run(['d1', 'execute', 'DB', '--local', '--command', 'SELECT count(*) AS count FROM projects', '--json']))[0].results[0].count;
if (count) {
  console.log(`Preserved ${count} existing local projects.`);
  process.exit(0);
}
const snapshot = JSON.parse(fs.readFileSync('public/content-snapshot.json', 'utf8'));
const source = { homepage: [snapshot.homepage], service_cards: snapshot.services, about_page: [snapshot.aboutPage], about_cards: snapshot.aboutCards, projects: snapshot.projects, project_sections: snapshot.projectSections, project_gallery: snapshot.projectGallery };
const literal = value => value === null || value === undefined ? 'NULL' : typeof value === 'number' ? String(value) : typeof value === 'boolean' ? String(Number(value)) : `'${(typeof value === 'object' ? JSON.stringify(value) : value).replaceAll("'", "''")}'`;
const statements = [];
for (const [table, rows] of Object.entries(source)) for (const row of rows.filter(Boolean)) {
  const keys = ['id', ...CONTENT_TABLES[table], 'created_at', 'updated_at'].filter(key => key in row);
  statements.push(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${keys.map(key => literal(row[key])).join(',')});`);
}
fs.mkdirSync('.migration-private', { recursive: true, mode: 0o700 });
fs.writeFileSync('.migration-private/local-seed.sql', statements.join('\n'), { mode: 0o600 });
run(['d1', 'execute', 'DB', '--local', '--file', '.migration-private/local-seed.sql', '--yes', '--json']);
console.log(`Seeded ${statements.length} published records into the local database.`);
