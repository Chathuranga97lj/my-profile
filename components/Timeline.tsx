import { INK, INK_45, INK_70, ON_INK, ON_INK_70, ORANGE, ORANGE_INK, PAPER, RED, TIMELINE } from '@/lib/data';

/** Gutter reserved for the dashed rail and its diamonds. */
const RAIL = 'clamp(28px, 5.5vw, 36px)';

export default function Timeline() {
  return (
    <section id="path" className="panel" style={{ padding: 'clamp(18px, 3.4vw, 30px)' }}>
      <div className="section-head">
        <div
          data-reveal="pop"
          style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(10px, 2vw, 14px)', flexWrap: 'wrap' }}
        >
          <h2 className="t-section" style={{ color: INK, textShadow: `3px 3px 0 ${RED}` }}>
            Ninja Way
          </h2>
          <span className="t-kanji" style={{ fontSize: 'clamp(15px, 3.2vw, 19px)', color: INK_45 }}>
            忍道 — 経歴
          </span>
        </div>
      </div>

      {/* The diamond is offset by exactly -RAIL, which pins it to the section's
          left edge whatever RAIL is — so the dashed rail stays put at 10px and
          only the gap between rail and card narrows on small screens. */}
      <div style={{ position: 'relative', paddingLeft: RAIL }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 10,
            top: 6,
            bottom: 6,
            width: 4,
            background: 'repeating-linear-gradient(180deg, var(--ink) 0 10px, transparent 10px 20px)',
          }}
        />
        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {TIMELINE.map((ev, i) => {
            const inv = ev.inverted;
            return (
              <li
                key={ev.title}
                data-reveal="left"
                data-delay={i * 80}
                style={{ position: 'relative', marginBottom: i === TIMELINE.length - 1 ? 0 : 16 }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: `calc(-1 * ${RAIL})`,
                    top: 15,
                    width: 22,
                    height: 22,
                    background: ev.dot,
                    border: `3px solid ${INK}`,
                    transform: 'rotate(45deg)',
                  }}
                />
                <div
                  style={{
                    border: `2px solid ${INK}`,
                    background: inv ? INK : PAPER,
                    padding: 'clamp(15px, 2.8vw, 19px) clamp(15px, 2.8vw, 21px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
                      flexWrap: 'wrap',
                      marginBottom: 5,
                    }}
                  >
                    <h3
                      className="t-sfx"
                      style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 4vw, 21px)',
                        color: inv ? ORANGE : INK,
                      }}
                    >
                      {ev.title}
                    </h3>
                    <span
                      className="t-mono"
                      style={{
                        fontSize: 11,
                        color: inv ? ON_INK_70 : INK_45,
                        border: `1px solid ${inv ? ON_INK_70 : INK_45}`,
                        padding: '2px 7px',
                      }}
                    >
                      {ev.period}
                    </span>
                  </div>
                  <div className="t-label" style={{ color: inv ? ORANGE : ORANGE_INK, marginBottom: 8 }}>
                    {ev.org}
                  </div>
                  <p
                    className="t-body"
                    style={{ margin: 0, maxWidth: '68ch', color: inv ? ON_INK : INK_70 }}
                  >
                    {ev.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
