/* eslint-disable @typescript-eslint/no-unused-vars */
// Internal reference seed for Umroh HPP calculator.
// Data is demo/indicative. Prices are estimates for 9D7N to Makkah/Madinah.
// "status": "live" = fetched from Umroh.com (Jan 2027), "indicative" = estimated.

import type { Item, PartnerList } from "./contract";
import { partnerReferences as partnerList } from "./partner";

export const seed: Record<string, Item[]> = {
  // --------------- Flights ---------------
  flights: [
    // Jakarta (CGK)
    { name: "IndiGo", detail: "CGK-BOM-JED · 9D7N · 1 stop", price: 12800000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Etihad", detail: "CGK-AUH-JED · 8D7N · 1 stop", price: 14400000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-MED · 8D7N · 1 stop", price: 15975000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-JED · 9D7N · 1 stop", price: 17250000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Batik Air", detail: "CGK-JED · 8D7N · direct", price: 17150000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // Surabaya (SUB)
    { name: "Scoot", detail: "SUB-SIN-JED · 13D10N · 1 stop", price: 15900000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Garuda Indonesia", detail: "SUB-CGK-JED · 12D10N · 1 stop", price: 16300000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "MX Aviation", detail: "SUB-CGK-JED · 12D10N · 1 stop", price: 17200000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // Medan (MED)
    { name: "Lion Air", detail: "MED-CGK-JED · 9D7N · 1 stop", price: 18500000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Citilink", detail: "MED-CGK-JED · 8D7N · 1 stop", price: 19000000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // Live from Moli fetch 5 Jan 2027
    { name: "AirAsia", detail: "CGK-BOM-JED · 9D7N · 1 stop · 5 Jan 2027", price: 15425000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Royal Brunei", detail: "CGK-BOM-JED · 9D7N · 1 stop · 5 Jan 2027", price: 15500000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-JED · 9D7N · 1 stop · 5 Jan 2027", price: 15975000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Batik Air", detail: "CGK-JED · 9D7N · direct · 5 Jan 2027", price: 17150000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Batik Air", detail: "CGK-JED · 9D7N · direct · 5 Jan 2027 (blk 2)", price: 17900000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
  ],

  // --------------- Land Arrangement (LA) ---------------
  la: [
    { name: "LA 9D7N Makkah + Madinah", detail: "Makkah 5 malam + Madinah 2 malam · transport + guide", price: 4500000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
    { name: "LA 9D7N Makkah + Jeddah", detail: "Makkah 5 malam + Jeddah 2 malam · transport + guide", price: 4200000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
    { name: "LA Dubai Tour 1D0N", detail: "Dubai city tour · transport + guide", price: 2000000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
    { name: "LA 12D10N Extended", detail: "Makkah 7 malam + Madinah 3 malam · transport + guide", price: 6800000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
  ],

  // --------------- Hotels ---------------
  // Source: Al Khaif Group catalog (UPDATE 03 AGUSTUS 2026) — Makkah
  // Prices in SAR (Saudi Riyal). Converted to IDR at ~4,300 IDR/SAR.
  // Madinah hotels below are estimates pending catalog data.
  hotels: [
    // ---- Makkah Hotels (from Al Khaif catalog, page 2) ----
    // Sheraton Makkah Jabal Al Kaabaa ★★★★★
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · DBL · Jun-Sep 2026", price: 775*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · TRPL · Jun-Sep 2026", price: 875*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · QUAD · Jun-Sep 2026", price: 950*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · DBL · Sep-Oct 2026", price: 850*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · TRPL · Sep-Oct 2026", price: 950*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · QUAD · Sep-Oct 2026", price: 1025*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · DBL · Nov-Dec 2026", price: 900*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · TRPL · Nov-Dec 2026", price: 1100*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · QUAD · Nov-Dec 2026", price: 1100*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · DBL · Jan-Feb 2027", price: 850*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · TRPL · Jan-Feb 2027", price: 950*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Sheraton Makkah Jabal Al Kaabaa", detail: "Makkah · 5★ · QUAD · Jan-Feb 2027", price: 1050*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    // Marriott Jabal Omar ★★★★★
    { name: "Marriott Jabal Omar", detail: "Makkah · 5★ · DBL · Jul-Oct 2026", price: 900*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Marriott Jabal Omar", detail: "Makkah · 5★ · TRPL · Jul-Oct 2026", price: 990*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Marriott Jabal Omar", detail: "Makkah · 5★ · QUAD · Jul-Oct 2026", price: 1080*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Marriott Jabal Omar", detail: "Makkah · 5★ · DBL · Dec 2026-Jan 2027", price: 1150*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Marriott Jabal Omar", detail: "Makkah · 5★ · TRPL · Dec 2026-Jan 2027", price: 1250*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Marriott Jabal Omar", detail: "Makkah · 5★ · QUAD · Dec 2026-Jan 2027", price: 1350*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    // Al Marwa Rayhaan by Rotana ★★★★★
    { name: "Al Marwa Rayhaan by Rotana", detail: "Makkah · 5★ · DBL · Jul-Sep 2026", price: 1300*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Marwa Rayhaan by Rotana", detail: "Makkah · 5★ · TRPL · Jul-Sep 2026", price: 1550*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Marwa Rayhaan by Rotana", detail: "Makkah · 5★ · QUAD · Jul-Sep 2026", price: 1800*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Marwa Rayhaan by Rotana", detail: "Makkah · 5★ · DBL · Sep-Dec 2026", price: 1350*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Marwa Rayhaan by Rotana", detail: "Makkah · 5★ · TRPL · Sep-Dec 2026", price: 1600*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Marwa Rayhaan by Rotana", detail: "Makkah · 5★ · QUAD · Sep-Dec 2026", price: 1850*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    // Al Safwa Tower ★★★★★
    { name: "Al Safwa Tower", detail: "Makkah · 5★ · DBL · Jun-Oct 2026", price: 880*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Safwa Tower", detail: "Makkah · 5★ · TRPL · Jun-Oct 2026", price: 1080*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Safwa Tower", detail: "Makkah · 5★ · QUAD · Jun-Oct 2026", price: 1280*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    // Pullman Zamzam ★★★★★
    { name: "Pullman Zamzam", detail: "Makkah · 5★ · DBL · Jun-Oct 2026", price: 1030*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Pullman Zamzam", detail: "Makkah · 5★ · TRPL · Jun-Oct 2026", price: 1280*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Pullman Zamzam", detail: "Makkah · 5★ · QUAD · Jun-Oct 2026", price: 1550*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    // Prestige Ajyad ★★★★ (4-star, good value)
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · DBL · Jun-Aug 2026", price: 630*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · TRPL · Jun-Aug 2026", price: 730*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · QUAD · Jun-Aug 2026", price: 850*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · DBL · Oct-Dec 2026", price: 730*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · TRPL · Oct-Dec 2026", price: 830*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · QUAD · Oct-Dec 2026", price: 950*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · DBL · Dec 2026-Feb 2027", price: 980*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · TRPL · Dec 2026-Feb 2027", price: 1080*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Prestige Ajyad", detail: "Makkah · 4★ · QUAD · Dec 2026-Feb 2027", price: 1200*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    // Al Shohada Hotel ★★★ (3-star)
    { name: "Al Shohada Hotel", detail: "Makkah · 3★ · DBL · Jul-Sep 2026", price: 635*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Shohada Hotel", detail: "Makkah · 3★ · TRPL · Jul-Sep 2026", price: 735*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Shohada Hotel", detail: "Makkah · 3★ · QUAD · Jul-Sep 2026", price: 835*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Shohada Hotel", detail: "Makkah · 3★ · DBL · Sep-Nov 2026", price: 750*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Shohada Hotel", detail: "Makkah · 3★ · TRPL · Sep-Nov 2026", price: 850*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Al Shohada Hotel", detail: "Makkah · 3★ · QUAD · Sep-Nov 2026", price: 950*4300, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    // ---- Madinah Hotels (pending catalog pages 3-6) ----
    { name: "Madinah Hotel [TBD]", detail: "Madinah · 5★ · DBL · estimate pending page 3+", price: 3000000, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Madinah Hotel [TBD]", detail: "Madinah · 5★ · TRPL · estimate pending page 3+", price: 3500000, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
    { name: "Madinah Hotel [TBD]", detail: "Madinah · 5★ · QUAD · estimate pending page 3+", price: 4000000, source: "/opt/data/attachments/KATALOG AL KHAIF GRUP (Full Screen).pdf", trust: "partner reference", status: "indicative" },
  ],

  // --------------- Transport ---------------
  transport: [
    { name: "Bus AC Deluxe", detail: "Jeddah Airport ↔ Makkah · AC, 40 seat", price: 350000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
    { name: "Bus VIP", detail: "Jeddah Airport ↔ Makkah · AC, 30 seat, lebih lega", price: 550000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
    { name: "Mobil Private", detail: "Jeddah Airport ↔ Makkah · private car", price: 1200000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
    { name: "Van Group", detail: "Jeddah Airport ↔ Makkah · 12 seat", price: 700000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
    { name: "City Tour Jeddah", detail: "Jeddah city tour · half day · AC vehicle", price: 400000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "indicative" },
  ],

  // --------------- Visa ---------------
  visa: [
    { name: "Visa Umroh Regular", detail: "Visa single entry · proses ±7 hari kerja", price: 950000, source: "https://www.umroh.com/visa", trust: "Umroh.com visa service", status: "indicative" },
    { name: "Visa Umroh Express", detail: "Visa single entry · proses ±3 hari kerja", price: 1400000, source: "https://www.umroh.com/visa", trust: "Umroh.com visa service", status: "indicative" },
    { name: "Visa Siskopatuh", detail: "Visa single entry · official government", price: 850000, source: "https://www.skyscanner.co.id", trust: "official / Siskopatuh", status: "indicative" },
    { name: "Visa Umroh Full Package", detail: "Visa + handling + insurance · all-in", price: 1600000, source: "https://www.umroh.com/visa", trust: "Umroh.com visa service", status: "indicative" },
  ],

  // --------------- Program ---------------
  program: [
    { name: "Program Basic 9D7N", detail: "9D7N · makkah 5 + madinah 2 · include LA + visa", price: 85000000, source: "https://www.umroh.com/paket", trust: "Umroh.com package", status: "indicative" },
    { name: "Program Premium 9D7N", detail: "9D7N · makkah 5 + madinah 2 · include LA + visa + hotel 4star", price: 98000000, source: "https://www.umroh.com/paket", trust: "Umroh.com package", status: "indicative" },
    { name: "Program VIP 9D7N", detail: "9D7N · makkah 5 + madinah 2 · include LA + visa + hotel 5star", price: 125000000, source: "https://www.umroh.com/paket", trust: "Umroh.com package", status: "indicative" },
    { name: "Program Extended 12D10N", detail: "12D10N · makkah 7 + madinah 3 · include LA + visa", price: 112000000, source: "https://www.umroh.com/paket", trust: "Umroh.com package", status: "indicative" },
    { name: "Program Fullboard 9D7N", detail: "9D7N · all meals included · makkah 5 + madinah 2", price: 76000000, source: "https://www.umroh.com/paket", trust: "Umroh.com package", status: "indicative" },
  ],
};

export const partnerReferences: PartnerList = partnerList;
