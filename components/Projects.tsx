'use client';

import { useState } from 'react';
import { FILTERS, INK, PAPER, PROJECTS, SKY, type FilterKey } from '@/lib/data';

export default function Projects() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const bangers = { fontFamily: 'var(--font-bangers), cursive' } as const;

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.filterKey === filter);

  return (
    <section id="projects" className="manga-page" style={{ maxWidth: 1320, margin: '0 auto 28px', padding: 'clamp(16px, 3vw, 26px)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
        <div data-reveal="slam" style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(10px, 2vw, 16px)', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(30px, 7vw, 44px)', margin: 0, textTransform: 'uppercase', color: INK, letterSpacing: -0.5, textShadow: `4px 4px 0 ${SKY}` }}>
            Mission Log
          </h2>
          <span style={{ fontFamily: 'var(--font-antique), serif', fontSize: 'clamp(16px, 3.6vw, 20px)', color: '#B91C1C' }}>任務記録</span>
        </div>
        <div data-reveal="right" className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                border: 'none',
                borderRight: `3px solid ${INK}`,
                padding: '10px clamp(12px, 3vw, 16px)',
                ...bangers,
                fontSize: 'clamp(15px, 3.6vw, 17px)',
                letterSpacing: 1.5,
                cursor: 'pointer',
                background: filter === f.key ? INK : PAPER,
                color: filter === f.key ? '#F97316' : INK,
                transition: 'all .15s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(330px, 100%), 1fr))', gap: 20 }}>
        {visible.map((proj, i) => (
          <article key={proj.name} className="card-manga" data-reveal="up" data-delay={i * 120} style={{ border: `4px solid ${INK}`, background: PAPER }}>
            <div style={{ position: 'relative', height: 150, borderBottom: `4px solid ${INK}`, background: 'repeating-conic-gradient(from 0deg at 50% 50%, #14110F 0deg 0.9deg, transparent 0.9deg 7deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <span style={{ ...bangers, fontSize: 'clamp(26px, 7vw, 34px)', letterSpacing: 3, color: INK, background: PAPER, border: `3px solid ${INK}`, padding: '2px 16px', animation: 'sfxJitter 3s ease-in-out infinite' }}>
                {proj.sfx}
              </span>
              <span style={{ position: 'absolute', top: 10, left: 10, background: proj.rankBg, color: proj.rankFg, border: `3px solid ${INK}`, ...bangers, fontSize: 16, letterSpacing: 1.5, padding: '2px 10px' }}>
                {proj.rank}
              </span>
            </div>
            <div style={{ padding: 'clamp(16px, 3vw, 20px)' }}>
              <h3 style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(21px, 5vw, 24px)', margin: '0 0 4px', textTransform: 'uppercase', color: INK }}>{proj.name}</h3>
              <div style={{ fontWeight: 900, fontSize: 12, letterSpacing: 2, color: '#E8590C', textTransform: 'uppercase', marginBottom: 10 }}>{proj.category}</div>
              <p style={{ margin: '0 0 16px', fontSize: 14.5, fontWeight: 500, lineHeight: 1.55, color: '#4A443C', minHeight: 66 }}>{proj.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
                {proj.tech.map((t) => (
                  <span key={t} style={{ border: `2px solid ${INK}`, background: '#EDE6D6', fontFamily: 'ui-monospace, monospace', fontSize: 11.5, fontWeight: 700, padding: '4px 9px', color: INK }}>{t}</span>
                ))}
              </div>
              <div style={{ borderTop: `3px solid ${INK}`, paddingTop: 14, display: 'flex', gap: 18, ...bangers, fontSize: 17, letterSpacing: 1.5 }}>
                <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: '#E8590C' }}>VIEW LIVE ↗</a>
                <span style={{ color: '#8A8377' }}>{proj.year}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
