<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Sections added: Immutable Laws, Decision Framework, Success Metrics
- Core principles unchanged (Zero Classes, No JavaScript, Minimal Configuration, For Non-Designers)
- Enhanced governance with decision framework and success indicators
- Templates status:
  ✅ plan-template.md - compatible, decision framework reinforces constitution check gates
  ✅ spec-template.md - compatible, success criteria align with success metrics
  ✅ tasks-template.md - compatible, immutable laws enforce task constraints
- Follow-up: None - all guidance integrated seamlessly
-->

# EdibleCSS Constitution

## Core Principles

### I. Zero Classes
**No CSS classes whatsoever. Style pure HTML5 elements only.**

EdibleCSS MUST provide styling exclusively through semantic HTML5 element selectors. Class-based styling is strictly prohibited. This ensures developers can write clean, semantic HTML without concerning themselves with CSS class naming or conventions. All styling decisions are based on the semantic meaning of HTML elements, not artificial class hierarchies.

**Rationale**: Eliminates cognitive load for non-designers who struggle with CSS class naming and architecture. Forces semantic HTML usage which improves accessibility and SEO by default.

### II. No JavaScript Required
**Pure CSS solution with no runtime dependencies.**

EdibleCSS MUST be implemented entirely in CSS with zero JavaScript runtime requirements. All interactive styling (hover states, transitions, pseudo-classes) must be achieved through CSS-only techniques. Build-time tooling is permitted but MUST NOT introduce runtime JavaScript.

**Rationale**: Maximizes performance, eliminates an entire category of potential bugs, ensures the framework works in any context (email, static sites, JavaScript-disabled environments), and maintains simplicity for developers unfamiliar with JavaScript ecosystems.

### III. Minimal Configuration
**Single `<link>` tag to get started - nothing more.**

EdibleCSS MUST be consumable via a single `<link rel="stylesheet">` tag in HTML. No initialization scripts, no configuration files, no build step required for basic usage. Advanced customization (if any) must remain entirely optional. The default experience must be zero-configuration.

**Rationale**: Reduces barrier to entry to absolute minimum. Developers can add beautiful styling in seconds without understanding build systems, package managers, or configuration formats. Drop-in functionality is critical for the target audience.

### IV. For Non-Designers
**Built explicitly for developers with no graphic design skills.**

EdibleCSS design decisions MUST prioritize sensible defaults that look professional without customization. Typography scales, color palettes, spacing systems, and component styling must be opinionated and production-ready out of the box. The framework serves developers who lack design expertise, not designers seeking flexibility.

**Rationale**: Target audience has no training in visual design, color theory, typography, or layout. Providing sane defaults prevents the "blank canvas paralysis" that occurs when developers face unlimited design choices. Constraints are liberating for this audience.

## Immutable Laws

These laws define the core identity of EdibleCSS. Violating any of these means creating a fundamentally different framework.

1. **No classes, ever.** This is the core identity. Violating this means creating a different framework.
2. **Single opinionated style.** No theming, no variants, no configuration.
3. **HTML5 semantic elements only.** No custom elements or web components.
4. **W3C validation is mandatory.** Invalid CSS or HTML cannot be released.
5. **Zero JavaScript dependency.** CSS-only solution forever.
6. **Instant drop-in usage.** No build step or configuration for end users.
7. **Responsive by default.** Mobile support is not optional.
8. **MIT licensed.** Always free and open source.

## Decision Framework

When evaluating new features, changes, or contributions, apply this decision tree in order:

1. **Does it require CSS classes?** → REJECT immediately
2. **Does it require JavaScript?** → REJECT immediately
3. **Does it add configuration options?** → REJECT immediately
4. **Does it target non-standard HTML?** → REJECT immediately
5. **Does it break W3C validation?** → REJECT immediately
6. **Does it significantly increase file size?** → RECONSIDER carefully (weigh benefit vs. bloat)
7. **Does it solve a common use case?** → CONSIDER (validate frequency)
8. **Can users achieve it themselves?** → LEAVE for users (framework should not be everything)
9. **Does it maintain simplicity?** → APPROVE if all above pass

This framework ensures consistency in decision-making and protects the project's core philosophy from feature creep.

## Success Metrics

### Primary Indicators

These metrics reflect true adoption and value delivery:

- **Production usage**: Number of projects using EdibleCSS in production environments
- **Community reach**: GitHub stars and npm/CDN downloads
- **Ecosystem impact**: Derivative frameworks or tools built on top of EdibleCSS
- **Maintainability**: Minimal issue count (simplicity reduces bugs and confusion)

### Anti-Metrics (Intentionally Not Measured)

These metrics would incentivize the wrong behaviors:

- ❌ **Feature richness or completeness** (encourages bloat)
- ❌ **Customization options available** (violates Immutable Law #2)
- ❌ **Size of community** (prefer small, focused community over large, diluted one)
- ❌ **Comprehensiveness vs. other frameworks** (not competing on features)

**Philosophy**: EdibleCSS succeeds by staying focused and opinionated, not by becoming a Swiss Army knife. We measure adoption, not feature count.

## Development Standards

### Code Quality
- All CSS must be valid CSS3 compliant
- Cross-browser compatibility required (modern evergreen browsers: Chrome, Firefox, Safari, Edge)
- Mobile-responsive by default (semantic HTML should adapt to all screen sizes)
- Accessibility MUST NOT be compromised (maintain semantic HTML benefits)

### Documentation
- Examples must show raw HTML only (no build tools, no preprocessors in examples)
- All examples must be copy-pasteable and work immediately
- Documentation must be written for non-technical audiences
- "Why this matters" rationale required for all design decisions

### Testing
- Visual regression tests required for all semantic elements
- Cross-browser testing mandatory before releases
- Accessibility audits required (WCAG 2.1 AA minimum)
- Real-world HTML samples from documentation sites must render correctly

### Performance
- Single CSS file must remain under 50KB uncompressed
- No CSS-in-JS or runtime style generation
- Minimize specificity conflicts (low specificity selectors preferred)
- Support standard minification without breaking functionality

## Governance

### Amendment Procedure
1. Proposed changes must be documented with rationale
2. Impact assessment on existing projects required
3. Breaking changes require MAJOR version bump
4. Community feedback period for principle changes (if applicable)

### Versioning Policy
- **MAJOR**: Principle violations, semantic HTML support removal, breaking visual changes
- **MINOR**: New HTML5 element support, additive styling enhancements
- **PATCH**: Bug fixes, browser compatibility patches, documentation clarifications

### Compliance Review
All contributions must be validated against these principles before merge:
- ✅ Uses zero classes?
- ✅ Zero JavaScript runtime?
- ✅ Works with single `<link>` tag?
- ✅ Maintains professional defaults for non-designers?
- ✅ Passes all Immutable Laws?
- ✅ Survives Decision Framework evaluation?

This constitution supersedes all other development practices. When in doubt, refer to the four core principles and eight Immutable Laws. Simplicity and accessibility for non-designers is the ultimate tiebreaker for any design decision.

**Version**: 1.1.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
