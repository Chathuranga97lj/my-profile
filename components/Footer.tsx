'use client';

import type { CSSProperties } from 'react';
import { ArrowUp } from '@/components/icons';
import { scrollToTop } from '@/components/ui';
import { INK, PAPER, SPOT } from '@/lib/data';

export default function Footer() {
  return (
    <footer style={{ background: INK, color: '#A3A3A3', borderTop: '2px solid #262626' }}>
      <div
        className="wrap"
        style={{
          paddingBlock: 22,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px 24px',
          fontSize: 15,
        }}
      >
        <span>© 2026 Chathuranga L Jayawardhana, Colombo, Sri Lanka</span>
        <button
          type="button"
          className="footer-top"
          onClick={scrollToTop}
          style={{
            padding: '6px 0',
            background: 'none',
            color: PAPER,
            border: 0,
            fontWeight: 900,
            fontSize: 15,
            textDecoration: 'underline',
            textDecorationThickness: 2,
            textUnderlineOffset: 4,
            cursor: 'pointer',
          }}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}

/** Floating button that appears once you're past the hero. */
export function BackToTop() {
  return (
    <button
      type="button"
      className="fab btn"
      aria-label="Back to top"
      onClick={scrollToTop}
      style={
        {
          position: 'fixed',
          right: 'clamp(14px, 3vw, 28px)',
          bottom: 'clamp(14px, 3vw, 28px)',
          zIndex: 45,
          width: 54,
          height: 54,
          display: 'grid',
          placeItems: 'center',
          background: INK,
          color: PAPER,
          border: `3px solid ${PAPER}`,
          borderRadius: '50%',
          boxShadow: `4px 4px 0 ${SPOT}`,
          '--hover-shadow': `7px 7px 0 ${SPOT}`,
          cursor: 'pointer',
        } as CSSProperties
      }
    >
      <ArrowUp size={20} />
    </button>
  );
}
