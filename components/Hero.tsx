'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
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
   * the pointer instantly, --lens-r animates (it is a registered @property).
   * They are written straight to the element so the pointer never re-renders.
   *
   * A mouse (or pen) hovers: the lens follows it. A finger can't hover, and a
   * drag would scroll the page, so touch works differently:
   *  - tap: the photo spreads out from the finger to fill the panel (tap again
   *    to shrink it back), the same as the "Show my photo" button;
   *  - press and hold, then drag: the lens follows the finger, drawn a little
   *    above it so the fingertip doesn't hide it. Scrolling is held off only
   *    while holding, so a normal swipe over the drawing still scrolls.
   */
  const touch = useRef<{ id: number; x: number; y: number; timer: number; holding: boolean } | null>(null);

  /** `lift` raises the lens above the point, for a finger. */
  const aim = (el: HTMLDivElement, clientX: number, clientY: number, lift = 0) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--lens-x', `${(clientX - r.left - el.clientLeft).toFixed(1)}px`);
    el.style.setProperty('--lens-y', `${(clientY - r.top - el.clientTop - lift).toFixed(1)}px`);
  };

  const lensSize = (el: HTMLDivElement, scale: number) => Math.round(clamp(el.clientWidth * scale, 56, 110));

  const showLens = (el: HTMLDivElement, r: number) => {
    el.style.setProperty('--lens-r', `${r}px`);
    el.classList.add('is-lens');
    setHintSeen(true);
  };

  const hideLens = (el: HTMLDivElement) => {
    el.classList.remove('is-lens');
    if (!photo) el.style.setProperty('--lens-r', '0px');
  };

  /**
   * Grows the lens from (x, y), in panel pixels, until it covers the whole
   * panel, or shrinks it back into the point it came from.
   */
  const setPhotoFrom = (next: boolean, x?: number, y?: number) => {
    const el = portrait.current;
    if (el) {
      el.classList.remove('is-lens');
      if (next) {
        const cx = x ?? el.clientWidth / 2;
        const cy = y ?? el.clientHeight * 0.32;
        el.style.setProperty('--lens-x', `${cx.toFixed(1)}px`);
        el.style.setProperty('--lens-y', `${cy.toFixed(1)}px`);
        // Far enough to reach the furthest corner.
        const reach = Math.hypot(Math.max(cx, el.clientWidth - cx), Math.max(cy, el.clientHeight - cy));
        el.style.setProperty('--lens-r', `${Math.ceil(reach) + 8}px`);
      } else {
        el.style.setProperty('--lens-r', '0px');
      }
    }
    setPhoto(next);
    setHintSeen(true);
  };

  const togglePhoto = () => setPhotoFrom(!photo);

  // Mouse and pen: hover.
  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const el = e.currentTarget;
    aim(el, e.clientX, e.clientY);
    if (!photo) showLens(el, lensSize(el, 0.21));
    else setHintSeen(true);
  };

  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'touch') hideLens(e.currentTarget);
  };

  // Touch: tap, or press and hold.
  const endTouch = () => {
    const t = touch.current;
    if (!t) return;
    window.clearTimeout(t.timer);
    if (t.holding && portrait.current) hideLens(portrait.current);
    touch.current = null;
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'touch' || touch.current) return;
    const el = e.currentTarget;
    const t = { id: e.pointerId, x: e.clientX, y: e.clientY, timer: 0, holding: false };
    t.timer = window.setTimeout(() => {
      // Held still: switch to the lens. Not over a fully shown photo.
      if (photo) return;
      t.holding = true;
      const r = lensSize(el, 0.26);
      aim(el, t.x, t.y, r * 0.75);
      showLens(el, r);
      navigator.vibrate?.(8);
    }, 260);
    touch.current = t;
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (e.pointerType !== 'touch') {
      aim(el, e.clientX, e.clientY);
      return;
    }
    const t = touch.current;
    if (!t || t.id !== e.pointerId) return;
    if (t.holding) {
      aim(el, e.clientX, e.clientY, lensSize(el, 0.26) * 0.75);
    } else if (Math.hypot(e.clientX - t.x, e.clientY - t.y) > 10) {
      // Moved before the hold kicked in: the reader is scrolling.
      window.clearTimeout(t.timer);
      touch.current = null;
    }
  };

  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const t = touch.current;
    if (e.pointerType !== 'touch' || !t || t.id !== e.pointerId) return;
    if (!t.holding) {
      // A quick tap: reveal from the finger, or hide again.
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      setPhotoFrom(!photo, e.clientX - r.left - el.clientLeft, e.clientY - r.top - el.clientTop);
    }
    endTouch();
  };

  // While holding, stop the drag from scrolling the page. This has to be a
  // native, non-passive listener: React's touch listeners are passive.
  useEffect(() => {
    const el = portrait.current;
    if (!el) return;
    const block = (e: TouchEvent) => {
      if (touch.current?.holding && e.cancelable) e.preventDefault();
    };
    el.addEventListener('touchmove', block, { passive: false });
    return () => {
      el.removeEventListener('touchmove', block);
      window.clearTimeout(touch.current?.timer);
    };
  }, []);

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
                  <span className="only-touch">Tap the drawing, or hold and drag, to see the real me</span>
                  <TailDown left={34} tipX={20} />
                </div>
              )}

              <div
                ref={portrait}
                className="portrait"
                onPointerEnter={onEnter}
                onPointerLeave={onLeave}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={endTouch}
                // A long press would otherwise open the save-image menu.
                onContextMenu={(e) => {
                  if (touch.current) e.preventDefault();
                }}
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
