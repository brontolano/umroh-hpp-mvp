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
  hotels: [
    { name: "Al Masjid Al Haram Hotel", detail: "Makkah · 4-star · 5 malam quad · ±500m dari Masjidil Haram", price: 3200000, source: "https://www.umroh.com/hotels", trust: "Umroh.com hotel directory", status: "indicative" },
    { name: "Makkah Royal Tulip", detail: "Makkah · 5-star · 5 malam quad · ±700m dari Masjidil Haram", price: 4800000, source: "https://www.umroh.com/hotels", trust: "Umroh.com hotel directory", status: "indicative" },
    { name: "Pullman ZamZam", detail: "Makkah · 5-star · 5 malam quad · ±300m dari Masjidil Haram", price: 5200000, source: "https://www.umroh.com/hotels", trust: "Umroh.com hotel directory", status: "indicative" },
    { name: "Madinah Hilton", detail: "Madinah · 5-star · 2 malam quad · ±400m dari Masjid Nabawi", price: 2800000, source: "https://www.umroh.com/hotels", trust: "Umroh.com hotel directory", status: "indicative" },
    { name: "Madinah Pullman Al Nakhal", detail: "Madinah · 4-star · 2 malam quad · ±600m dari Masjid Nabawi", price: 2100000, source: "https://www.umroh.com/hotels", trust: "Umroh.com hotel directory", status: "indicative" },
    { name: "Budget 3-Star Makkah", detail: "Makkah · 3-star · 5 malam quad · ±1km dari Masjidil Haram", price: 1800000, source: "https://www.umroh.com/hotels", trust: "Umroh.com hotel directory", status: "indicative" },
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
