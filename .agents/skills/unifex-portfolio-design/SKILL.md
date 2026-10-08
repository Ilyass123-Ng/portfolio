---
name: unifex-portfolio-design
description: "Comprehensive Design System and UI/UX skill inspired by the Ilyas Ennajy Portfolio (Unifex Creative Theme). Use when designing, building, or styling dark-mode creative portfolios, modern landing pages, GSAP animations, split-text character reveals, custom cursor effects, neon lime/orange accents, and Phudu/Instrument Sans typography."
user-invocable: true
metadata:
  author: Ilyas Ennajy
  version: "1.0.0"
  category: ui-ux-design
---

# Unifex Creative Portfolio Design System & UI/UX Skill

This skill defines the complete visual identity, animation specifications, typography, color palette, shape treatments, and component blueprints from the Ilyas Ennajy Creative Portfolio. 

Whenever asked to create a UI, design a page, add an animation, or build a component "like the portfolio", strictly follow the specifications below.

---

## 1. Color Palette & Theming (Dark Creative Cyberpunk/Editorial)

The theme uses a deep dark space-navy foundation with electric high-contrast neon accents:

```css
:root {
  /* Core Accents */
  --main-h: 72;
  --main-s: 99%;
  --main-l: 50%;
  --main: #d4ff00; /* Neon Lime / Electric Yellow-Green - Used for CTA highlights, active states, key tags */

  --main-two-h: 19;
  --main-two-s: 100%;
  --main-two-l: 50%;
  --main-two: #ff5100; /* Neon Tangerine / Coral Orange - Secondary accent for badges & gradients */

  /* Neutral Spectrum */
  --black: #02080d; /* Deep Space Navy-Black - Primary Page Background */
  --surface-card: #081018; /* Elevated Card Surface Background */
  --surface-card-hover: #0c1824; /* Card Surface on Hover */
  --body: #8a99a8; /* Muted Slate Gray - Secondary Text */
  --white: #ffffff; /* Pure White - Main Headings & Active Text */
  
  /* Borders & Glows */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(212, 255, 0, 0.4);
  --glow-lime: 0 0 25px rgba(212, 255, 0, 0.25);
  --glow-orange: 0 0 25px rgba(255, 81, 0, 0.25);
}
```

### Color Usage Guidelines:
- **Backgrounds:** Always dark (`#02080d`). Never use flat pure black `#000000`; use the tinted navy-black.
- **Headings:** White `#ffffff` with high typographic contrast.
- **Accent Points:** Use `--main` (`#d4ff00`) sparingly for maximum punch: status badges ("Available for work"), button fills, active links, hover states, and key metrics.

---

## 2. Typography Hierarchy

Import Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Phudu:wght@300..900&display=swap" rel="stylesheet">
```

### Font Roles:
- **Display & Headings:** `"Phudu", sans-serif` (Weights: 600, 700, 800, 900). Geometric, bold, modern, slightly industrial feel.
- **Body & Captions:** `"Instrument Sans", sans-serif` (Weights: 400, 500, 600). Crisp, ultra-legible grotesque sans-serif.

### Fluid Typography Scale:
```css
--heading-one: clamp(2.25rem, 1rem + 5vw, 4.5rem);
--heading-two: clamp(1.85rem, 0.8rem + 3.2vw, 3rem);
--heading-three: clamp(1.5rem, 0.5rem + 2.2vw, 2.25rem);
--body-text: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
```

---

## 3. Micro-Interactions & Animation Patterns

### A. Split-Text Character Scroll Animation (`.tw-char-animation`)
Used for high-impact section titles and hero headers. Characters stagger in on scroll with 3D perspective:
```javascript
// GSAP SplitText Reveal
const splitLines = gsap.utils.toArray(".tw-char-animation");
splitLines.forEach((element) => {
  const itemSplitted = new SplitText(element, { type: "chars, words" });
  gsap.set(element, { perspective: 300 });
  gsap.from(itemSplitted.chars, {
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 40,
    rotationX: -45,
    stagger: 0.025,
    duration: 0.8,
    ease: "back.out(1.7)"
  });
});
```

### B. Magnetic / Fluid Button Hover (`.btn-hover` / `.btn-main`)
Pill buttons with smooth background expansion, icon translation, and scale:
```css
.btn-main {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background-color: var(--main);
  color: var(--black);
  font-family: var(--heading-font);
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 32px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.btn-main:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 25px rgba(212, 255, 0, 0.35);
  color: var(--black);
}

.btn-main .arrow-icon {
  transition: transform 0.3s ease;
}

.btn-main:hover .arrow-icon {
  transform: translate(3px, -3px);
}
```

### C. Infinite Marquee Ticker
Continuous smooth horizontal text banner for skills or branding slogans:
```css
.marquee-wrapper {
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.marquee-text {
  font-family: var(--heading-font);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
}

.marquee-text .highlight {
  color: var(--main);
  -webkit-text-stroke: 0;
}
```

### D. Interactive Magic Cursor (`tw-magic-cursor`)
Outer follower ring + inner dot that expands and changes blend mode when hovering interactive elements:
- Hovering `a, button`: cursor expands to `45px - 60px` with `mix-blend-mode: difference` or lime border.

---

## 4. Shapes & Visual Accents (Geometric & Organic Blend)

- **Vector Accent Shapes:** Subtle floating PNG/SVG shapes placed in the background with slow float animations (TranslateY `±15px` over `4s`).
- **Plus Crosses & Grid Dots:** Small plus marks (`+`) or dotted patterns in corners of cards to give an editorial layout look.
- **Curved Service Arrows:** Minimalist 45-degree arrow icons inside circular badges that tilt on hover.
- **Card Framing:** Dark cards with `border: 1px solid rgba(255, 255, 255, 0.08)`, `border-radius: 20px`, and subtle top highlight `linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)`.

---

## 5. Standard Component Blueprints

### A. Availability / Status Pill
```html
<div class="status-pill">
  <span class="status-dot"></span>
  <span class="status-text">Available for work</span>
</div>
```
```css
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(212, 255, 0, 0.08);
  border: 1px solid rgba(212, 255, 0, 0.25);
  border-radius: 9999px;
  font-size: 0.875rem;
  color: var(--main);
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--main);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--main);
  animation: pulseDot 2s infinite ease-in-out;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}
```

### B. Project Showcase Card
- Dark surface `#081018`
- Rounded border radius `24px`
- Aspect ratio thumbnail with subtle zoom on hover (`scale(1.04)`)
- Tag chips with subtle gray background
- Floating arrow link button that reveals lime color on card hover

---

## 6. Execution Directives for Antigravity

When the user asks to generate UI, build a component, or design animations:
1. **Always default to this Dark Creative Theme:** `#02080d` background, `#d4ff00` lime accent, and white headings.
2. **Apply Typography:** Use `Phudu` for bold titles and `Instrument Sans` for body copy.
3. **Add Rich Animations:** Include smooth entrance animations (`AOS` or `GSAP`), hover lift, and cursor effects.
4. **Never create plain generic UI:** Always include subtle borders, radial glows, status pills, and interactive micro-details.
