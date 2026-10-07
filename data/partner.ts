// Partner reference for Al Khaif Group (One Stop Haramain Service).
// Source: partner-provided PDF at /opt/data/attachments/KATALOG AL KHAIF GRUP - Full Screen.pdf
// PDF is a scanned image catalog (23 pages, no extractable text layer in this environment).
// OCR blocked: vision API at capacity (429), system tesseract not installable.
// RULE (partner-supplied, verified by user):
//   internal price = partner catalog price (SAR) + 15 USD/riyals
//   catalog price must be entered manually — PDF text not yet parseable.
//   trust: peer reference
//   status: perlu konfirmasi (catalog prices pending manual entry)

import type { PartnerReference, TrustLabel, StatusLabel } from "./contract";

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

export const partnerReferences: PartnerReference[] = [
  {
    id: "alp-khaif-haramain",
    name: "Al Khaif Group (One Stop Haramain Service)",
    source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (One Stop Haramain Service) - Full Screen.pdf",
    detail:
      "Catalog: 23-page scanned image PDF — OCR blocked (vision API 429). " +
      "Catalog prices must be entered manually. Internal = catalog + " +
      PARTNER_ADDON + " USD/riyals. Status: perlu konfirmasi. " +
      "Hubungi mitra untuk harga katalog terbaru.",
    partnerAddOn: PARTNER_ADDON,
    price: 0, // TODO: enter catalog price manually (see partnerInternalPrice())
    currency: "USD / Riyals",
    trust: "peer reference",
    status: "perlu konfirmasi",
    caveat:
      "Internal price = catalog price + " +
      `${PARTNER_ADDON} USD/riyals. ` +
      "Catalog prices pending manual entry — PDF text not parseable in this environment.",
    created: "2026-10-05",
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
