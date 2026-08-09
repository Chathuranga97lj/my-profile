@AGENTS.md

# Personal portfolio — manga/shonen themed single page

Next.js 16 (App Router, Turbopack) + React 19. One route: `app/page.tsx`.
pnpm is the package manager (`pnpm-lock.yaml`).

## Content lives in `lib/data.ts`

Projects, timeline, stack, ranks, links and the splash hand-sign sequence are
all exported constants. To change what the site *says*, edit that file — the
components only render it. Colour tokens (`INK`, `PAPER`, `ORANGE`, …) are
exported from there too, and mirrored as CSS variables in `app/globals.css`.
Changing a colour means changing both.

## Fonts: do not reintroduce a Japanese Google font for body text

The body face was Zen Kaku Gothic New and **it broke the production build**.
Google serves Japanese fonts as ~120 dynamically-subsetted `.woff2` chunks per
weight, and `subsets: ['latin']` does not filter them — Next tried to fetch
~480 files at build time, `fonts.gstatic.com` throttled the connections, and
the failures surfaced as a misleading
`Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`.

Body text is now **Figtree**, a latin variable font: the whole 300–900 range is
one file. It still exposes `--font-zen`, so components did not change.

`Zen_Antique` (`--font-antique`) is still loaded and is fine — it is a single
weight and only renders the kanji accents (忍道, 術の書, 任務記録, …). Keep it
that way. If a Japanese face is ever wanted for body copy, self-host the
`.woff2` via `next/font/local` rather than pulling it from Google.

## Styling: inline styles + `clamp()`, classes only where clamp can't reach

Components style with inline objects, not Tailwind or CSS modules (Tailwind is
installed but `globals.css` does not use it). Responsiveness follows two rules:

- **Fluid type and spacing use `clamp()` inline.** No breakpoint needed.
- **Layout changes that clamp cannot express** — collapsing a grid, restacking
  a flex row — live in classes in `globals.css` (`.hero-grid`, `.chapter-bar`,
  `.rank-strip`, `.filter-bar`, `.shell`).

**The gotcha:** inline styles outrank media queries. If a property needs to
change at a breakpoint, its base value must move *out* of the inline style and
into the class, or the media query will silently do nothing.

Card grids use `minmax(min(330px, 100%), 1fr)`. The `min()` is what stops the
track from overflowing viewports narrower than the floor — plain
`minmax(330px, 1fr)` was the original mobile bug.

## Splash → hero handoff

`Splash` covers the viewport and unmounts when `loaded` flips in `page.tsx`.
`<main>` renders underneath it from first paint, so **any hero entrance
animation must be paired with holding the panels invisible** (`.clone-wait`,
`opacity: 0`) until `ready` is true. Otherwise the hero is visible through the
splash's fade and then animates a second time — it reads as a double reveal.

Panels enter with a Kage Bunshin poof: `cloneIn` (springy overshoot) plus a
`::after` smoke puff (`cloneSmoke`), staggered 90ms apart via a `--d` custom
property that both keyframes read so puff and panel stay in sync. There is
deliberately **no page-level entrance animation** on `<main>`.

Every animation needs a `prefers-reduced-motion: reduce` escape in the block at
the bottom of the animations section.

## Verifying work

`npx next build` and `npx eslint .` are the gates — both must be clean.
There are no tests and no browser automation available in this environment, so
**visual and timing changes cannot be self-verified**: say so plainly and ask
for a look rather than implying a change was seen working. A dev server is
usually already running on :3000.
