'use client';

import { useMemo, useState } from 'react';
import { WorkspaceCheckView } from '../components/WorkspaceCheckView';
import TabNav from '../components/TabNav';
import ControlBar from '../components/ControlBar';
import ItemCard from '../components/ItemCard';
import PartnerCard from '../components/PartnerCard';
import DailyTable from '../components/DailyTable';
import SummaryCard from '../components/SummaryCard';
import HotelCatalog from '../components/HotelCatalog';
import LivePartnerView from '../components/LivePartnerView';

import { seed, partnerReferences } from '../data/seed';
import { getLiveFlightsByOrigin } from '../data/live';
import {
  liveHotels, liveTransport, liveVisa, liveServices, livePartnerContacts,
} from '../data/liveHotels';
import {
  hotelsGrouped, transportGrouped, servicesGrouped, visaGrouped,
  catalogStats, CATALOG_SOURCE, CATALOG_UPDATE, SAR_TO_IDR,
} from '../data/catalog';

const labels: Record<string, string> = {
  flights: 'Flights',
  tabel: 'Tabel Harian',
  la: 'LA',
  hotels: 'Hotels',
  transport: 'Transport',
  visa: 'Visa',
  program: 'Program',
  partner: 'Partner',
  katalog: 'Katalog Mitra',
};

