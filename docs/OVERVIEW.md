# Website overview

This document describes what visitors see on the single-page marketing site and how the pieces fit together.

## Goals

- Explain **why** Sunshine Act / Open Payments compliance matters for meal spend tied to prescribers.
- Show **how** HUB360 enforces limits, logs meals in a CMS-aligned way, and scales across teams and states.
- Provide a **tangible artifact**—the compliance map—for credibility and exploration.

## Page flow (top to bottom)

1. **`AmbientBackground`** — Soft gradient orbs behind content; subtle motion on supported devices.
2. **`SiteNav`** — Sticky navigation: brand, anchors (Why it matters, Platform, Map, Contact), theme toggle, primary CTA.
3. **`HeroSection`** — Full-bleed ink hero, headline and subcopy (Letters-inspired rhythm), demo + map CTAs, **phone mockup** with sample “spend vs cap” UI (respects light/dark theme).
4. **`RiskSection`** — Stakes: fines, reporting burden, operational risk.
5. **`BentoFeatures`** — Grid of platform capabilities (ordering, limits, logs, reporting).
6. **`IntegrationsBand`** — Logos or labels for common ordering / HR / data surfaces (storytelling band).
7. **`ComplianceVisualizer`** — Interactive **U.S. map** with state compliance notes; uses Albers USA projection and state polygons from `us-atlas` / TopoJSON.
8. **`ScaleStrip`** — Social proof or scale metrics strip.
9. **`PilotSection`** — Pilot / contact funnel.
10. **`SiteFooter`** — Links, legal tone, closing CTA.

Source of truth for section order: `app/page.tsx`.

## Data and compliance content

- **`data/stateCompliance.ts`** — Per-state blurbs and status used by the map and tooltips.
- **`data/usStatesGeo.ts`** (and related) — Wiring for map geography; keep in sync with `react-simple-maps` usage in `ComplianceVisualizer.tsx`.

## Theming and motion

- **Theme**: `class`-based dark mode on `<html>`. `ThemeProvider` uses `storageKey: "hub360-theme"` and `enableSystem: false` so toggling is explicit and stable for demos.
- **Cursor spotlight** (optional): Client component layered above the page; safe to disable for reduced motion if extended later.

## Brand tokens (Tailwind)

Extended under `theme.extend.colors.hub`:

| Token | Hex | Role |
|-------|-----|------|
| `hub-ink` | `#2E4A70` | Primary text, hero background |
| `hub-accent` | `#73C7E3` | CTAs, progress, highlights |
| `hub-cream` | `#FFF9F0` | Warm surfaces |
| `hub-mist` | `#F0F2F2` | Muted fills, dividers |

Typography uses **Plus Jakarta Sans** (see `app/layout.tsx`).

## Deployment notes

- Standard **Vercel** or any Node host: `npm run build` then `npm run start`.
- Ensure no secrets in client bundles; this repo is marketing-only.

## Changelog discipline

For GitHub releases or PRs, summarize user-visible sections and any compliance-data updates—not only dependency bumps.
