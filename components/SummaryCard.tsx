import React from 'react';

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

interface SummaryCardProps {
  total: number;
  margin: number;
  pax: number;
}

export default function SummaryCard({ total, margin, pax }: SummaryCardProps) {
  return (
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
  );
}
