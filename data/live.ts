import rawFlights from './live/flights.json';

export interface LiveFlight {
  airline: string;
  route: string;
  duration: string;
  pergi: string;
  pulang: string;
  price: number;
  status: 'live';
  source: string;
}

type RawLive = Record<string, LiveFlight[]>;

const liveData: RawLive = rawFlights as RawLive;

export function getLiveFlights(key: string): LiveFlight[] {
  return liveData[key] ?? [];
}

export function getLiveFlightsByOrigin(origin: string, date: string): LiveFlight[] {
  const key = `${date}-${origin}-9D7N`;
  // fallback: try CGK-style key
  return liveData[key] ?? liveData[`${origin}_${date}`] ?? [];
}

export const liveKeys = Object.keys(liveData);
