import type { CSSProperties } from 'react';
import { ArrowDown, ArrowUp } from '@/components/icons';
import { BODY, DISPLAY_FONT, INK, PAPER, SPOT } from '@/lib/data';

/** Every section after the hero: a page of its own, with an ink rule across the top. */
export const sectionStyle = (background: string): CSSProperties => ({
  padding: 'clamp(64px, 9vw, 112px) 0',
  backgroundColor: background,
  borderTop: `4px solid ${INK}`,
});

/** Underlined text link with a trailing arrow (pair with className="ext"). */
export const extLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  color: INK,
  fontWeight: 900,
  fontSize: 16.5,
  textDecoration: 'underline',
  textDecorationColor: SPOT,
  textDecorationThickness: 3,
  textUnderlineOffset: 5,
};

export function SectionHeading({
  id,
  title,
  lead,
  maxWidth = 720,
}: {
  id: string;
  title: string;
  lead?: string;
  maxWidth?: number;
}) {
  return (
    <div className="reveal" style={{ maxWidth }}>
      <h2
        id={id}
        style={{
          color: INK,
          fontFamily: DISPLAY_FONT,
          fontWeight: 400,
          fontSize: 'clamp(34px, 4.6vw, 56px)',
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>
      {lead && <p style={{ marginTop: 14, color: BODY, fontSize: 18, lineHeight: 1.6 }}>{lead}</p>}
    </div>
  );
}

type FilterOption<K extends string> = { key: K; label: string; count: number };

/** A row of toggle buttons with counts. The pressed one is inked black. */
export function FilterButtons<K extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption<K>[];
  value: K;
  onChange: (key: K) => void;
}) {
  return (
    <div role="group" aria-label={label} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            className="chip"
            aria-pressed={on}
            onClick={() => onChange(o.key)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              background: on ? INK : PAPER,
              color: on ? PAPER : INK,
              border: `3px solid ${INK}`,
              boxShadow: on ? `4px 4px 0 ${SPOT}` : `0 0 0 ${INK}`,
              fontWeight: 900,
              fontSize: 16,
              lineHeight: 1.2,
              cursor: 'pointer',
            }}
          >
            <span>{o.label}</span>
            <span
              style={{
                display: 'inline-grid',
                placeItems: 'center',
                minWidth: 26,
                height: 26,
                padding: '0 7px',
                borderRadius: 999,
                background: on ? PAPER : INK,
                color: on ? INK : PAPER,
                fontSize: 13,
              }}
            >
              {o.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Speech-bubble tail pointing down, for a bubble with a 3px border. The white
 * fill covers the bubble's border where the tail joins; the stroke draws only
 * the two sides. `tipX` (0–24) is where the point lands.
 */
export function TailDown({ left, tipX }: { left: number; tipX: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="26"
      height="26"
      viewBox="0 -4 26 26"
      style={{ position: 'absolute', left, bottom: -25, overflow: 'visible' }}
    >
      <path d={`M0 -4 L0 0 L${tipX} 20 L24 0 L24 -4 Z`} fill={PAPER} />
      <path d={`M1.5 -1.5 L${tipX} 20 L22.5 -1.5`} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    </svg>
  );
}

/** Speech-bubble tail pointing left, for a bubble with a 4px border. */
export function TailLeft({ top }: { top: number }) {
  return (
    <svg
      className="bubble-tail"
      aria-hidden="true"
      focusable="false"
      width="34"
      height="30"
      viewBox="-28 0 34 30"
      style={{ position: 'absolute', left: -32, top, overflow: 'visible' }}
    >
      <path d="M6 2 L0 2 L-26 15 L0 28 L6 28 Z" fill={PAPER} />
      <path d="M2 3 L-26 15 L2 27" fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    </svg>
  );
}

/**
 * "See N more …" under a card grid that only shows its first few cards.
 * Collapsing scrolls back to the section, so the reader isn't left stranded
 * far below a list that just got shorter.
 */
export function SeeMoreButton({
  open,
  hidden,
  noun,
  controls,
  section,
  onToggle,
}: {
  open: boolean;
  /** How many cards are hidden while collapsed. */
  hidden: number;
  /** Plural, e.g. "projects". */
  noun: string;
  /** id of the list this button opens. */
  controls: string;
  /** id of the section to scroll back to on collapse. */
  section: string;
  onToggle: (open: boolean) => void;
}) {
  const toggle = () => {
    onToggle(!open);
    if (open) document.getElementById(section)?.scrollIntoView({ block: 'start' });
  };

  return (
    <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
      <button
        type="button"
        className={open ? 'btn' : 'btn jump'}
        aria-expanded={open}
        aria-controls={controls}
        onClick={toggle}
        style={
          {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 22px',
            background: open ? PAPER : INK,
            color: open ? INK : PAPER,
            border: `3px solid ${INK}`,
            boxShadow: `4px 4px 0 ${SPOT}`,
            '--hover-shadow': `7px 7px 0 ${SPOT}`,
            fontWeight: 900,
            fontSize: 16.5,
            lineHeight: 1.2,
            cursor: 'pointer',
          } as CSSProperties
        }
      >
        <span>{open ? `Show fewer ${noun}` : `See ${hidden} more ${noun}`}</span>
        {open ? <ArrowUp /> : <ArrowDown />}
      </button>
    </div>
  );
}

export function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}
