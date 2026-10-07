/**
 * Unified parser for umroh.com/tiket raw dumps.
 * OLD format: logo → name → duration → PERGI → time → route → PULANG
 * NEW format: inline [PERGICGK-BOM-JED] + [mulaiRp Xjt]
 */
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '../data/raw');
const OUT_DIR = path.join(__dirname, '../data/live');
const OUT_FILE = path.join(OUT_DIR, 'flights.json');

function parseRp(s) {
  let m = s.match(/Rp[\s\xa0]*([\d,. ]+)\s*(jt|juta)?/);
  if (!m) return 0;
  let numStr = m[1].trim();
  const hasComma = numStr.includes(',');
  const dotCount = (numStr.match(/\./g) || []).length;
  if (hasComma && dotCount === 0) numStr = numStr.replace(',', '.');
  else numStr = numStr.replace(/\./g, '').replace(',', '.');
  const num = parseFloat(numStr);
  if (isNaN(num)) return 0;
  if (m[2] === 'jt' || m[2] === 'juta') return Math.round(num * 1_000_000);
  return Math.round(num);
}

function parseDuration(s) {
  const m = s.match(/(\d+)D[,\s]+(\d+)N/);
  return m ? m[1] + 'D' + m[2] + 'N' : '';
}

function parseOld(lines, i) {
  const airline = ((lines[i + 1] ?? '').trim() || (lines[i + 2] ?? '').trim());
  if (!airline) return null;
  let duration = '', route = '', price = 0;

  // Find PERGI line index
  let pergiIdx = -1;
  for (let j = i + 2; j < Math.min(i + 40, lines.length); j++) {
    if ((lines[j] ?? '').trim() === 'PERGI') { pergiIdx = j; break; }
  }

  if (pergiIdx >= 0) {
    // Scan forward from PERGI for route (e.g. "CGK-DOH-MED") and price
    for (let j = pergiIdx; j < Math.min(pergiIdx + 15, lines.length); j++) {
      const lj = lines[j] ?? '';
      if (!route && /^[A-Z]{3}-[A-Z]{3}/.test(lj.trim())) {
        route = lj.trim().replace('-', '→');
      }
      if (price === 0 && (lj.includes('Mulai dari') || lj.includes('Mulai dariRp'))) {
        price = parseRp(lj);
      }
    }
    // Also get duration from lines before PERGI
    for (let j = i + 2; j < pergiIdx; j++) {
      if (!duration) { const d = parseDuration(lines[j] ?? ''); if (d) duration = d; }
    }
  }

  if (price > 0) return { airline, route: route || '', duration: duration || '', pergi: route, pulang: '', price, status: 'live', source: 'umroh.com' };
  return null;
}

function parseNew(lines, i) {
  const line = lines[i];
  const m = line.match(/!\[\]\([^)]+\)\s*([^0-9\n]+?)\s*(\d+)D[,\s]+(\d+)N/);
  if (!m) return null;
  const airline = m[1].trim(), duration = m[2] + 'D' + m[3] + 'N';
  let origin = '', destination = '', price = 0;
  for (let j = i; j < Math.min(i + 25, lines.length); j++) {
    const lj = lines[j] ?? '';
    if (price === 0 && (lj.includes('Rp') || lj.includes('jt'))) price = parseRp(lj);
    const pm = lj.match(/\[PERGI([A-Z]{3}(?:-[A-Z]{3})+)\]/);
    if (pm) { const a = pm[1].split('-'); origin = a[0]; destination = a[a.length - 1]; }
    const plm = lj.match(/\[PULANG([A-Z]{3}(?:-[A-Z]{3})+)\]/);
    if (plm) { const a = plm[1].split('-'); if (!origin) origin = a[a.length - 1]; if (!destination) destination = a[0]; }
  }
  if (airline && price > 0) {
    const route = origin && destination ? origin + '→' + destination : (origin || destination || '');
    return { airline, route, duration, pergi: route, pulang: '', price, status: 'live', source: 'umroh.com' };
  }
  return null;
}

function parseFile(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  const lines = raw.split('\n');
  const entries = [], seen = new Set();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    const isNew = /!\[\]\([^)]+\)\s*[^0-9\n]+?\s*\d+D/.test(line);
    if (isNew) {
      const e = parseNew(lines, i);
      if (e) { const k = e.airline + '|' + e.price; if (!seen.has(k)) { seen.add(k); entries.push(e); } }
      i += 24; continue;
    }
    if (line.match(/!\[\]\(https:\/\/cloud\.umroh\.com\/images\/upload\/airline_logo\//)) {
      const e = parseOld(lines, i);
      if (e) { const k = e.airline + '|' + e.price; if (!seen.has(k)) { seen.add(k); entries.push(e); } }
      i += 24; continue;
    }
  }
  return entries;
}

const all = {};
for (const file of fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.md'))) {
  const fp = path.join(RAW_DIR, file);
  const entries = parseFile(fp);
  all[file.replace('.md', '')] = entries;
  console.log('✓ ' + file + ': ' + entries.length + ' entries');
}
fs.writeFileSync(OUT_FILE, JSON.stringify(all, null, 2));
console.log('\n✅ Written ' + Object.values(all).flat().length + ' total entries');
