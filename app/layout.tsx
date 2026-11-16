import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Veritas | Verification Audit', description: 'Evidence-led fact and media verification' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
