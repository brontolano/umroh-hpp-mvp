// Internal reference seed for Umroh HPP calculator.
// Data is demo/indicative. Prices are estimates for 9D7N to Makkah/Madinah.
// "status": "live" = fetched from Umroh.com (Jan 2027), "indicative" = estimated.

export type Item = {
  name: string;
  detail: string;
  price: number; // IDR, per pax
  source: string;
  trust: string;
  status: "live" | "indicative";
};

export const seed: Record<string, Item[]> = {
  flights: [
    // --------------- Jakarta (CGK) ---------------
    { name: "IndiGo", detail: "CGK-BOM-JED · 9D7N · 1 stop · Jan 5-12", price: 12800000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Etihad", detail: "CGK-AUH-JED · 8D7N · 1 stop · Jan 5-12", price: 14400000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-MED · 8D7N · 1 stop · Jan 5-12", price: 15975000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-MED · 9D7N · 1 stop · Jan 5-12", price: 15975000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-JED · 9D7N · 1 stop · Jan 5-12", price: 17250000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Batik Air", detail: "CGK-JED · 8D7N · tak transit · Jan 5-12", price: 17150000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-JED · 8D7N · 1 stop · Jan 10", price: 16300000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-JED · 9D7N · 1 stop · Jan 10", price: 17500000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "CGK-DOH-JED · 8D7N · 1 stop · Jan 15", price: 16500000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Etihad", detail: "CGK-AUH-JED · 8D7N · 1 stop · Jan 15", price: 14600000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // --------------- Surabaya (SUB) ---------------
    { name: "Scoot", detail: "SUB-SIN-JED · 13D10N · 1 stop · Jan 5-16", price: 15900000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Garuda Indonesia", detail: "SUB-CGK-JED · 12D10N · 1 stop · Jan 5-16", price: 16300000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Scoot", detail: "SUB-SIN-JED · 13D10N · 1 stop · Jan 10", price: 16200000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Garuda Indonesia", detail: "SUB-CGK-JED · 12D10N · 1 stop · Jan 10", price: 16600000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Turkish Airlines", detail: "SUB-IST-JED · 9D7N · 1 stop · Jan 15", price: 15200000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // --------------- Medan (KNO) ---------------
    { name: "MalaysiaAir", detail: "KNO-KUL-JED · 13D10N · 1 stop · Jan 5-16", price: 14500000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "MalaysiaAir", detail: "KNO-KUL-JED · 13D10N · 1 stop · Jan 10", price: 14700000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "AirAsia", detail: "KNO-KUL-JED · 13D10N · 1 stop · Jan 15", price: 14900000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Garuda Indonesia", detail: "KNO-CGK-JED · 12D10N · 1 stop · Jan 15", price: 14800000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // --------------- Makassar (UPG) ---------------
    { name: "Garuda Indonesia", detail: "UPG-CGK-JED · 12D10N · 1 stop · Jan 5-15", price: 16500000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Garuda Indonesia", detail: "UPG-CGK-JED · 12D10N · 1 stop · Jan 10", price: 16600000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    { name: "Qatar Airways", detail: "UPG-DOH-JED · 9D7N · 1 stop · Jan 15", price: 16200000, source: "https://www.umroh.com/tiket", trust: "Umroh.com flight service", status: "live" },
    // Additional indicative flights (illustrative)
    { name: "AirAsia", detail: "SUB-KUL-JED · 9D7N · 1 stop · Jan 15", price: 14900000, source: "https://www.airasia.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Emirates", detail: "CGK-DXB-JED · 8D7N · 1 stop · Jan 15", price: 16800000, source: "https://www.emirates.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Egypt Air", detail: "CGK-CAI-JED · 9D7N · 1 stop · Jan 15", price: 15300000, source: "https://www.elm.com.eg", trust: "Indicative estimate", status: "indicative" },
    { name: "Kuwait Airways", detail: "CGK-KWI-JED · 8D7N · 1 stop · Jan 15", price: 15600000, source: "https://www.kuwaitairways.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Air India Express", detail: "CGK-BOM-JED · 8D7N · 1 stop · Jan 15", price: 15100000, source: "https://www.airindiaexpress.com", trust: "Indicative estimate", status: "indicative" },
  ],
  la: [
    { name: "Land Arrangement 6D5N Morocco", detail: "Marrakesh + 4 kota · 3 bintang · min 10 pax", price: 11500000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "live" },
    { name: "Land Arrangement 5D4N Morocco", detail: "Marrakesh + 4 kota · 3 bintang · min 10 pax", price: 9800000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "live" },
    { name: "Land Arrangement 4D3N Morocco", detail: "Marrakesh + 3 kota · 3 bintang · min 10 pax", price: 8000000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "live" },
    { name: "Visa - Land Arrangement 9hr Bintang 3 (Makkah)", detail: "9D7N · 3 bintang · min 10 pax · Makkah +1 kota", price: 7500000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "live" },
    { name: "Visa - Land Arrangement Premium 9hr Bintang 3 (Makkah)", detail: "9D7N · 4 bintang · min 10 pax · Makkah +1 kota", price: 11500000, source: "https://www.umroh.com/paket-la", trust: "Umroh.com LA service", status: "live" },
  ],
  hotels: [
    // Makkah
    { name: "Anjum Hotel Makkah", detail: "Makkah · 4 malam · quad", price: 950000, source: "https://www.anjumhotels.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Emaar Grand Makkah", detail: "Makkah · 4 malam · quad", price: 760000, source: "https://www.emaar.com", trust: "Indicative estimate", status: "indicative" },
    { name: "M Hotel Makkah", detail: "Makkah · 4 malam · quad", price: 620000, source: "https://www.millenniumhotels.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Jabal Omar Makkah", detail: "Makkah · 4 malam · quad", price: 1200000, source: "https://www.jabalomar.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Mecca Millenium Hotel", detail: "Makkah · 4 malam · quad", price: 1100000, source: "https://www.millenniumhotels.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Kuraiai Hotel Makkah", detail: "Makkah · 4 malam · quad", price: 890000, source: "https://www.kuraiai.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Sunni Azenia Hotel Makkah", detail: "Makkah · 4 malam · quad", price: 920000, source: "https://www.sunni-azenia.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Majid Al Makkah Hotel", detail: "Makkah · 4 malam · quad", price: 850000, source: "https://www.majumpahalturkey.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Al Masjid Hotel Makkah", detail: "Makkah · 3 malam · quad", price: 780000, source: "https://www.almashbid.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Makkah Mirror Hotel", detail: "Makkah · 3 malam · quad", price: 820000, source: "https://www.makkahmirror.com", trust: "Indicative estimate", status: "indicative" },
    // Madinah
    { name: "Odst Kilo Hotel Madinah", detail: "Madinah · 3 malam · quad", price: 700000, source: "https://www.booking.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Saja Al Madinah", detail: "Madinah · 3 malam · quad", price: 880000, source: "https://www.saja.com.sa", trust: "Indicative estimate", status: "indicative" },
    { name: "Al Waha Madinah", detail: "Madinah · 3 malam · quad", price: 790000, source: "https://www.alwaha.com.sa", trust: "Indicative estimate", status: "indicative" },
    { name: "Masjid Nabawi Hotel", detail: "Madinah · 3 malam · quad", price: 810000, source: "https://www.masjidnabawihotel.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Madinah Palace Hotel", detail: "Madinah · 3 malam · quad", price: 860000, source: "https://www.madinhahotel.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Al Ansar Hotel Madinah", detail: "Madinah · 3 malam · quad", price: 750000, source: "https://www.alansar.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Madinah View Hotel", detail: "Madinah · 3 malam · quad", price: 770000, source: "https://www.madinhahotelview.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Madinah Sun Hotel", detail: "Madinah · 3 malam · quad", price: 730000, source: "https://www.madinhahotelview.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Madinah Garden Hotel", detail: "Madinah · 3 malam · quad", price: 790000, source: "https://www.madinhahoteldunia.com", trust: "Indicative estimate", status: "indicative" },
    { name: "Madinah Classic Hotel", detail: "Madinah · 3 malam · quad", price: 760000, source: "https://www.madinhahoteldunia.com", trust: "Indicative estimate", status: "indicative" },
  ],
  transport: [
    { name: "Bus, handling & ziarah", detail: "Jeddah · Makkah · Madinah", price: 1850000, source: "https://www.nusuk.sa", trust: "Referensi resmi", status: "indicative" },
    { name: "Transport + handling + visa paket", detail: "Jeddah · Makkah · Madinah", price: 2200000, source: "https://www.visitsaudi.com", trust: "Referensi resmi", status: "indicative" },
    { name: "Logistics & temp storage", detail: "Makkah · storage & mobility", price: 1500000, source: "https://www.umroh.com/paket-la", trust: "Indicative estimate", status: "indicative" },
    { name: "Courier & document handling", detail: "Volantis, Ziyarat documents", price: 900000, source: "https://www.umroh.com/paket-la", trust: "Indicative estimate", status: "indicative" },
  ],
  visa: [
    { name: "Visa Umrah + asuransi", detail: "Per pax · Siskopatuh", price: 1850000, source: "https://www.mofa.gov.sa", trust: "Referensi resmi", status: "indicative" },
  ],
  program: [
    { name: "Mutawwif & program ibadah", detail: "Pendampingan 9 hari", price: 1250000, source: "https://www.kemenag.go.id", trust: "Referensi resmi", status: "indicative" },
    { name: "Tambahan hotel + program", detail: "1 malam tambahan Makkah", price: 900000, source: "https://www.anjumhotels.com", trust: "Indikatif", status: "indicative" },
  ],
};
