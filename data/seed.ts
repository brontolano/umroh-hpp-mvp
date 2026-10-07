/* eslint-disable @typescript-eslint/no-unused-vars */
// Internal reference seed for Umroh HPP calculator.
// Data is demo/indicative. Prices are estimates for 9D7N to Makkah/Madinah.
// "status": "live" = fetched from Umroh.com (Jan 2027), "indicative" = estimated.

import type { Item, PartnerList } from "./contract";
import { partnerReferences as partnerList } from "./partner";

// Keep the original flat Item shape for flights and other sections.
export const seed: Record<string, Item[]> = {
  flights: [
    // --------------- Jakarta (CGK) ---------------
    { name: "IndiGo", detail: "CGK-BOM-JED · 9D7N · 1 stop · Jan 5-12", price: 12800000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Etihad", detail: "CGK-AUH-JED · 8D7N · 1 stop · Jan 5-12", price: 14400000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-MED · 8D7N · 1 stop · Jan 5-12", price: 15975000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-JED · 9D7N · 1 stop · Jan 5-12", price: 17250000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Batik Air", detail: "CGK-JED · 8D7N · tak transit · Jan 5-12", price: 17150000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // --------------- Surabaya (SUB) ---------------
    { name: "Scoot", detail: "SUB-SIN-JED · 13D10N · 1 stop · Jan 5-16", price: 15900000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Garuda Indonesia", detail: "SUB-CGK-JED · 12D10N · 1 stop · Jan 5-16", price: 16300000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "MX Aviation", detail: "SUB-CGK-JED · 12D10N · 1 stop · Jan 10", price: 17200000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // --------------- Jakarta (MED) ---------------
    { name: "Lion Air", detail: "MED-CGK-JED · 9D7N · 1 stop · Jan 5-12", price: 18500000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Citilink", detail: "MED-CGK-JED · 8D7N · 1 stop · Jan 5-12", price: 19000000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
  ],
  // Empty placeholders for remaining sections (UI expects these keys).
  la: [],
  hotels: [],
  transport: [],
  visa: [],
  program: [],
};

// Expose partner references so the UI can render the partner rule.
export const partnerReferences: PartnerList = partnerList;
