import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Both faces are self-hosted from app/fonts (SIL Open Font License, see the
// OFL-*.txt files), so the build never has to reach Google Fonts.

// Headings: Dela Gothic One, latin subset only, one weight.
const display = localFont({
  src: './fonts/dela-gothic-one-latin-400-normal.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
  fallback: ['Arial Black', 'Impact', 'sans-serif'],
});

// Body: Figtree, a latin variable font — the whole 300–900 range is one file.
const body = localFont({
  src: './fonts/figtree-latin-wght-normal.woff2',
  weight: '300 900',
  style: 'normal',
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

const description =
  'Software engineer in Colombo, Sri Lanka. I build websites and web apps with Next.js, Angular and Node.js.';

export const metadata: Metadata = {
  title: 'Chathuranga L Jayawardhana, Software Engineer',
  description,
  openGraph: {
    title: 'Chathuranga L Jayawardhana, Software Engineer',
    description,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}>{children}</body>
    </html>
  );
}
