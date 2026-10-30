// Run from any directory: node C:/dev/Grippy-ai/docs/check-data.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const prices = read('data/prices.json');
assert.deepEqual(Object.keys(prices).sort(), ['key_turner', 'pen_grip', 'utensil_handle']);
for (const entry of Object.values(prices)) {
  assert.deepEqual(Object.keys(entry).sort(), ['retailUSD', 'source_url']);
  assert(Number.isFinite(entry.retailUSD) && entry.retailUSD > 0);
  assert.equal(new URL(entry.source_url).protocol, 'https:');
}
const stats = read('data/stats.json');
assert(Array.isArray(stats) && stats.length >= 4 && stats.length <= 6);
assert.equal(new Set(stats.map((entry) => entry.claim)).size, stats.length);
for (const entry of stats) {
  assert.deepEqual(Object.keys(entry).sort(), ['claim', 'number', 'source_url']);
  for (const value of Object.values(entry)) assert(typeof value === 'string' && value.trim());
  assert.equal(new URL(entry.source_url).protocol, 'https:');
}
assert.equal(Math.round(2710 / 4) / 100, prices.utensil_handle.retailUSD);
assert.equal(25 * (20 / 1000), 0.5);
for (const file of fs.readdirSync(__dirname).filter((name) => name.endsWith('.md'))) {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^https?:/.test(match[1]) || match[1].startsWith('#')) continue;
    assert(fs.existsSync(path.resolve(__dirname, match[1].split('#')[0])), `${file}: ${match[1]}`);
  }
}
console.log(`PASS: exact JSON contracts, ${stats.length} unique claims, price types, HTTPS URL syntax, cost arithmetic, local links`);
console.log('External source accuracy and live URL availability require the separate source audit.');
