import React, { useMemo } from 'react';
import type { HotelEntry } from '../data/liveHotels';
import { hotelRateToIdr, sarToIdr, SAR_TO_IDR } from '../data/liveHotels';

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

const sar = (n: number) => `${n.toLocaleString('id-ID')} SAR`;

interface HotelCatalogProps {
  hotels: HotelEntry[];
  simDate: string;
  occupancy: 'Double' | 'Triple' | 'Quad' | 'Quint' | string;
}

export default function HotelCatalog({ hotels, simDate, occupancy }: HotelCatalogProps) {
  const occ = (['Double', 'Triple', 'Quad', 'Quint'].includes(occupancy)
    ? occupancy
    : 'Quad') as 'Double' | 'Triple' | 'Quad' | 'Quint';

  const enriched = useMemo(() => {
    return hotels.map((h) => {
      const rateIdr = hotelRateToIdr(h, occ, simDate);
      return { hotel: h, rateIdr };
    });
  }, [hotels, simDate, occ]);

  const available = enriched.filter((e) => e.rateIdr !== null);
  const comingSoon = enriched.filter((e) => e.rateIdr === null);

  if (hotels.length === 0) {
    return <p className="fine">Belum ada data hotel.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p className="fine">
        Sumber: Katalog Al Khaif Group — Update 03 Agustus 2026. Harga SAR/room per malam ·{' '}
        Kurs 1 SAR = {SAR_TO_IDR.toLocaleString('id-ID')} IDR · Pilih tanggal untuk melihat harga berlaku.
        Total {hotels.length} hotel ({available.length} tersedia untuk {simDate}).
      </p>
      {available.map(({ hotel, rateIdr }) => (
        <article key={hotel.name + hotel.city} className="item">
          <div className="item-icon">⌂</div>
          <div className="item-main">
            <b>{hotel.name}</b>
            <small>
              {hotel.city} · {hotel.stars}★ · {hotel.category}
            </small>
            <small>
              Untuk {simDate} ({occ}): {sar(hotelRateToIdr(hotel, occ, simDate) ? Math.round((rateIdr as number) / SAR_TO_IDR) : 0)} SAR ·{' '}
              {rupiah(rateIdr as number)} IDR
            </small>
          </div>
          <div className="item-price">
            <b>{rupiah(rateIdr as number)}</b>
            <small>LIVE</small>
          </div>
        </article>
      ))}
      {comingSoon.length > 0 && (
        <details>
          <summary className="fine" style={{ cursor: 'pointer', padding: '0.25rem 0' }}>
            Belum tersedia untuk {simDate} ({comingSoon.length} hotel)
          </summary>
          {comingSoon.map(({ hotel }) => (
            <article key={hotel.name + hotel.city} className="item" style={{ opacity: 0.55 }}>
              <div className="item-icon">⌂</div>
              <div className="item-main">
                <b>{hotel.name}</b>
                <small>
                  {hotel.city} · {hotel.stars}★ · {hotel.category}
                </small>
                <small>Tarif untuk {simDate} belum dipublikasikan</small>
              </div>
              <div className="item-price">
                <b>—</b>
                <small>COMING SOON</small>
              </div>
            </article>
          ))}
        </details>
      )}
    </div>
  );
}