'use client';

import type { CSSProperties } from 'react';
import { SectionHeading, sectionStyle } from '@/components/ui';
import { BLUE, BODY, DISPLAY_FONT, INK, PAPER, SPOT, TAG_COLORS, TIMELINE } from '@/lib/data';

/**
 * Work, talks and study, newest first. The dashed track fills with blue as
 * you scroll and each dot lights up when the line reaches it — both driven by
 * useScrollEffects through `[data-timeline]`, `.tl-fill` and `.tl-dot`.
 */
export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="halftone" style={sectionStyle(BLUE)}>
      <div className="wrap">
        <SectionHeading id="experience-title" title="Where I’ve worked and studied" lead="My path so far, newest first." />

        <div className="timeline" data-timeline style={{ marginTop: 48 }}>
          <div className="tl-track" aria-hidden="true" />
          <div className="tl-fill" aria-hidden="true" />
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 30 }}>
            {TIMELINE.map((ev, i) => {
              const tag = TAG_COLORS[ev.tag];
              return (
                <li
                  key={`${ev.title}-${ev.when}`}
                  className="reveal tl-item"
                  style={{ '--d': `${i * 110}ms`, position: 'relative' } as CSSProperties}
                >
                  <span className="tl-dot" aria-hidden="true" />
                  <article className="tl-card" style={{ padding: '22px 24px 24px', background: PAPER, border: `4px solid ${INK}` }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
                      <span
                        style={{
                          padding: '3px 11px',
                          background: tag.bg,
                          color: tag.fg,
                          border: `2px solid ${INK}`,
                          borderRadius: 999,
                          fontSize: 13,
                          fontWeight: 900,
                        }}
                      >
                        {ev.tag}
                      </span>
                      {ev.when && <span style={{ color: BODY, fontSize: 15, fontWeight: 700 }}>{ev.when}</span>}
                    </div>
                    <h3
                      style={{
                        marginTop: 12,
                        color: INK,
                        fontFamily: DISPLAY_FONT,
                        fontWeight: 400,
                        fontSize: 'clamp(21px, 2.4vw, 26px)',
                        lineHeight: 1.2,
                      }}
                    >
                      {ev.title}
                    </h3>
                    <p style={{ marginTop: 6, color: SPOT, fontSize: 17, fontWeight: 900 }}>{ev.org}</p>
                    <p style={{ marginTop: 10, color: BODY, fontSize: 16.5, lineHeight: 1.6 }}>{ev.body}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
