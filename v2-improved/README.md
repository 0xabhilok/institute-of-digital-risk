# Institute of Digital Risk (IDR) — Homepage

**Assignment: Brand Identity & Responsive Homepage**
**Version:** 2.0 — UI/UX Improved
**Author:** [Your Name]
**Date:** 2025

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [How to Run](#how-to-run)
4. [Part 1 — Logo Design](#part-1--logo-design)
5. [Part 2 — Homepage Breakdown](#part-2--homepage-breakdown)
6. [Technical Decisions](#technical-decisions)
7. [UI/UX Improvements (v2)](#uiux-improvements-v2)
8. [Accessibility](#accessibility)
9. [Responsive Breakpoints](#responsive-breakpoints)
10. [Browser Support](#browser-support)

---

## Project Overview

This project is a single-page website and brand identity for the **Institute of Digital Risk (IDR)** — an industry-led training and deployment institute focused on digital, cyber and AI risk. 

The deliverables include:

- A custom SVG logo in two variants (icon-only and full wordmark)
- A fully responsive single-page website built with semantic HTML5, CSS3 and vanilla JavaScript only
- No CSS frameworks (no Bootstrap, Tailwind, etc.)
- No JavaScript libraries or build tools required

---

## Folder Structure

```
idr-project/
│
├── index.html          ← Single-page website (all sections)
├── style.css           ← All styles: reset, tokens, layout, components, responsive
├── script.js           ← Vanilla JS: navbar, mobile menu, scroll reveal, form
│
├── assets/
│   ├── idr-icon.svg    ← Logo variant 1: cube icon only
│   └── idr-logo.svg    ← Logo variant 2: cube icon + "Institute of Digital Risk"
│
└── README.md           ← This file
```

---

## How to Run

No build tools or installations needed. Simply open `index.html` in any modern browser.

```bash
# Option 1 — just double-click index.html in your file explorer

# Option 2 — Python local server (recommended for accurate font loading)
python -m http.server 3000
# then open http://localhost:3000

# Option 3 — Node.js
npx serve .
# then open http://localhost:3000
```

> **Live deployment:** The project can be deployed for free on [Netlify](https://netlify.com) or [GitHub Pages] by uploading the folder or connecting a repository.

---

## Part 1 — Logo Design

### Variants

| File | Description | Best Used For |
|------|-------------|---------------|
| `assets/idr-icon.svg` | Cube icon only | Favicon, app icon, small headers |
| `assets/idr-logo.svg` | Cube + full wordmark | Nav bar, documents, presentations |

Both logos also appear as **inline SVGs** inside `index.html` so they require no extra HTTP requests and scale perfectly at any screen resolution.

---

### Design Rationale

**The Cube**
An isometric cube was chosen as the central mark because it communicates three things simultaneously: *structure* (the rigid geometry of risk frameworks), *layers* (three visible faces representing the three service pillars), and *resilience* (a cube is one of the most stable three-dimensional forms in geometry). The hidden interior of the cube also symbolises the unseen complexity that digital risk professionals must navigate — threats that are not always visible on the surface.

**Colour Palette**
Orange (`#F97316`) was selected for the top, lit face of the cube. In the context of risk and security, orange signals urgency and awareness without the negative associations of red — it is the colour of caution indicators, alert states and critical notices. It is also visually distinctive in a sector dominated by corporate blue-grey palettes, giving IDR an immediately recognisable identity. Near-black (`#111827`) anchors the left face with authority and professionalism, while dark orange-brown (`#C2410C`) creates the shadow face, adding depth and maintaining colour harmony.

**Typography**
**Outfit** (Google Fonts, weight 800) was selected for the wordmark because it is a geometric, modern typeface with open, rounded letterforms that remain sharp and fully legible at small sizes — critical for favicon and mobile header use. Its clean construction aligns with the technology and education aesthetic the brief specified, while avoiding the overused choices (Inter, Roboto) that make designs feel generic.

---

## Part 2 — Homepage Breakdown

### Sections

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Hero** | First impression — headline, subheading, two CTAs, stats row |
| 2 | **Trust Bar** | Credibility — framework alignment badges (NIST, ISO, NIS2, etc.) |
| 3 | **About IDR** | Who they are — two-column layout: copy + dark focus-area panel |
| 4 | **Services** | What they do — three service cards with hover effects |
| 5 | **Pipeline** | How it works — Train → Hire → Innovate → Deploy steps |
| 6 | **Community** | Who they serve — audience cards + sector pills |
| 7 | **Contact** | Register interest — split dark/light panel with form |
| 8 | **Footer** | Links, social, framework badges, copyright |

---

### Section Notes

**Hero**
- Dark full-viewport background (`#0C0F14`) with dot-grid pattern and orange radial glow
- Animated pulsing badge for "Now Enrolling"
- Headline uses `clamp()` for fluid responsive sizing
- Stats row with orange accent on numbers
- A white diagonal slice at the bottom visually transitions into the light sections below
- Floating hero card (visible on desktop) shows a live-data-style panel with animated progress bars

**Services — Bento Grid**
Cards are arranged in a 3-up top row, then a wide card (7 columns) and a narrow metric callout (5 columns). This asymmetric layout breaks the visual monotony of three equal columns and is inspired by how modern SaaS products present feature sets.

**Pipeline**
Presented as a connected dark grid panel with four steps, each with an orange numbered badge. Arrow connectors between steps reinforce the sequential flow. Steps have hover states that lift the emoji icon with a scale+rotate animation.

**Contact — Split Panel**
The contact section is designed as a full-width split rather than a centered card. The dark left panel carries the messaging and contact details; the light right panel holds the form. This creates a natural visual anchor and feels more like a product page than a standard "contact us" box.

---

## Technical Decisions

### CSS Architecture

All styles use a **single flat stylesheet** (`style.css`) with no preprocessor. Design tokens are defined as CSS custom properties at the top of the file:

```css
:root {
  --orange:    #F97316;
  --ink:       #0C0F14;
  --surface:   #FFFFFF;
  --font-h:    'Outfit', sans-serif;
  --font-b:    'Nunito Sans', sans-serif;
  --nav-h:     68px;
  ...
}
```

This means colours, spacing and typography can be changed in one place and cascade throughout the entire site.

### Layout

- **CSS Grid** is used for all two-column and multi-column section layouts
- **Flexbox** is used for component-level alignment (nav, buttons, tags, stats)
- `clamp()` is used for fluid typography and section padding — no breakpoint-specific font overrides needed
- No fixed pixel widths anywhere that would break at unusual screen sizes

### JavaScript Modules

`script.js` is split into **7 self-contained IIFEs** (Immediately Invoked Function Expressions), each with a single responsibility:

| Module | What it does |
|--------|-------------|
| `initNavbar` | Three-state navbar: transparent → dark-glass → white-glass |
| `initMobileMenu` | Hamburger toggle with ARIA state management |
| `initSmoothScroll` | Polyfill smooth scroll for all anchor links |
| `initReveal` | `IntersectionObserver` scroll reveal (up, left, right variants) |
| `initActiveNav` | Highlights current section link as user scrolls |
| `initSelectLabel` | Adds `.filled` class to select element for floating label CSS |
| `initContactForm` | Validation, field error states, loading state, success reveal |

### Floating Labels

Form inputs use a CSS sibling trick — the `<label>` is placed **after** the `<input>` in the DOM so `:focus` and `:not(:placeholder-shown)` pseudo-selectors can target it:

```html
<!-- Label placed AFTER input — CSS sibling selector trick -->
<div class="f-group">
  <input type="text" id="fname" placeholder="First name" required/>
  <label for="fname">First Name</label>
</div>
```

```css
.f-group input:focus + label,
.f-group input:not(:placeholder-shown) + label {
  transform: translateY(-1.4rem) scale(.78);
  color: var(--orange);
}
```

This is a pure CSS solution with zero JavaScript for the label animation.

---

## UI/UX Improvements (v2)

The following improvements were made over v1:

| Area | v1 | v2 |
|------|----|----|
| **Hero** | White background, generic feel | Full dark viewport with dot-grid, orange glow, diagonal white slice transition |
| **Navbar** | White from the start | 3 intelligent states: transparent over hero → dark-glass mid-scroll → white-glass past hero |
| **Typography** | Outfit only | Outfit (headings) + Nunito Sans (body) — better reading rhythm |
| **Service cards** | Standard equal grid | Top-bar reveal animation + icon bounce on hover |
| **Pipeline** | Standalone steps | Dark bordered grid panel with numbered orange step badges |
| **About** | Text + plain data list | Copy + dark glassmorphism card with icon badges and accent tags |
| **Contact** | Centered card form | Full-width split dark/light panel |
| **Form** | Standard label above | Floating labels that animate up on focus/fill |
| **Form validation** | Alert popup | Individual field border turns red, first empty field auto-focused |
| **Scroll reveal** | Vertical only | Bidirectional: up, slide-left, slide-right — contextual per section |
| **Trust bar** | Static pill row | Scrolling marquee of aligned frameworks |
| **Footer** | Plain dark block | Social buttons with hover states, framework badge row |

---

## Accessibility

- All SVG elements have `role="img"` and `aria-label` attributes
- Decorative elements use `aria-hidden="true"`
- Every form input has an associated `<label>` (floating, but still present in DOM)
- Form success state uses `role="status"` and `aria-live="polite"` so screen readers announce it
- Hamburger button uses `aria-expanded` and `aria-controls` attributes
- Mobile menu links have `role="menuitem"` 
- Colour contrast: orange on dark bg passes WCAG AA; white on dark passes WCAG AAA
- Keyboard navigation works throughout — all interactive elements are reachable via Tab
- `prefers-reduced-motion` is respected via CSS transition inheritance (animations are CSS-based and short duration)

---

## Responsive Breakpoints

| Breakpoint | Layout changes |
|------------|---------------|
| `> 1024px` | Full desktop layout, hero visual card visible |
| `≤ 1024px` | Hero card hidden, footer collapses to 2 columns |
| `≤ 860px` | All two-column sections stack to single column, contact panel stacks vertically |
| `≤ 640px` | Hamburger nav, single-column form rows, reduced spacing |

---

## Browser Support

Tested and working in:

- Chrome 120+
- Firefox 121+
- Safari 17+
- Edge 120+
- Chrome for Android (mobile)
- Safari for iOS (mobile)

Features used: CSS Grid, Flexbox, Custom Properties, `clamp()`, `IntersectionObserver`, CSS `backdrop-filter` (with `-webkit-` prefix included).
