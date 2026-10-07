import React from 'react';
import type { Item } from '../data/contract';

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

interface ItemCardProps {
  item: Item;
  icon: string;
}

export default function ItemCard({ item, icon }: ItemCardProps) {
  return (
    <article className="item">
      <div className="item-icon">{icon}</div>
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
  );
}
