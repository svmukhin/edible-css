# Data Model: Classless CSS Framework

**Date**: 2026-02-01  
**Note**: This is not a traditional data model (no database/API). This document describes the conceptual entities and their relationships within the CSS framework's design system.

## Design System Entities

### 1. HTML5 Semantic Elements

**Description**: The complete set of standard HTML5 elements that receive styling from the framework.

**Categories**:
- **Document Structure**: `html`, `body`, `main`, `header`, `footer`, `nav`, `section`, `article`, `aside`
- **Typography**: `h1-h6`, `p`, `a`, `strong`, `em`, `small`, `mark`, `del`, `ins`, `sub`, `sup`
- **Lists**: `ul`, `ol`, `li`, `dl`, `dt`, `dd`
- **Tables**: `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`, `colgroup`, `col`
- **Forms**: `form`, `label`, `input`, `textarea`, `select`, `option`, `optgroup`, `button`, `fieldset`, `legend`
- **Content**: `blockquote`, `q`, `cite`, `code`, `pre`, `kbd`, `samp`, `var`, `abbr`, `time`, `address`
- **Media**: `img`, `figure`, `figcaption`, `audio`, `video`, `source`, `track`
- **Interactive**: `details`, `summary`, `dialog`
- **Generic**: `div`, `span` (minimal baseline styling)

**Relationships**:
- Each element has associated CSS rules (Element → Styles)
- Elements inherit from parent elements (CSS cascade)
- Semantic elements receive contextual styling (nav > ul vs article > ul)

**Attributes** (per element):
- Default browser styles (overridden)
- EdibleCSS styles (font, color, spacing, borders, etc.)
- Responsive adjustments (media query variants)
- Dark mode adjustments (prefers-color-scheme variants)

### 2. Viewport Breakpoints

**Description**: Logical breakpoints defining when responsive behavior changes occur.

**Breakpoints**:
```css
/* Mobile (base) */
@media (min-width: 320px) { /* default styles */ }

/* Tablet */
@media (min-width: 768px) {
  html { font-size: 106.25%; }  /* 17px */
}

/* Desktop */
@media (min-width: 1024px) {
  html { font-size: 112.5%; }  /* 18px */
}
```

**Properties**:
- `min-width`: Threshold in pixels
- `font-size`: Root font size adjustment
- `max-width` constraints: Content width limits
- Spacing adjustments: Margins and padding scales

**Relationships**:
- Breakpoints affect all elements universally
- Typography scale multiplies by root font size
- Spacing system remains proportional

### 3. Color Palette

**Description**: Dual-theme color system (light and dark) applied via semantic tokens.

**Light Theme** (default):
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f6f8fa;
  --text-primary: #24292f;
  --text-secondary: #57606a;
  --border-primary: #d0d7de;
  --accent: #0969da;
}
```

**Dark Theme** (via `prefers-color-scheme: dark`):
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --text-primary: #e6edf3;
    --text-secondary: #7d8590;
    --border-primary: #30363d;
    --accent: #58a6ff;
  }
}
```

**Token Usage**:
- `--bg-primary`: Page background, card backgrounds
- `--bg-secondary`: Code blocks, input backgrounds, table stripes
- `--text-primary`: Body text, headings
- `--text-secondary`: Captions, labels, secondary content
- `--border-primary`: All borders (tables, inputs, hr, etc.)
- `--accent`: Links, focus indicators, buttons

**Relationships**:
- Color tokens → Applied to HTML elements
- Theme mode → Determined by browser/OS preference
- Contrast ratios → WCAG 2.1 AA compliant (4.5:1 minimum)

### 4. Typography Scale

**Description**: Hierarchical type system based on modular scale (1.25 ratio - Major Third).

**Scale Definition**:
```css
:root {
  --font-base: 1rem;      /* 16px on mobile */
  --font-sm: 0.8rem;      /* 12.8px */
  --font-md: 1rem;        /* 16px */
  --font-lg: 1.25rem;     /* 20px */
  --font-xl: 1.563rem;    /* 25px */
  --font-2xl: 1.953rem;   /* 31.25px */
  --font-3xl: 2.441rem;   /* 39px */
  --font-4xl: 3.052rem;   /* 48.8px */
}
```

**Element Mapping**:
- `small`, captions: `--font-sm`
- `p`, `li`, body text: `--font-md`
- `h6`: `--font-lg`
- `h5`: `--font-xl`
- `h4`: `--font-2xl`
- `h3`: `--font-3xl`
- `h2`, `h1`: Calculated from scale (h2 ≈ 2.5rem, h1 ≈ 3rem)

