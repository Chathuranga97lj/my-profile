import { INK, TIMELINE } from '@/lib/data';

/** Gutter reserved for the dashed rail and its diamonds. */
const RAIL = 'clamp(30px, 6vw, 38px)';

export default function Timeline() {
  return (
    <section id="path" className="manga-page" style={{ maxWidth: 1320, margin: '0 auto 28px', padding: 'clamp(16px, 3vw, 26px)' }}>
      <div data-reveal="slam" style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(10px, 2vw, 16px)', flexWrap: 'wrap', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(30px, 7vw, 44px)', margin: 0, textTransform: 'uppercase', color: INK, letterSpacing: -0.5, textShadow: '4px 4px 0 #B91C1C' }}>
          Ninja Way
        </h2>
        <span style={{ fontFamily: 'var(--font-antique), serif', fontSize: 'clamp(16px, 3.6vw, 20px)', color: '#B91C1C' }}>忍道 — 経歴</span>
      </div>

      {/* The diamond is offset by exactly -RAIL, which pins it to the section's
          left edge whatever RAIL is — so the dashed rail stays put at 11px and
          only the gap between rail and card narrows on small screens. */}
      <div style={{ position: 'relative', paddingLeft: RAIL }}>
        <div style={{ position: 'absolute', left: 11, top: 6, bottom: 6, width: 5, background: 'repeating-linear-gradient(180deg, #14110F 0 12px, transparent 12px 22px)' }} />
        {TIMELINE.map((ev, i) => (
          <div key={ev.title} data-reveal="left" data-delay={i * 140} style={{ position: 'relative', marginBottom: 20 }}>
            <div style={{ position: 'absolute', left: `calc(-1 * ${RAIL})`, top: 14, width: 26, height: 26, background: ev.dot, border: `4px solid ${INK}`, transform: 'rotate(45deg)' }} />
            <div style={{ border: `4px solid ${INK}`, background: ev.bg, padding: 'clamp(14px, 3vw, 18px) clamp(14px, 3vw, 20px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-bangers), cursive', fontSize: 'clamp(19px, 4.6vw, 22px)', letterSpacing: 1.5, color: ev.titleColor }}>{ev.title}</span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, fontWeight: 700, color: ev.metaColor, border: `2px solid ${ev.metaColor}`, padding: '2px 8px' }}>{ev.period}</span>
              </div>
              <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', color: '#E8590C', marginBottom: 8 }}>{ev.org}</div>
              <p style={{ margin: 0, fontSize: 14.5, fontWeight: 500, lineHeight: 1.55, color: ev.bodyColor }}>{ev.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
