'use client';

import { useState } from 'react';
import { INK, ORANGE, PAPER, STACK, PROJECTS } from '@/lib/data';

export default function Stack() {
  const [hovered, setHovered] = useState<{ name: string; key: string } | null>(null);
  const bangers = { fontFamily: 'var(--font-bangers), cursive' } as const;

  const used = hovered ? PROJECTS.filter((p) => p.filterKey === hovered.key) : [];

  return (
    <section id="stack" className="manga-page" style={{ maxWidth: 1320, margin: '0 auto 28px', padding: 'clamp(16px, 3vw, 26px)' }}>
      <div data-reveal="slam" style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(10px, 2vw, 16px)', flexWrap: 'wrap', marginBottom: 6 }}>
        <h2 style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(30px, 7vw, 44px)', margin: 0, textTransform: 'uppercase', color: INK, letterSpacing: -0.5, textShadow: `4px 4px 0 ${ORANGE}` }}>
          Jutsu Arsenal
        </h2>
        <span style={{ fontFamily: 'var(--font-antique), serif', fontSize: 'clamp(16px, 3.6vw, 20px)', color: '#B91C1C' }}>術の書</span>
      </div>
      <p data-reveal="up" style={{ margin: '0 0 24px', fontWeight: 700, color: '#4A443C', fontSize: 15 }}>
        Hover a jutsu to reveal the missions it was used on.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 18 }}>
        {STACK.map((cat) => (
          <div key={cat.label} data-reveal="up" data-delay={cat.delay} style={{ border: `4px solid ${INK}`, background: PAPER, padding: 'clamp(16px, 3vw, 20px)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -14, left: 16, background: cat.tagBg, color: cat.tagFg, border: `3px solid ${INK}`, ...bangers, fontSize: 17, letterSpacing: 1.5, padding: '2px 12px' }}>
              {cat.label}
            </div>
            <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700, color: '#6B6455' }}>{cat.desc}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 16 }}>
              {cat.techs.map((t) => {
                const on = hovered?.name === t.name;
                return (
                  <div
                    key={t.name}
                    onMouseEnter={() => setHovered({ name: t.name, key: t.key })}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      border: `3px solid ${INK}`,
                      background: on ? ORANGE : PAPER,
                      color: INK,
                      fontWeight: 900,
                      fontSize: 13.5,
                      letterSpacing: 0.5,
                      padding: '7px 13px',
                      cursor: 'default',
                      boxShadow: on ? `4px 4px 0 ${INK}` : 'none',
                      transform: on ? 'translate(-2px,-2px)' : 'none',
                      transition: 'all .15s',
                    }}
                  >
                    {t.name}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {hovered && (
        <div style={{ marginTop: 22, border: `4px solid ${INK}`, background: INK, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ ...bangers, fontSize: 20, letterSpacing: 2, color: ORANGE }}>USED ON →</span>
          {used.map((p) => (
            <span key={p.name} style={{ border: `3px solid ${PAPER}`, color: PAPER, fontWeight: 900, fontSize: 13.5, padding: '6px 12px' }}>
              {p.name}
            </span>
          ))}
          {used.length === 0 && (
            <span style={{ color: '#8A8377', fontWeight: 700, fontSize: 13.5 }}>— training arc, no mission logged yet —</span>
          )}
        </div>
      )}
    </section>
  );
}
