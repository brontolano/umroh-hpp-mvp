/* eslint-disable @typescript-eslint/no-unused-vars */
// Catalog accessor for Al Khaif Group partner PDF data.
// Source: "KATALOG AL KHAIF GRUP (One Stop Haramain Service) - Full Screen.pdf" (UPDATE 03 AGUSTUS 2026, 23 pages)
// Trust: partner reference (PDF OCR'd via vision API 2026-10-08)
// Status: indicative (perlu konfirmasi) — internal prices calculated with PARTNER_ADDON.
// All prices are per-room-per-night in SAR, converted to IDR at 4,300 IDR/SAR.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import rawJson from './catalog/al-khaif.json';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const raw = rawJson as any;

export const SAR_TO_IDR = 4300;
export const USD_TO_IDR = 15800;
export const CATALOG_SOURCE = 'KATALOG AL KHAIF GRUP (One Stop Haramain Service) - Full Screen.pdf';
export const CATALOG_UPDATE = '03 Agustus 2026';

// -------- Flat row shapes (raw JSON, one row per hotel+period+occupancy) --------
export interface HotelEntry {
  hotel: string;
  city: 'Makkah' | 'Madinah' | 'Jeddah' | 'Medan' | 'Sumut' | string;
  stars: 0 | 3 | 4 | 5;
  period: string;
  occupancy: string;
  priceSAR: number;
  markedUpPriceSAR: number;
  notes?: string;
}
export interface TransportEntry {
  vehicle: string;
  route: string;
  priceSAR: number;
  markedUpPriceSAR: number;
  note?: string;
}
export interface ServiceEntry {
  category: string;
  name: string;
  price: number;
  currency: 'SAR' | 'USD' | 'IDR';
  markedUpPriceSAR?: number;
  paxMin?: number;
  note?: string;
}

export const hotels: HotelEntry[] = raw.hotels;
export const transport: TransportEntry[] = raw.transport;
export const visa: ServiceEntry[] = raw.visa;
export const services: ServiceEntry[] = raw.services;

// -------- Compatibility shims for the live UI components (data/liveHotels.ts shape) --------

/** Hotel rate block compatible with data/liveHotels.ts#HotelRate. */
export interface HotelRateBlock {
  period: string;
  dbl?: number;
  trpl?: number;
  quad?: number;
  quint?: number;
  room?: number;
  rate?: string;
  // Premium-room variants (Sheraton / apartments)
  juniorSuiteQuad?: number;
  juniorSuite2PAX?: number;
  bedroom1APT?: number;
  bedroom2APT?: number;
  bedroom3APT?: number;
  perPAX?: number;
}

/** Hotel entry compatible with data/liveHotels.ts#HotelEntry (subset used by HotelCatalog). */
export interface HotelEntryShim {
  name: string;
  city: 'Makkah' | 'Madinah' | string;
  stars: 0 | 3 | 4 | 5;
  category: string;
  rates: HotelRateBlock[];
}

const OCC_TO_FIELD: Record<string, keyof HotelRateBlock> = {
  DBL: 'dbl',
  DOUBLE: 'dbl',
  TRPL: 'trpl',
  TRIPLE: 'trpl',
  QUAD: 'quad',
  QUADRUPLE: 'quad',
  QUINT: 'quint',
  QUINTUPLE: 'quint',
  ROOM: 'room',
  RATE: 'room',
  PERPAX: 'room',
  'PER-PAX': 'room',
  // Sheraton premium room variants — kept as their own rate fields
  // so the UI can still display them via the catch-all.
};

function occField(occ: string): keyof HotelRateBlock {
  const k = occ.toUpperCase().replace(/[^A-Z0-9-]/g, '');
  // Premium-room variants keep their own field so they don't collide.
  if (k === 'JUNIOR-SUITE-QUAD') return 'juniorSuiteQuad';
  if (k === 'JUNIOR-SUITE-2-PAX' || k === 'JUNIORSUITE2PAX') return 'juniorSuite2PAX';
  if (k === '1-BEDROOM-APT' || k === '1BEDROOMAPT') return 'bedroom1APT';
  if (k === '2-BEDROOM-APT' || k === '2BEDROOMAPT') return 'bedroom2APT';
  if (k === '3-BEDROOM-APT' || k === '3BEDROOMAPT') return 'bedroom3APT';
  if (k === 'PER-PAX' || k === 'PERPAX') return 'perPAX';
  // Strip dashes for the standard fields (so 'PER-PAX' -> 'PERPAX' -> catchall 'room')
  const std = k.replace(/-/g, '');
  if ((OCC_TO_FIELD as Record<string, keyof HotelRateBlock>)[std]) {
    return (OCC_TO_FIELD as Record<string, keyof HotelRateBlock>)[std];
  }
  return 'room';
}

/**
 * Group the flat hotel rows into HotelEntryShim[] (one per unique hotel+city)
 * with a `rates` array whose entries are rate-blocks containing dbl/trpl/quad/quint
 * keyed by occupancy. This is the shape data/liveHotels.ts exposes and what
 * components/HotelCatalog.tsx expects.
 */
