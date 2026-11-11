import type { Metadata, Viewport } from 'next';
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

// themeColor lives on `viewport`, not `metadata` — the two values let the
// mobile browser chrome match whichever page the visitor is on.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e9e1cf' },
    { media: '(prefers-color-scheme: dark)', color: '#100e0c' },
  ],
};

/**
 * Runs before the first paint, so neither the theme nor the splash can flash
 * the wrong state. Deliberately tiny and wrapped in try/catch: Safari private
 * mode throws on storage access, and a throw here would block rendering.
 */
const BOOT = `
(function(){
  try {
    var d = document.documentElement;
    var stored = localStorage.getItem('theme');
    d.dataset.theme = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var seen = sessionStorage.getItem('splash-seen') === '1';
    var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || still) d.dataset.splash = 'skip';
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${bangers.variable} ${body.variable} ${zenAntique.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body style={{ fontFamily: 'var(--font-zen), sans-serif' }}>{children}</body>
    </html>
  );
}