export default function Page() {
  const [origin, setOrigin] = useState('CGK');
  const [duration, setDuration] = useState(9);
  const [pax, setPax] = useState(2);
  const [occupancy, setOccupancy] = useState('Quad');
  const [tab, setTab] = useState('flights');
  const [simDate, setSimDate] = useState('2027-01-05');

  const liveFlights = useMemo(
    () => getLiveFlightsByOrigin(origin.split(' ')[0], simDate),
    [origin, simDate]
  );

  // Live flight price: cheapest available for this origin/date
  const liveFlightBase = useMemo(() => {
    if (liveFlights.length === 0) return null;
    const outbound = liveFlights
      .filter((f) => f.route.startsWith(origin.split(' ')[0]))
      .sort((a, b) => a.price - b.price)[0];
    return outbound?.price ?? null;
  }, [liveFlights, origin]);

  // Base = non-flight seed items + (live flight OR seed flight price)
  const base = useMemo(() => {
    const nonFlightItems = (Object.keys(seed) as Array<keyof typeof seed>)
      .filter((k) => k !== 'flights')
      .flatMap((k) => seed[k]);
    const nonFlightSum = nonFlightItems.reduce((a, b) => a + b.price, 0);

    if (liveFlightBase !== null) {
      return nonFlightSum + liveFlightBase;
    }
    const seedFlightAvg = seed.flights.reduce((a, b) => a + b.price, 0) / seed.flights.length;
    return nonFlightSum + seedFlightAvg;
  }, [liveFlightBase]);

  const total = base * pax * (duration / 9) * (occupancy === 'Double' ? 1.25 : occupancy === 'Triple' ? 1.1 : 1);
  const margin = total * 0.3;

  const icons: Record<string, string> = {
    flights: '✈',
    hotels: '⌂',
    visa: '▣',
    la: '✦',
    transport: '✦',
    program: '✦',
  };

  const occ = (['Double', 'Triple', 'Quad', 'Quint'].includes(occupancy)
    ? occupancy
    : 'Quad') as 'Double' | 'Triple' | 'Quad' | 'Quint';

  const isPartnerLiveTab = tab === 'partner' || tab === 'transport' || tab === 'visa';

  return (
    <main>
      <header>
        <div className="brand">
          <span className="mark">✦</span>
          <div>
            <b>Umroh<span>.internal</span></b>
            <small>HPP reference desk</small>
          </div>
        </div>
        <div className="status"><i /> Data lokal + Live PDF · Al Khaif</div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">OPERASIONAL / HPP CALCULATOR</p>
          <h1>Rancang paket Umrah<br /><em>dengan angka yang jelas.</em></h1>
          <p className="intro">
            Kalkulator internal untuk menyusun estimasi biaya per pax. Semua angka di bawah adalah referensi
            indikatif dan perlu divalidasi sebelum penawaran. Data hotel, transportasi, dan visa sekarang
            disinkronkan dari katalog PDF mitra Al Khaif Group (Update 03 Agustus 2026).
          </p>
        </div>
        <div className="hero-note">
          <strong> Bismillah</strong>
          <small>Estimasi yang jujur, keputusan yang tenang.</small>
        </div>
      </section>

      <ControlBar
        origin={origin} setOrigin={setOrigin}
        duration={duration} setDuration={setDuration}
        pax={pax} setPax={setPax}
        occupancy={occupancy} setOccupancy={setOccupancy}
        simDate={simDate} setSimDate={setSimDate}
      />

      <div className="grid">
        <section className="card breakdown">
          <div className="section-head">
            <div>
              <p className="eyebrow">KOMPONEN BIAYA</p>
              <h2>Referensi paket</h2>
            </div>
            <span className="pill">{origin.split(' ')[0]} · {duration} hari</span>
          </div>

          <TabNav labels={labels} activeTab={tab} onTabChange={setTab} />

          <div className="items">
            {tab === 'partner' ? (
              <>
                <LivePartnerView
                  transport={transportGrouped as any}
                  visa={visaGrouped as any}
                  services={servicesGrouped as any}
                  contacts={livePartnerContacts}
                />
                <p className="fine">
                  ⓘ Sumber: <code>{CATALOG_SOURCE}</code> — Update {CATALOG_UPDATE} — Kurs 1 SAR = {SAR_TO_IDR.toLocaleString('id-ID')} IDR. Total {catalogStats().hotels} baris hotel, {catalogStats().transport} transport, {catalogStats().visa} visa, {catalogStats().services} layanan. Trust: partner reference · Status: indicative.
                </p>
                <hr />
                {partnerReferences.map((p) => <PartnerCard key={p.id} p={p} />)}
              </>
            ) : tab === 'tabel' ? (
              <DailyTable
                flights={seed.flights}
                liveFlights={liveFlights}
                simDate={simDate}
                origin={origin}
              />
            ) : tab === 'hotels' ? (
              <HotelCatalog
                hotels={hotelsGrouped as any}
                simDate={simDate}
                occupancy={occ}
              />
            ) : tab === 'transport' ? (
              <LivePartnerView
                transport={transportGrouped as any}
                visa={visaGrouped as any}
                services={servicesGrouped as any}
                contacts={livePartnerContacts}
              />
            ) : tab === 'visa' ? (
              <LivePartnerView
                transport={transportGrouped as any}
                visa={visaGrouped as any}
                services={servicesGrouped as any}
                contacts={livePartnerContacts}
              />
            ) : tab === 'katalog' ? (
              <>
                <p className="fine">
                  ⓘ <b>Katalog Mitra Al Khaif Group</b> — PDF 23 halaman, OCR via vision API, Update {CATALOG_UPDATE}. Tersedia {catalogStats().uniqueHotels} hotel unik ({catalogStats().hotels} baris hotel) di {catalogStats().cities.join(', ')}. Kurs 1 SAR = {SAR_TO_IDR.toLocaleString('id-ID')} IDR. Trust: partner reference · Status: indicative.
                </p>
                <HotelCatalog
                  hotels={hotelsGrouped as any}
                  simDate={simDate}
                  occupancy={occ}
                />
                <hr />
                <LivePartnerView
                  transport={transportGrouped as any}
                  visa={visaGrouped as any}
                  services={servicesGrouped as any}
                  contacts={livePartnerContacts}
                />
              </>
            ) : (
              seed[tab].map((item, i) => (
                <ItemCard key={i} item={item} icon={icons[tab] ?? '✦'} />
              ))
            )}
          </div>

          <p className="fine">
            ⓘ {liveFlightBase !== null
              ? 'Harga flights dari data LIVE umroh.com — konfirmasi ke vendor.'
              : 'Seed lokal untuk demo. Harga bukan data live; URL hanya metadata rujukan.'}
            {tab === 'hotels' && (
              <>
                <br />Data hotel: katalog Al Khaif Group (PDF) — parser <code>scripts/parse-pdf.py</code>.
                Update 03 Agustus 2026. Kurs 1 SAR = 4.300 IDR.
              </>
            )}
            {isPartnerLiveTab && (
              <>
                <br />Data partner: katalog Al Khaif Group (PDF) — di-OCR via vision API, regenerasi via <code>scripts/parse-pdf.py</code>.
              </>
            )}
          </p>
        </section>

        <SummaryCard total={total} margin={margin} pax={pax} />
      </div>

      <footer>
        <span>UMROH.INTERNAL · v0.2 MVP + live PDF</span>
        <span>Live data: umroh.com (flights, LA) + Al Khaif PDF (hotels, transport, visa)</span>
      </footer>
    </main>
  );
}