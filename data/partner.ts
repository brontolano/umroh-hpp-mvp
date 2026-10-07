// Partner reference for Al Khaif Group (One Stop Haramain Service).
// Source: partner-provided file outside workspace, cannot be read/parsed here.
// Rule (partner-supplied, still unverified):
//   internal price = partner catalog price + 15 USD/riyals
//   status: indicative / perlu konfirmasi
//   trust: peer reference

import type { PartnerReference, SourceUrl, TrustLabel, StatusLabel } from "./contract";

export const partnerReferences: PartnerReference[] = [
  {
    id: "alp-khaif-haramain",
    name: "Al Khaif Group (One Stop Haramain Service)",
    source: "Partner Full Screen PDF (KATALOG AL KHAIF GRUP - One Stop Haramain Service)",
    detail: "PDF is outside the allowed workspace; not readable/parsed in this environment.",
    partnerAddOn: 15, // USD/riyals added on top of partner catalog price
    price: 0, // unknown until verified (placeholder)
    currency: "USD / Riyals",
    trust: "peer reference",
    status: "perlu konfirmasi",
    caveat: "Internal price = partner catalog price + 15 USD/riyals. Partner file NOT read/verified.",
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
