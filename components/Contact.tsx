'use client';

import { useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { ArrowUpRight } from '@/components/icons';
import { WhatsAppLogo } from '@/components/logos';
import { extLinkStyle } from '@/components/ui';
import { DISPLAY_FONT, INK, LINKS, MUTED, PAPER, SPOT, WHATSAPP_GREEN } from '@/lib/data';

const colomboClock = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Colombo', hour: 'numeric', minute: '2-digit' });

// Local time in Colombo, read as an external store so the server render (null)
// and the browser's first render agree, and it ticks without an effect.
const subscribeToClock = (onChange: () => void) => {
  const id = window.setInterval(onChange, 20_000);
  return () => window.clearInterval(id);
};
const currentMinute = (): number | null => Math.floor(Date.now() / 60_000);
const serverMinute = (): number | null => null;

/** Fallback for browsers or frames where the async clipboard API is unavailable. */
function copyWithSelection(text: string) {
  try {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  } catch {
    return false;
  }
}

const SPEED_LINES = 'radial-gradient(circle, transparent 22%, #000000 34%, #000000 52%, transparent 70%)';

export default function Contact() {
  const [copied, setCopied] = useState<'' | 'ok' | 'fail'>('');
  const resetTimer = useRef<number | undefined>(undefined);
  const minute = useSyncExternalStore(subscribeToClock, currentMinute, serverMinute);
  const time = minute === null ? '' : colomboClock.format(new Date(minute * 60_000));

  const report = (ok: boolean) => {
    setCopied(ok ? 'ok' : 'fail');
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(''), 2600);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      report(true);
    } catch {
      report(copyWithSelection(LINKS.email));
    }
  };

  const button: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '13px 20px',
    border: `3px solid ${INK}`,
    boxShadow: `5px 5px 0 ${INK}`,
    fontWeight: 900,
    fontSize: 16,
    lineHeight: 1.2,
    textDecoration: 'none',
    cursor: 'pointer',
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        padding: 'clamp(72px, 10vw, 128px) 0 clamp(64px, 8vw, 104px)',
        background: INK,
        color: PAPER,
        borderTop: `4px solid ${INK}`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-22%',
          top: '50%',
          zIndex: -1,
          width: 'min(1100px, 150vw)',
          aspectRatio: '1 / 1',
          transform: 'translateY(-50%)',
          borderRadius: '50%',
          background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.09) 0deg 1.1deg, transparent 1.1deg 4.5deg)',
          WebkitMaskImage: SPEED_LINES,
          maskImage: SPEED_LINES,
          pointerEvents: 'none',
        }}
      />

      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
            gap: '48px 56px',
            alignItems: 'end',
          }}
        >
          <div>
            <h2
              id="contact-title"
              className="reveal"
              style={{
                color: PAPER,
                fontFamily: DISPLAY_FONT,
                fontWeight: 400,
                fontSize: 'clamp(38px, 5.4vw, 68px)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              Let’s build something together
            </h2>
            <p
              className="reveal"
              style={{ '--d': '100ms', marginTop: 20, maxWidth: '30em', color: '#D4D4D4', fontSize: 19, lineHeight: 1.6 } as CSSProperties}
            >
              I’m open to new projects and collaborations. Email or WhatsApp me, whichever is easier for you.
            </p>
            {time && (
              <p
                className="reveal"
                style={
                  {
                    '--d': '180ms',
                    marginTop: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    color: '#BDBDBD',
                    fontSize: 16,
                  } as CSSProperties
                }
              >
                <span className="live-dot" aria-hidden="true" />
                <span>It’s {time} in Colombo right now.</span>
              </p>
            )}
          </div>

          <div className="reveal" style={{ '--d': '140ms' } as CSSProperties}>
            <div
              style={{
                padding: '28px 28px 26px',
                background: PAPER,
                color: INK,
                border: `4px solid ${PAPER}`,
                borderRadius: 36,
                boxShadow: `10px 10px 0 ${SPOT}`,
              }}
            >
              <p style={{ color: MUTED, fontSize: 15, fontWeight: 700 }}>Email</p>
              <a
                href={`mailto:${LINKS.email}`}
                style={{
                  display: 'inline-block',
                  marginTop: 4,
                  color: INK,
                  fontSize: 'clamp(22px, 2.6vw, 30px)',
                  fontWeight: 900,
                  lineHeight: 1.3,
                  textDecoration: 'underline',
                  textDecorationColor: SPOT,
                  textDecorationThickness: 3,
                  textUnderlineOffset: 6,
                  overflowWrap: 'anywhere',
                }}
              >
                {LINKS.email}
              </a>

              <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="btn"
                  style={{ ...button, background: SPOT, color: PAPER, '--hover-shadow': `8px 8px 0 ${INK}` } as CSSProperties}
                >
                  Send an email
                </a>
                <button
                  type="button"
                  className="btn"
                  onClick={copyEmail}
                  style={{ ...button, background: PAPER, color: INK, '--hover-shadow': `8px 8px 0 ${INK}` } as CSSProperties}
                >
                  {copied === 'ok' ? 'Copied!' : 'Copy address'}
                </button>
              </div>
              <p
                aria-live="polite"
                style={{ minHeight: 24, marginTop: 12, color: copied === 'fail' ? '#B42318' : SPOT, fontSize: 15, fontWeight: 700 }}
              >
                {copied === 'ok' && 'Email address copied.'}
                {copied === 'fail' && 'Couldn’t copy. Select the address above instead.'}
              </p>

              <div style={{ marginTop: 6, paddingTop: 18, borderTop: `3px solid ${INK}` }}>
                <p style={{ color: MUTED, fontSize: 15, fontWeight: 700 }}>WhatsApp</p>
                <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 20px' }}>
                  {/* Ink text, not white: white on WhatsApp green is too faint to read. */}
                  <a
                    href={LINKS.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={
                      { ...button, gap: 10, background: WHATSAPP_GREEN, color: INK, '--hover-shadow': `8px 8px 0 ${INK}` } as CSSProperties
                    }
                  >
                    <WhatsAppLogo size={20} />
                    <span>Chat on WhatsApp</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <a
                    href={`tel:${LINKS.whatsappLink.replace('https://wa.me/', '+')}`}
                    style={{
                      color: INK,
                      fontSize: 19,
                      fontWeight: 900,
                      textDecoration: 'underline',
                      textDecorationColor: WHATSAPP_GREEN,
                      textDecorationThickness: 3,
                      textUnderlineOffset: 5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {LINKS.whatsapp}
                  </a>
                </div>
              </div>

              <div
                style={{
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: `3px solid ${INK}`,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px 28px',
                }}
              >
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="ext" style={{ ...extLinkStyle, fontSize: 17 }}>
                  <span>GitHub</span>
                  <ArrowUpRight />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="ext" style={{ ...extLinkStyle, fontSize: 17 }}>
                  <span>LinkedIn</span>
                  <ArrowUpRight />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
