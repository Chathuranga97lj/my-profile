import type { Metadata } from 'next';
import { Anton, Bangers, Figtree, Zen_Antique } from 'next/font/google';
import './globals.css';

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' });
const bangers = Bangers({ weight: '400', subsets: ['latin'], variable: '--font-bangers', display: 'swap' });

// Body face. A latin variable font — the whole 300–900 range ships as one file,
// so every weight the design uses (500/700/900) is covered by a single request.
const body = Figtree({ subsets: ['latin'], variable: '--font-zen', display: 'swap' });

// Japanese display face, only used for the kanji accents.
const zenAntique = Zen_Antique({ weight: '400', subsets: ['latin'], variable: '--font-antique', display: 'swap' });

export const metadata: Metadata = {
  title: 'Chathuranga L Jayawardhana — Software Engineer',
  description: 'Crafting scalable web platforms with Next.js, Angular & Node.js. Colombo, Sri Lanka.',
  openGraph: {
    title: 'Chathuranga L Jayawardhana — Software Engineer',
    description: 'Crafting scalable web platforms with Next.js, Angular & Node.js.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${bangers.variable} ${body.variable} ${zenAntique.variable}`}>
      <body style={{ fontFamily: 'var(--font-zen), sans-serif' }}>{children}</body>
    </html>
  );
}
