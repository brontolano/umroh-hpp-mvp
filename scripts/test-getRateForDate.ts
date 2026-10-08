/**
 * Unit-verification of the date logic used by data/liveHotels.ts:
 *   getRateForDate (which internally uses parseDate + parsePeriod).
 *
 * Run with (Node 26 strips types + JSON modules):
 *   node --experimental-json-modules --experimental-strip-types scripts/test-getRateForDate.ts
 *
 * Note: the project has no TS test runner installed (no tsx/jest), so this
 * verifies the exact date-parsing algorithm used by data/liveHotels.ts
 * through Node's built-in test runner (node:test).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import type { HotelEntry } from '../data/liveHotels';
import { getRateForDate, sarToIdr } from '../data/liveHotels.ts';

const mkHotel = (
  rates: Array<{ period: string; dbl?: number; rate?: string }>,
): HotelEntry => ({
  name: 'Test',
  city: 'Makkah',
  stars: 4,
  category: '4-star',
  rates,
});

// ---- sarToIdr ----
test('sarToIdr: 775 SAR -> 775 * SAR_TO_IDR', () => {
  // SAR_TO_IDR is 4750 after the markup commit; 775 * 4750 = 3,706,250
  assert.equal(sarToIdr(775), 775 * 4750);
});

// ---- parseDate / parsePeriod (covered via getRateForDate) ----
// parseDate / parsePeriod are internal (not exported); covered via getRateForDate.

test('getRateForDate: format1 block (20 Jun 2026 - 15 Sep 2026) matches DBL', () => {
  const hotel = mkHotel([
    { period: '20 Jun 2026 - 15 Sep 2026', dbl: 775 },
    { period: '30 Dec 2026 - 10 Jan 2027', dbl: 900, rate: 'COMING SOON' },
  ]);
  const r = getRateForDate(hotel, '01 Sep 2026');
  assert.ok(r, 'rate block should be found for simDate 01 Sep 2026');
  assert.equal(r.dbl, 775);
});

test('getRateForDate: COMING SOON block is skipped', () => {
  const hotel = mkHotel([
    { period: '30 Dec 2026 - 10 Jan 2027', dbl: 900, rate: 'COMING SOON' },
  ]);
  const r = getRateForDate(hotel, '01 Jan 2027');
  assert.equal(r, null);
});

test('getRateForDate: dates past catalog end return nearest prior block (documented behavior)', () => {
  const hotel = mkHotel([{ period: '16/06/2026 - 15/08/2026', dbl: 680 }]);
  // catalog ends 15 Aug 2026; 01 Jan 2027 is beyond the catalog, so the latest prior block is returned
  const r = getRateForDate(hotel, '01 Jan 2027');
  assert.ok(r, 'should resolve to the nearest prior block');
  assert.equal(r.dbl, 680);
});

test('getRateForDate: format-2 block (16/06/2026 - 15/08/2026) matches DBL', () => {
  const hotel = mkHotel([
    { period: '16/06/2026 - 15/08/2026', dbl: 680 },
    { period: '15 Agt 2026 - 15 Okt 2026', dbl: 690 },
  ]);
  const r = getRateForDate(hotel, '20 Jul 2026');
  assert.ok(r);
  assert.equal(r.dbl, 680);
});

test('getRateForDate: season boundary (no overlap)', () => {
  const hotel = mkHotel([
    { period: '15 Agt 2026 - 14 Okt 2026', dbl: 690 },
    { period: '15 Okt 2026 - 15 Nov 2026', dbl: 700 },
  ]);
  // 15 Okt 2026 is the start of the second block
  const r = getRateForDate(hotel, '15 Okt 2026');
  assert.ok(r, 'rate block found at boundary');
  assert.equal(r.dbl, 700);
});

test('getRateForDate: month-end boundary (30 Sep 2026)', () => {
  const hotel = mkHotel([
    { period: '01 Aug 2026 - 30 Sep 2026', dbl: 680 },
    { period: '01 Oct 2026 - 31 Okt 2026', dbl: 690 },
  ]);
  const r = getRateForDate(hotel, '30 Sep 2026');
  assert.ok(r, 'rate block found at month end');
  assert.equal(r.dbl, 680);
});
