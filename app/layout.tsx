import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Umroh.internal — HPP Calculator', description: 'Kalkulator HPP Umrah internal' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="id"><body>{children}</body></html>; }
