/**
 * Parser for raw Moli HTML dumps from umroh.com/tiket.
 * Extracts flight entries into structured JSON.
 * Run: node scripts/parse-flights.cjs
 */

const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '../data/raw');
const OUT_DIR = path.join(__dirname, '../data/live');
const OUT_FILE = path.join(OUT_DIR, 'flights.json');

// ── helpers ─────────────────────────────────────────────────────────────────

function parseRp(s) {
  const m = s.match(/Rp[\s\xa0]+([\d.,]+)/);
  if (!m) return 0;
  return parseInt(m[1].replace(/\./g, '').replace(/,/g, ''), 10);
}

// ── parser ───────────────────────────────────────────────────────────────────

function parseFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const entries = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';

    // Airline logo image line — airline name is the next non-empty line
    if (line.includes('airline_logo') && line.includes('.png')) {
      const airline = (lines[i + 1] ?? '').trim().replace(/<\/?[^>]+>/g, '') || 'Unknown';
      // Duration is 2 lines after airline name
      const durationLine = (lines[i + 3] ?? '').trim();
      const durationMatch = durationLine.match(/(\d+[jhm\s]+?\d*[mh])/i);
      const duration = durationMatch ? durationMatch[0] : '';

      // Find pergi (departure time) and route
      let pergi = '';
      let route = '';
      for (let j = i + 4; j < Math.min(i + 20, lines.length); j++) {
        const lj = lines[j] ?? '';
        if (/^\d{2}:\d{2}$/.test(lj.trim())) {
          pergi = lj.trim();
          const routeCandidate = (lines[j + 2] ?? '').trim();
          if (/^[A-Z]{3}-[A-Z]{3}/.test(routeCandidate)) {
            route = routeCandidate;
          }
          break;
        }
      }

      // Find pulang (return time)
      let pulang = '';
      for (let j = i + 4; j < Math.min(i + 30, lines.length); j++) {
        if ((lines[j] ?? '').trim() === 'PULANG') {
          for (let k = j + 1; k < Math.min(j + 10, lines.length); k++) {
            if (/^\d{2}:\d{2}$/.test((lines[k] ?? '').trim())) {
              pulang = (lines[k] ?? '').trim();
              break;
            }
          }
          break;
        }
      }

      // Find price — "Mulai dariRp ..."
      let price = 0;
      for (let j = i; j < Math.min(i + 40, lines.length); j++) {
        if ((lines[j] ?? '').includes('Mulai dari')) {
          price = parseRp(lines[j]);
          break;
        }
      }

      if (price > 0) {
        entries.push({
          airline,
          route: route || (lines[i + 7] ?? '').trim().replace(/<\/?[^>]+>/g, ''),
          duration,
          pergi,
          pulang,
          price,
          status: 'live',
          source: `file://${path.basename(filePath)}`,
        });
      }
    }
  }

  return entries;
}

// ── main ─────────────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs.readdirSync(RAW_DIR).filter((f) => f.endsWith('.md'));
  const all = {};

  for (const file of files) {
    const fp = path.join(RAW_DIR, file);
    const entries = parseFile(fp);
    const key = file.replace('.md', '');
    all[key] = entries;
    console.log(`✓ ${file}: ${entries.length} entries`);
  }

  const total = Object.values(all).flat().length;
  fs.writeFileSync(OUT_FILE, JSON.stringify(all, null, 2));
  console.log(`\n✅ Written ${total} total entries → ${OUT_FILE}`);
}

main();
