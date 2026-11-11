'use client';

import Image from 'next/image';
import { useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { TailDown } from '@/components/ui';
import { BODY, CJ_LETTERS, DISPLAY_FONT, FACTS, INK, MUTED, NAME_LINES, PAPER, SPOT } from '@/lib/data';

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const SPEED_LINES =
  'radial-gradient(circle, transparent 29%, #000000 38%, #000000 55%, transparent 70%)';

export default function Hero() {
  const portrait = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState(false);
  const [hintSeen, setHintSeen] = useState(false);

  /**
   * The lens is three CSS variables on the portrait: --lens-x / --lens-y follow
   * the cursor instantly, --lens-r animates (it is a registered @property).
   * They are written straight to the element so the cursor never re-renders.
   */
  const aim = (el: HTMLDivElement, e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--lens-x', `${(e.clientX - r.left - el.clientLeft).toFixed(1)}px`);
    el.style.setProperty('--lens-y', `${(e.clientY - r.top - el.clientTop).toFixed(1)}px`);
  };

  const onEnter = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    aim(el, e);
    if (!photo) {
      el.style.setProperty('--lens-r', `${Math.round(clamp(el.clientWidth * 0.21, 56, 104))}px`);
      el.classList.add('is-lens');
    }
    setHintSeen(true);
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => aim(e.currentTarget, e);

  const onLeave = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.classList.remove('is-lens');
    if (!photo) el.style.setProperty('--lens-r', '0px');
  };

  // "Show my photo" grows the lens until it covers the whole panel.
  const togglePhoto = () => {
    const el = portrait.current;
    const next = !photo;
    if (el) {
      el.classList.remove('is-lens');
      if (next) {
        el.style.setProperty('--lens-x', `${(el.clientWidth / 2).toFixed(1)}px`);
        el.style.setProperty('--lens-y', `${(el.clientHeight * 0.32).toFixed(1)}px`);
        el.style.setProperty('--lens-r', `${Math.ceil(Math.hypot(el.clientWidth, el.clientHeight))}px`);
      } else {
        el.style.setProperty('--lens-r', '0px');
      }
    }
    setPhoto(next);
    setHintSeen(true);
  };

  return (
    <section
      id="top"
      aria-label="Introduction"
      style={{ position: 'relative', isolation: 'isolate', overflow: 'hidden', background: PAPER }}
    >
      <div className="wrap" style={{ paddingBlock: 'clamp(40px, 6vw, 84px) clamp(56px, 7vw, 96px)' }}>
        <div className="hero-grid">
          <div className="hero-copy">
            <div
              className="pop"
              style={
                {
                  '--d': '150ms',
                  position: 'relative',
                  display: 'inline-block',
                  padding: '9px 22px 11px',
                  background: PAPER,
                  border: `3px solid ${INK}`,
                  borderRadius: 999,
                  color: INK,
                  fontWeight: 900,
                  fontSize: 19,
                  lineHeight: 1.2,
                  transformOrigin: '20% 100%',
                } as CSSProperties
              }
            >
              Hi, I’m
              <TailDown left={28} tipX={4} />
            </div>

            {/* Font size comes from .hero-name (sized to the column) — keep it out of the inline style */}
            <h1
              className="hero-name"
              style={{
                marginTop: 28,
                color: INK,
                fontFamily: DISPLAY_FONT,
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: '-0.005em',
              }}
            >
              <span className="sr-only">Chathuranga Jayawardhana</span>
              {NAME_LINES.map((line, li) => (
                <span key={line} aria-hidden="true" style={{ display: 'block', whiteSpace: 'nowrap' }}>
                  {Array.from(line).map((ch, i) => (
                    <span
                      key={i}
                      className="letter"
                      style={{ animationDelay: `${240 + (li * NAME_LINES[0].length + i) * 26}ms` }}
                    >
                      <span className={CJ_LETTERS[li] === i ? 'letter-inner cj' : 'letter-inner'}>
                        {ch === ' ' ? ' ' : ch}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p
              className="rise"
              style={
                {
                  '--d': '620ms',
                  marginTop: 22,
                  color: INK,
                  fontSize: 'clamp(19px, 2.1vw, 23px)',
                  fontWeight: 900,
                  lineHeight: 1.35,
                } as CSSProperties
              }
            >
              Software engineer based in Colombo, Sri Lanka
            </p>
            <p
              className="rise"
              style={{ '--d': '720ms', marginTop: 14, maxWidth: '34em', color: BODY, fontSize: 18, lineHeight: 1.65 } as CSSProperties}
            >
              I build websites and web apps that grow with their users — from the pages people see to the servers
              behind them. Day to day, I work with Next.js, Angular and Node.js, and I’ve also built with Laravel and
              Flutter.
            </p>
            <div className="rise" style={{ '--d': '820ms', marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 16 } as CSSProperties}>
              <a
                href="#projects"
                className="btn"
                style={
                  {
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '15px 24px',
                    background: SPOT,
                    color: PAPER,
                    border: `3px solid ${INK}`,
                    boxShadow: `6px 6px 0 ${INK}`,
                    '--hover-shadow': `9px 9px 0 ${INK}`,
                    fontWeight: 900,
                    fontSize: 17,
                    lineHeight: 1.2,
                    textDecoration: 'none',
                  } as CSSProperties
                }
              >
                See my projects
              </a>
              <a
                href="#contact"
                className="btn"
                style={
                  {
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '15px 24px',
                    background: PAPER,
                    color: INK,
                    border: `3px solid ${INK}`,
                    boxShadow: `6px 6px 0 ${SPOT}`,
                    '--hover-shadow': `9px 9px 0 ${SPOT}`,
                    fontWeight: 900,
                    fontSize: 17,
                    lineHeight: 1.2,
                    textDecoration: 'none',
                  } as CSSProperties
                }
              >
                Get in touch
              </a>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: 500, justifySelf: 'center' }}>
            {/* Speed-line burst behind the panel; useScrollEffects turns it as you scroll */}
            <div
              aria-hidden="true"
              data-burst
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                zIndex: -1,
                width: '178%',
                aspectRatio: '1 / 1',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              <div
                className="burst"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'repeating-conic-gradient(from 0deg, rgba(0,0,0,0.12) 0deg 1.1deg, transparent 1.1deg 4.5deg)',
                  WebkitMaskImage: SPEED_LINES,
                  maskImage: SPEED_LINES,
                }}
              />
            </div>

            <div data-float style={{ position: 'relative' }}>
              {!hintSeen && (
                <div
                  className="hint"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: -8,
                    top: -30,
                    zIndex: 3,
                    maxWidth: 250,
                    padding: '9px 16px 10px',
                    background: PAPER,
                    border: `3px solid ${INK}`,
                    borderRadius: 22,
                    color: INK,
                    fontWeight: 900,
                    fontSize: 15,
                    lineHeight: 1.3,
                    transformOrigin: '20% 100%',
                  }}
                >
                  <span className="only-hover">Hover over the drawing to see the real me</span>
                  <span className="only-touch">Tap the drawing to see the real me</span>
                  <TailDown left={34} tipX={20} />
                </div>
              )}

              <div
                ref={portrait}
                className="portrait"
                onMouseEnter={onEnter}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={
                  {
                    '--lens-x': '50%',
                    '--lens-y': '32%',
                    '--lens-r': '0px',
                    position: 'relative',
                    aspectRatio: '1 / 1',
                    background: PAPER,
                    border: `5px solid ${INK}`,
                    boxShadow: `14px 14px 0 ${SPOT}`,
                    overflow: 'hidden',
                    cursor: 'crosshair',
                  } as CSSProperties
                }
              >
                <Image
                  src="/hero-manga.png"
                  alt="Comic-style drawing of Chathuranga in sunglasses and a blazer"
                  fill
                  sizes="(max-width: 920px) 92vw, 500px"
                  loading="eager"
                  fetchPriority="high"
                  style={{ objectFit: 'cover' }}
                />
                {/* The real photo, shown only inside the lens circle */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', inset: 0, clipPath: 'circle(var(--lens-r) at var(--lens-x) var(--lens-y))' }}
                >
                  <Image src="/chathuranga-photo.jpg" alt="" fill sizes="(max-width: 920px) 92vw, 500px" style={{ objectFit: 'cover' }} />
                </div>
                <div
                  className="lens-ring"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 'var(--lens-x)',
                    top: 'var(--lens-y)',
                    width: 'calc(var(--lens-r) * 2)',
                    height: 'calc(var(--lens-r) * 2)',
                    transform: 'translate(-50%, -50%)',
                    border: `4px solid ${INK}`,
                    borderRadius: '50%',
                    boxShadow: `0 0 0 3px ${PAPER}, inset 0 0 0 3px ${PAPER}`,
                    pointerEvents: 'none',
                  }}
                />
              </div>

              <button
                type="button"
                className="btn"
                onClick={togglePhoto}
                aria-pressed={photo}
                style={
                  {
                    position: 'absolute',
                    right: -10,
                    bottom: 24,
                    zIndex: 2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '10px 16px',
                    background: INK,
                    color: PAPER,
                    border: `3px solid ${PAPER}`,
                    boxShadow: `4px 4px 0 ${INK}`,
                    '--hover-shadow': `7px 7px 0 ${INK}`,
                    fontWeight: 900,
                    fontSize: 15,
                    lineHeight: 1.2,
                    cursor: 'pointer',
                  } as CSSProperties
                }
              >
                {photo ? 'Show the drawing' : 'Show my photo'}
              </button>
            </div>
          </div>
        </div>

        <ul
          aria-label="Quick facts"
          style={{
            listStyle: 'none',
            margin: 'clamp(56px, 7vw, 84px) 0 0',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: 18,
          }}
        >
          {FACTS.map((f, i) => (
            <li
              key={f.label}
              className="rise"
              style={
                {
                  '--d': `${950 + i * 80}ms`,
                  padding: '16px 18px 18px',
                  background: PAPER,
                  border: `3px solid ${INK}`,
                  boxShadow: `5px 5px 0 ${INK}`,
                } as CSSProperties
              }
            >
              <span style={{ display: 'block', color: MUTED, fontSize: 14, fontWeight: 500 }}>{f.label}</span>
              <span style={{ display: 'block', marginTop: 4, color: INK, fontSize: 19, fontWeight: 900, lineHeight: 1.3 }}>
                {f.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
