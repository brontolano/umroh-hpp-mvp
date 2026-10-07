import React from 'react';
import type { PartnerReference } from '../data/contract';

export default function PartnerCard({ p }: { p: PartnerReference }) {
  return (
    <article className="item">
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
  );
}
