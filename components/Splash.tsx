'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SEQUENCE, INK, ORANGE, ON_INK, ON_INK_45, TERM } from '@/lib/data';

/** ms each hand sign holds. Three signs → the whole seal is ~1.1s. */
const STEP_MS = 380;
const FADE_MS = 300;

export default function Splash({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);
  const done = useRef(false);

  /**
   * Every exit path lands here, and it only fires once — a click that lands in
   * the same frame as the timer finishing would otherwise unmount twice.
   */
  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem('splash-seen', '1');
    } catch {
      /* private mode — the splash just plays again next navigation */
    }
    setExiting(true);
    setTimeout(onDone, FADE_MS);
  }, [onDone]);

  useEffect(() => {
    const timers = SEQUENCE.map((_, i) =>
      setTimeout(() => setStep(i), i * STEP_MS)
    );
    const end = setTimeout(finish, SEQUENCE.length * STEP_MS);

    // Escape is the universal "let me out". Any click works too — the whole
    // overlay is a dismiss target, the button just makes that discoverable.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
      window.removeEventListener('keydown', onKey);
    };
  }, [finish]);

  const cur = SEQUENCE[step];

  return (
    <div
      id="splash"
      role="status"
      aria-label="Loading"
      onClick={finish}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: INK,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(18px, 4vw, 26px)',
        padding: '24px 16px',
        cursor: 'pointer',
        animation: exiting ? `splashOut ${FADE_MS}ms var(--ease-out) forwards` : 'none',
      }}
    >
      {/* The seal. One rotating ring and a core, where the old build stacked
          five spinning layers and an animated box-shadow glow — that was a lot
          of paint for something on screen for a second. */}
      <div
        aria-hidden
        style={{
          position: 'relative',
          width: 'clamp(96px, min(28vw, 22vh), 132px)',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'sealIn 320ms var(--ease-out) both',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `3px dashed ${ORANGE}`,
            opacity: 0.55,
            animation: 'sealSpin 4s linear infinite',
          }}
        />
        <div
          style={{
            width: '62%',
            aspectRatio: '1',
            borderRadius: '50%',
            background: ORANGE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="t-kanji"
            style={{ fontSize: 'clamp(26px, 7vw, 36px)', color: 'var(--fixed-ink)' }}
          >
            忍
          </span>
        </div>
      </div>

      {/* Fixed min-height: the sign line can wrap to two rows on a narrow
          screen, and letting it reflow would bounce the bar below it. */}
      <div
        key={step}
        style={{
          minHeight: 44,
          width: 'min(400px, 86vw)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          textAlign: 'center',
          animation: 'signPop 240ms var(--ease-out)',
        }}
      >
        <span className="t-kanji" style={{ fontSize: 'clamp(17px, 4.4vw, 21px)', color: ON_INK }}>
          {cur.sign}
        </span>
        <span className="t-mono" style={{ color: TERM }}>
          {cur.text}
        </span>
      </div>

      {/* scaleX rather than width — it composites, and it needs no per-frame
          React state to drive it */}
      <div
        aria-hidden
        style={{
          width: 'min(400px, 78vw)',
          height: 5,
          background: 'var(--on-ink-45)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: ORANGE,
            transformOrigin: 'left',
            transform: `scaleX(${(step + 1) / SEQUENCE.length})`,
            transition: `transform ${STEP_MS}ms linear`,
          }}
        />
      </div>

      <button
        onClick={finish}
        className="pressable"
        style={{
          background: 'transparent',
          border: `2px solid ${ON_INK_45}`,
          color: ON_INK_45,
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '7px 16px',
          cursor: 'pointer',
        }}
      >
        Skip · カイ
      </button>
    </div>
  );
}
