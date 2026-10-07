import React from 'react';
import type {
  TransportEntry,
  VisaEntry,
  ServiceCategory,
  Contacts,
} from '../data/liveHotels';

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

const sar = (n: number) => `${n.toLocaleString('id-ID')} SAR`;

interface LivePartnerViewProps {
  transport: TransportEntry[];
  visa: VisaEntry[];
  services: ServiceCategory[];
  contacts: Contacts;
}

export default function LivePartnerView({
  transport, visa, services, contacts,
}: LivePartnerViewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <section>
        <h3 style={{ margin: '0 0 0.5rem' }}>Transportasi Umroh 1448 H</h3>
        {transport.map((tv) => (
          <details key={tv.vehicle} style={{ marginBottom: '0.5rem' }}>
            <summary style={{ cursor: 'pointer', padding: '0.4rem 0', fontWeight: 600 }}>
              {tv.vehicle}
              {tv.fullTripJeddahJED ? ` — Full Trip Jed-Jed: ${sar(tv.fullTripJeddahJED)}` : ''}
            </summary>
            <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.25rem' }}>Tujuan</th>
                  <th style={{ textAlign: 'right', padding: '0.25rem' }}>Harga</th>
                </tr>
              </thead>
              <tbody>
                {tv.rates.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px dashed var(--border)' }}>
                    <td style={{ padding: '0.25rem' }}>{r.route}</td>
                    <td style={{ textAlign: 'right', padding: '0.25rem' }}>{sar(r.price)}</td>
                  </tr>
                ))}
                {tv.madinahRoutes?.map((r, i) => (
                  <tr key={'m' + i} style={{ borderBottom: '1px dashed var(--border)' }}>
                    <td style={{ padding: '0.25rem', color: 'var(--muted-foreground)' }}>{r.route} (Madinah)</td>
                    <td style={{ textAlign: 'right', padding: '0.25rem' }}>{sar(r.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        ))}
      </section>

      <section>
        <h3 style={{ margin: '0 0 0.5rem' }}>Visa & Bus</h3>
        {visa.map((v, i) => (
          <article key={i} className="item">
            <div className="item-icon">▣</div>
            <div className="item-main">
              <b>{v.name}</b>
              {v.rules && (
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
                  {v.rules.map((rule, j) => (
                    <li key={j}>
                      {rule.minPax !== undefined && `≥${rule.minPax} pax: `}
                      {rule.maxPax !== undefined && `≤${rule.maxPax} pax: `}
                      {rule.priceUSD && `${rule.priceUSD} USD/pax`}
                      {rule.priceSAR && `${rule.priceSAR} SAR/pax`}
                      {rule.note && ` (${rule.note})`}
                    </li>
                  ))}
                </ul>
              )}
              {v.priceSAR && <small>{sar(v.priceSAR)}</small>}
              {v.includes && (
                <small>Include: {v.includes.join(', ')}</small>
              )}
              {v.items && (
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
                  {v.items.map((it, k) => (
                    <li key={k}>
                      {it.variant}: {sar(it.priceSAR)}
                      {it.minPax && ` (min ${it.minPax} box)`}
                    </li>
                  ))}
                </ul>
              )}
              {v.delivery && <small>Pengiriman: {v.delivery}</small>}
              {v.leadTime && <small>Lead time: {v.leadTime}</small>}
            </div>
            <div className="item-price">
              <b>{v.priceUSD ? `${v.priceUSD} USD` : v.priceSAR ? sar(v.priceSAR) : 'Lihat'}</b>
              <small>LIVE</small>
            </div>
          </article>
        ))}
      </section>

      <section>
        <h3 style={{ margin: '0 0 0.5rem' }}>Layanan & Add-on</h3>
        {services.map((cat) => (
          <details key={cat.category} style={{ marginBottom: '0.5rem' }}>
            <summary style={{ cursor: 'pointer', padding: '0.4rem 0', fontWeight: 600 }}>
              {cat.category} ({cat.items.length})
            </summary>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
              {cat.items.map((it, i) => (
                <li key={i} style={{ marginBottom: '0.25rem' }}>
                  <b>{it.name}</b>
                  {it.priceSAR !== undefined && ` — ${sar(it.priceSAR)}`}
                  {it.priceIDR !== undefined && ` — ${rupiah(it.priceIDR)}`}
                  {it.unit && ` ${it.unit}`}
                  {it.minPax !== undefined && ` (min ${it.minPax}${it.unit?.includes('Kg') ? ' Kg' : ' pax'})`}
                  {it.validity && ` (${it.validity})`}
                  {it.note && ` — ${it.note}`}
                  {it.includes && it.includes.length > 0 && (
                    <div style={{ color: 'var(--muted-foreground)', fontSize: '0.78rem' }}>
                      Include: {it.includes.join(' · ')}
                    </div>
                  )}
                  {it.bonus && (
                    <div style={{ color: 'var(--muted-foreground)', fontSize: '0.78rem' }}>
                      Bonus: {it.bonus}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>

      <section>
        <h3 style={{ margin: '0 0 0.5rem' }}>Kontak Mitra</h3>
        <p className="fine">
          Al Khaif Group Internasional · Partner: Ms. Tiurmadiah (Irma){' '}
          <a href={`https://wa.me/${contacts.bookingIndonesia.phone.replace(/[^0-9]/g, '')}`}>
            {contacts.bookingIndonesia.phone}
          </a>
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
          <li>CEO: {contacts.ceo.name} — {contacts.ceo.phone}</li>
          <li>Booking Indonesia: {contacts.bookingIndonesia.name} — {contacts.bookingIndonesia.phone}</li>
          <li>Sales Marketing: {contacts.salesMarketing.name} — {contacts.salesMarketing.phone}</li>
          <li>Handling Indonesia: {contacts.handlingIndonesia.name} — {contacts.handlingIndonesia.phone}</li>
          <li>Team Makkah: {contacts.teamMakkah.name} — {contacts.teamMakkah.phone}</li>
          <li>Team Madinah: {contacts.teamMadinah.name} — {contacts.teamMadinah.phone}</li>
          <li>Country Rep Yemen: {contacts.countryRepYemen.name} — {contacts.countryRepYemen.phone}</li>
          <li>Office: {contacts.office}</li>
          <li>Email: <a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
          <li>Instagram: {contacts.instagram}</li>
        </ul>
      </section>
    </div>
  );
}