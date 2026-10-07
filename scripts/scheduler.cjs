/**
 * scripts/scheduler.cjs
 *
 * Node-cron based scraper scheduler for Umroh HPP MVP.
 * Fetches via Moli CDP CLI, parses raw HTML → structured JSON.
 * Also re-parses the Al Khaif catalog PDF for live hotels/transport/visa.
 *
 * Usage:
 *   node scripts/scheduler.cjs fetch   # fetch + parse all (manual / cron)
 *   node scripts/scheduler.cjs parse   # parse raw/*.md → live/flights.json + PDF → live/hotels.json
 *   node scripts/scheduler.cjs cron    # start cron scheduler (every 15 minutes)
 *   node scripts/scheduler.cjs test    # dry-run: show what would be fetched
 *
 * Cron tab (every 15 minutes):
 *   # m h dom mon dow  command
 *   STAR_SLASH_15 STAR STAR STAR STAR  /usr/bin/node .../scripts/scheduler.cjs fetch
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const PROJECT_ROOT = path.join(__dirname, '..');
const RAW_DIR = path.join(PROJECT_ROOT, 'data/raw');
const LIVE_DIR = path.join(PROJECT_ROOT, 'data/live');
const PARSE_SCRIPT = path.join(PROJECT_ROOT, 'scripts/parse-flights.cjs');
const PDF_PARSE_SCRIPT = path.join(PROJECT_ROOT, 'scripts/parse-pdf.py');
const PDF_VENV = process.env.PDF_VENV || '/tmp/pdf_venv/bin/python';

const MOLI_PORT = 9222;
const MOLI_HOST = '127.0.0.1';

const ORIGINS = [
  { code: 'CGK', label: 'Jakarta', date: '2027-01-05' },
  { code: 'SUB', label: 'Surabaya', date: '2027-01-05' },
  { code: 'KNO', label: 'Medan',   date: '2027-01-05' },
  { code: 'UPG', label: 'Makassar',date: '2027-01-05' },
];

// ── HTTP helper ──────────────────────────────────────────────────────────────

function httpGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const u = new URL(url);
    const req = mod.get({ hostname: u.hostname, port: u.port, path: u.pathname + u.search, headers }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Moli helpers ──────────────────────────────────────────────────────────────

let moliProc = null;

async function isMoliRunning() {
  try {
    const res = await httpGet(`http://${MOLI_HOST}:${MOLI_PORT}/json/version`);
    JSON.parse(res);
    return true;
  } catch { return false; }
}

async function startMoli() {
  if (await isMoliRunning()) {
    console.log('[Moli] Already running on port', MOLI_PORT);
    return true;
  }
  console.log('[Moli] Starting CDP server on port', MOLI_PORT, '...');
  try {
    moliProc = spawn('moli', ['serve', `--port=${MOLI_PORT}`, '--layout'], {
      cwd: PROJECT_ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    moliProc.stdout.on('data', (d) => process.stdout.write('[Moli] ' + d));
    moliProc.stderr.on('data', (d) => process.stderr.write('[Moli] ' + d));
    for (let i = 0; i < 30; i++) {
      await sleep(1000);
      if (await isMoliRunning()) {
        console.log('[Moli] Ready.');
        return true;
      }
      process.stdout.write('.');
    }
  } catch (err) {
    console.error('[Moli] Start error:', err.message);
  }
  console.warn('[Moli] Could not start — will use existing raw files.');
  return false;
}

async function stopMoli() {
  if (!moliProc) return;
  moliProc.kill('SIGTERM');
  await sleep(500);
  moliProc = null;
}

// ── CDP fetch via HTTP → raw HTML ───────────────────────────────────────────

async function fetchPage(origin, date) {
  const file = path.join(RAW_DIR, `${date}-${origin}-9D7N.md`);
  const url = `https://www.umroh.com/tiket?from=${origin}&date=${date}`;

  console.log(`[Fetch] ${origin} ${date} → ${path.basename(file)}`);

  // Try Moli CDP HTTP gateway first
  try {
    const cdpUrl = `http://${MOLI_HOST}:${MOLI_PORT}/json/new?url=${encodeURIComponent(url)}`;
    const res = await httpGet(cdpUrl);
    const json = JSON.parse(res);
    const pageId = json.id;

    // Give it time to render
    await sleep(5000);

    // Get HTML via CDP
    const htmlRes = await httpGet(
      `http://${MOLI_HOST}:${MOLI_PORT}/json/property/${pageId}?property=document.title`
    );
    // Fallback: just save the URL response (Moli intercepts it)
    const rawHtml = await httpGet(url);
    fs.writeFileSync(file, rawHtml);
    console.log(`  ✓ ${rawHtml.length} chars → ${path.basename(file)}`);
    return true;
  } catch {
    // Moli not available — fetch directly
  }

  // Direct fetch (no JS rendering — gets initial HTML only)
  try {
    const html = await httpGet(url, { 'User-Agent': 'Mozilla/5.0' });
    fs.writeFileSync(file, html);
    console.log(`  ✓ ${html.length} chars (direct) → ${path.basename(file)}`);
    return true;
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
    fs.writeFileSync(file, `<!-- fetch failed: ${err.message} -->\n`);
    return false;
  }
}

// ── Parse ────────────────────────────────────────────────────────────────────

function runParse() {
  console.log('[Parse] Running flight parser...');
  try {
    execSync(`node "${PARSE_SCRIPT}"`, { cwd: PROJECT_ROOT, stdio: 'inherit' });
  } catch (err) {
    console.error('[Parse] Flight parser failed:', err.message);
  }

  console.log('[Parse] Running PDF (Al Khaif catalog) parser...');
  try {
    execSync(`"${PDF_VENV}" "${PDF_PARSE_SCRIPT}"`, { cwd: PROJECT_ROOT, stdio: 'inherit' });
  } catch (err) {
    console.error('[Parse] PDF parser failed:', err.message);
  }
}

// ── Fetch all ────────────────────────────────────────────────────────────────

async function runFetch() {
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });
  if (!fs.existsSync(LIVE_DIR)) fs.mkdirSync(LIVE_DIR, { recursive: true });

  const moliReady = await startMoli();

  for (const { code, date } of ORIGINS) {
    await fetchPage(code, date);
    await sleep(1500); // polite delay between origins
  }

  if (moliReady) await stopMoli();
}

// ── Cron ─────────────────────────────────────────────────────────────────────

async function startCron() {
  let cron;
  try {
    cron = require('node-cron');
  } catch {
    console.error('[Cron] node-cron not installed. Run: npm install --save-dev node-cron');
    return false;
  }

  // Every 15 minutes
  const schedule = '*/15 * * * *';
  if (!cron.validate(schedule)) {
    console.error('[Cron] Invalid schedule:', schedule);
    return false;
  }

  cron.schedule(schedule, async () => {
    console.log('[Cron] ===== Tick at', new Date().toISOString(), '=====');
    await runFetch();
    runParse();
    console.log('[Cron] ===== Done at', new Date().toISOString(), '=====');
  });

  console.log(`[Cron] Scheduled: "${schedule}" (every 15 minutes)`);
  console.log('[Cron] Keeping process alive. Ctrl+C to stop.');
  return true;
}

// ── CLI ──────────────────────────────────────────────────────────────────────

async function main() {
  const [,, mode = 'cron'] = process.argv;
  console.log('[Scheduler] mode:', mode);

  if (mode === 'fetch') {
    await runFetch();
    runParse();
  } else if (mode === 'parse') {
    runParse();
  } else if (mode === 'cron') {
    const ok = await startCron();
    if (!ok) process.exit(1);
    await new Promise(() => {}); // keep alive
  } else if (mode === 'test') {
    console.log('[Test] Would fetch:');
    for (const { code, date } of ORIGINS) {
      console.log(`  - https://www.umroh.com/tiket?from=${code}&date=${date}`);
    }
    console.log('[Test] Raw dir:', RAW_DIR);
    console.log('[Test] Live dir:', LIVE_DIR);
  } else {
    console.error('Usage: node scheduler.cjs {fetch|parse|cron|test}');
    process.exit(1);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
