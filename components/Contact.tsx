import { INK, LINKS, ON_INK, ON_INK_45, ON_INK_70, ORANGE } from '@/lib/data';

export default function Contact() {
  return (
    <section
      id="contact"
      className="on-ink"
      style={{
        border: `3px solid ${INK}`,
        background: INK,
        boxShadow: '10px 10px 0 var(--red)',
        padding: 'clamp(30px, 5.5vw, 52px) clamp(18px, 3vw, 28px)',
        marginBottom: 'clamp(28px, 5vw, 48px)',
      }}
    >
      <div data-reveal="pop" style={{ textAlign: 'center' }}>
        <div
          className="t-kanji"
          style={{ fontSize: 'clamp(16px, 3.4vw, 20px)', color: ORANGE, marginBottom: 10 }}
        >
          口寄せの術
        </div>
        <h2
          className="t-display"
          style={{
            fontSize: 'clamp(34px, 8vw, 56px)',
            margin: '0 0 12px',
            color: ON_INK,
            textShadow: `3px 3px 0 ${ORANGE}`,
          }}
        >
          Summon Me
        </h2>
        <p
          style={{
            margin: '0 auto 28px',
            maxWidth: '46ch',
            color: ON_INK_70,
            fontWeight: 500,
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          Open for engineering missions, collaborations, and ramen-fuelled build sessions.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            className="btn btn-primary pressable"
            href={`mailto:${LINKS.email}`}
            style={{ maxWidth: '100%', overflowWrap: 'anywhere' }}
          >
            {LINKS.email}
          </a>
          <a
            className="btn pressable"
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'transparent', color: ON_INK }}
          >
            GitHub
          </a>
          <a
            className="btn pressable"
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'transparent', color: ON_INK }}
          >
            LinkedIn
          </a>
        </div>

        <div
          className="t-label"
          style={{ marginTop: 34, color: ON_INK_45, fontSize: 10.5 }}
        >
          © 2026 Chathuranga L Jayawardhana · Colombo, Sri Lanka
        </div>
      </div>
    </section>
  );
}