export const hotelsGrouped: HotelEntryShim[] = (() => {
  type Key = string;
  const map = new Map<Key, HotelEntryShim>();
  for (const r of hotels) {
    const key = `${r.hotel}::${r.city}`;
    let entry = map.get(key);
    if (!entry) {
      entry = {
        name: r.hotel,
        city: r.city,
        stars: r.stars,
        category:
          r.stars === 5
            ? '5-star premium'
            : r.stars === 4
            ? '4-star'
            : r.stars === 3
            ? '3-star'
            : 'non-rated',
        rates: [],
      };
      map.set(key, entry);
    }
    const field = occField(r.occupancy);
    let block = entry.rates.find((b) => b.period === r.period);
    if (!block) {
      block = { period: r.period };
      entry.rates.push(block);
    }
    (block as any)[field] = r.markedUpPriceSAR ?? r.priceSAR;
  }
  return Array.from(map.values()).sort((a, b) => {
    if (a.city !== b.city) return a.city < b.city ? -1 : 1;
    return a.name < b.name ? -1 : 1;
  });
})();

/** Transport entry compatible with data/liveHotels.ts#TransportEntry (rates-only subset). */
export interface TransportEntryShim {
  vehicle: string;
  rates: { route: string; price: number }[];
}

export const transportGrouped: TransportEntryShim[] = (() => {
  const map = new Map<string, TransportEntryShim>();
  for (const r of transport) {
    let entry = map.get(r.vehicle);
    if (!entry) {
      entry = { vehicle: r.vehicle, rates: [] };
      map.set(r.vehicle, entry);
    }
    entry.rates.push({ route: r.route, price: r.markedUpPriceSAR ?? r.priceSAR });
  }
  return Array.from(map.values()).sort((a, b) => a.vehicle.localeCompare(b.vehicle));
})();

/** Service item compatible with data/liveHotels.ts#ServiceItem. */
export interface ServiceItemShim {
  name: string;
  priceSAR?: number;
  priceIDR?: number;
  priceUSD?: number;
  unit?: string;
  note?: string;
  includes?: string[];
}
export interface ServiceCategoryShim {
  category: string;
  items: ServiceItemShim[];
}

function rowToItem(r: ServiceEntry): ServiceItemShim {
  if (r.currency === 'SAR') {
    return { name: r.name, priceSAR: r.markedUpPriceSAR ?? r.price, priceIDR: undefined, note: r.note };
  }
  if (r.currency === 'USD') {
    return { name: r.name, priceUSD: r.price, priceIDR: undefined, note: r.note };
  }
  return { name: r.name, priceIDR: r.price, note: r.note, unit: 'IDR' };
}

export const servicesGrouped: ServiceCategoryShim[] = (() => {
  const map = new Map<string, ServiceCategoryShim>();
  for (const r of services) {
    let cat = map.get(r.category);
    if (!cat) {
      cat = { category: r.category, items: [] };
      map.set(r.category, cat);
    }
    cat.items.push(rowToItem(r));
  }
  return Array.from(map.values()).sort((a, b) => a.category.localeCompare(b.category));
})();

/** Visa entry compatible with data/liveHotels.ts#VisaEntry (rules/items subset). */
export interface VisaEntryShim {
  name: string;
  rules?: { minPax?: number; maxPax?: number | string; priceUSD?: number; priceSAR?: number; note?: string }[];
  priceUSD?: number;
  priceSAR?: number;
  note?: string;
  includes?: string[];
}

export const visaGrouped: VisaEntryShim[] = visa.map((v) => ({
  name: v.name,
  priceUSD: v.currency === 'USD' ? v.price : undefined,
  priceSAR: v.currency === 'SAR' ? v.markedUpPriceSAR ?? v.price : undefined,
  note: v.paxMin !== undefined ? `min ${v.paxMin} pax` : v.note,
}));

// -------- Convenience helpers --------
export function hotelsByCity(city: string): HotelEntry[] {
  return hotels.filter((h) => h.city === city);
}
export function hotelsByStars(stars: number): HotelEntry[] {
  return hotels.filter((h) => h.stars === stars);
}
export function cheapestHotel(city: string, occupancy = 'DBL'): HotelEntry | null {
  return hotels
    .filter((h) => h.city === city && h.occupancy === occupancy)
    .reduce<HotelEntry | null>((min, h) => (min === null || h.priceSAR < min.priceSAR ? h : min), null);
}
export function transportFor(routeHint: string): TransportEntry[] {
  const norm = routeHint.toLowerCase();
  return transport.filter((t) => t.route.toLowerCase().includes(norm));
}
export function catalogStats() {
  return {
    hotels: hotels.length,
    transport: transport.length,
    visa: visa.length,
    services: services.length,
    cities: Array.from(new Set(hotels.map((h) => h.city))),
    uniqueHotels: hotelsGrouped.length,
  };
}
