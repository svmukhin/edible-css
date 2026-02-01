# Implementation Plan: Classless CSS Framework

**Branch**: `001-classless-framework` | **Date**: 2026-02-01 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-classless-framework/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

EdibleCSS is a primitive, classless CSS framework that enables developers with zero design skills to create professional-looking HTML5 pages by adding a single `<link>` tag. The framework styles semantic HTML5 elements only (no classes), provides automatic responsive behavior, and includes adaptive light/dark mode support via CSS media queries. Technical approach uses pure CSS3 with system UI fonts, constrained content width (~75ch), and comprehensive styling for 50+ HTML5 elements while remaining under 50KB uncompressed.

## Technical Context

**Language/Version**: CSS3 (with PostCSS for build tooling - development only)  
**Primary Dependencies**: None for end users; PostCSS/Autoprefixer for development builds (optional)  
**Storage**: N/A (static CSS file)  
**Testing**: BackstopJS (visual regression), css-validator (W3C), pa11y (accessibility)  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)  
**Project Type**: Single project (CSS framework with documentation)  
**Performance Goals**: <50KB uncompressed CSS, <10KB minified+gzipped, <100ms stylesheet load/parse  
**Constraints**: Zero runtime JavaScript, W3C CSS3 valid, WCAG 2.1 AA compliant, element-only selectors  
**Scale/Scope**: 50+ HTML5 elements styled, 3 viewport breakpoints, light+dark color schemes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Compliance

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Zero Classes | ✅ PASS | Spec explicitly requires element-only selectors (FR-006), no CSS classes |
| II. No JavaScript Required | ✅ PASS | Spec prohibits JavaScript (FR-003), uses pure CSS for all functionality including dark mode |
| III. Minimal Configuration | ✅ PASS | Single `<link>` tag requirement (FR-002), no config files or build tools for end users |
| IV. For Non-Designers | ✅ PASS | Target audience is "developers with no design skills", opinionated defaults (FR-007) |

### Immutable Laws Compliance

| Law | Status | Evidence |
|-----|--------|----------|
| 1. No classes, ever | ✅ PASS | Element-only selectors mandated throughout spec |
| 2. Single opinionated style | ✅ PASS | No theming/variants, one design system (light+dark auto-adapt is environmental, not configuration) |
| 3. HTML5 semantic elements only | ✅ PASS | FR-001 explicitly lists standard HTML5 elements, custom elements out of scope |
| 4. W3C validation mandatory | ✅ PASS | FR-009 requires CSS3 validation, SC-005 measures zero errors |
| 5. Zero JavaScript dependency | ✅ PASS | FR-003 explicitly prohibits JavaScript |
| 6. Instant drop-in usage | ✅ PASS | FR-002 requires single `<link>` tag, FR-003 prohibits build tools for users |
| 7. Responsive by default | ✅ PASS | FR-004 requires responsive across all screen sizes, User Story 2 focuses on this |
| 8. MIT licensed | ⚠️ NEEDS DECISION | Not mentioned in spec - should be added to project metadata |

### Decision Framework Evaluation

1. ✅ Does it require CSS classes? → No (element-only selectors)
2. ✅ Does it require JavaScript? → No (pure CSS)
3. ✅ Does it add configuration options? → No (zero configuration)
4. ✅ Does it target non-standard HTML? → No (HTML5 semantic elements only)
5. ✅ Does it break W3C validation? → No (CSS3 validation required)
6. ✅ Does it significantly increase file size? → No (<50KB constraint enforced)
7. ✅ Does it solve a common use case? → Yes (styling basic web pages for non-designers)
8. ✅ Can users achieve it themselves? → No (requires design expertise users lack)
9. ✅ Does it maintain simplicity? → Yes (minimal surface area, no optional features)

### Gate Status: ✅ APPROVED

**Violations**: 1 minor item (MIT license not specified)
**Justification**: MIT license should be added to README.md and package.json metadata. This is documentation, not a constitutional violation.

---

**Re-evaluation after Phase 1 design (2026-02-01)**:

All design decisions from research.md and data-model.md maintain constitutional compliance:

| Design Decision | Constitutional Compliance |
|----------------|---------------------------|
| CSS3 + PostCSS build tooling (dev only) | ✅ No runtime JavaScript, build tools permitted |
| System UI font stack | ✅ Zero dependencies, no custom font loading |
| Adaptive light/dark mode via `prefers-color-scheme` | ✅ Pure CSS, no JavaScript, no configuration |
| 75ch content width constraint | ✅ Pure CSS implementation |
| Modular scale typography (1.25 ratio) | ✅ CSS-only, opinionated design |
| GitHub-inspired color palette | ✅ CSS custom properties, no theming infrastructure |
| Testing tools (BackstopJS, css-validator, pa11y) | ✅ Development tools only, not runtime |
| Distribution (CDN + npm) | ✅ Static CSS files, instant drop-in usage |

**Final Status**: ✅ NO NEW VIOLATIONS - Constitution compliance maintained post-design.

## Project Structure

### Documentation (this feature)

```text
specs/001-classless-framework/
├── spec.md              # Feature specification
├── plan.md              # This file (implementation plan)
├── research.md          # Phase 0 output (technical research)
├── data-model.md        # Phase 1 output (design system entities)
├── quickstart.md        # Phase 1 output (user quick start guide)
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
edible-css/
├── src/
│   ├── edible.css           # Main source file (imports all partials)
│   ├── reset.css            # CSS reset/normalize
│   ├── tokens.css           # Design tokens (colors, spacing, typography)
│   ├── base.css             # html, body, box-sizing
│   ├── typography.css       # h1-h6, p, a, text elements
│   ├── lists.css            # ul, ol, li, dl, dt, dd
│   ├── tables.css           # table, thead, tbody, tr, th, td
│   ├── forms.css            # input, button, select, textarea, label
│   ├── media.css            # img, figure, figcaption, video, audio
│   ├── semantic.css         # nav, article, section, aside, header, footer
│   ├── utilities.css        # Helper rules (no classes, just element resets)
│   ├── dark-mode.css        # @media (prefers-color-scheme: dark)
│   └── print.css            # @media print styles
├── dist/
│   ├── edible.css           # Built output (unminified, commented)
│   └── edible.min.css       # Minified production build
├── test/
│   ├── samples/             # HTML test files
│   │   ├── typography.html
│   │   ├── forms.html
│   │   ├── tables.html
│   │   ├── lists.html
│   │   ├── semantic.html
│   │   ├── code.html
│   │   ├── media.html
│   │   ├── interactive.html
│   │   └── kitchen-sink.html
│   ├── backstop/            # BackstopJS configuration
│   │   ├── backstop.json
│   │   └── reference/       # Reference images (committed)
│   └── accessibility/       # Pa11y test configuration
├── docs/
│   ├── index.html           # Documentation site homepage
│   ├── examples/            # Live examples
│   └── api.md               # "API" reference (element list)
├── .github/
│   └── workflows/
│       └── test.yml         # CI: validation, visual tests, a11y
├── package.json             # npm metadata, scripts, dependencies
├── postcss.config.js        # PostCSS configuration
├── .gitignore
├── README.md                # Project readme
└── LICENSE                  # MIT license
```

**Structure Decision**: Single project structure chosen because:
- This is a pure CSS framework (no frontend/backend split)
- Source CSS files are modular for maintainability
- Test samples are HTML-only (no application code)
- Build tooling is minimal (PostCSS only)
- Distribution is straightforward (single CSS file output)

## Complexity Tracking

**No violations detected.** All Constitutional requirements and Immutable Laws are satisfied. No complexity justification needed.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