**Font Stack**:
```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**Line Heights**:
- Headings: `1.2` (tighter for visual impact)
- Body text: `1.6` (optimal readability)
- Code: `1.4` (balance between readability and density)

**Relationships**:
- Typography scale → Applied to heading and text elements
- Root font size (set by breakpoints) → Multiplies all rem values
- Line height → Applied based on element type

### 5. Spacing System

**Description**: Consistent spacing using 8px base unit with T-shirt sizing.

**Scale**:
```css
:root {
  --space-xs: 0.25rem;  /* 4px */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 1.5rem;   /* 24px */
  --space-xl: 2rem;     /* 32px */
  --space-2xl: 3rem;    /* 48px */
}
```

**Application**:
- Inline spacing (padding): `xs`, `sm`
- Block spacing (margins): `md`, `lg`, `xl`
- Section spacing: `xl`, `2xl`
- Form element padding: `sm` horizontal, `xs` vertical

**Relationships**:
- Spacing tokens → Applied as margin/padding to elements
- Vertical rhythm → Maintained through consistent spacing
- Responsive adjustments → Spacing can scale with breakpoints (optional)

### 6. Layout Constraints

**Description**: Content width limits to ensure optimal readability.

**Constraint**:
```css
body {
  max-width: 75ch;       /* ~75 characters line length */
  margin: 0 auto;        /* Center horizontally */
  padding: 0 var(--space-md);  /* Gutters on sides */
}
```

**Properties**:
- `75ch`: Maximum content width (character-based)
- Centering: Auto margins for horizontal centering
- Padding: Prevents content from touching edges on mobile

**Relationships**:
- Layout constraint → Applied to body/main container
- Responsive behavior → Full width on narrow screens, constrained on wide screens
- Reading experience → Optimal line length for comprehension

## CSS Architecture Pattern

### Selector Specificity Strategy

**Rule**: Element-only selectors with minimal specificity to allow user overrides.

**Pattern**:
```css
/* Good: Low specificity */
button { /* styles */ }
nav ul { /* styles */ }
table th { /* styles */ }

/* Avoid: Higher specificity */
body > main > article > p { /* too specific */ }
button.primary { /* uses classes - forbidden */ }
```

**Rationale**: Users can override with simple element or class selectors without needing `!important`.

### CSS Organization Structure

**File structure** (source):
```css
/* src/edible.css */
@import "reset.css";           /* CSS reset/normalize */
@import "tokens.css";          /* Design tokens (colors, spacing, etc.) */
@import "base.css";            /* html, body, basic elements */
@import "typography.css";      /* h1-h6, p, a, text elements */
@import "lists.css";           /* ul, ol, li, dl */
@import "tables.css";          /* table, tr, td, th */
@import "forms.css";           /* input, button, select, etc. */
@import "media.css";           /* img, figure, video */
@import "semantic.css";        /* nav, article, section, etc. */
@import "utilities.css";       /* Helper rules (no classes, just resets) */
@import "dark-mode.css";       /* @media (prefers-color-scheme: dark) */
@import "print.css";           /* @media print */
```

**Build output** (dist):
- `edible.css`: Single concatenated file (unminified, commented)
- `edible.min.css`: Minified production build

### State Management

**No JavaScript states**: All interaction states handled via CSS pseudo-classes.

**Interactive states**:
```css
/* Hover */
a:hover, button:hover { /* styles */ }

/* Focus */
input:focus, button:focus { outline: 2px solid var(--accent); }

/* Active */
button:active { transform: translateY(1px); }

/* Disabled */
button:disabled, input:disabled { opacity: 0.5; cursor: not-allowed; }

/* Checked */
input[type="checkbox"]:checked + label { font-weight: bold; }

/* Required/Optional */
input:required { border-left: 3px solid var(--accent); }
```

**Rationale**: Pure CSS maintains "No JavaScript" principle while providing interactive feedback.

## Summary

This "data model" represents the conceptual entities in EdibleCSS:
1. **HTML5 Elements** (50+ styled)
2. **Breakpoints** (3 responsive tiers)
3. **Color Palette** (6 tokens × 2 themes)
4. **Typography** (8-level modular scale)
5. **Spacing** (6-level system)
6. **Layout** (content width constraint)

All entities are implemented as CSS rules with no runtime data structures, databases, or APIs. The framework is entirely declarative and stateless.
