// Partner reference for Al Khaif Group (One Stop Haramain Service).
// Source PDF: /opt/data/attachments/KATALOG AL KHAIF GRUP (One Stop Haramain Service) - Full Screen.pdf
// The PDF is a scanned image catalog (23 pages, no extractable text layer).
// OCR pipeline (Oct 2026): pymupdf renders each page → vision API extracts
// structured data → scripts/parse-pdf.py emits data/live/hotels.json.
// RULE (partner-supplied, verified by user):
//   internal price = partner catalog price (SAR) + 15 USD/riyals
//   catalog price is now extracted from PDF (was previously "perlu konfirmasi").
//   trust: peer reference (PDF metadata is the binding indication).

import type { PartnerReference, TrustLabel, StatusLabel } from "./contract";
import { findHotelByName } from "./liveHotels";

/**
 * Calculate internal HPP price from partner catalog price.
 * Rule: internal = catalog_price + 15 (USD/riyals)
 * @param catalogPriceUSD - price from Al Khaif catalog in USD
 * @returns internal price in USD
 */
export function partnerInternalPrice(catalogPriceUSD: number): number {
  return catalogPriceUSD + 15;
}

export const PARTNER_ADDON = 15; // USD/riyals per person

/**
 * Convert a partner catalog SAR price into an internal USD-denominated figure.
 * Uses a fixed SAR→USD rate as a placeholder (1 USD = 3.75 SAR, Sep 2026 approx).
 */
export function sarCatalogPriceToInternalUSD(sarPrice: number): number {
  const sarPerUsd = 3.75;
  return partnerInternalPrice(sarPrice / sarPerUsd);
}

/**
 * Example reference: pull a specific hotel's first season rate.
 */
export function exampleInternalPrice(hotelName: string): number | null {
  const h = findHotelByName(hotelName);
  if (!h || h.rates.length === 0) return null;
  const r = h.rates[0];
  const sarPrice = r.dbl ?? r.trpl ?? r.quad ?? r.quint;
  if (sarPrice === undefined) return null;
  return sarCatalogPriceToInternalUSD(sarPrice);
}

export const partnerReferences: PartnerReference[] = [
  {
    id: "alp-khaif-haramain",
    name: "Al Khaif Group (One Stop Haramain Service)",
    source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (One Stop Haramain Service) - Full Screen.pdf",
    detail:
      "Catalog: 23-page scanned image PDF — OCR via pymupdf + vision API. " +
      "70 hotels (42 Makkah, 28 Madinah), 6 vehicle types, 4 visa packages, " +
      "11 service categories, 10 LA packages + business services. " +
      "Internal = catalog SAR price + " + PARTNER_ADDON + " USD/riyals. " +
      "Status: live (auto-refreshed).",
    partnerAddOn: PARTNER_ADDON,
    price: exampleInternalPrice("Sheraton Makkah Jabal Al Kaabaa") ?? 0,
    currency: "USD / Riyals",
    trust: "peer reference",
    status: "live",
    caveat:
      "Internal price = catalog price (SAR → USD @ 3.75) + " +
      `${PARTNER_ADDON} USD/riyals. Regenerated from PDF via scripts/parse-pdf.py. ` +
      "Live catalog loaded into the app via data/liveHotels.ts and components/HotelCatalog.tsx.",
    created: "2026-10-07",
  },
];

export const partnerOverview = partnerReferences.map((p) => ({
  id: p.id,
  name: p.name,
  partnerAddOn: p.partnerAddOn,
  status: p.status,
  trust: p.trust,
  caveat: p.caveat,
}));
