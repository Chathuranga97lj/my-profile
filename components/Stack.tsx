'use client';

import { useState } from 'react';
import { INK, INK_45, ON_INK, ON_INK_70, ORANGE, PAPER, STACK, PROJECTS } from '@/lib/data';

export default function Stack() {
  /** Set by click (sticks) or by hover preview on a fine pointer. */
  const [picked, setPicked] = useState<{ name: string; key: string } | null>(null);
  const [preview, setPreview] = useState<{ name: string; key: string } | null>(null);

  const active = preview ?? picked;
  const used = active ? PROJECTS.filter((p) => p.filterKey === active.key) : [];

  return (
    <section id="stack" className="panel" style={{ padding: 'clamp(18px, 3.4vw, 30px)' }}>
      <div className="section-head">
        <div data-reveal="pop">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(10px, 2vw, 14px)', flexWrap: 'wrap' }}>
            <h2 className="t-section" style={{ color: INK, textShadow: `3px 3px 0 ${ORANGE}` }}>
              Jutsu Arsenal
            </h2>
            <span className="t-kanji" style={{ fontSize: 'clamp(15px, 3.2vw, 19px)', color: INK_45 }}>
              術の書
            </span>
          </div>
          <p className="t-body" style={{ margin: '12px 0 0', maxWidth: '52ch' }}>
            Pick a jutsu to see the missions it was used on.
          </p>
        </div>
      </div>

      <div className="grid-cards">
        {STACK.map((cat) => (
          <div
            key={cat.label}
            data-reveal="up"
            data-delay={cat.delay}
            style={{
              border: `2px solid ${INK}`,
              background: PAPER,
              padding: 'clamp(18px, 3vw, 22px) clamp(16px, 2.6vw, 20px)',
              position: 'relative',
            }}
          >
            <div
              className="t-sfx"
              style={{
                position: 'absolute',
                top: -13,
                left: 14,
                background: cat.tagBg,
                color: cat.tagFg,
                border: `2px solid ${INK}`,
                fontSize: 15,
                padding: '2px 11px',
              }}
            >
              {cat.label}
            </div>
            <div className="t-label" style={{ marginTop: 8, color: INK_45 }}>
              {cat.desc}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 15 }}>
              {cat.techs.map((t) => {
                const on = active?.name === t.name;
                const isPicked = picked?.name === t.name;
                return (
                  <button
                    key={t.name}
                    className="pressable"
                    aria-pressed={isPicked}
                    onClick={() => setPicked(isPicked ? null : { name: t.name, key: t.key })}
                    onMouseEnter={() => setPreview({ name: t.name, key: t.key })}
                    onMouseLeave={() => setPreview(null)}
                    onFocus={() => setPreview({ name: t.name, key: t.key })}
                    onBlur={() => setPreview(null)}
                    style={{
                      border: `2px solid ${INK}`,
                      background: on ? ORANGE : PAPER,
                      color: on ? 'var(--fixed-ink)' : INK,
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.01em',
                      padding: '7px 12px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Always rendered. Mounting this only when something is selected made
          the whole page below it jump by ~70px on every hover. */}
      <div
        aria-live="polite"
        style={{
          marginTop: 20,
          border: `2px solid ${INK}`,
          background: INK,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          minHeight: 58,
        }}
      >
        <span className="t-label" style={{ color: ORANGE, flex: 'none' }}>
          Used on →
        </span>
        {!active && (
          <span style={{ color: ON_INK_70, fontWeight: 600, fontSize: 13.5 }}>
            nothing selected
          </span>
        )}
        {active && used.length === 0 && (
          <span style={{ color: ON_INK_70, fontWeight: 600, fontSize: 13.5 }}>
            training arc — no mission logged yet
          </span>
        )}
        {used.map((p) => (
          <span
            key={p.name}
            style={{
              border: `2px solid ${ON_INK}`,
              color: ON_INK,
              fontWeight: 700,
              fontSize: 13,
              padding: '5px 11px',
            }}
          >
            {p.name}
          </span>
        ))}

        {picked && (
          <span
            className="t-label"
            style={{ color: ON_INK_70, marginLeft: 'auto', fontSize: 10.5 }}
          >
            pinned — tap again to clear
          </span>
        )}
      </div>
    </section>
  );
}
