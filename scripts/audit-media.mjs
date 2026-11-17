import fs from 'node:fs';
const snapshot = fs.readFileSync('public/content-snapshot.json', 'utf8');
const urls = [...new Set(snapshot.match(/https:\/\/assets\.podstudio\.work\/[^"\s]+/g) || [])];
let next = 0;
const results = [];
await Promise.all(Array.from({ length: 5 }, async () => {
  while (next < urls.length) {
    const url = urls[next++];
    try {
      const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(20000) });
      results.push({ url, status: response.status, bytes: Number(response.headers.get('content-length') || 0) });
    } catch (error) { results.push({ url, status: 0, error: error.message }); }
  }
}));
const summary = { referencedObjects: urls.length, accessibleObjects: results.filter(row => row.status === 200).length, referencedBytes: results.reduce((sum, row) => sum + (row.bytes || 0), 0), failed: results.filter(row => row.status !== 200) };
fs.mkdirSync('.migration-private', { recursive: true });
fs.writeFileSync('.migration-private/media-audit.json', JSON.stringify({ summary, results }, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (summary.failed.length) process.exitCode = 1;
