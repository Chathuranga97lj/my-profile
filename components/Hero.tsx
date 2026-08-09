'use client';

import Image from 'next/image';
import { useState } from 'react';
import { INK, ORANGE, PAPER, RANKS, LINKS } from '@/lib/data';

export default function Hero({ ready }: { ready: boolean }) {
  const [hover, setHover] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  /**
   * Panels poof into existence one after another once the splash clears.
   *
   * They must be held invisible until then: the splash fades out over ~600ms,
   * and a panel sitting behind it would be seen through the fade and then pop
   * a second time. `clone-wait` keeps the ground empty so the clones land on
   * bare paper. Merges into a panel's own class and style rather than
   * replacing them.
   */
  const clone = (order: number, style: React.CSSProperties, className?: string) => ({
    className: [className, ready ? 'clone' : 'clone-wait'].filter(Boolean).join(' '),
    style: (ready ? { ...style, '--d': `${order * 90}ms` } : style) as React.CSSProperties,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 14,
      y: ((e.clientY - r.top) / r.height - 0.5) * 10,
    });
  };

  const bangers = { fontFamily: 'var(--font-bangers), cursive' } as const;
  const antique = { fontFamily: 'var(--font-antique), serif' } as const;

  return (
    <section style={{ padding: 'clamp(12px, 3vw, 28px)', display: 'flex', justifyContent: 'center' }}>
      <div
        className="manga-page hero-grid"
        style={{
          width: '100%',
          maxWidth: 1320,
          padding: 'clamp(12px, 2vw, 20px)',
          display: 'grid',
          gap: 16,
        }}
      >
        {/* chapter bar */}
        <div {...clone(0, { gridColumn: '1 / -1', border: `3px solid ${INK}`, background: INK, padding: '10px clamp(12px, 2.5vw, 18px)' }, 'chapter-bar')}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ ...bangers, fontSize: 'clamp(20px, 5vw, 26px)', letterSpacing: 2, color: ORANGE }}>CHAPTER 01</span>
            <span style={{ ...antique, fontSize: 'clamp(13px, 3.5vw, 16px)', color: PAPER }}>第一話 — エンジニア</span>
          </div>
          <nav className="chapter-nav" style={{ fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase' }}>
            <a className="nav-link" href="#stack">Jutsu</a>
            <a className="nav-link" href="#projects">Missions</a>
            <a className="nav-link" href="#path">Ninja Way</a>
            <a className="nav-link" href="#contact">Summon</a>
          </nav>
        </div>

        {/* photo panel */}
        <div
          onMouseMove={onMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }); }}
          {...clone(1, { position: 'relative', border: `4px solid ${INK}`, overflow: 'hidden', background: PAPER, minHeight: 'clamp(340px, 62vw, 520px)' })}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-conic-gradient(from 0deg at 50% 45%, #14110F 0deg 1.2deg, transparent 1.2deg 5deg)', opacity: 0.14 }} />
          <Image
            src="/hero-manga.png"
            alt="Chathuranga L Jayawardhana, drawn manga style"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 720px"
            style={{
              objectFit: 'cover',
              objectPosition: '50% 30%',
              transform: `scale(${hover ? 1.06 : 1.01}) translate(${-tilt.x}px, ${-tilt.y}px)`,
              transition: 'transform .2s ease-out',
              filter: 'contrast(1.12)',
            }}
          />

          <div style={{ position: 'absolute', left: -2, bottom: 56, background: ORANGE, border: `3px solid ${INK}`, padding: '6px clamp(12px, 3vw, 20px) 8px', transform: 'rotate(-3deg)', boxShadow: `5px 5px 0 ${INK}` }}>
            <span style={{ ...bangers, fontSize: 'clamp(21px, 5.5vw, 30px)', letterSpacing: 2, color: INK }}>ドン！ ENTER</span>
          </div>

          <div style={{ position: 'absolute', right: 12, top: 12, background: INK, color: PAPER, padding: '6px 12px', ...bangers, fontSize: 'clamp(14px, 3.6vw, 19px)', letterSpacing: 1.5, transform: 'rotate(3deg)' }}>
            HIDDEN LEAF · COLOMBO
          </div>

          {hover && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', left: 16, top: '22%', background: PAPER, border: `3px solid ${INK}`, padding: '5px 12px', ...bangers, fontSize: 20, color: INK, transform: 'rotate(-5deg)', animation: 'floatY 3s ease-in-out infinite' }}>NEXT.JS</div>
              <div style={{ position: 'absolute', right: 18, top: '46%', background: INK, border: `3px solid ${ORANGE}`, padding: '5px 12px', ...bangers, fontSize: 20, color: ORANGE, transform: 'rotate(4deg)', animation: 'floatY 3.6s ease-in-out infinite' }}>NODE.JS</div>
              <div style={{ position: 'absolute', left: '24%', bottom: '14%', background: PAPER, border: `3px solid ${INK}`, padding: '5px 12px', ...bangers, fontSize: 20, color: '#B91C1C', transform: 'rotate(-2deg)', animation: 'floatY 3.2s ease-in-out infinite' }}>GO 🐹</div>
            </div>
          )}
        </div>

        {/* right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div {...clone(2, { border: `4px solid ${INK}`, background: PAPER, padding: 'clamp(18px, 4vw, 26px) clamp(16px, 3.5vw, 24px)', position: 'relative', overflow: 'hidden' })}>
            <div style={{ position: 'absolute', right: -30, top: -30, width: 150, height: 150, border: `14px solid ${ORANGE}`, borderRadius: '50%', opacity: 0.35, animation: 'swirl 18s linear infinite' }} />
            <div style={{ ...bangers, fontSize: 'clamp(17px, 4.5vw, 22px)', letterSpacing: 2, color: '#B91C1C', transform: 'rotate(-2deg)', display: 'inline-block' }}>ズン！ NAME REVEAL</div>
            <h1 style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(31px, 8.5vw, 52px)', lineHeight: 0.98, margin: '10px 0 0', color: INK, letterSpacing: -0.5, textTransform: 'uppercase', textShadow: `4px 4px 0 ${ORANGE}` }}>
              Chathuranga L<br />Jayawardhana
            </h1>
            <div style={{ marginTop: 12, display: 'inline-block', background: INK, color: PAPER, fontWeight: 900, fontSize: 'clamp(13px, 3.4vw, 15px)', letterSpacing: 3, padding: '6px 14px', textTransform: 'uppercase' }}>
              Software Engineer
            </div>
          </div>

          <div {...clone(3, { border: `4px solid ${INK}`, background: PAPER, padding: 'clamp(18px, 3.5vw, 22px) clamp(16px, 3.5vw, 24px)', position: 'relative' })}>
            <div style={{ position: 'absolute', left: 34, top: -16, width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderBottom: `16px solid ${INK}` }} />
            <div style={{ position: 'absolute', left: 38, top: -10, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: `12px solid ${PAPER}` }} />
            <p style={{ margin: 0, fontSize: 'clamp(16px, 4vw, 19px)', fontWeight: 700, lineHeight: 1.5, color: INK }}>
              “Crafting scalable web platforms with <span style={{ color: '#E8590C' }}>Next.js</span>, <span style={{ color: '#E8590C' }}>Angular</span> &amp; <span style={{ color: '#E8590C' }}>Node.js</span>.”
            </p>
          </div>

          <div {...clone(4, { border: `4px solid ${INK}`, background: INK, padding: '16px 18px' })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
              <span style={{ width: 10, height: 10, background: ORANGE }} />
              <span style={{ ...bangers, letterSpacing: 2, fontSize: 16, color: PAPER }}>MISSION SCROLL · 巻物</span>
            </div>
            <div style={{ fontSize: 14, color: '#7DD3A0', fontFamily: 'ui-monospace, monospace' }}>$ ninja --status</div>
            <div style={{ fontSize: 14.5, color: PAPER, marginTop: 5, fontFamily: 'ui-monospace, monospace' }}>
              [Exploring Go 🐹 | Experimenting with Flutter 📱]
              <span style={{ color: ORANGE, animation: 'blink 1s step-end infinite' }}>▌</span>
            </div>
          </div>

          <div {...clone(5, { display: 'flex', gap: 14, flexWrap: 'wrap' })}>
            <a className="btn-manga shadow-ink" href="#projects" style={{ flex: '1 1 170px', textAlign: 'center', background: ORANGE, border: `4px solid ${INK}`, padding: '14px 18px', ...bangers, fontSize: 'clamp(19px, 4.6vw, 23px)', letterSpacing: 2, color: INK }}>
              VIEW MISSIONS →
            </a>
            <a className="btn-manga shadow-ink" href={`mailto:${LINKS.email}`} style={{ flex: '1 1 170px', textAlign: 'center', background: PAPER, border: `4px solid ${INK}`, padding: '14px 18px', ...bangers, fontSize: 'clamp(19px, 4.6vw, 23px)', letterSpacing: 2, color: INK }}>
              SUMMON ME
            </a>
          </div>
        </div>

        {/* rank strip */}
        <div {...clone(6, { gridColumn: '1 / -1', border: `4px solid ${INK}`, background: PAPER, padding: '12px clamp(12px, 2.5vw, 18px)' }, 'rank-strip')}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {RANKS.map((r) => (
              <span key={r.label} style={{ border: `2px solid ${INK}`, background: r.bg, color: r.fg, fontWeight: 900, fontSize: 12.5, letterSpacing: 1.5, padding: '6px 12px', textTransform: 'uppercase' }}>
                {r.label}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'clamp(14px, 3vw, 22px)', flexWrap: 'wrap', fontWeight: 900, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            <a className="footer-link" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="footer-link" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a className="footer-link" href={`mailto:${LINKS.email}`}>Email ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
