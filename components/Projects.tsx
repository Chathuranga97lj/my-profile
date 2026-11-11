'use client';

import type { CSSProperties } from 'react';
import { ArrowUpRight } from '@/components/icons';
import { ToolLogo } from '@/components/logos';
import { FilterButtons, SectionHeading, extLinkStyle, sectionStyle } from '@/components/ui';
import { BODY, DISPLAY_FONT, INK, MUTED, PAPER, PROJECT_FILTERS, PROJECTS, SPOT, YELLOW, type ProjectFilter } from '@/lib/data';

/**
 * Project cards with a screentone cover. The filter lives in the page so the
 * skills panel can reset it before jumping to a card. Cards are keyed by the
 * filter, so changing it remounts them and they ink in again.
 */
export default function Projects({ filter, onFilter }: { filter: ProjectFilter; onFilter: (filter: ProjectFilter) => void }) {
  const count = (key: ProjectFilter) => (key === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.kind === key).length);
  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.kind === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" style={sectionStyle(PAPER)}>
      <div className="wrap">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px 32px' }}>
          <SectionHeading id="projects-title" title="Things I’ve built" lead="A few of the projects I’ve worked on." maxWidth={640} />
          <div className="reveal" style={{ '--d': '120ms' } as CSSProperties}>
            <FilterButtons
              label="Filter projects"
              options={PROJECT_FILTERS.map((f) => ({ key: f.key, label: f.label, count: count(f.key) }))}
              value={filter}
              onChange={onFilter}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(330px, 100%), 1fr))',
            gap: '36px 30px',
          }}
        >
          {visible.map((p, i) => (
            <div key={`${filter}-${p.id}`} className="reveal" style={{ '--d': `${i * 110}ms` } as CSSProperties}>
              <article
                id={`project-${p.id}`}
                className="project-card"
                style={{ height: '100%', display: 'flex', flexDirection: 'column', background: PAPER, border: `4px solid ${INK}` }}
              >
                <div
                  className="project-cover"
                  aria-hidden="true"
                  style={{
                    position: 'relative',
                    height: 200,
                    padding: 20,
                    display: 'grid',
                    placeItems: 'center',
                    overflow: 'hidden',
                    backgroundColor: p.coverBg,
                    backgroundImage: p.tone,
                    backgroundSize: '12px 12px',
                    borderBottom: `4px solid ${INK}`,
                  }}
                >
                  <span
                    className="cover-title"
                    style={{
                      color: PAPER,
                      fontFamily: DISPLAY_FONT,
                      lineHeight: 1.05,
                      textAlign: 'center',
                      WebkitTextStroke: `2px ${INK}`,
                      textShadow: `4px 4px 0 ${INK}`,
                    }}
                  >
                    {p.name}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 22px 24px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        padding: '4px 11px',
                        background: p.kind === 'mobile' ? SPOT : INK,
                        color: PAPER,
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 900,
                      }}
                    >
                      {p.type}
                    </span>
                    <span style={{ color: MUTED, fontSize: 14, fontWeight: 700 }}>{p.years}</span>
                    {p.badge && (
                      <span
                        style={{
                          padding: '3px 10px',
                          background: YELLOW,
                          color: INK,
                          border: `2px solid ${INK}`,
                          borderRadius: 999,
                          fontSize: 13,
                          fontWeight: 900,
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 style={{ marginTop: 12, color: INK, fontFamily: DISPLAY_FONT, fontWeight: 400, fontSize: 26, lineHeight: 1.15 }}>
                    {p.name}
                  </h3>
                  <p style={{ marginTop: 10, color: BODY, fontSize: 16.5, lineHeight: 1.6 }}>{p.desc}</p>
                  <p style={{ marginTop: 18, color: MUTED, fontSize: 14, fontWeight: 700 }}>Built with</p>
                  <ul style={{ listStyle: 'none', margin: '8px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '5px 11px 5px 9px',
                          background: PAPER,
                          color: INK,
                          border: `2px solid ${INK}`,
                          fontSize: 13.5,
                          fontWeight: 700,
                          lineHeight: 1.3,
                        }}
                      >
                        <ToolLogo name={t} size={15} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'auto', paddingTop: 22 }}>
                    <div style={{ paddingTop: 16, borderTop: `3px solid ${INK}` }}>
                      {p.link ? (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="ext" style={extLinkStyle}>
                          <span>{p.linkLabel ?? `Visit ${p.domain}`}</span>
                          <ArrowUpRight />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        <a href="#contact" className="ext" style={extLinkStyle}>
                          <span>Ask me about this app</span>
                          <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
