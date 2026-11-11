import type { CSSProperties } from 'react';
import { SectionHeading, sectionStyle } from '@/components/ui';
import { DISPLAY_FONT, INK, PINK, PRINCIPLES } from '@/lib/data';

/** Four working rules on slightly tilted panels that flood with ink on hover (.rule-card). */
export default function HowIWork() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="halftone" style={sectionStyle(PINK)}>
      <div className="wrap">
        <SectionHeading id="approach-title" title="How I work" lead="Four simple rules I stick to on every project." />
        <ul
          style={{
            listStyle: 'none',
            margin: '44px 0 0',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: 26,
          }}
        >
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="reveal" style={{ '--d': `${i * 90}ms` } as CSSProperties}>
              <div className="rule-card" style={{ '--tilt': p.tilt, padding: '26px 24px 28px', border: `4px solid ${INK}` } as CSSProperties}>
                <h3 style={{ fontFamily: DISPLAY_FONT, fontWeight: 400, fontSize: 23, lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ marginTop: 12, fontSize: 16.5, lineHeight: 1.6, opacity: 0.88 }}>{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
