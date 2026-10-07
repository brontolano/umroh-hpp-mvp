// Live hotel, transport, visa, and services data parsed from the
// Al Khaif Group catalog PDF.
//
// Source: /opt/data/attachments/KATALOG AL KHAIF GRUP (One Stop Haramain Service) - Full Screen.pdf
// Parser: scripts/parse-pdf.py
// Generated artifact: data/live/hotels.json
//
// This module is the typed accessor used by the app — same role as live.ts does
// for flights, and live.ts would do for LA. Currency: SAR (default), USD/IDR
// where noted. Convert to IDR by multiplying SAR by 4300.

import rawHotels from './live/hotels.json';

export interface HotelRate {
  period: string;
  dbl?: number;
  trpl?: number;
  quad?: number;
  quint?: number;
  room?: number;
  // premium room variants (Sheraton)
  juniorSuiteQuad?: number;
  juniorSuite2PAX?: number;
  bedroom1APT?: number;
  bedroom2APT?: number;
  bedroom3APT?: number;
  // Anjum Makkah weekday/weekend split
  dblWD?: number;
  trplWD?: number;
  quadWD?: number;
  dblWE?: number;
  trplWE?: number;
  quadWE?: number;
  rate?: string; // for "COMING SOON" placeholders
}

export interface HotelEntry {
  name: string;
  city: 'Makkah' | 'Madinah';
  stars: number;
  category: string;
  rates: HotelRate[];
}

export interface TransportRoute {
  route: string;
  price: number; // SAR
}

export interface TransportEntry {
  vehicle: string;
  fullTripJeddahJED?: number; // SAR
  rates: TransportRoute[];
  madinahRoutes?: TransportRoute[];
}

export interface VisaRule {
  minPax?: number;
  maxPax?: number | string;
  priceUSD?: number;
  priceSAR?: number;
  note?: string;
}

export interface VisaEntry {
  name: string;
  rules?: VisaRule[];
  priceSAR?: number;
  priceUSD?: number;
  includes?: string[];
  items?: Array<{ variant: string; priceSAR: number; minPax?: number; note?: string }>;
  delivery?: string;
  leadTime?: string;
}

export interface ServiceItem {
  name: string;
  priceSAR?: number;
  priceIDR?: number;
  unit?: string;
  minPax?: number | string;
  minKg?: number;
  validity?: string;
  hours?: string;
  note?: string;
  includes?: string[];
  bonus?: string;
}

export interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

export interface Contacts {
  ceo: { name: string; phone: string };
  bookingIndonesia: { name: string; phone: string };
  salesMarketing: { name: string; phone: string };
  countryRepYemen: { name: string; phone: string };
  handlingIndonesia: { name: string; phone: string };
  teamMakkah: { name: string; phone: string };
  teamMadinah: { name: string; phone: string };
  office: string;
  email: string;
  instagram: string;
  socials: string[];
}

export interface HotelsJson {
  source: string;
  sourceType: string;
  updatedAt: string;
  currency: string;
  ratePerSAR: number;
  bookingContact: string;
  note: string;
  hotels: HotelEntry[];
  transport: TransportEntry[];
  visa: VisaEntry[];
  services: ServiceCategory[];
  contacts: Contacts;
}

const data = rawHotels as HotelsJson;

export const liveHotels: HotelEntry[] = data.hotels;
export const liveTransport: TransportEntry[] = data.transport;
export const liveVisa: VisaEntry[] = data.visa;
export const liveServices: ServiceCategory[] = data.services;
export const livePartnerContacts: Contacts = data.contacts;

export const SAR_TO_IDR = data.ratePerSAR; // 4300

export function findHotelByName(name: string): HotelEntry | undefined {
  return data.hotels.find((h) => h.name === name);
}

export function getHotelsByCity(city: 'Makkah' | 'Madinah'): HotelEntry[] {
  return data.hotels.filter((h) => h.city === city);
}

/**
 * Convert SAR price to IDR. Uses the rate declared in the JSON (4300 IDR/SAR).
 */
export function sarToIdr(sar: number): number {
  return Math.round(sar * SAR_TO_IDR);
}

/**
 * Pick the rate block whose date window contains `simDate`. If no exact match
 * (e.g. simulated date is in 2027 but catalog only lists through Jan-Feb 2027),
 * the closest earlier rate block is returned. Rates are per room per night.
 */
export function getRateForDate(hotel: HotelEntry, simDate: string): HotelRate | null {
  if (hotel.rates.length === 0) return null;
  const target = parseDate(simDate);
  for (const r of hotel.rates) {
    if ('rate' in r && r.rate === 'COMING SOON') continue;
    const range = parsePeriod(r.period);
    if (!range) continue;
    if (target >= range.start && target <= range.end) return r;
  }
  // Fallback: latest rate block on/before target
  let candidate: HotelRate | null = null;
  let bestEnd = -Infinity;
  for (const r of hotel.rates) {
    if ('rate' in r && r.rate === 'COMING SOON') continue;
    const range = parsePeriod(r.period);
    if (!range) continue;
    if (range.end <= target && range.end > bestEnd) {
      bestEnd = range.end;
      candidate = r;
    }
  }
  return candidate;
}

function parseDate(s: string): number {
  // YYYY-MM-DD or YYYY/MM/DD
  const m = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (!m) return Date.UTC(2027, 0, 5); // default to 5 Jan 2027
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function parsePeriod(p: string): { start: number; end: number } | null {
  // Patterns: "20 Jun 2026 - 15 Sep 2026" or "16/06/2026 - 15/08/2026"
  const m1 = p.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (m1) {
    const start = Date.UTC(Number(m1[3]), monthIndex(m1[2]), Number(m1[1]));
    const end = Date.UTC(Number(m1[6]), monthIndex(m1[5]), Number(m1[4]));
    return { start, end };
  }
  const m2 = p.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s*-\s*(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m2) {
    const start = Date.UTC(Number(m2[3]), Number(m2[2]) - 1, Number(m2[1]));
    const end = Date.UTC(Number(m2[6]), Number(m2[5]) - 1, Number(m2[4]));
    return { start, end };
  }
  return null;
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'mei', 'may', 'jun', 'jul', 'agu', 'aug', 'sep', 'oct', 'okt', 'nov', 'des', 'dec'];
function monthIndex(s: string): number {
  const k = s.toLowerCase().slice(0, 3);
  const i = MONTHS.indexOf(k);
  if (i < 0 || i > 11) return 0;
  // Normalize the duplicate-id variants
  if (k === 'okt') return 9; // Oct
  if (k === 'des') return 11; // Dec
  if (k === 'mei') return 4; // May
  if (k === 'agu') return 7; // Aug
  return i;
}

/**
 * Convert a hotel's rate block for the given occupancy and simDate into an IDR
 * per-room per-night figure. Returns null if rate block is missing.
 */
export function hotelRateToIdr(
  hotel: HotelEntry,
  occupancy: 'Double' | 'Triple' | 'Quad' | 'Quint',
  simDate: string,
): number | null {
  const rate = getRateForDate(hotel, simDate);
  if (!rate) return null;
  let sar: number | undefined;
  if (occupancy === 'Double') sar = rate.dbl ?? rate.room;
  else if (occupancy === 'Triple') sar = rate.trpl ?? rate.dbl;
  else if (occupancy === 'Quad') sar = rate.quad ?? rate.trpl ?? rate.dbl;
  else if (occupancy === 'Quint') sar = rate.quint ?? rate.quad ?? rate.trpl ?? rate.dbl;
  if (sar === undefined) return null;
  return sarToIdr(sar);
}