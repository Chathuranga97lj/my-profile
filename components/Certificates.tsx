'use client';

import { useState, type CSSProperties } from 'react';
import { ArrowUpRight } from '@/components/icons';
import { FilterButtons, SectionHeading, extLinkStyle, sectionStyle } from '@/components/ui';
import { CERT_TOPICS, CERTS, DISPLAY_FONT, INK, MUTED, PAPER, SPOT, type CertFilter, type CertTopic } from '@/lib/data';

const topicOf = (key: CertTopic) => CERT_TOPICS.find((t) => t.key === key);

/** Licenses and certifications, filterable by topic. Each card's year seal stamps down on hover. */
export default function Certificates() {
  const [topic, setTopic] = useState<CertFilter>('all');
  const count = (key: CertFilter) => (key === 'all' ? CERTS.length : CERTS.filter((c) => c.topic === key).length);
  const visible = topic === 'all' ? CERTS : CERTS.filter((c) => c.topic === topic);

  return (
    <section id="certificates" aria-labelledby="certificates-title" style={sectionStyle(PAPER)}>
      <div className="wrap">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px 32px' }}>
          <SectionHeading
            id="certificates-title"
            title="Certificates I’ve earned"
            lead="Courses and exams I’ve completed, from Cisco, Coursera, IEEE and more. Each card links to the original certificate."
            maxWidth={680}
          />
          <div className="reveal" style={{ '--d': '120ms' } as CSSProperties}>
            <FilterButtons
              label="Filter certificates"
              options={CERT_TOPICS.map((t) => ({ key: t.key, label: t.label, count: count(t.key) }))}
              value={topic}
              onChange={setTopic}
            />
          </div>
        </div>

        <ul
          style={{
            listStyle: 'none',
            margin: '48px 0 0',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
            gap: '34px 26px',
          }}
        >
          {visible.map((c, i) => {
            const t = topicOf(c.topic);
            return (
              <li key={`${topic}-${c.id}`} className="reveal" style={{ '--d': `${Math.min(i, 5) * 80}ms` } as CSSProperties}>
                <article
                  className="cert-card"
                  style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '22px 22px 20px',
                    background: PAPER,
                    border: `4px solid ${INK}`,
                  }}
                >
                  <span
                    className="seal"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: -20,
                      right: -16,
                      width: 60,
                      height: 60,
                      display: 'grid',
                      placeItems: 'center',
                      background: SPOT,
                      color: PAPER,
                      border: `3px solid ${INK}`,
                      borderRadius: '50%',
                      fontFamily: DISPLAY_FONT,
                      fontSize: 14,
                      lineHeight: 1,
                    }}
                  >
                    {c.date.slice(-4)}
                  </span>
                  <p style={{ paddingRight: 40, color: SPOT, fontSize: 15, fontWeight: 900, lineHeight: 1.35 }}>{c.issuer}</p>
                  <h3 style={{ marginTop: 8, color: INK, fontFamily: DISPLAY_FONT, fontWeight: 400, fontSize: 20, lineHeight: 1.25 }}>
                    {c.name}
                  </h3>
                  <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 12px' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        background: t?.tint ?? PAPER,
                        color: INK,
                        border: `2px solid ${INK}`,
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      {t?.label}
                    </span>
                    <span style={{ color: MUTED, fontSize: 14, fontWeight: 700 }}>Issued {c.date}</span>
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 18 }}>
                    <div style={{ paddingTop: 14, borderTop: `3px solid ${INK}` }}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="ext" style={{ ...extLinkStyle, fontSize: 16 }}>
                        <span>View certificate</span>
                        <ArrowUpRight />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
