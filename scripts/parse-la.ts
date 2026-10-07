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

function parseNumber(s: string): number {
  let numStr = s.trim().replace(/\s/g, '');
  if (numStr.includes(',') && numStr.includes('.')) {
    numStr = numStr.replace(/,/g, '');
  } else if (numStr.includes(',')) {
    numStr = numStr.replace(/,/g, '');
  }
  numStr = numStr.replace(/\./g, '').replace(/\s/g, '');
  const num = parseFloat(numStr);
  return isNaN(num) ? 0 : num;
}

function parseRp(s: string): { price: number; priceMax: number | undefined } {
  // Handle range: Rp 11,5–13,7 jt -> price: 11500000, priceMax: 13700000
  const rangeMatch = s.match(/Rp[\s\xA0]*([\d,.]+)\s*(?:–|-|—)\s*([\d,.]+)\s*jt/);
  if (rangeMatch) {
    return {
      price: parseNumber(rangeMatch[1].trim()) * 1000000,
      priceMax: parseNumber(rangeMatch[2].trim()) * 1000000
    };
  }
  // Handle single jt: Rp 7,5 jt
  const jtMatch = s.match(/Rp[\s\xA0]*([\d,.]+)\s*jt/);
  if (jtMatch) {
    return { price: parseNumber(jtMatch[1].trim()) * 1000000, priceMax: undefined };
  }
  // Handle juta: Rp 7,5 juta
  const jt2Match = s.match(/Rp[\s\xA0]*([\d,.]+)\s*juta/);
  if (jt2Match) {
    return { price: parseNumber(jt2Match[1].trim()) * 1000000, priceMax: undefined };
  }
  // Handle plain numbers: Rp 115000000
  const fullMatch = s.match(/Rp[\s\xA0]*([\d,. ]+)/);
  if (fullMatch) {
    return { price: parseNumber(fullMatch[1].trim()), priceMax: undefined };
  }
  return { price: 0, priceMax: undefined };
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
    let price = 0;
    let priceMax: number | undefined;
    for (let j = i + 2; j < Math.min(i + 8, lines.length); j++) {
      const pl = lines[j] ?? '';
      if (pl.match(/Rp[\s\xA0]/)) {
        const rp = parseRp(pl);
        price = rp.price;
        priceMax = rp.priceMax;
        break;
      }
    }

    if (price > 0) {
      const key = `${name}|${price}|${destination}`;
      if (!seen.has(key)) {
        seen.add(key);
        entries.push({ name, detail, price, priceMax, stars, duration, destination, travelAgent, sourceUrl: url, source: 'umroh.com', status: 'live' });
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