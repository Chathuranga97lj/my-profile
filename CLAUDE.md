@AGENTS.md

# Personal portfolio — manga/shonen themed single page

Next.js 16 (App Router, Turbopack) + React 19. One route: `app/page.tsx`.
pnpm is the package manager (`pnpm-lock.yaml`).

## Content lives in `lib/data.ts`

Projects, timeline, stack, ranks, links and the splash hand-sign sequence are
all exported constants. To change what the site *says*, edit that file — the
components only render it.

## Colour lives in `app/globals.css` and nowhere else

`lib/data.ts` no longer holds hex. Its colour exports are **references** —
`export const INK = 'var(--ink)'` — so a component writing `color: INK` emits
`color: var(--ink)` and follows the active theme for free. Changing a colour is
a one-file edit in `globals.css`.

Read the token names as **roles, not colours**. `--ink` means "the line work
and the inverted surface"; in the dark theme it is bone, not black, so an ink
panel becomes a bone panel on a dark page — which is the inversion a manga uses
for a night scene. Everything self-inverts from that one idea.

Three rules that are easy to get wrong:

- **`--accent` is a fill, `--accent-ink` is text.** The bright orange never
  clears 3:1 on paper, so it may only appear as a background with `--fixed-ink`
  on top. Orange *text* uses `--accent-ink`. Same split for `--sky`/`--sky-ink`.
- **`--fixed-ink` / `--fixed-paper` do not swap with the theme.** They are for
  text sitting on a fill that keeps its own colour in both themes (red rank
  stamps, orange buttons). Using `--ink` there flips the contrast in dark mode.
- **`--term` and the `--on-ink-*` ramp invert with `--ink`,** because they are
  always used *on* an ink surface.

The theme is set by a blocking script in `layout.tsx` before first paint, so
there is no flash. `ThemeToggle` renders both glyphs and lets CSS pick one off
`[data-theme]` — deciding in JS would be a hydration mismatch.

## Hierarchy: the panel weight scale

The rule the old build broke: **every box had a 4–5px border and a hard drop
shadow, so nothing was louder than anything else.** A real manga page is one
splash panel plus quiet supporting panels. Four weights in `globals.css`:

| Class | Border | Shadow | Use |
| --- | --- | --- | --- |
| `.panel-hero` | 4px | 10px | The hero. **One per screen.** |
| `.panel` | 3px | none | Section containers |
| `.card` | 2px | 4px, 8px on hover | Project cards |
| `.chip` | 2px | none | Tags, pills |

If you are about to add a fifth shadowed thing, the answer is almost always a
lighter weight, not another shadow.

**The hero does not use per-panel borders at all.** It is one grid with
`background: var(--ink)` and `gap: 3`, so the grid's own background shows
through its gaps as ink gutters — that is how a manga page is actually ruled,
and it costs one border instead of seven. Cells just set `background: PAPER`.

## Type: Bangers is a shout, so it only shouts

`globals.css` owns the type scale (`.t-display`, `.t-section`, `.t-sfx`,
`.t-kanji`, `.t-label`, `.t-mono`, `.t-body`). Use the classes; don't hand-roll
font stacks in components.

Bangers used to set buttons, filters, nav and timeline titles as well as SFX,
which flattened its impact and hurt legibility at small sizes. It is now
reserved for **SFX, chapter marks and rank stamps**. Functional text is the
body face.

Tracking is in `em`, never `px`. A fixed `letter-spacing` across a `clamp()`
range is wrong at one end or the other — large display text needs negative
tracking, small caps labels need positive.

### Fonts: do not reintroduce a Japanese Google font for body text

The body face was Zen Kaku Gothic New and **it broke the production build**.
Google serves Japanese fonts as ~120 dynamically-subsetted `.woff2` chunks per
weight, and `subsets: ['latin']` does not filter them — Next tried to fetch
~480 files at build time, `fonts.gstatic.com` throttled the connections, and
the failures surfaced as a misleading
`Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`.

