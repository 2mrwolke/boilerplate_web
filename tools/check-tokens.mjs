
// tools/check-tokens.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');
const tokensFile = path.join(root, 'assets/base/tokens.css');

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walk(p));
    else if (p.endsWith('.css')) results.push(p);
  }
  return results;
}

function collectDefinedTokens(css) {
  const tokens = new Set();
  const re = /--([a-zA-Z0-9_-]+)\s*:/g;
  let m;
  while ((m = re.exec(css))) tokens.add(m[1]);
  return tokens;
}

function collectUsedTokens(css) {
  const used = new Set();
  const re = /var\(\s*--([a-zA-Z0-9_-]+)\b/g;
  let m;
  while ((m = re.exec(css))) used.add(m[1]);
  return used;
}

const tokensCss = read(tokensFile);
const defined = collectDefinedTokens(tokensCss);

const cssFiles = walk(path.join(root, 'assets'));
const used = new Set();
for (const f of cssFiles) {
  const css = read(f);
  for (const t of collectUsedTokens(css)) used.add(t);
}

// Ignore common vendor tokens if any
const ignore = new Set([
  // nothing for now
]);

const undefinedTokens = [...used].filter(t => !defined.has(t) && !ignore.has(t));

if (undefinedTokens.length > 0) {
  console.error(`Undefined tokens detected: ${undefinedTokens.sort().join(', ')}`);
  process.exit(1);
} else {
  console.log('All tokens used are defined. ✅');
}
