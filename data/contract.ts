/* eslint-disable @typescript-eslint/no-unused-vars */
// Contract definitions for Umroh HPP internal references.
// Partner reference rule (partner-supplied, NOT verified):
//   - source: partner-provided file outside workspace
//   - internal price = partner catalog price + 15 USD/riyals
//   - status: indicative / perlu konfirmasi
//   - trust: peer reference / perlu konfirmasi

export type SourceUrl = string;
export type TrustLabel =
  | "peer reference"
  | "partner reference"
  | "customer provided"
  | "verified partner data"
  | "Umroh.com flight service"
  | "Partner reference";
export type StatusLabel =
  | "indicative"
  | "perlu konfirmasi"
  | "live"
  | "verified"
  | "needs confirmation";

export type Item = {
  id?: string;
  name: string;
  detail: string;
  price: number; // IDR, per pax
  source: SourceUrl;
  trust: TrustLabel;
  status: "live" | "indicative";
};

export type PartnerItem = {
  id: string;
  name: string;
  source: SourceUrl;
  detail: string;
  partnerAddOn: number; // USD/riyals added on top of partner catalog price
  price: number; // placeholder until verified (0)
  currency: string;
  trust: TrustLabel;
  status: StatusLabel;
  caveat: string;
  created: string;
};

export type PartnerReference = PartnerItem;
export type PartnerList = PartnerReference[];

export type ProgramPackage = {
  id: string;
  title: string;
  description: string;
  pricePerPax: number; // IDR, per pax
  nights: number;
  currency: string;
  status: "indicative" | "live";
  notes: string;
};

export type ProgramLineItem = {
  packageId: string;
  seat: number;
  qty: number;
  unitPrice: number; // IDR
  subtotal: number; // IDR
  status: "pending" | "confirmed";
};
