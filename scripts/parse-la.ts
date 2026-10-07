/**
 * Parser for umroh-la.md — Land Arrangement packages.
 * Format: ### [Name](/path) + detail line + [Rp X–X jt](/path)
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT = path.join(__dirname, '../data/live/la.json');

function parseRp(s: string): number {
  const m = s.match(/Rp[\s\xa0]*([\d,. ]+)\s*(jt|juta)?/);
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

interface LAEntry {
  name: string;
  detail: string;
  price: number;
  priceMax?: number;
  stars: string;
  duration: string;
  destination: string;
  travelAgent: string;
  sourceUrl: string;
  source: string;
  status: 'live';
}

function parseLa(fp: string): LAEntry[] {
  const raw = fs.readFileSync(fp, 'utf8');
  const lines = raw.split('\n');
  const entries: LAEntry[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';

    // ### [Land Arrangement 9D7N Morocco](/labas-tour/la/...)
    const titleMatch = line.match(/^###\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (!titleMatch) continue;
    const name = titleMatch[1].trim();
    const url = 'https://www.umroh.com' + titleMatch[2];

    // Detail line: "[Mei 2025 - Des 2026 9D7N 3 bintang Min 10 pax Makkah, +1 kota](/path)"
    const detailLine = lines[i + 1] ?? '';

    const detailMatch = detailLine.match(/^\[([^\]]+)\]\(/);
    const detail = detailMatch ? detailMatch[1].trim() : '';

    // Extract stars, duration, destination
    const starsMatch = detail.match(/(\d+)\s*bintang/);
    const stars = starsMatch ? '★'.repeat(parseInt(starsMatch[1])) : '';
    const durMatch = detail.match(/(\d+)D(\d+)N/);
    const duration = durMatch ? `${durMatch[1]}D${durMatch[2]}N` : '';
    const destMatch = detail.match(/pax\s+([^,]+)/);
    const destination = destMatch ? destMatch[1].trim() : '';

    // Travel agent is usually the folder path: /labas-tour/ or /umroh-com/
    const pathPart = titleMatch[2].split('/')[1] ?? '';
    const travelAgent = pathPart.replace(/-/g, ' ').replace(/la$/i, '').trim() || 'umroh.com';

    // Price line: "[Rp 7,5–13,7 jt](/path)"
    let price = 0, priceMax = 0;
    for (let j = i + 2; j < Math.min(i + 8, lines.length); j++) {
      const pl = lines[j] ?? '';
      if (pl.match(/Rp[\s\xa0]/)) {
        const nums = pl.match(/Rp[\s\xa0]*([\d,. ]+)/g) || [];
        if (nums.length >= 1) {
          const p1 = parseRp(nums[0] as string);
          if (p1 > 0) { price = p1; }
        }
        if (nums.length >= 2) {
          const p2 = parseRp(nums[1] as string);
          if (p2 > 0) { priceMax = p2; }
        }
        // Handle "X–Y jt" pattern in one string
        const rangeMatch = pl.match(/Rp[\s\xa0]*([\d,]+)–([\d,]+)\s*jt/);
        if (rangeMatch) {
          price = parseRp('Rp ' + rangeMatch[1].replace(',','.') + ' jt');
          priceMax = parseRp('Rp ' + rangeMatch[2].replace(',','.') + ' jt');
        }
        break;
      }
    }

    if (price > 0) {
      const key = `${name}|${price}|${destination}`;
      if (!seen.has(key)) {
        seen.add(key);
        entries.push({ name, detail, price, priceMax: priceMax || undefined, stars, duration, destination, travelAgent, sourceUrl: url, source: 'umroh.com', status: 'live' });
      }
    }
  }

  return entries;
}

const fp = path.join(__dirname, '../data/raw/umroh-la.md');
const entries = parseLa(fp);
fs.writeFileSync(OUT, JSON.stringify(entries, null, 2));
console.log(`✅ ${entries.length} LA entries → ${OUT}`);
entries.forEach(e => console.log(`  ${e.name} | ${e.price} | ${e.destination} | ${e.duration} | ${e.sourceUrl}`));
