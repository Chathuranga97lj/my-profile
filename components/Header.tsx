'use client';

import { useState, type CSSProperties } from 'react';
import { MenuIcon } from '@/components/icons';
import { BODY, DISPLAY_FONT, INK, MUTED, NAV, PAPER, SPOT, SPOT_SOFT } from '@/lib/data';

/**
 * Sticky top bar. Gains a bottom rule once the page scrolls, underlines the
 * section being read, and carries a thin progress line along its bottom edge
 * (`[data-progress]`, driven by useScrollEffects).
 */
export default function Header({ scrolled, active }: { scrolled: boolean; active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: PAPER,
        borderBottom: `3px solid ${scrolled ? INK : 'transparent'}`,
        transition: 'border-color .25s ease',
      }}
    >
      <nav
        aria-label="Main"
        className="wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          paddingBlock: scrolled ? 10 : 16,
          transition: 'padding .25s ease',
        }}
      >
        <a
          href="#top"
          className="logo"
          aria-label="Chathuranga Jayawardhana, back to top"
          style={{ display: 'flex', alignItems: 'center', gap: 16, color: INK, textDecoration: 'none' }}
        >
          {/* The CJ monogram written as a self-closing tag, inside an inked stamp:
              a white gap, a thin ink ring, then the blue offset shadow. */}
          <span
            className="logo-mark"
            aria-hidden="true"
            style={{
              flex: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: INK,
              color: PAPER,
              boxShadow: `0 0 0 2px ${PAPER}, 0 0 0 4px ${INK}, 4px 4px 0 4px ${SPOT}`,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            <span className="logo-lt" style={{ color: SPOT_SOFT, fontWeight: 900, fontSize: 11 }}>
              &lt;
            </span>
            <span style={{ margin: '0 1px', fontFamily: DISPLAY_FONT, fontSize: 14, letterSpacing: '-0.02em' }}>CJ</span>
            <span className="logo-gt" style={{ color: SPOT_SOFT, fontWeight: 900, fontSize: 11 }}>
              /&gt;
            </span>
          </span>
          <span style={{ display: 'grid', gap: 3 }}>
            <span style={{ fontFamily: DISPLAY_FONT, fontSize: 17, lineHeight: 1.1 }}>Chathuranga</span>
            <span style={{ color: MUTED, fontSize: 12.5, fontWeight: 700, lineHeight: 1.1, letterSpacing: '.02em' }}>
              Software engineer
            </span>
          </span>
        </a>

        <ul className="nav-links" style={{ listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', gap: 2 }}>
          {NAV.map((n) => {
            const on = active === n.id;
            return (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="nav-link"
                  aria-current={on ? 'true' : undefined}
                  style={{
                    position: 'relative',
                    display: 'block',
                    padding: '10px 14px',
                    color: on ? INK : BODY,
                    fontWeight: 700,
                    fontSize: 16,
                    textDecoration: 'none',
                  }}
                >
                  {n.label}
                  <span
                    className="nav-underline"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 14,
                      right: 14,
                      bottom: 4,
                      height: 3,
                      background: SPOT,
                      transformOrigin: '0 50%',
                      transform: `scaleX(${on ? 1 : 0})`,
                    }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="nav-cta btn"
          style={
            {
              alignItems: 'center',
              padding: '10px 18px',
              background: SPOT,
              color: PAPER,
              border: `3px solid ${INK}`,
              boxShadow: `4px 4px 0 ${INK}`,
              '--hover-shadow': `7px 7px 0 ${INK}`,
              fontWeight: 900,
              fontSize: 15,
              lineHeight: 1.2,
              textDecoration: 'none',
            } as CSSProperties
          }
        >
          Get in touch
        </a>

        <button
          type="button"
          className="nav-burger btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          style={
            {
              alignItems: 'center',
              gap: 10,
              padding: '9px 14px',
              background: PAPER,
              color: INK,
              border: `3px solid ${INK}`,
              boxShadow: `3px 3px 0 ${INK}`,
              '--hover-shadow': `5px 5px 0 ${INK}`,
              fontWeight: 900,
              fontSize: 15,
              lineHeight: 1.2,
              cursor: 'pointer',
            } as CSSProperties
          }
        >
          <MenuIcon />
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          style={{ borderTop: `3px solid ${INK}`, background: PAPER, padding: '14px clamp(16px, 4vw, 32px) 22px' }}
        >
          <ul style={{ listStyle: 'none', margin: '0 auto', padding: 0, maxWidth: 1240, display: 'grid', gap: 10 }}>
            {NAV.map((n) => {
              const on = active === n.id;
              return (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: '14px 18px',
                      border: `3px solid ${INK}`,
                      background: on ? INK : PAPER,
                      color: on ? PAPER : INK,
                      fontFamily: DISPLAY_FONT,
                      fontSize: 22,
                      lineHeight: 1.2,
                      textDecoration: 'none',
                    }}
                  >
                    {n.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div
        aria-hidden="true"
        data-progress
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -3,
          height: 3,
          background: SPOT,
          transformOrigin: '0 50%',
          transform: 'scaleX(0)',
        }}
      />
    </header>
  );
}
