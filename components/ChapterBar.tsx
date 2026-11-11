'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { INK, ORANGE_INK } from '@/lib/data';

const SECTIONS = [
  { id: 'stack', label: 'Jutsu' },
  { id: 'projects', label: 'Missions' },
  { id: 'path', label: 'Ninja Way' },
  { id: 'contact', label: 'Summon' },
];

/**
 * The nav used to live inside the hero and scroll away with it, which left
 * every screen past the fold with no answer to "where am I / where can I go".
 * It is now a translucent layer the page scrolls under, and it marks the
 * section you are actually in.
 */
export default function ChapterBar() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Several sections can straddle the viewport at once; the one whose
        // top edge is highest but still past the bar is the one you're reading.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-84px 0px -55% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="chapter-bar">
      <a
        href="#top"
        style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', color: INK }}
      >
        <span className="t-sfx" style={{ fontSize: 19, color: ORANGE_INK }}>
          CH. 01
        </span>
        <span className="t-kanji" style={{ fontSize: 13, color: 'var(--ink-45)' }}>
          第一話 — エンジニア
        </span>
      </a>

      <nav className="chapter-nav" aria-label="Sections">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            className="nav-link"
            href={`#${s.id}`}
            aria-current={active === s.id ? 'true' : undefined}
            style={active === s.id ? { color: ORANGE_INK } : undefined}
          >
            {s.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
