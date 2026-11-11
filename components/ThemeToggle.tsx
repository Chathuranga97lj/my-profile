'use client';

/**
 * Day / night page toggle.
 *
 * Both glyphs are rendered and CSS picks one off `[data-theme]`. Deciding in
 * JS would mean the server could not know which to emit — either a hydration
 * mismatch or a one-frame flash of the wrong icon. The blocking script in
 * `layout.tsx` has already set the attribute before first paint, so the right
 * glyph is correct in the very first frame.
 */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* the choice just won't survive a reload */
    }
  };

  return (
    <button
      onClick={toggle}
      className="pressable theme-toggle"
      aria-label="Switch between the day and night page"
      title="Day / night"
    >
      <span className="to-night" aria-hidden>
        月
      </span>
      <span className="to-day" aria-hidden>
        陽
      </span>
    </button>
  );
}
