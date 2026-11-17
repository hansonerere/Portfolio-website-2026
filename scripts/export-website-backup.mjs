import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';

const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/export-website-backup.mjs <backup.sql[.gz]>');
const raw = fs.readFileSync(source);
const sql = (raw[0] === 0x1f && raw[1] === 0x8b ? zlib.gunzipSync(raw) : raw).toString('utf8');
const tables = ['homepage', 'service_cards', 'about_page', 'about_cards', 'projects', 'project_sections', 'project_gallery'];
const data = Object.fromEntries(tables.map(table => [table, []]));
const numberFields = new Set(['id', 'homepage_id', 'about_page_id', 'order_index']);
const jsonFields = new Set(['contact_info', 'clients']);
function decode(value) {
  if (value === '\\N') return null;
  return value.replace(/\\([0-7]{1,3}|x[0-9a-fA-F]{1,2}|.)/g, (_, char) => {
    if (/^[0-7]+$/.test(char)) return String.fromCharCode(parseInt(char, 8));
    if (/^x/.test(char)) return String.fromCharCode(parseInt(char.slice(1), 16));
    return ({ b: '\b', f: '\f', n: '\n', r: '\r', t: '\t', v: '\v', '\\': '\\' })[char] ?? char;
  });
}
for (const match of sql.matchAll(/^COPY public\.([a-z_]+) \(([^)]+)\) FROM stdin;\r?\n([\s\S]*?)^\\\.\r?$/gm)) {
  const [, table, columns, body] = match;
  if (!tables.includes(table)) continue;
  const names = columns.split(',').map(value => value.trim());
  for (const line of body.trimEnd().split('\n').filter(Boolean)) {
    const values = line.replace(/\r$/, '').split('\t');
    if (values.length !== names.length) throw new Error(`Malformed ${table} COPY row`);
    const row = Object.fromEntries(names.map((name, index) => {
      let value = decode(values[index]);
      if (value !== null && name === 'is_active') value = value === 't';
      else if (value !== null && numberFields.has(name) && /^-?\d+$/.test(value)) value = Number(value);
      else if (value !== null && jsonFields.has(name)) value = JSON.parse(value);
      return [name, value];
    }));
    data[table].push(row);
  }
}
for (const table of tables) {
  if (!data[table].length) throw new Error(`Backup is missing content from ${table}; refusing an incomplete export`);
  data[table].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0) || (typeof a.id === 'number' ? a.id - b.id : a.id.localeCompare(b.id)));
}
const literal = value => value === null ? 'NULL' : typeof value === 'number' ? String(value) : typeof value === 'boolean' ? String(Number(value)) : `'${(typeof value === 'object' ? JSON.stringify(value) : value).replaceAll("'", "''")}'`;
const statements = [];
for (const table of tables) for (const row of data[table]) {
  const names = Object.keys(row);
  statements.push(`INSERT INTO ${table} (${names.join(', ')}) VALUES (${names.map(name => literal(row[name])).join(', ')});`);
}
fs.mkdirSync('.migration-private', { recursive: true, mode: 0o700 });
fs.writeFileSync('.migration-private/website-import.sql', statements.join('\n') + '\n', { mode: 0o600 });
fs.writeFileSync('.migration-private/website-content.json', JSON.stringify(data, null, 2), { mode: 0o600 });
const projects = data.projects.filter(project => project.is_active);
const ids = new Set(projects.map(project => project.id));
const snapshot = {
  homepage: data.homepage[0], services: data.service_cards,
  aboutPage: data.about_page[0], aboutCards: data.about_cards,
  projects, projectSections: data.project_sections.filter(row => ids.has(row.project_id)),
  projectGallery: data.project_gallery.filter(row => ids.has(row.project_id)),
};
fs.writeFileSync(path.join('public', 'content-snapshot.json'), JSON.stringify(snapshot));
console.log(JSON.stringify({ counts: Object.fromEntries(tables.map(table => [table, data[table].length])), publicProjects: projects.length }, null, 2));
