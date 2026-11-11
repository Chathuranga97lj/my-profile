'use client';

import { useState } from 'react';
import { FILTERS, INK, INK_45, INK_70, ORANGE_INK, PAPER, PROJECTS, SKY, type FilterKey } from '@/lib/data';

export default function Projects() {
  const [filter, setFilter] = useState<FilterKey>('all');

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.filterKey === filter);

  return (
    <section id="projects" className="panel" style={{ padding: 'clamp(18px, 3.4vw, 30px)' }}>
      <div className="section-head">
        <div
          data-reveal="pop"
          style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(10px, 2vw, 14px)', flexWrap: 'wrap' }}
        >
          <h2 className="t-section" style={{ color: INK, textShadow: `3px 3px 0 ${SKY}` }}>
            Mission Log
          </h2>
          <span className="t-kanji" style={{ fontSize: 'clamp(15px, 3.2vw, 19px)', color: INK_45 }}>
            任務記録
          </span>
        </div>

        <div data-reveal="right" className="filter-bar" role="group" aria-label="Filter missions">
          {FILTERS.map((f, i) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className="pressable"
              style={{
                border: 'none',
                borderLeft: i === 0 ? 'none' : `2px solid ${INK}`,
                padding: '9px clamp(12px, 2.6vw, 16px)',
                fontFamily: 'inherit',
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                background: filter === f.key ? INK : PAPER,
                color: filter === f.key ? 'var(--paper)' : INK,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-cards">
        {visible.map((proj, i) => (
          <article
            key={proj.name}
            className="card"
            data-reveal="up"
            data-delay={i * 70}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div
              style={{
                position: 'relative',
                height: 132,
                borderBottom: `2px solid ${INK}`,
                background:
                  'repeating-conic-gradient(from 0deg at 50% 50%, var(--ink) 0deg 0.9deg, transparent 0.9deg 7deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <span
                className="t-sfx"
                style={{
                  fontSize: 'clamp(24px, 6vw, 31px)',
                  color: INK,
                  background: PAPER,
                  border: `2px solid ${INK}`,
                  padding: '2px 15px',
                  transform: 'rotate(-3deg)',
                }}
              >
                {proj.sfx}
              </span>
              <span
                className="t-sfx"
                style={{
                  position: 'absolute',
                  top: 9,
                  left: 9,
                  background: proj.rankBg,
                  color: proj.rankFg,
                  border: `2px solid ${INK}`,
                  fontSize: 14,
                  padding: '1px 9px',
                }}
              >
                {proj.rank}
              </span>
            </div>

            <div
              style={{
                padding: 'clamp(16px, 2.8vw, 20px)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <h3
                className="t-display"
                style={{ fontSize: 'clamp(19px, 4vw, 22px)', margin: 0, color: INK }}
              >
                {proj.name}
              </h3>
              <div className="t-label" style={{ color: ORANGE_INK, margin: '6px 0 10px' }}>
                {proj.category}
              </div>

              {/* flex:1 rather than the old min-height guess — the cards line
                  up because the column stretches, not because 66px happened to
                  fit the longest description at one particular width */}
              <p className="t-body" style={{ margin: '0 0 16px', flex: 1, fontSize: 14 }}>
                {proj.desc}
              </p>

              <ul
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  margin: '0 0 15px',
                  padding: 0,
                  listStyle: 'none',
                }}
              >
                {proj.tech.map((t) => (
                  <li
                    key={t}
                    className="chip t-mono"
                    style={{ fontSize: 11, padding: '3px 8px' }}
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  borderTop: `2px solid ${INK}`,
                  paddingTop: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 14,
                }}
              >
                <a
                  className="link t-label"
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${proj.name} live`}
                >
                  View live ↗
                </a>
                <span className="t-label" style={{ color: INK_45 }}>
                  {proj.year}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="t-body" style={{ margin: '16px 0 0', fontSize: 12.5, color: INK_70 }} aria-live="polite">
        {visible.length} {visible.length === 1 ? 'mission' : 'missions'} shown
      </p>
    </section>
  );
}
