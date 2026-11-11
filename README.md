# Chathuranga L Jayawardhana — portfolio

A single-page portfolio built with Next.js 16 (App Router) and React 19. The look
borrows from weekly manga magazines — ink-bordered panels, halftone dots, speed
lines and a different tint of newsprint for each section — while every word on
the page is plain English.

## Run it

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # production build
pnpm lint
```

## Where things live

- `lib/data.ts` — all the content: links, quick facts, skills (each with a
  plain-language explanation), projects, experience, certificates and
  "How I work". Edit this file to change what the site says.
- `app/globals.css` — colour tokens, responsive layout classes, hover effects
  and animations.
- `app/layout.tsx` — fonts and page metadata. Both fonts are self-hosted from
  `app/fonts` (SIL Open Font License), so the build never calls Google Fonts.
- `components/` — one file per section (`Hero`, `Skills`, `Projects`,
  `Experience`, `Certificates`, `HowIWork`, `Contact`, `Footer`), plus `Header`,
  shared pieces in `ui.tsx` and `icons.tsx`, and two hooks:
  - `useReveal` — panels ink in the first time they scroll into view.
  - `useScrollEffects` — the header's progress line and active link, the hero
    parallax, and the timeline that fills in as you scroll.
- `public/` — `hero-manga.png` (the drawing) and `chathuranga-photo.jpg` (the
  real photo the hero lens reveals).
