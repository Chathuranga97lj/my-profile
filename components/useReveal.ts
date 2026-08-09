'use client';

import { useEffect } from 'react';

/**
 * Adds `.is-in` to every [data-reveal] element once it scrolls into view.
 * `data-delay="120"` (ms) staggers siblings.
 * Re-scans on DOM changes so filtered/late-mounted cards animate too.
 */
export function useReveal(active: boolean = true) {
  useEffect(() => {
    if (!active) return;

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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => {
        observer.observe(el);
      });
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
