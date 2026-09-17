# Pau Vilanova Ors — Portfolio

Personal portfolio website. Electronic Engineer · Embedded Software Developer · Product Owner.

Built from scratch with **Vue 3 + TypeScript + Vite** — no template, no UI kit.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- TypeScript (strict)
- Vite 7
- Lenis (smooth scroll, disabled under `prefers-reduced-motion`)
- Zero UI frameworks — hand-written CSS design system in `src/style.css`

## Content

All text content lives in **`src/data/profile.ts`** — a single typed source of truth.
Edit that file to update experience, projects, skills, education or certifications;
components render from it automatically.

Project photos live in **`public/images/`** (optimized WebP) and are referenced from
`src/data/profile.ts` via each project's `gallery` field.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build        # type-checks with vue-tsc, then bundles to dist/
npm run preview      # serve the production build locally
```

## Deploy on Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** this repo.
3. Vercel auto-detects Vite — framework preset `Vite`, build command `npm run build`,
   output directory `dist`. No extra configuration needed.
4. Deploy. Every push to `main` redeploys automatically.

## Accessibility & performance

- Semantic landmarks, skip link, labelled sections, visible focus states
- Full `prefers-reduced-motion` support (smooth scroll, reveals and ambient
  animation are all disabled)
- Photos are optimized WebP, lazy-loaded; everything else is code-drawn (CSS/SVG)
- Fonts: Space Grotesk + IBM Plex Mono with `display=swap`
- SEO meta, Open Graph and JSON-LD `Person` structured data in `index.html`
