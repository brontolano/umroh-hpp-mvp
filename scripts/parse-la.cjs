const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../data/live/la.json');

function parseNumber(s) {
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

function parseRp(s) {
  // Handle range: Rp 11,5–13,7 jt -> price: 11500000, priceMax: 13700000
  const rangeMatch = s.match(/Rp[\s\xa0]*([\d,.]+)\s*(?:–|-|—)\s*([\d,.]+)\s*jt/);
  if (rangeMatch) {
    return {
      price: parseNumber(rangeMatch[1].trim()) * 1000000,
      priceMax: parseNumber(rangeMatch[2].trim()) * 1000000
    };
  }
  // Handle single jt: Rp 7,5 jt
  const jtMatch = s.match(/Rp[\s\xa0]*([\d,.]+)\s*jt/);
  if (jtMatch) {
    return { price: parseNumber(jtMatch[1].trim()) * 1000000, priceMax: undefined };
  }
  // Handle juta: Rp 7,5 juta
  const jt2Match = s.match(/Rp[\s\xa0]*([\d,.]+)\s*juta/);
  if (jt2Match) {
    return { price: parseNumber(jt2Match[1].trim()) * 1000000, priceMax: undefined };
  }
  // Handle plain numbers: Rp 115000000
  const fullMatch = s.match(/Rp[\s\xa0]*([\d,. ]+)/);
  if (fullMatch) {
    return { price: parseNumber(fullMatch[1].trim()), priceMax: undefined };
  }
  return { price: 0, priceMax: undefined };
}

const fp = path.join(__dirname, '../data/raw/umroh-la.md');
const raw = fs.readFileSync(fp, 'utf8');
const lines = raw.split('\n');
const entries = [];
const seen = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i] ?? '';
  const titleMatch = line.match(/^###\s*\[([^\]]+)\]\(([^)]+)\)/);
  if (!titleMatch) continue;

  const name = titleMatch[1].trim();
  const url = 'https://www.umroh.com' + titleMatch[2];
  const detailLine = lines[i + 2] ?? '';
  const detailMatch = detailLine.match(/^\[([^\]]+)\]\(/);
  const detail = detailMatch ? detailMatch[1].trim() : '';

  const starsMatch = detail.match(/(\d+)\s*bintang/);
  const stars = starsMatch ? '★'.repeat(parseInt(starsMatch[1])) : '';
  const durMatch = detail.match(/(\d+)D(\d+)N/);
  const duration = durMatch ? durMatch[1] + 'D' + durMatch[2] + 'N' : '';
  const destMatch = detail.match(/pax\s+([^,]+)/);
  const destination = destMatch ? destMatch[1].trim() : '';
  const pathPart = titleMatch[2].split('/')[1] || '';
  const travelAgent = pathPart.replace(/-/g, ' ').replace(/la$/i, '').trim() || 'umroh.com';

  let price = 0, priceMax = 0;
  for (let j = i + 4; j < Math.min(i + 12, lines.length); j++) {
    const pl = lines[j] ?? '';
    if (pl.match(/Rp[\s\xa0]/)) {
      const rp = parseRp(pl);
      price = rp.price;
      priceMax = rp.priceMax || price;
      break;
    }
  }

  if (price > 0) {
    const key = name + '|' + price + '|' + destination;
    if (!seen.has(key)) {
      seen.add(key);
      entries.push({
        name, detail, price,
        priceMax: priceMax || undefined,
        stars, duration, destination,
        travelAgent,
        sourceUrl: url,
        source: 'umroh.com',
        status: 'live'
      });
    }
  }
}

fs.writeFileSync(OUT, JSON.stringify(entries, null, 2));
console.log('\u2705 ' + entries.length + ' LA entries');
entries.forEach(e => {
  console.log('  ' + e.name + ' | Rp ' + e.price.toLocaleString('id') +
    (e.priceMax ? ' - ' + e.priceMax.toLocaleString('id') : '') +
    ' | ' + e.destination + ' | ' + e.duration + ' | ' + e.stars + ' | ' + e.sourceUrl);
});
