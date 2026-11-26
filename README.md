# Drishya Sahayak V1 — Marketing & Documentation Website

Production Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion website for **Drishya Sahayak V1** (*Visual Assistant*), an open-source (MIT) Python desktop application that combines real-time YOLOv8 object detection and Google Gemini 2.5 Flash to describe scenes, read text, and hold natural voice conversations for the visually impaired community.

## Features

- **Editorial Pastel Design System**: Warm `#FDFAF7` canvas, sky-blue hero with dithered pixel-grain clouds and torn-paper collage, overlapping Tkinter desktop window preview, alternating pastel feature cards (`SEE`, `READ`, `TALK`, `KNOW`), white/black pricing comparison, and rounded dark footer.
- **Accessibility First (WCAG 2.2 AA / AAA targets)**:
  - Skip-to-main-content link, semantic landmarks, proper heading hierarchy, and descriptive alt/ARIA descriptions.
  - Visible global **Increase text size** (`100%` / `112%` / `125%`), **High contrast**, and **Light / Dark (`#020203`)** toggles persisted in `localStorage`.
  - Keyboard-navigable voice command simulations with live text transcripts, captions, and explicit opt-in browser TTS (zero autoplay audio).
  - Full `prefers-reduced-motion` support via `MotionConfig` and CSS media rules.
- **Routes & API Endpoints**:
  - `/` — Complete 18-section landing page with lazy-loaded below-the-fold sections.
  - `/docs` — Documentation covering introduction, prerequisites, installation, quick start, hybrid architecture, and voice commands.
  - `/privacy` — Honest hybrid data-flow privacy policy explaining on-device vs Google Gemini processing.
  - `/terms` — MIT License terms and assistive-aid safety notice (explicitly not a replacement for a white cane, guide dog, or human guide).
  - `POST /api/contact` & `POST /api/waitlist` — Zod-validated handlers with honeypot spam protection and Resend / Formspree support.

## Quick Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Configure `.env.local` (locally) or Project Environment Variables in Vercel:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical base URL for OpenGraph, `sitemap.xml`, and `robots.txt` |
| `RESEND_API_KEY` | Optional | Enables real email delivery via Resend in `/api/contact` and `/api/waitlist` |
| `RESEND_FROM_EMAIL` | Optional | Verified sender identity for Resend (defaults to `onboarding@resend.dev`) |
| `CONTACT_TO_EMAIL` | Optional | Destination inbox (defaults to `drishyasahayak@gmail.com`) |
| `FORMSPREE_CONTACT_ENDPOINT` | Optional | Alternative Formspree endpoint for contact submissions |
| `FORMSPREE_WAITLIST_ENDPOINT` | Optional | Alternative Formspree endpoint for Glasses Edition waitlist signups |

> Note: When neither `RESEND_API_KEY` nor a `FORMSPREE_*` URL is configured, `/api/contact` and `/api/waitlist` validate inputs cleanly with Zod, filter honeypot bots, log sanitized summaries in server logs, and return `{ ok: true, mode: 'local-preview' }`.

## Editing Content

All copy, links, voice command demos, install commands, roadmap milestones, FAQs, and documentation summaries live in a single typed file:

- [`src/content.ts`](./src/content.ts)

## Verification Commands

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment (Cloudflare Workers)

This project is deployed to **Cloudflare Workers** using `@opennextjs/cloudflare`.

- **Project Slug**: `drishyasahayakai`
- **Live URL**: [https://drishyasahayakai.dhyandev.sbs](https://drishyasahayakai.dhyandev.sbs)
- **Fallback URL**: [https://drishya-sahayak.this-is-testproject.workers.dev](https://drishya-sahayak.this-is-testproject.workers.dev)

### Commands

```bash
# Start local development server with Cloudflare proxy bindings
npm run dev

# Build and preview with local Wrangler
npm run preview

# Build and deploy to Cloudflare Workers & Custom Domain
npm run deploy

# Regenerate Cloudflare Env types
npm run cf-typegen
```

### Environment Variables & Secrets

- **Public variables** (`vars` in `wrangler.jsonc`):
  - `NEXT_PUBLIC_SITE_URL`: `https://drishyasahayakai.dhyandev.sbs`
  - `RESEND_FROM_EMAIL`: `Drishya Sahayak <onboarding@resend.dev>`
  - `CONTACT_TO_EMAIL`: `dhyandevp@proton.me`
- **Production secrets** (store securely using Wrangler):
  ```bash
  npx wrangler secret put RESEND_API_KEY
  # Optional fallbacks:
  npx wrangler secret put FORMSPREE_CONTACT_ENDPOINT
  npx wrangler secret put FORMSPREE_WAITLIST_ENDPOINT
  ```
- **Local secrets**: Set values in `.dev.vars` (gitignored; see `.dev.vars.example`).

### Rollback Plan

The previous Vercel deployment remains active and untouched. To roll back at any time:
1. Remove or disable the Worker custom domain route in `wrangler.jsonc` or Cloudflare Dashboard (**Workers & Pages > drishya-sahayak > Settings > Triggers**).
2. Point your DNS records back to Vercel (`cname.vercel-dns.com`).

## Deploying to Vercel (Legacy Reference)

1. Push this directory to a GitHub repository.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add `NEXT_PUBLIC_SITE_URL` and either `RESEND_API_KEY` or Formspree endpoint variables in Vercel Settings.
4. Deploy — Next.js App Router, API route handlers, `sitemap.xml`, and `robots.txt` work out of the box.

## Team & Collaborators

- **Dhyandev P** — Lead Developer & Founder ([@dhyandevp](https://github.com/dhyandevp) · [Website](https://dhyandev.sbs) · [Links](https://links.dhyandev.sbs))
- **Sreehid** — Project Collaborator
- **Ashirwad** — Project Collaborator

