'use client';

import { useState, type CSSProperties } from 'react';
import { ArrowDown } from '@/components/icons';
import { SectionHeading, TailLeft, sectionStyle } from '@/components/ui';
import { BODY, DISPLAY_FONT, INK, MUTED, PAPER, PROJECTS, SKILL_GROUPS, SPOT, TEXT, TOOL_INFO, YELLOW } from '@/lib/data';

/**
 * Tool chips grouped by how often they're used. Hovering, focusing or tapping
 * a chip fills the speech bubble with a plain-language explanation and the
 * projects that used it; those jump down to the project card.
 */
export default function Skills({ onJump }: { onJump: (projectId: string) => void }) {
  const [tool, setTool] = useState<string | null>(null);
  const group = tool ? SKILL_GROUPS.find((g) => g.tools.includes(tool)) : undefined;
  const usedIn = tool ? PROJECTS.filter((p) => p.tech.includes(tool)) : [];

  return (
    <section id="skills" aria-labelledby="skills-title" className="halftone" style={sectionStyle(YELLOW)}>
      <div className="wrap">
        <SectionHeading
          id="skills-title"
          title="Tools I use"
          lead="Hover over or tap a tool to see what it does and where I’ve used it."
        />

        <div className="skills-layout" style={{ marginTop: 44 }}>
          <div style={{ display: 'grid', gap: 28 }}>
            {SKILL_GROUPS.map((g, gi) => (
              <div key={g.title} className="reveal" style={{ '--d': `${gi * 90}ms` } as CSSProperties}>
                <div style={{ padding: '22px 24px 24px', background: PAPER, border: `4px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}` }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '4px 16px',
                    }}
                  >
                    <h3 style={{ color: INK, fontFamily: DISPLAY_FONT, fontWeight: 400, fontSize: 24, lineHeight: 1.2 }}>{g.title}</h3>
                    <p style={{ color: MUTED, fontSize: 15 }}>{g.note}</p>
                  </div>
                  <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {g.tools.map((name) => {
                      const on = tool === name;
                      return (
                        <li key={name}>
                          <button
                            type="button"
                            className="chip"
                            aria-pressed={on}
                            onMouseEnter={() => setTool(name)}
                            onFocus={() => setTool(name)}
                            onClick={() => setTool(name)}
                            style={{
                              padding: '11px 18px',
                              background: on ? SPOT : PAPER,
                              color: on ? PAPER : INK,
                              border: `3px solid ${INK}`,
                              borderRadius: 999,
                              boxShadow: on ? `4px 4px 0 ${INK}` : `0 0 0 ${INK}`,
                              transform: on ? 'translate(-2px, -2px)' : 'translate(0px, 0px)',
                              fontWeight: 900,
                              fontSize: 16,
                              lineHeight: 1,
                              cursor: 'pointer',
                            }}
                          >
                            {name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal skill-detail" style={{ '--d': '160ms' } as CSSProperties}>
            <div
              aria-live="polite"
              style={{
                position: 'relative',
                minHeight: 300,
                padding: '30px 30px 32px',
                background: PAPER,
                border: `4px solid ${INK}`,
                borderRadius: 36,
                boxShadow: `8px 8px 0 ${INK}`,
              }}
            >
              <TailLeft top={46} />
              {tool ? (
                <div key={tool} className="bubble-in">
                  <p style={{ color: SPOT, fontSize: 15, fontWeight: 900 }}>{group?.title}</p>
                  <h3
                    style={{
                      marginTop: 6,
                      color: INK,
                      fontFamily: DISPLAY_FONT,
                      fontWeight: 400,
                      fontSize: 'clamp(30px, 3.4vw, 40px)',
                      lineHeight: 1.1,
                    }}
                  >
                    {tool}
                  </h3>
                  <p style={{ marginTop: 12, color: TEXT, fontSize: 18, lineHeight: 1.55 }}>{TOOL_INFO[tool]}</p>
                  <p style={{ marginTop: 22, color: MUTED, fontSize: 14, fontWeight: 700 }}>Used in</p>
                  {usedIn.length > 0 ? (
                    <ul style={{ listStyle: 'none', margin: '10px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {usedIn.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            className="btn jump"
                            onClick={() => onJump(p.id)}
                            style={
                              {
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '9px 14px',
                                background: YELLOW,
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
                            <span>{p.name}</span>
                            <ArrowDown />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ marginTop: 8, color: BODY, fontSize: 16 }}>Not linked to a specific project on this page.</p>
                  )}
                </div>
              ) : (
                <div>
                  <p style={{ color: INK, fontFamily: DISPLAY_FONT, fontSize: 28, lineHeight: 1.15 }}>Pick a tool</p>
                  <p style={{ marginTop: 12, color: BODY, fontSize: 17, lineHeight: 1.6 }}>
                    You’ll see what it does in plain words, and which of my projects use it.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
