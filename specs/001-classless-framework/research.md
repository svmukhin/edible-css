# Research: Classless CSS Framework

**Date**: 2026-02-01  
**Purpose**: Resolve technical unknowns from implementation planning

## Testing Strategy for CSS Frameworks

### Decision: Visual Regression + Validation + Accessibility Testing

**Rationale**: A classless CSS framework has unique testing needs:
1. Visual appearance is the primary deliverable (not application logic)
2. Cross-browser rendering consistency is critical
3. Accessibility compliance (WCAG 2.1 AA) must be verified
4. W3C CSS3 validation is a constitutional requirement

### Tools Selected

#### 1. Visual Regression Testing: **BackstopJS**
- **Purpose**: Detect unintended visual changes across browsers and viewports
- **Why chosen**: 
  - Headless Chrome/Chromium support
  - Configurable viewports for responsive testing
  - Reference image comparison with diff visualization
  - Can test against real HTML samples (our use case)
  - Zero runtime dependencies (Node.js dev tool only)
- **Alternatives considered**:
  - Percy: Requires cloud service (adds dependency)
  - Playwright: Overki

ll for CSS-only testing
  - Manual testing: Not repeatable or scalable

**Implementation approach**:
```javascript
// backstop.json
{
  "viewports": [
    {"label": "mobile", "width": 375, "height": 667},
    {"label": "tablet", "width": 768, "height": 1024},
    {"label": "desktop", "width": 1920, "height": 1080}
  ],
  "scenarios": [
    {
      "label": "Typography Elements",
      "url": "test/samples/typography.html"
    },
    {
      "label": "Form Elements",
      "url": "test/samples/forms.html"
    }
    // ... 50+ element combinations
  ]
}
```

