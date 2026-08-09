# Manga Portfolio — Next.js drop-in

Target: `D:\Project\my-profile` (empty project)

## 1. Create the app

```bash
cd D:\Project
npx create-next-app@latest my-profile --ts --app --eslint --src-dir=false --import-alias "@/*"
# Tailwind: No (this build uses inline styles + globals.css)
cd my-profile
```

## 2. Copy files

Copy everything from this folder into the project root, overwriting when asked:

```
app/layout.tsx
app/globals.css
app/page.tsx
components/Splash.tsx
components/Hero.tsx
components/Stack.tsx
components/Projects.tsx
components/Timeline.tsx
components/Contact.tsx
components/useReveal.ts
lib/data.ts
public/hero-manga.png
```

Delete `app/page.module.css` if `create-next-app` made one.

## 3. Run

```bash
npm run dev
```

Open http://localhost:3000

## Notes

- Fonts load through `next/font/google` (Anton, Bangers, Zen Kaku Gothic New, Zen Antique) — no network `<link>` tags, no layout shift.
- The hero image is `public/hero-manga.png`, rendered with `next/image` and `priority`.
- Scroll reveals use one shared `IntersectionObserver` in `components/useReveal.ts`; any element with `data-reveal="up|left|right|zoom|slam"` animates in. `data-delay="120"` staggers it.
- Content lives in `lib/data.ts` — edit projects, stack, and timeline there only.
