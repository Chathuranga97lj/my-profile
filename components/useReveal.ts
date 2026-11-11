'use client';

import { useEffect } from 'react';

/**
 * Adds `.is-in` to every [data-reveal] element once it scrolls into view.
 * `data-delay="70"` (ms) staggers siblings — keep it short; long stagger makes
 * the page feel like it is loading rather than settling.
 *
 * Re-scans on DOM changes so filtered and late-mounted cards animate too.
 */
export function useReveal(active: boolean = true) {
  useEffect(() => {
    if (!active) return;

    // Nothing should be hidden waiting for an observer that will never fire a
    // visible change. Reveal everything at once and skip the machinery.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]')
        .forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${el.dataset.delay ?? 0}ms`;
          el.classList.add('is-in');
          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')
        .forEach((el) => observer.observe(el));
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, [active]);
}
