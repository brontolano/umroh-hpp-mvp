import React from 'react';
import type { Item } from '../data/contract';
import type { LiveFlight } from '../data/live';

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

interface DailyTableProps {
  flights: Item[];
  liveFlights?: LiveFlight[];
  simDate: string;
  origin: string;
}

export default function DailyTable({ flights, liveFlights, simDate, origin }: DailyTableProps) {
  const originCode = origin.split(' ')[0];

  const hasLive = liveFlights && liveFlights.length > 0;
  const rows = hasLive
    ? liveFlights!
        .filter((f) => f.route.startsWith(originCode))
        .sort((a, b) => a.price - b.price)
    : flights
        .filter((f) => f.detail.startsWith(originCode))
        .sort((a, b) => a.price - b.price);

  if (rows.length === 0) {
    return (
      <p className="fine">
        Tidak ada data untuk {simDate} dari asal {originCode}.
      </p>
    );
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--border)' }}>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Airline</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Rute</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Durasi</th>
          <th style={{ textAlign: 'right', padding: '0.5rem' }}>Harga (IDR)</th>
          <th style={{ textAlign: 'center', padding: '0.5rem' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((f, i) => {
          const name = hasLive ? (f as LiveFlight).airline : (f as Item).name;
          const route = hasLive ? (f as LiveFlight).route : (f as Item).detail;
          const price = (f as LiveFlight).price ?? (f as Item).price;
          const isLive = hasLive || (f as Item).status === 'live';
          const duration = hasLive ? (f as LiveFlight).duration : '';

          return (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.5rem' }}><b>{name}</b></td>
              <td style={{ padding: '0.5rem', color: 'var(--muted-foreground)' }}>{route}</td>
              <td style={{ padding: '0.5rem', color: 'var(--muted-foreground)' }}>{duration}</td>
              <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 600 }}>
                {rupiah(price)}
              </td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px',
                    background: isLive ? '#d1fae5' : '#fef3c7',
                    color: isLive ? '#065f46' : '#92400e',
                  }}
                >
                  {isLive ? 'LIVE' : 'Indikatif'}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
