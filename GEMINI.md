# GEMINI.md - Professional Portfolio & Digital Showcase
> Single source of truth, architectural guide, and technical blueprint for AI agents and developers modifying this repository.
> Code repository: `/home/gr/coding/works/professional-portfolio/`
> GitHub remote: `git@github.com:GRodrigues34/professional-portfolio.git`

---

## 1. Overview and Purpose

This repository houses the professional portfolio and digital showcase for **Gustavo Rodrigues**, an independent freelance software engineer and consultant based in Alfenas, MG, Brazil.

* **Primary Purpose**: Commercial client acquisition and freelance business prospecting for small-to-medium businesses, partners, and enterprise teams seeking high-performance digital systems.
* **Core Offerings Showcased**:
  * High-conversion, sub-second landing pages and digital catalogs.
  * Multi-page institutional platforms and web applications.
  * Automated business workflows (n8n, webhook architectures, WhatsApp integrations).
  * Custom digital products, internal admin systems, and operational dashboards.
  * Contextual AI agents and automated triage pipelines.
* **Key Positioning**: Rigorous software engineering, 100/100 Core Web Vitals, sub-second LCP, zero generic website builders (no WordPress, no bloated page-builder plugins), and 1-on-1 engineer direct communication.
* **Target Audience Language**: Brazilian Portuguese (`pt-BR`) for public client-facing copy; English for codebase architecture, documentation, and commit messages.

---

## 2. Tech Stack and Tooling

* **Framework**: Astro 4.16.18 (`output: 'static'`, pre-rendered zero-JS baseline)
* **Interactive Islands**: React 18.3.1 (`@astrojs/react`)
* **Styling**: Tailwind CSS 3.4.17 (`@astrojs/tailwind`) + Custom CSS primitives (`src/styles/global.css`)
* **Language & Type Checking**: TypeScript 5.7.3 (`@astrojs/check` + strict `tsconfig.json`)
* **Icons**: `lucide-react` 0.469.0
* **SEO & Metadata**: `@astrojs/sitemap`, OpenGraph meta tags, Schema.org `ProfessionalService` structured data
* **Asset Optimization & Fonts**:
  * Self-hosted or CDN-loaded typography: *General Sans* (Fontshare), *Plus Jakarta Sans* (Google Fonts), and *Instrument Serif* (Google Fonts).

---

## 3. Directory Layout and Architecture

```
professional-portfolio/
├── astro.config.mjs          # Astro integrations (Tailwind, React, Sitemap)
├── package.json              # Dependencies and build scripts
├── tailwind.config.mjs       # Tailwind theme extensions and token bridges
├── tsconfig.json             # TypeScript configuration
├── public/                   # Static public assets (robots.txt, favicon.svg, images/project-placeholder.svg)
├── src/
│   ├── env.d.ts              # Astro type declarations
│   ├── data/
│   │   └── projects.ts       # Typed catalog of portfolio projects for the carousel
│   ├── layouts/
│   │   └── Layout.astro      # Master document layout, SEO, grain & GPU scroll/reveal controller
│   ├── pages/
│   │   └── index.astro       # Single-page application orchestrating all 8 sections
│   ├── components/
│   │   ├── Navbar.astro      # Fixed top glass bar with dual-layer text rolls
│   │   ├── ProjectCard.astro # Reusable project card with scale + orange glow hover effect
│   │   ├── SEO.astro         # Meta tags, canonical links, social preview cards
│   │   ├── SchemaOrg.astro   # JSON-LD ProfessionalService local business schema
│   │   ├── widgets/
│   │   │   ├── ParticleCanvas.tsx   # Interactive canvas node network (pauses when covered by #projetos)
│   │   │   └── ServicesTimeline.tsx # Scroll-tracked orange progress line with 5 staggered tiers
│   │   └── sections/
│   │       ├── Hero.astro     # Pinned sticky 100svh hero with word-mask entrance, 3D snippet stack & 3-col proof bar
│   │       ├── Projects.astro # Overlapping curtain reveal + sticky 3-up/1-up carousel stepping 1 item at a time
│   │       ├── Values.astro   # Unified split engineering philosophy with orange 001-004 pillars
│   │       ├── Services.astro # Services wrapper mounting interactive React timeline
│   │       ├── Workflow.astro # 5-column side-by-side interactive methodology step panel
│   │       ├── About.astro    # Engineer profile, UNIFAL background, 3-metric proof strip
│   │       ├── FAQ.astro      # Expandable accordion details list with hairline dividers
│   │       ├── Contact.astro  # Multi-channel direct ledger (WhatsApp, Email, Instagram)
│   │       └── Footer.astro   # Sticky curtain reveal footer with monumental wordmark
│   └── styles/
│       └── global.css        # Design tokens, typography classes, animations, resets
├── dist/                     # Static production build output (`npm run build`)
└── references/               # Design benchmarks, DOM extracts, and visual references
```

