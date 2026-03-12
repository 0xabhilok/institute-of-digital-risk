# Institute of Digital Risk (IDR) — Brand & Homepage

**Assignment submission — Frontend Design & Brand Identity**

---

## Folder Structure

```
idr-project/
├── index.html          ← Main single-page website
├── style.css           ← All styles (reset, tokens, layout, components, responsive)
├── script.js           ← Vanilla JS (navbar, mobile menu, scroll reveal, form)
├── assets/
│   ├── idr-icon.svg    ← Logo variant 1: icon only (cube)
│   └── idr-logo.svg    ← Logo variant 2: icon + "INSTITUTE OF DIGITAL RISK" text
└── README.md           ← This file
```

---

## Part 1 — Logo Design Notes

### The Cube Icon
An isometric cube was chosen as the central mark for IDR because it simultaneously communicates **structure** (rigid geometry), **layers** (three visible faces), and **resilience** (a cube is one of the most stable three-dimensional forms). In the context of digital risk, the hidden interior of the cube suggests the unseen complexity and depth that risk professionals must understand and manage.

### Colour Choices
**Orange (#F97316)** is used for the top (lit) face of the cube — it signals urgency, alertness, and action, which aligns with the nature of risk management without the negative connotations of red. It is also distinctive in the fintech and security space where blue-grey palettes dominate.

**Near-black (#111827)** forms the left face, grounding the mark with authority and seriousness — qualities essential to a professional institute. **Dark orange-brown (#C2410C)** creates the shadow face, maintaining colour harmony while adding visual depth.

### Typography
**Outfit** (Google Fonts, weight 800) was selected for the wordmark because it is geometric, modern and highly legible at small sizes — ideal for both the favicon and mobile header. Its open, rounded letterforms soften the severity of the black palette without sacrificing the clean, technical feel required for an education and risk institute.

---

## Part 2 — Homepage Technical Notes

### Technologies Used
- **HTML5** — Semantic structure: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- **CSS3** — Custom properties (design tokens), Flexbox, CSS Grid, `clamp()` for fluid type
- **Vanilla JavaScript** — No frameworks. IntersectionObserver for scroll reveal and active nav, hamburger toggle, form validation

### Sections Built
1. **Hero** — Headline, subheading, two CTA buttons, floating cube graphic, stats row
2. **About IDR** — Two-column layout with copy and a focus-area data panel
3. **Service Pillars** — Three-card grid with hover lift + orange accent bar animation
4. **Pipeline** — Dark-background section with four-step Train → Hire → Innovate → Deploy flow
5. **Community** — Audience cards + sector pills describing who IDR serves
6. **Contact** — Register interest form with client-side validation and success state

### Responsive Breakpoints
- **Desktop (> 960px):** Full two-column grids, hero graphic visible
- **Tablet (≤ 960px):** Stacked single-column layouts, hero graphic hidden
- **Mobile (≤ 640px):** Hamburger menu, single-column form rows, reduced spacing

### Accessibility
- All SVG elements have `role="img"` and `aria-label` attributes
- Decorative elements use `aria-hidden="true"`
- Form fields have associated `<label>` elements
- Focus states maintained on all interactive elements
- Colour contrast meets WCAG AA (orange on white: 3.1:1; white on black: 21:1)

---

## How to Run

Simply open `index.html` in any modern browser. No build tools or server required.

For local development with live reload:
```bash
# Using Python (if installed)
python -m http.server 3000

# Using Node.js (if installed)
npx serve .
```

Then visit `http://localhost:3000`
