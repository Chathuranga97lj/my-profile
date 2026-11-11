'use client';

import { useEffect, useState } from 'react';
import { SECTION_SPY } from '@/lib/data';

export type ScrollState = {
  /** Page has moved off the very top: the header gets its bottom rule. */
  scrolled: boolean;
  /** Nav link id for the section being read, or '' for none. */
  active: string;
  /** Far enough down to offer the floating back-to-top button. */
  showTop: boolean;
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/**
 * Everything that follows the scroll position, batched into one
 * requestAnimationFrame per frame:
 *
 * - the progress line under the header (`[data-progress]`)
 * - the hero's speed-line burst rotating and the portrait drifting (`[data-burst]`, `[data-float]`)
 * - the experience timeline inking itself in and lighting each dot (`[data-timeline]`)
 * - which nav link is active, and whether to show the back-to-top button
 *
 * The visual pieces are written straight to the DOM so scrolling never
 * re-renders React; only the three flags above go through state, and only
 * when they change.
 */
export function useScrollEffects(): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, active: '', showTop: false });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const doc = document.documentElement;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, doc.scrollHeight - vh);

      const bar = document.querySelector<HTMLElement>('[data-progress]');
      if (bar) bar.style.transform = `scaleX(${clamp(y / max, 0, 1).toFixed(4)})`;

      if (!reduce) {
        const burst = document.querySelector<HTMLElement>('[data-burst]');
        if (burst) burst.style.transform = `translate(-50%, -50%) rotate(${(y * 0.05).toFixed(2)}deg)`;
        const float = document.querySelector<HTMLElement>('[data-float]');
        if (float) float.style.transform = `translate3d(0, ${(Math.min(y, 1400) * 0.07).toFixed(1)}px, 0)`;
      }

      const timeline = document.querySelector<HTMLElement>('[data-timeline]');
      if (timeline) {
        const r = timeline.getBoundingClientRect();
        const top = r.top + 10;
        const height = Math.max(1, r.height - 20);
        const reach = clamp(vh * 0.62 - top, 0, height);
        const fill = timeline.querySelector<HTMLElement>('.tl-fill');
        if (fill) fill.style.transform = `scaleY(${(reach / height).toFixed(4)})`;
        timeline.querySelectorAll<HTMLElement>('.tl-dot').forEach((dot) => {
          const d = dot.getBoundingClientRect();
          dot.classList.toggle('is-lit', d.top + d.height / 2 - top <= reach + 1);
        });
      }

      let active = '';
      for (const [sectionId, navId] of SECTION_SPY) {
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= 140) active = navId;
      }
      if (y > 40 && y >= max - 4) active = 'contact';

      const scrolled = y > 12;
      const showTop = y > vh * 1.1;
      setState((prev) =>
        prev.scrolled === scrolled && prev.active === active && prev.showTop === showTop
          ? prev
          : { scrolled, active, showTop }
      );
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
}
