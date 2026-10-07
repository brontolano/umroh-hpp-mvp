import React from 'react';

interface ControlBarProps {
  origin: string;
  setOrigin: (v: string) => void;
  duration: number;
  setDuration: (v: number) => void;
  pax: number;
  setPax: (v: number) => void;
  occupancy: string;
  setOccupancy: (v: string) => void;
  simDate: string;
  setSimDate: (v: string) => void;
}

export default function ControlBar({
  origin, setOrigin,
  duration, setDuration,
  pax, setPax,
  occupancy, setOccupancy,
  simDate, setSimDate,
}: ControlBarProps) {
  return (
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
        <input
          type="date"
          value={simDate}
          min="2027-01-01"
          max="2027-01-31"
          onChange={(e) => setSimDate(e.target.value)}
        />
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
  );
}
