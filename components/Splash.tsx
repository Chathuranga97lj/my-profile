'use client';

import { useEffect, useRef, useState } from 'react';
import { SEQUENCE } from '@/lib/data';

export default function Splash({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const finished = useRef(false);

  const step = Math.min(SEQUENCE.length - 1, Math.floor(progress / (100 / SEQUENCE.length)));
  const cur = SEQUENCE[step];

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setExiting(true);
    setTimeout(onDone, 650);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 2);
        if (next >= 100) {
          clearInterval(id);
          finish();
        }
        return next;
      });
    }, 70);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#14110F',
        backgroundImage: 'radial-gradient(#ffffff10 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '24px 16px',
        animation: exiting ? 'splashOut .6s ease-in forwards' : 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          background:
            'repeating-conic-gradient(from 0deg at 50% 50%, #F97316 0deg 0.8deg, transparent 0.8deg 6deg)',
          animation: 'rasenganSpin 26s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '22%',
          height: 2,
          background: 'linear-gradient(90deg, transparent, #F97316, transparent)',
          animation: 'streak 2.2s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '26%',
          height: 2,
          background: 'linear-gradient(90deg, transparent, #38BDF8, transparent)',
          animation: 'streak 2.8s ease-in-out infinite',
        }}
      />

      {/* The orb sizes off both axes — vh matters because a phone in landscape
          is short, not narrow. Inner rings are percentages of it so the whole
          thing scales as one piece. */}
      <div style={{ position: 'relative', width: 'clamp(148px, min(46vw, 34vh), 220px)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(56,189,248,.35)', animation: 'ringOut 1.8s ease-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(249,115,22,.35)', animation: 'ringOut 1.8s ease-out infinite .9s' }} />
        <div style={{ position: 'absolute', width: '77%', aspectRatio: '1', borderRadius: '50%', border: '4px dashed rgba(56,189,248,.55)', animation: 'rasenganSpin 3s linear infinite' }} />
        <div style={{ position: 'absolute', width: '59%', aspectRatio: '1', borderRadius: '50%', border: '3px solid rgba(147,197,253,.7)', borderTopColor: 'transparent', borderLeftColor: 'transparent', animation: 'rasenganSpinRev 1.6s linear infinite' }} />
        <div
          style={{
            width: '44%',
            aspectRatio: '1',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #E0F2FE, #38BDF8 45%, #0EA5E9 75%)',
            animation: 'corePulse 1.4s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'var(--font-antique), serif', fontSize: 'clamp(23px, 6.5vw, 34px)', color: '#0C4A6E' }}>忍</span>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(22px, 5vw, 34px)', fontFamily: 'var(--font-bangers), cursive', fontSize: 'clamp(26px, 8vw, 44px)', letterSpacing: 'clamp(2px, 1vw, 4px)', color: '#F97316', textShadow: '4px 4px 0 #B91C1C' }}>
        RASENGAN BUILD
      </div>

      {/* the hand-sign line can be two rows on a narrow screen, so it grows
          downward from a floor rather than being pinned to a fixed height */}
      <div key={step} style={{ marginTop: 6, minHeight: 34, width: 'min(440px, 86vw)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(8px, 2.5vw, 14px)', textAlign: 'center', animation: 'signPop .35s ease-out' }}>
        <span style={{ fontFamily: 'var(--font-antique), serif', fontSize: 'clamp(19px, 5vw, 24px)', color: '#F7F2E5' }}>{cur.sign}</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 'clamp(13px, 3.4vw, 16px)', fontWeight: 700, color: '#7DD3A0' }}>{cur.text}</span>
      </div>

      <div style={{ marginTop: 'clamp(18px, 4vw, 26px)', width: 'min(440px, 78vw)', border: '3px solid #F7F2E5', background: '#0B0908', height: 22, padding: 3 }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'repeating-linear-gradient(135deg, #F97316 0 10px, #EA580C 10px 20px)',
            transition: 'width .25s linear',
          }}
        />
      </div>
      <div style={{ marginTop: 10, fontFamily: 'ui-monospace, monospace', fontSize: 13, color: '#8A8377', letterSpacing: 2 }}>
        CHAKRA {progress}% · 印を結ぶ
      </div>

      <button
        onClick={finish}
        style={{
          position: 'absolute',
          right: 'clamp(14px, 4vw, 26px)',
          bottom: 'clamp(14px, 4vw, 24px)',
          background: 'transparent',
          border: '2px solid #4A443C',
          color: '#8A8377',
          fontFamily: 'var(--font-bangers), cursive',
          letterSpacing: 2,
          fontSize: 16,
          padding: '7px 16px',
          cursor: 'pointer',
        }}
      >
        SKIP · カイ！
      </button>
    </div>
  );
}
