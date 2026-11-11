'use client';

import { useEffect } from 'react';

/**
 * Panels "ink in" (a left-to-right wipe) the first time they scroll into view.
 *
 * Adds `.is-in` to every `.reveal` element once it is on screen. A `--d`
 * custom property on the element (e.g. `--d: 120ms`) staggers siblings.
 * Re-scans on DOM changes so filtered or late-mounted cards animate too.
 */
export function useReveal() {
  useEffect(() => {
    const pending = () => document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No observer, or motion turned off: just show everything as it mounts.
    if (reduce || typeof IntersectionObserver !== 'function') {
      const showAll = () => pending().forEach((el) => el.classList.add('is-in'));
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const scan = () => pending().forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
