@AGENTS.md

# Personal portfolio — manga-magazine styled single page, plain-English copy

Next.js 16 (App Router, Turbopack) + React 19. One route: `app/page.tsx`.
pnpm is the package manager (`pnpm-lock.yaml`).

## Content lives in `lib/data.ts`

Links, quick facts, skill groups and their plain-language explanations
(`TOOL_INFO`), projects, the experience timeline, certificates and the
"How I work" principles are all exported constants. To change what the site
*says*, edit that file — the components only render it. Colour tokens (`INK`,
`PAPER`, `SPOT`, the newsprint tints `YELLOW`/`BLUE`/`PINK`, …) are exported
from there too, and mirrored as CSS variables in `app/globals.css`. Changing a
colour means changing both.

**Copy stays plain English.** The owner asked for the anime/Naruto vocabulary
(jutsu, missions, chakra, ranks, Japanese text) to go because ordinary visitors
couldn't follow it. The manga feel comes from the visuals only. Every tool chip
needs a one-line explanation in `TOOL_INFO`, and a logo path in
`components/logos.tsx` (copied from Simple Icons, never fetched at build time;
tools without one, like REST APIs, fall back to a `{ }` mark).

## Fonts: self-hosted, never from Google at build time

Both faces load through `next/font/local` from `app/fonts` (with their OFL
licence files): **Dela Gothic One** (latin subset, one weight) for headings via
`--font-display`, and **Figtree** (latin variable font, 300–900 in one file) for
body text via `--font-body`.

Keep it that way. A Japanese Google font once **broke the production build**:
Google serves Japanese faces as ~120 dynamically-subsetted `.woff2` chunks per
weight, `subsets: ['latin']` does not filter them, `fonts.gstatic.com`
throttled the ~480 fetches, and the failure surfaced as a misleading
`Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`.
Dela Gothic One is a Japanese face too — only its latin `.woff2` is committed.

## Styling: inline styles + `clamp()`, classes only where clamp can't reach

Components style with inline objects, not Tailwind or CSS modules (Tailwind is
installed but `globals.css` does not use it). Responsiveness follows two rules:

- **Fluid type and spacing use `clamp()` inline.** No breakpoint needed.
- **Layout changes that clamp cannot express** — collapsing a grid, restacking
  a flex row, swapping the nav for the menu button — live in classes in
  `globals.css` (`.hero-grid`, `.skills-layout`, `.skill-detail`, `.timeline`,
  `.nav-links`, `.nav-cta`, `.nav-burger`).

**The gotcha:** inline styles outrank media queries. If a property needs to
change at a breakpoint, its base value must move *out* of the inline style and
into the class, or the media query will silently do nothing. The same goes for
hover states: `.btn` elements set their resting shadow inline *and* a
`--hover-shadow` custom property, and the `:hover` rule uses `!important` to
swap it in.

The hero name is sized by `.hero-name` with container-query units against its
own column, so neither line ("Chathuranga" / "Jayawardhana", with a 1.5em C
and J) ever wraps mid-word; the comment on `.hero-name` has the measured widths. Don't give it an inline
`fontSize`.

Card grids use `minmax(min(<floor>px, 100%), 1fr)`. The `min()` is what stops
the track from overflowing viewports narrower than the floor.

## Motion

- **Page load:** the hero is the one orchestrated moment — name letters rise in
  one by one (`.letter`, delay set per letter), C and J (`.cj`) bounce once to
  spell the CJ monogram, and the other hero pieces use `.rise` / `.pop` with a
  `--d` delay. There is no splash screen.
- **Scroll reveal:** anything with `.reveal` inks in (a left-to-right
  `clip-path` wipe) when `useReveal` adds `.is-in`. The waiting state must stay
  `opacity: 0`, **not** a clip-path: Chromium's IntersectionObserver treats an
  element clipped by its own `clip-path` as off-screen, so it never fires and
  the panel stays hidden forever. Stagger siblings with `--d`.
- **Scroll-linked:** `useScrollEffects` writes the header progress line, hero
  parallax and timeline fill straight to the DOM in one rAF per frame; only
  `scrolled` / `active` / `showTop` go through React state.
- **Portrait lens:** `--lens-x` / `--lens-y` follow the cursor instantly while
  `--lens-r` animates — it is registered with `@property` at the top of
  `globals.css` so the radius can transition on its own.

Every animation needs a `prefers-reduced-motion: reduce` escape in the block at
the bottom of `globals.css`.

## Verifying work

`npx next build` and `npx eslint .` are the gates — both must be clean.
There are no tests and no browser automation available in this environment, so
**visual and timing changes cannot be self-verified**: say so plainly and ask
for a look rather than implying a change was seen working. A dev server is
usually already running on :3000.
