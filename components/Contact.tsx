import { INK, LINKS, ORANGE, PAPER } from '@/lib/data';

export default function Contact() {
  const bangers = { fontFamily: 'var(--font-bangers), cursive' } as const;

  // Shared shape for the three CTAs — the email one is long enough to overflow
  // a narrow screen, so it shrinks and is allowed to break.
  const cta = {
    ...bangers,
    border: `4px solid ${PAPER}`,
    padding: '14px clamp(16px, 4vw, 26px)',
    fontSize: 'clamp(16px, 4vw, 23px)',
    letterSpacing: 2,
    maxWidth: '100%',
    overflowWrap: 'anywhere',
  } as const;

  return (
    <section id="contact" style={{ maxWidth: 1320, margin: '0 auto', border: `5px solid ${INK}`, background: INK, boxShadow: '14px 14px 0 #B91C1C', padding: 'clamp(26px, 5vw, 38px) clamp(16px, 3vw, 26px)' }}>
      <div data-reveal="zoom" style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-antique), serif', fontSize: 'clamp(18px, 4vw, 22px)', color: ORANGE, marginBottom: 8 }}>口寄せの術</div>
        <h2 style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(34px, 9vw, 52px)', margin: '0 0 6px', textTransform: 'uppercase', color: PAPER, letterSpacing: -1, textShadow: `5px 5px 0 ${ORANGE}` }}>
          Summon Me
        </h2>
        <p style={{ margin: '0 auto 26px', maxWidth: 520, color: '#B8B0A0', fontWeight: 600, fontSize: 15.5 }}>
          Open for engineering missions, collaborations, and ramen-fuelled build sessions.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn-manga shadow-paper" href={`mailto:${LINKS.email}`} style={{ ...cta, background: ORANGE, color: INK }}>
            {LINKS.email}
          </a>
          <a className="btn-manga shadow-orange" href={LINKS.github} target="_blank" rel="noopener noreferrer" style={{ ...cta, background: 'transparent', color: PAPER }}>
            GITHUB
          </a>
          <a className="btn-manga shadow-sky" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={{ ...cta, background: 'transparent', color: PAPER }}>
            LINKEDIN
          </a>
        </div>
        <div style={{ marginTop: 30, fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(10.5px, 2.6vw, 12.5px)', color: '#6B6455', letterSpacing: 2 }}>
          © 2026 CHATHURANGA L JAYAWARDHANA · COLOMBO, SRI LANKA
        </div>
      </div>
    </section>
  );
}