#### 2. W3C CSS Validation: **css-validator** (npm)
- **Purpose**: Ensure CSS3 compliance (Immutable Law #4)
- **Why chosen**:
  - Official W3C validator as Node.js package
  - Automatable in CI/CD pipeline
  - Zero false positives (official spec)
- **Usage**: `css-validator --profile=css3 edible.css`

#### 3. Accessibility Testing: **axe-core** + **pa11y**
- **Purpose**: WCAG 2.1 AA compliance verification (FR-005, SC-004)
- **Why chosen**:
  - axe-core: Industry standard, maintained by Deque
  - pa11y: Command-line runner for CI integration
  - Combined coverage: Color contrast, focus indicators, semantic structure
- **Alternatives considered**:
  - WAVE: Requires manual browser testing
  - Lighthouse: Includes non-CSS factors (performance, SEO)
  - Manual WCAG audit: Not repeatable

**Implementation approach**:
```bash
# Test each sample HTML page with EdibleCSS applied
pa11y --runner axe --standard WCAG2AA test/samples/*.html
```

#### 4. Cross-Browser Testing: **BrowserStack** (optional) + Local Testing
- **Purpose**: Verify rendering in Chrome, Firefox, Safari, Edge
- **Development approach**: Local browser testing during development
- **CI approach**: BrowserStack Automate for automated cross-browser visual regression
- **Rationale**: Modern evergreen browsers have excellent CSS3 support; automated testing prevents regressions

### Test Sample Structure

```text
test/
├── samples/                    # HTML test files
│   ├── typography.html        # h1-h6, p, a, strong, em, etc.
│   ├── forms.html             # input, textarea, button, select, etc.
│   ├── tables.html            # table, thead, tbody, tr, td, th
│   ├── lists.html             # ul, ol, li, dl, dt, dd
│   ├── semantic.html          # nav, main, article, section, aside, footer
│   ├── code.html              # code, pre, kbd, samp, var
│   ├── media.html             # img, figure, figcaption, audio, video
│   ├── interactive.html       # details, summary, dialog
│   └── kitchen-sink.html      # Combined comprehensive test
├── backstop/                   # BackstopJS configuration
│   ├── backstop.json
│   └── reference/             # Reference images (committed)
├── accessibility/              # Accessibility test reports
└── validation/                 # W3C validation reports
```

### Testing Workflow

**Development**:
1. Write CSS changes
2. Run W3C validator: `npm run validate`
3. Run visual regression: `npm run test:visual`
4. Run accessibility checks: `npm run test:a11y`
5. Manual browser testing: `npm run serve:tests`

**CI/CD**:
1. Automated on every commit
2. W3C validation (fail on errors)
3. Accessibility checks (fail on WCAG AA violations)
4. Visual regression (fail on unintended changes)
5. Cross-browser tests (BrowserStack, fail on rendering differences)

### Performance Testing

**Tool**: Browser DevTools Performance tab + `lighthouse-ci`
- Measure: Stylesheet load time, parse time, render time
- Target: <100ms total (SC-007)
- Approach: Test with real-world HTML samples, measure First Contentful Paint

**File size monitoring**:
```bash
# Automated check in CI
du -h edible.css | awk '{if ($1 > "50K") exit 1}'  # Fail if >50KB
gzip -c edible.css | wc -c  # Report gzipped size
```

## CSS Architecture Best Practices for Classless Frameworks

### Research: Existing Classless Framework Patterns

**Analyzed frameworks**:
1. **Tacit CSS** (direct inspiration): Pure element selectors, ~7KB gzipped
2. **Water.css**: Dark mode support, responsive, ~3KB
3. **MVP.css**: Slightly more opinionated, includes CSS variables for minor customization
4. **new.css**: Modern, includes dark mode via `prefers-color-scheme`
5. **sakura**: Minimal Japanese-inspired design, very lightweight

**Common patterns identified**:
- CSS Reset/Normalize as foundation
- System font stacks (all modern ones use this)
- Low specificity (mostly single-element selectors)
- `box-sizing: border-box` universally applied
- Responsive typography using `clamp()` or media queries
- Dark mode via `@media (prefers-color-scheme: dark)`
- Content width constraints using `max-width` on body or container

### Design System Research

#### Typography Scale
**Decision**: Modular scale based on 1.25 ratio (Major Third)
- Base: 16px (1rem)
- Scale: 0.8rem, 1rem, 1.25rem, 1.563rem, 1.953rem, 2.441rem, 3.052rem
- Maps to: small, p, h6, h5, h4, h3, h2, h1
- **Rationale**: 1.25 provides clear hierarchy without being too dramatic

**Line height**: 1.6 for body text, 1.2 for headings
- **Rationale**: 1.6 is optimal for readability (research from Butterick's Practical Typography)

**Font stack** (from clarifications):
```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

#### Color Palette
**Decision**: Neutral gray-based palette with single accent color

**Light mode**:
- Background: `#ffffff`
- Text: `#24292f` (GitHub-inspired, high contrast)
- Secondary text: `#57606a`
- Borders: `#d0d7de`
- Accent (links): `#0969da` (accessible blue, 4.5:1 contrast)
- Code background: `#f6f8fa`

**Dark mode** (via `prefers-color-scheme`):
- Background: `#0d1117`
- Text: `#e6edf3`
- Secondary text: `#7d8590`
- Borders: `#30363d`
- Accent (links): `#58a6ff` (adjusted for dark mode contrast)
- Code background: `#161b22`

**Rationale**: 
- GitHub's color system is battle-tested for readability
- Passes WCAG 2.1 AA (4.5:1 minimum contrast)
- Professional, neutral appearance
- Works for technical documentation (primary use case)

#### Spacing System
**Decision**: 8px base unit with T-shirt sizing
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

**Applied as**:
- Paragraph margins: `md` bottom
- Section spacing: `xl` or `2xl`
- Form element padding: `sm`
- Button padding: `sm` horizontal, `xs` vertical

#### Content Width Constraint (from clarifications)
**Decision**: `max-width: 75ch` on body or main content
- **Rationale**: ~75 characters is optimal line length for reading
- Implementation: `body { max-width: 75ch; margin: 0 auto; padding: 0 1rem; }`
- Allows full width on mobile (<75ch), centers on desktop

### Responsive Breakpoints

**Decision**: Mobile-first with two breakpoints
1. **Base (mobile)**: 320px - 767px
2. **Tablet**: 768px - 1023px (adjust font sizes slightly)
3. **Desktop**: 1024px+ (full typography scale)

**Rationale**: 
- Most classless frameworks don't need complex breakpoints
- Semantic HTML naturally reflows
- Focus on typography adjustments, not layout changes

```css
/* Mobile base styles (320px+) */
html { font-size: 100%; }  /* 16px */

/* Tablet */
@media (min-width: 768px) {
  html { font-size: 106.25%; }  /* 17px */
}

/* Desktop */
@media (min-width: 1024px) {
  html { font-size: 112.5%; }  /* 18px */
}
```

## Build Process (Development Only)

### Decision: PostCSS with minimal plugins

**Purpose**: Enable CSS features while maintaining W3C validity
- **Autoprefixer**: Add vendor prefixes for older browser versions
- **cssnano**: Minification for production build
- **postcss-preset-env**: Use modern CSS features (as they become standard)

**Why build tooling is acceptable**:
- Constitution allows build-time tooling (Principle II: "Build-time tooling is permitted")
- End users receive static CSS file, no tooling required for them
- Enables better development workflow while maintaining zero-config user experience

**Build outputs**:
1. `edible.css` - Unminified, commented, human-readable
2. `edible.min.css` - Minified for production (<10KB gzipped target)

```json
// package.json scripts
{
  "scripts": {
    "build": "postcss src/edible.css -o dist/edible.css",
    "build:min": "postcss src/edible.css -o dist/edible.min.css --env production",
    "validate": "css-validator dist/edible.css",
    "test:visual": "backstop test",
    "test:a11y": "pa11y-ci",
    "test": "npm run validate && npm run test:visual && npm run test:a11y"
  }
}
```

## Distribution Strategy

### Decision: Multi-channel distribution for maximum accessibility

1. **GitHub Releases**: Source files + built CSS
2. **npm package**: `npm install edible-css` (for build tool integration)
3. **CDN (jsDelivr/unpkg)**: Direct `<link>` tag usage
   - `https://cdn.jsdelivr.net/npm/edible-css/edible.min.css`
   - `https://unpkg.com/edible-css/edible.min.css`

**Rationale**: 
- CDN enables instant "copy one line" usage (Immutable Law #6)
- npm enables integration into existing build processes
- GitHub ensures source transparency and community contributions

### Versioning and Releases

**Strategy**: Semantic Versioning (semver) aligned with Constitution
- **MAJOR**: Breaking visual changes (e.g., complete redesign)
- **MINOR**: New HTML5 element support, additive improvements
- **PATCH**: Bug fixes, browser compatibility updates

**Release process**:
1. Update version in package.json
2. Run full test suite
3. Build distribution files
4. Commit to GitHub with tag
5. Publish to npm
6. CDNs automatically update from npm

## Alternatives Considered

### Alternative: CSS-in-JS Approach
**Rejected**: Violates "No JavaScript" principle (Immutable Law #5)

### Alternative: CSS Variables for Customization
**Rejected**: Violates "No configuration" principle (Immutable Law #2). While CSS variables could enable overrides, they represent theming infrastructure which contradicts "single opinionated style."

### Alternative: Sass/Less Preprocessing
**Decision**: Use PostCSS instead
- **Rationale**: PostCSS processes standard CSS syntax, Sass/Less introduce new syntax. PostCSS output is vanilla CSS3. Better aligns with "simplicity" principle.

### Alternative: Include Utility Classes
**Rejected**: Violates core identity (Immutable Law #1: "No classes, ever")

### Alternative: JavaScript for Dark Mode Toggle
**Rejected**: Violates "No JavaScript" principle. CSS `prefers-color-scheme` is sufficient and respects system preferences.

## Summary of Research Findings

### Resolved Clarifications

| Item | Decision |
|------|----------|
| Testing tools | BackstopJS (visual), css-validator (W3C), axe-core/pa11y (a11y) |
| Typography scale | Modular scale 1.25 ratio (Major Third) |
| Color palette | GitHub-inspired neutral grays with blue accent |
| Spacing system | 8px base unit with T-shirt sizing |
| Build tooling | PostCSS with Autoprefixer + cssnano |
| Distribution | GitHub + npm + CDN (jsDelivr/unpkg) |
| Versioning | Semantic versioning aligned with Constitution |

### Technical Confidence

All "NEEDS CLARIFICATION" items from Technical Context have been resolved with research-backed decisions. Ready to proceed to Phase 1 (design artifacts).
