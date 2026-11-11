'use client';

import type { CSSProperties } from 'react';
import { ArrowUp } from '@/components/icons';
import { WhatsAppLogo } from '@/components/logos';
import { scrollToTop } from '@/components/ui';
import { INK, LINKS, PAPER, SPOT, WHATSAPP_GREEN } from '@/lib/data';

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

/** Gap between the floating buttons and the corner of the screen. */
const FAB_EDGE = 'clamp(14px, 3vw, 28px)';
const FAB_SIZE = 54;

/**
 * Floating WhatsApp chat button, always in the bottom corner. It pops in after
 * the hero has finished its entrance, so it doesn't compete with it.
 */
export function WhatsAppButton() {
  return (
    <a
      href={LINKS.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fab btn"
      aria-label="Chat with me on WhatsApp (opens in a new tab)"
      title="Chat on WhatsApp"
      style={
        {
          position: 'fixed',
          right: FAB_EDGE,
          bottom: FAB_EDGE,
          zIndex: 45,
          width: FAB_SIZE,
          height: FAB_SIZE,
          display: 'grid',
          placeItems: 'center',
          background: WHATSAPP_GREEN,
          color: PAPER,
          border: `3px solid ${INK}`,
          borderRadius: '50%',
          boxShadow: `4px 4px 0 ${INK}`,
          '--hover-shadow': `7px 7px 0 ${INK}`,
          animationDelay: '1.4s',
        } as CSSProperties
      }
    >
      <WhatsAppLogo size={26} />
    </a>
  );
}

/** Floating button that appears once you're past the hero, stacked above the WhatsApp one. */
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
          right: FAB_EDGE,
          bottom: `calc(${FAB_EDGE} + ${FAB_SIZE + 14}px)`,
          zIndex: 45,
          width: FAB_SIZE,
          height: FAB_SIZE,
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