---

## 4. Design Foundations and Aesthetics

The visual language follows a **Swiss Kinetic Editorial** aesthetic, synthesized from benchmark deconstructions (Enki's Web Studio, Dev Diogo Moreira, Lucas Portfolio):

* **Color Palette (Locked 5-Hex System)**:
  * Canvas: `--bg` `#0a0a0a` (carbon black)
  * Elevated Surfaces: `--surface-1` `#111111`, `--surface-2` `#161514`, `--surface-3` `#1c1917`
  * Text Primary: `--white` `#faf8f5` (warm off-white)
  * Brand Accent: `--accent` `#ff5500` (studio international orange; hover `#ff6a1f`)
  * Secondary Text: `--grey` `rgba(250, 248, 245, 0.62)`
  * Dim / Meta: `--dim` `rgba(250, 248, 245, 0.36)`
  * Hairlines: `--line` `rgba(250, 248, 245, 0.14)`
* **Typography**:
  * Sans Display / UI: *General Sans* / *Plus Jakarta Sans* (`font-weight: 500`, tight tracking `-0.04em` to `-0.065em`, tight line-height `0.82` - `0.92`).
  * Editorial Serif: *Instrument Serif* italic (`serif-italic`) for literary emphasis within headlines.
* **Layout Mechanics**:
  * 12-column architectural grid (`.grid-12`) with responsive gutter `clamp(18px, 2vw, 32px)`.
  * Hairline borders (`1px solid var(--line)`) with smooth scale hover states.
  * Dual-layer text roll hover transitions (`.roll`, `.roll-a`, `.roll-b`).
  * Line-wipe animated links (`.line-link`).
  * Pinned Hero (`#inicio`) overlapped by rising `#projetos` curtain with sticky hold (`#projects-sticky-stage`) and 3-up desktop / 1-up mobile carousel stepping 1 item at a time.
  * Word-mask headline reveals (`[data-reveal-words]`) and `IntersectionObserver`-driven GPU staggered element reveals (`[data-reveal]`) across all sections.
  * Sticky curtain reveal footer behind `<main>`.

---

## 5. Development and Build Commands

Run commands from the repository root (`/home/gr/coding/works/professional-portfolio/`):

```bash
# Start local development server with Hot Module Replacement
npm run dev

# Run strict Astro TypeScript diagnostic checks and generate static production build
npm run build

# Preview the built static production site locally
npm run preview
```

---

## 6. Git and GitHub Sync Status

* **Remote Origin**: `git@github.com:GRodrigues34/professional-portfolio.git`
* **Default Branch**: `main`
* **Remote State**: Synced on `main` (`af6a9ce`, 8-commit UI, scroll-storytelling, and performance refactor).
* **Sync Instruction**: Commit each logical change atomically on `main` and keep `.gitignore` rules (`references/`, `dist/`, `node_modules/`) intact.

---

## 7. Rules and Gotchas for AI Agents and Contributors

1. **Preserve Anti-Default Design**:
   * Do NOT introduce generic SaaS cards, bloated purple/blue drop shadows, or rounded pill badges above headings.
   * Maintain the Swiss 12-column editorial grid and hairline dividers.
   * Keep the locked 5-hex color system. Do not introduce arbitrary CSS color values.
2. **Performance Budget & 60fps Scroll Guardrails**:
   * Never add heavy client-side JavaScript libraries unless strictly necessary.
   * **Zero Per-Pixel Blur**: Never apply dynamic `filter: blur()` in scroll loops or `backdrop-filter: blur()` on full-viewport sticky overlays above `ParticleCanvas.tsx`. Restrict all scroll and reveal animations strictly to GPU-composited `transform: translate3d(...) scale(...)` and `opacity`.
   * **Sticky Canvas Pause**: Because `#inicio` uses `position: sticky; top: 0`, standard `IntersectionObserver` always reports `isIntersecting: true`. `ParticleCanvas.tsx` must remain paused whenever `window.scrollY >= height * 0.96`.
   * Interactive React islands must use appropriate client directives (`client:load`, `client:visible`).
3. **Copywriting Integrity**:
   * All public client-facing copy in `src/` must remain in high-register Brazilian Portuguese (`pt-BR`).
   * No generic AI buzzwords or internal prompt jargon in public copy (e.g., avoid mentioning "RPI", "AI agent benchmarks", or internal workflow stages).
   * Maintain commercial pricing consistency: Landing Pages (R$ 390 + R$ 39/mo), Institutional (R$ 990 + R$ 89/mo), n8n Automations (from R$ 190/mo), Special Products & AI (Under Analysis).
4. **Reduced Motion Compliance**:
   * Respect `@media (prefers-reduced-motion: reduce)` across all animated and scroll-driven components.
