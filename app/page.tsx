'use client';

import { useMemo, useState } from 'react';
import { WorkspaceCheckView } from '../components/WorkspaceCheckView';

import { seed, partnerReferences } from '../data/seed';

const labels: Record<string, string> = {
  flights: 'Flights',
  la: 'LA',
  hotels: 'Hotels',
  transport: 'Transport',
  visa: 'Visa',
  program: 'Program',
  partner: 'Partner',
};

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

export default function Page() {
  const [origin, setOrigin] = useState('CGK');
  const [duration, setDuration] = useState(9);
  const [pax, setPax] = useState(2);
  const [occupancy, setOccupancy] = useState('Quad');
  const [tab, setTab] = useState('flights');
  const [simDate, setSimDate] = useState(new Date().toISOString().slice(0, 10));

  const base = useMemo(() => Object.values(seed).flat().reduce((a, b) => a + b.price, 0), []);
  const total = base * pax * (duration / 9) * (occupancy === 'Double' ? 1.25 : occupancy === 'Triple' ? 1.1 : 1);
  const margin = total * 0.3;

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
        <div className="status"><i /> Data lokal · demo</div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">OPERASIONAL / HPP CALCULATOR</p>
          <h1>Rancang paket Umrah<br /><em>dengan angka yang jelas.</em></h1>
          <p className="intro">
            Kalkulator internal untuk menyusun estimasi biaya per pax. Semua angka di bawah adalah referensi indikatif
            dan perlu divalidasi sebelum penawaran.
          </p>
        </div>
        <div className="hero-note">
          <strong> Bismillah</strong>
          <small>Estimasi yang jujur, keputusan yang tenang.</small>
        </div>
      </section>

      <section className="card controls">
        <div className="control">
          <label>Asal keberangkatan</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
            <option>CGK — Jakarta</option>
            <option>SUB — Surabaya</option>
            <option>KNO — Medan</option>
            <option>UPG — Makassar</option>
          </select>
        </div>
        <div className="control">
          <label>Tanggal berangkat</label>
          <input type="date" defaultValue="2027-01-15" />
        </div>
        <div className="control">
          <label>Durasi</label>
          <div className="step">
            <button onClick={() => setDuration(Math.max(1, duration - 1))}>−</button>
            <b>{duration} hari</b>
            <button onClick={() => setDuration(duration + 1)}>+</button>
          </div>
        </div>
        <div className="control">
          <label>Jumlah pax</label>
          <div className="step">
            <button onClick={() => setPax(Math.max(1, pax - 1))}>−</button>
            <b>{pax} pax</b>
            <button onClick={() => setPax(pax + 1)}>+</button>
          </div>
        </div>
        <div className="control">
          <label>Kamar</label>
          <select value={occupancy} onChange={(e) => setOccupancy(e.target.value)}>
            <option>Quad</option>
            <option>Triple</option>
            <option>Double</option>
          </select>
        </div>
      </section>

      <div className="grid">
        <section className="card breakdown">
          <div className="section-head">
            <div>
              <p className="eyebrow">KOMPONEN BIAYA</p>
              <h2>Referensi paket</h2>
            </div>
            <span className="pill">{origin.split(' ')[0]} · {duration} hari</span>
          </div>
          <nav>
            {Object.keys(labels).map((k) => (
              <button className={tab === k ? 'active' : ''} onClick={() => setTab(k)} key={k}>
                {labels[k]}
              </button>
            ))}
          </nav>

          <div className="items">
            {tab === 'partner' ? (
              partnerReferences.map((p) => (
                <article className="item" key={p.id}>
                  <div className="item-icon">🔗</div>
                  <div className="item-main">
                    <b>{p.name}</b>
                    <small>{p.detail}</small>
                    <small>Status: {p.status}</small>
                    <small>Trust: {p.trust}</small>
                    <p className="fine">{p.caveat}</p>
                    <p className="fine">
                      Harga internal = harga katalog mitra + {p.partnerAddOn} USD/riyals.<br />
                      Sumber: {p.source}<br />
                      Dibuat: {p.created}
                    </p>
                  </div>
                  <div className="item-price">
                    <b>{p.partnerAddOn} USD/riyals</b>
                    <small>{p.trust}</small>
                  </div>
                </article>
              ))
            ) : (
              seed[tab].map((item, i) => (
                <article className="item" key={i}>
                  <div className="item-icon">
                    {tab === 'flights' ? '✈' : tab === 'hotels' ? '⌂' : tab === 'visa' ? '▣' : '✦'}
                  </div>
                  <div className="item-main">
                    <b>{item.name}</b>
                    <small>{item.detail}</small>
                    <a href={item.source} target="_blank" rel="noopener noreferrer">
                      Sumber ↗
                    </a>
                  </div>
                  <div className="item-price">
                    <b>{rupiah(item.price)}</b>
                    <small>{item.trust}</small>
                  </div>
                </article>
              ))
            )}
          </div>

          <p className="fine">ⓘ Seed lokal untuk demo. Harga bukan data live; URL hanya metadata rujukan.</p>
        </section>

        <aside className="card summary">
          <p className="eyebrow">RINGKASAN ESTIMASI</p>
          <h2>HPP per pax</h2>
          <div className="big-number">{rupiah(total / pax)}</div>
          <div className="sum-row">
            <span>Total HPP · {pax} pax</span>
            <b>{rupiah(total)}</b>
          </div>
          <div className="sum-row">
            <span>Margin rekomendasi · 30%</span>
            <b>{rupiah(margin)}</b>
          </div>
          <div className="quote">
            <span>Harga jual indikatif</span>
            <strong>{rupiah((total + margin) / pax)} <small>/ pax</small></strong>
          </div>
          <div className="tolerance">
            <div>
              <b>Estimate tolerance</b>
              <span>Target validasi ±5%</span>
            </div>
            <strong>Belum divalidasi</strong>
          </div>
          <button className="primary">Simpan simulasi <span>→</span></button>
          <p className="summary-note">
            Validasi ulang ke vendor sebelum digunakan sebagai harga jual. Tidak ada klaim ketersediaan atau harga live.
          </p>
        </aside>
      </div>

      <footer>
        <span>UMROH.INTERNAL · v0.1 MVP</span>
        <span>Data seed lokal · Untuk penggunaan internal</span>
      </footer>
    </main>
  );
}
