'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  INK,
  INK_45,
  INK_70,
  ON_INK,
  ORANGE,
  ORANGE_INK,
  PAPER,
  RED,
  TERM,
  RANKS,
  LINKS,
} from '@/lib/data';

/**
 * The hero is ONE panel.
 *
 * The old build made every block its own bordered, drop-shadowed box — seven
 * of them, all the same weight, so the eye had nowhere to land. Here the outer
 * frame carries the whole shadow and the cells are separated by 3px ink
 * gutters: the grid's background shows through its own gaps. That is how a
 * manga page is actually ruled, and it costs one border instead of seven.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const fluid = useRef(true);

  // A pointer tilt is meaningless on touch and unwelcome under reduced motion.
  useEffect(() => {
    fluid.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /**
   * Panels poof in one after another once the splash clears — and must be held
   * invisible until then. `<main>` renders under the splash from first paint,
   * so a panel that animated on mount would be seen through the splash's fade
   * and then pop a second time, which reads as a double reveal.
   */
  const clone = (order: number, style: React.CSSProperties) => ({
    className: ready ? 'clone' : 'clone-wait',
    style: (ready ? { ...style, '--d': `${order * 55}ms` } : style) as React.CSSProperties,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fluid.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 10,
      y: ((e.clientY - r.top) / r.height - 0.5) * 8,
    });
  };

  const cell: React.CSSProperties = { background: PAPER };

  return (
    <section
      id="top"
      style={{ padding: 'clamp(14px, 3vw, 28px)', display: 'flex', justifyContent: 'center' }}
    >
      <div
        className="panel-hero hero-grid"
        style={{
          width: '100%',
          maxWidth: 1240,
          // the grid's own background is what shows through the gaps, so the
          // gutters between cells are real ink lines rather than seven borders
          background: INK,
          gap: 3,
        }}
      >
        {/* ---- portrait ---- */}
        <div
          onMouseMove={onMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
            setTilt({ x: 0, y: 0 });
          }}
          {...clone(0, {
            ...cell,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 'clamp(320px, 56vw, 500px)',
          })}
        >
          {/* speed lines, kept faint — they are texture, not a subject */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-conic-gradient(from 0deg at 50% 45%, var(--ink) 0deg 1.2deg, transparent 1.2deg 5deg)',
              opacity: 0.1,
            }}
          />
          <Image
            src="/hero-manga.png"
            alt="Chathuranga L Jayawardhana, drawn manga style"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 640px"
            style={{
              objectFit: 'cover',
              objectPosition: '50% 30%',
              transform: `scale(${hover ? 1.04 : 1.01}) translate(${-tilt.x}px, ${-tilt.y}px)`,
              transition: 'transform 220ms var(--ease-out)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 16,
              bottom: 18,
              background: ORANGE,
              border: `3px solid ${INK}`,
              padding: '5px 16px 7px',
              transform: 'rotate(-2.5deg)',
              boxShadow: `4px 4px 0 ${INK}`,
            }}
          >
            <span
              className="t-sfx"
              style={{ fontSize: 'clamp(20px, 5vw, 27px)', color: 'var(--fixed-ink)' }}
            >
              ドン！ ENTER
            </span>
          </div>

          <div
            style={{
              position: 'absolute',
              right: 14,
              top: 14,
              background: INK,
              color: ON_INK,
              padding: '5px 11px',
              fontWeight: 800,
              fontSize: 11.5,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
            }}
          >
            Hidden Leaf · Colombo
          </div>
        </div>

        {/* ---- right column: its own grid, so the gutters continue ---- */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr',
            background: INK,
            gap: 3,
          }}
        >
          {/* name — the loudest type on the page, and the only thing at this size */}
          <div
            {...clone(1, {
              ...cell,
              padding: 'clamp(20px, 3.6vw, 30px) clamp(18px, 3.2vw, 26px)',
              position: 'relative',
              overflow: 'hidden',
            })}
          >
            <div
              className="t-sfx"
              style={{
                fontSize: 'clamp(15px, 3.4vw, 18px)',
                color: RED,
                transform: 'rotate(-1.5deg)',
                display: 'inline-block',
              }}
            >
              ズン！ NAME REVEAL
            </div>
            <h1
              className="t-display"
              style={{
                fontSize: 'clamp(33px, 7.4vw, 58px)',
                margin: '8px 0 0',
                color: INK,
                textShadow: `3px 3px 0 ${ORANGE}`,
              }}
            >
              Chathuranga L
              <br />
              Jayawardhana
            </h1>
            <div
              style={{
                marginTop: 14,
                display: 'inline-block',
                background: INK,
                color: ON_INK,
                fontWeight: 800,
                fontSize: 12.5,
                letterSpacing: '0.18em',
                padding: '6px 13px',
                textTransform: 'uppercase',
              }}
            >
              Software Engineer
            </div>
          </div>

          {/* quote — a speech tail pins it to the panel above */}
          <div
            {...clone(2, {
              ...cell,
              padding: 'clamp(16px, 3vw, 22px) clamp(18px, 3.2vw, 26px)',
              position: 'relative',
            })}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 32,
                top: -14,
                width: 0,
                height: 0,
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderBottom: `14px solid ${PAPER}`,
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px, 3.4vw, 17.5px)',
                fontWeight: 600,
                lineHeight: 1.55,
                color: INK,
              }}
            >
              “Crafting scalable web platforms with{' '}
              <span style={{ color: ORANGE_INK }}>Next.js</span>,{' '}
              <span style={{ color: ORANGE_INK }}>Angular</span> &amp;{' '}
              <span style={{ color: ORANGE_INK }}>Node.js</span>.”
            </p>
          </div>

          {/* mission scroll — the one inverted cell, so it reads as a terminal */}
          <div {...clone(3, { background: INK, padding: '15px clamp(18px, 3.2vw, 24px)' })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
              <span aria-hidden style={{ width: 8, height: 8, background: ORANGE }} />
              <span
                className="t-label"
                style={{ color: ON_INK, fontSize: 10.5 }}
              >
                Mission Scroll · 巻物
              </span>
            </div>
            <div className="t-mono" style={{ color: TERM }}>
              $ ninja --status
            </div>
            <div className="t-mono" style={{ color: ON_INK, marginTop: 4 }}>
              Exploring Go 🐹 · Experimenting with Flutter 📱
              <span aria-hidden style={{ color: ORANGE, animation: 'blink 1s step-end infinite' }}>
                ▌
              </span>
            </div>
          </div>

          {/* actions */}
          <div
            {...clone(4, {
              ...cell,
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              alignItems: 'center',
              padding: 'clamp(16px, 3vw, 20px) clamp(18px, 3.2vw, 26px)',
            })}
          >
            <a className="btn btn-primary pressable" href="#projects" style={{ flex: '1 1 160px' }}>
              View Missions →
            </a>
            <a
              className="btn btn-secondary pressable"
              href={`mailto:${LINKS.email}`}
              style={{ flex: '1 1 160px' }}
            >
              Summon Me
            </a>
          </div>
        </div>

        {/* ---- rank strip ---- */}
        <div
          {...clone(5, {
            ...cell,
            gridColumn: '1 / -1',
            padding: '13px clamp(16px, 3vw, 24px)',
          })}
        >
          <div className="rank-strip">
            <ul
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {RANKS.map((r) => (
                <li
                  key={r.label}
                  className="t-label"
                  style={{
                    border: `2px solid ${INK}`,
                    background: r.bg,
                    color: r.fg,
                    padding: '5px 11px',
                  }}
                >
                  {r.label}
                </li>
              ))}
            </ul>
            <div
              style={{
                display: 'flex',
                gap: 'clamp(14px, 3vw, 22px)',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <span className="t-kanji" style={{ fontSize: 13, color: INK_45 }}>
                連絡
              </span>
              {[
                { href: LINKS.github, label: 'GitHub' },
                { href: LINKS.linkedin, label: 'LinkedIn' },
                { href: `mailto:${LINKS.email}`, label: 'Email' },
              ].map((l) => (
                <a
                  key={l.label}
                  className="link t-label"
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{ color: INK_70 }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