Body text is **Figtree**, a latin variable font: the whole 300–900 range is one
file. It still exposes `--font-zen`, so components did not change.

`Zen_Antique` (`--font-antique`) is fine — single weight, only renders the
kanji accents (忍道, 術の書, 任務記録, …). Keep it that way. If a Japanese face
is ever wanted for body copy, self-host the `.woff2` via `next/font/local`.

## Styling: inline styles + `clamp()`, classes only where clamp can't reach

Components style with inline objects, not Tailwind or CSS modules (Tailwind is
installed but `globals.css` does not use it).

- **Fluid type and spacing use `clamp()` inline.** No breakpoint needed.
- **Layout changes clamp cannot express** — collapsing a grid, restacking a
  row — live in classes (`.shell`, `.hero-grid`, `.grid-cards`, `.chapter-bar`,
  `.rank-strip`, `.filter-bar`).

**The gotcha:** inline styles outrank media queries. If a property needs to
change at a breakpoint, its base value must move *out* of the inline style and
into the class, or the media query will silently do nothing.

Card grids use `minmax(min(300px, 100%), 1fr)`. The `min()` is what stops the
track overflowing viewports narrower than the floor — plain `minmax(300px, 1fr)`
was the original mobile bug.

## Motion

Easing curves are tokens (`--ease-out`, `--ease-in-out`, `--ease-pop`). The
built-in CSS easings are too weak to read as intentional. **Never use `ease-in`
on UI** — it delays the first movement, the exact moment the user is watching.

Durations: press feedback 120ms, hovers 160–180ms, reveals 420ms, panel
entrance 340ms. Anything over ~300ms on an interactive element is too slow.

- Pressable things get `.pressable` (`scale(0.97)` on `:active`). Every button
  and CTA must feel the press.
- Hover effects live inside `@media (hover: hover) and (pointer: fine)` —
  on touch, `:hover` fires on tap and sticks.
- Panels enter with a Kage Bunshin poof: `cloneIn` plus a `::after` smoke puff,
  staggered 55ms via a `--d` custom property that both keyframes read so puff
  and panel stay in sync. Deliberately **no page-level entrance animation**.
- Every animation needs a `prefers-reduced-motion: reduce` escape. Reduced
  motion means *gentler*, not *none* — opacity and colour survive because they
  carry meaning; travel, rotation and looping do not.

## Splash → hero handoff

The splash is ~1.3s, dismissible by click / Escape / the skip button, and
**plays once per session** (`sessionStorage`). It is skipped outright under
reduced motion.

That decision is made by the boot script in `layout.tsx`, which stamps
`data-splash="skip"` on `<html>`; CSS hides `#splash` off that attribute so it
never paints. `page.tsx` reads the attribute through `useSyncExternalStore`
(server snapshot `false`, client snapshot the real value) — **not** a `setState`
in an effect, which React 19's lint rule rejects as a cascading render.

`<main>` renders underneath the splash from first paint, so **any hero entrance
animation must be paired with holding the panels invisible** (`.clone-wait`,
`opacity: 0`) until `ready` is true. Otherwise the hero is visible through the
splash's fade and then animates a second time — it reads as a double reveal.

## Accessibility invariants

These were bugs once; don't reintroduce them.

- **Interactive things are `<button>`s.** The stack's "used on" reveal was
  `onMouseEnter` on a `<div>` — it did not exist on touch or keyboard. It is
  now a button that pins on click and previews on hover/focus.
- **Reserve space for conditional content.** The "used on" strip is always
  rendered; mounting it on hover jumped the page by ~70px.
- `:focus-visible` has one global ring. Filters carry `aria-pressed`, the nav
  carries `aria-current`, live regions carry `aria-live="polite"`.

## Verifying work

`npx next build` and `npx eslint .` are the gates — both must be clean.

There are no tests, and browser automation depends on the Chrome extension
being connected — it often is not. When it isn't, **visual and timing changes
cannot be self-verified**: say so plainly and ask for a look rather than
implying a change was seen working. A dev server is usually running on :3000.
