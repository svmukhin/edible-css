# Tasks: Classless CSS Framework

**Input**: Design documents from `/specs/001-classless-framework/`
**Prerequisites**: plan.md (✓), spec.md (✓), research.md (✓), data-model.md (✓),
quickstart.md (✓)

**Tests**: This feature does NOT include traditional test tasks for story
implementation. Testing is validation-focused (W3C CSS validation, visual
regression with BackstopJS, accessibility with pa11y). Test infrastructure setup
is included in Phase 1.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

**Note**: Phase numbering in tasks.md (1-6) represents implementation phases,
distinct from planning phases (Phase 0: research, Phase 1: design) referenced in
plan.md.

## Path Conventions

- **Single project**: `src/`, `test/`, `dist/`, `docs/` at repository root
- Based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, build tooling, and test infrastructure

- [X] T001 Create project directory structure: src/, dist/, test/, docs/ at
  repository root
- [X] T002 Initialize npm project with package.json (name: edible-css, version:
  0.1.0, license: MIT)
- [X] T003 [P] Install PostCSS dependencies: postcss, postcss-cli, autoprefixer
  in package.json
- [X] T004 [P] Install testing dependencies: backstopjs, css-validator, pa11y,
  axe-core in package.json
- [X] T005 [P] Create PostCSS configuration in postcss.config.js with
  autoprefixer
- [X] T006 [P] Create BackstopJS configuration in test/backstop/backstop.json
  with viewports (mobile 375px, tablet 768px, desktop 1920px)
- [X] T007 [P] Add npm scripts in package.json: build, minify, validate,
  test:visual, test:a11y, serve:tests
- [X] T008 Create HTML test samples structure in test/samples/ directory
- [X] T009 [P] Create test/samples/typography.html for testing h1-h6, p, a,
  strong, em, small
- [X] T010 [P] Create test/samples/forms.html for testing input, textarea,
  button, select, fieldset, legend
- [X] T011 [P] Create test/samples/tables.html for testing table, thead, tbody,
  tr, th, td
- [X] T012 [P] Create test/samples/lists.html for testing ul, ol, li, dl, dt, dd
- [X] T013 [P] Create test/samples/semantic.html for testing nav, main, article,
  section, aside, footer, header
- [X] T014 [P] Create test/samples/code.html for testing code, pre, kbd, samp,
  var, blockquote, cite
- [X] T015 [P] Create test/samples/media.html for testing img, figure,
  figcaption, audio, video
- [X] T016 [P] Create test/samples/interactive.html for testing details,
  summary, dialog
- [X] T017 [P] Create test/samples/kitchen-sink.html combining all element types
- [X] T018 Create README.md with project overview, installation methods (CDN,
  npm, download), usage examples
- [X] T019 Create LICENSE file with MIT license text (Copyright 2026 Sergei
  Mukhin)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core CSS infrastructure that MUST be complete before ANY user story
can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T020 Create src/edible.css as main entry file with @import statements for
  all partials
- [X] T021 Create src/reset.css with CSS reset/normalize (box-sizing:
  border-box, margin/padding resets)
- [X] T022 Create src/tokens.css with CSS custom properties for design tokens
- [X] T023 Define color palette tokens in src/tokens.css (light: --bg-primary
  #ffffff, --text-primary #24292f, --accent #0969da, --border-primary #d0d7de,
  --bg-secondary #f6f8fa, --text-secondary #57606a)
- [X] T024 Define dark mode color tokens in src/tokens.css using @media
  (prefers-color-scheme: dark) (--bg-primary #0d1117, --text-primary #e6edf3,
  --accent #58a6ff, etc.)
- [X] T025 Define typography scale tokens in src/tokens.css (--font-sm 0.8rem,
  --font-md 1rem, --font-lg 1.25rem, --font-xl 1.563rem, --font-2xl 1.953rem,
  --font-3xl 2.441rem, --font-4xl 3.052rem)
- [X] T026 Define spacing system tokens in src/tokens.css (--space-xs 0.25rem,
  --space-sm 0.5rem, --space-md 1rem, --space-lg 1.5rem, --space-xl 2rem,
  --space-2xl 3rem)
- [X] T027 Create src/base.css with html and body base styles (system font
  stack, background/text color, line-height 1.6)
- [X] T028 Add content width constraint to body in src/base.css (max-width:
  75ch, margin: 0 auto, padding: 0 var(--space-md))

**Checkpoint**: Foundation ready - user story implementation can now begin in
parallel

---

## Phase 3: User Story 1 - Instant Styling with Single Link Tag (Priority: P1) 🎯 MVP

**Goal**: Style 50+ HTML5 elements to transform plain HTML into
professional-looking pages with zero additional effort

**Independent Test**: Create plain HTML5 page with common elements (headings,
paragraphs, lists, tables, forms), add `<link rel="stylesheet"
href="edible.css">`, verify professional appearance without writing any CSS or
classes

### Implementation for User Story 1

- [X] T029 [P] [US1] Implement typography styles in src/typography.css (h1-h6
  with modular scale, p with optimal line-height, a with accent color and
  underline)
- [X] T030 [P] [US1] Implement text formatting elements in src/typography.css
  (strong, em, small, mark, del, ins, sub, sup with appropriate styling)
- [X] T031 [P] [US1] Implement list styles in src/lists.css (ul, ol, li with
  proper spacing and indentation)
- [X] T032 [P] [US1] Implement definition list styles in src/lists.css (dl, dt,
  dd with semantic hierarchy)
- [X] T033 [P] [US1] Implement table styles in src/tables.css (table with
  borders, thead/tbody separation, th/td padding and alignment)
- [X] T034 [P] [US1] Add table zebra striping in src/tables.css (tbody
  tr:nth-child(even) with secondary background)
- [X] T035 [P] [US1] Implement form input styles in src/forms.css
  (input[type=text], input[type=email], input[type=password], textarea with
  borders, padding, focus states)
- [X] T036 [P] [US1] Implement select and option styles in src/forms.css (select
  with consistent appearance)
- [X] T037 [P] [US1] Implement button styles in src/forms.css (button,
  input[type=submit], input[type=button] with accent color, padding, hover
  states)
- [X] T038 [P] [US1] Implement checkbox and radio styles in src/forms.css
  (input[type=checkbox], input[type=radio] with accessible appearance)
- [X] T039 [P] [US1] Implement fieldset and legend styles in src/forms.css
  (fieldset with border, legend with appropriate positioning)
- [X] T040 [P] [US1] Implement label styles in src/forms.css (label with margin,
  cursor pointer for clickable labels)
- [X] T041 [P] [US1] Implement code and pre styles in src/typography.css (code
  with monospace font and background, pre with overflow and padding)
- [X] T042 [P] [US1] Implement blockquote and cite styles in src/typography.css
  (blockquote with indentation and border-left, cite with italic)
- [X] T043 [P] [US1] Implement keyboard and sample styles in src/typography.css
  (kbd, samp with distinct backgrounds)
- [X] T044 [P] [US1] Implement abbreviation and time styles in
  src/typography.css (abbr with dotted underline, time with no special styling)
- [X] T045 [P] [US1] Implement image styles in src/media.css (img with
  max-width: 100%, height: auto)
- [X] T046 [P] [US1] Implement figure and figcaption styles in src/media.css
  (figure with margin, figcaption with reduced font size)
- [X] T047 [P] [US1] Implement horizontal rule style in src/base.css (hr with
  border color and margin)
- [X] T048 [US1] Build CSS using PostCSS: run npm run build to generate
  dist/edible.css
- [X] T049 [US1] Validate CSS using W3C validator: run npm run validate to
  ensure CSS3 compliance
- [X] T050 [US1] Run visual regression tests: npm run test:visual on all
  test/samples/*.html files
- [X] T051 [US1] Run accessibility tests: npm run test:a11y on
  test/samples/*.html files
- [X] T052 [US1] Verify file size under 50KB: check dist/edible.css size
- [X] T053 [US1] Create minified version: npm run minify to generate
  dist/edible.min.css

**Checkpoint**: At this point, User Story 1 should be fully functional - plain
HTML + single link tag = professional appearance

---

## Phase 4: User Story 2 - Responsive Design Without Media Query Knowledge (Priority: P2)

**Goal**: Automatic responsive behavior across all device sizes (mobile 320px+,
tablet 768px+, desktop 1024px+) without user writing media queries

**Independent Test**: Create HTML5 page with EdibleCSS, view on desktop
(1920px), tablet (768px), and mobile (375px), verify readability and layout
quality on all sizes without horizontal scrolling

### Implementation for User Story 2

- [X] T054 [US2] Add mobile-first responsive typography in src/typography.css
  (base font-size 16px on html for mobile)
- [X] T055 [US2] Add tablet breakpoint typography adjustment in
  src/typography.css (@media min-width 768px: html font-size 106.25% = 17px)
- [X] T056 [US2] Add desktop breakpoint typography adjustment in
  src/typography.css (@media min-width 1024px: html font-size 112.5% = 18px)
- [X] T057 [US2] Add responsive spacing adjustments in src/base.css (body
  padding increases at larger breakpoints if needed)
- [X] T058 [US2] Ensure images scale responsively in src/media.css (img
  max-width 100%, height auto already set in US1)
- [X] T059 [US2] Add responsive table behavior in src/tables.css (table
  overflow-x auto on mobile if needed)
- [X] T060 [US2] Add responsive form layout in src/forms.css (input/textarea
  width 100% on mobile, appropriate sizing on larger screens)
- [X] T061 [US2] Test responsive behavior: run npm run test:visual to verify all
  three viewports (375px, 768px, 1920px) render correctly
- [X] T062 [US2] Validate no horizontal scrolling on mobile: manually test all
  test/samples/*.html on 320px viewport
- [X] T063 [US2] Build and validate: npm run build && npm run validate

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - pages
look good on all device sizes automatically

---

## Phase 5: User Story 3 - Semantic HTML Reinforcement (Priority: P3)

**Goal**: Semantic HTML5 elements (nav, article, section, aside, footer, etc.)
receive distinct visual treatment that guides users toward accessible,
SEO-friendly markup

**Independent Test**: Compare page using semantic elements (nav, main, footer,
article, aside, blockquote, cite) vs generic divs, verify semantic markup
produces richer, more appropriate styling

### Implementation for User Story 3

- [X] T064 [P] [US3] Create src/semantic.css for semantic HTML5 element styles
- [X] T065 [P] [US3] Implement nav styles in src/semantic.css (nav with distinct
  background color, padding, possible border)
- [X] T066 [P] [US3] Implement nav list styles in src/semantic.css (nav ul with
  horizontal or vertical layout, remove list-style)
- [X] T067 [P] [US3] Implement main styles in src/semantic.css (main as primary
  content area, possible additional margin)
- [X] T068 [P] [US3] Implement article styles in src/semantic.css (article with
  prominent content styling, margin/padding)
- [X] T069 [P] [US3] Implement aside styles in src/semantic.css (aside with
  visually secondary treatment, lighter background or reduced emphasis)
- [X] T070 [P] [US3] Implement section styles in src/semantic.css (section with
  spacing between sections)
- [X] T071 [P] [US3] Implement header styles in src/semantic.css (header with
  appropriate spacing and possible border-bottom)
- [X] T072 [P] [US3] Implement footer styles in src/semantic.css (footer with
  reduced emphasis, lighter text color, border-top, padding)
- [X] T073 [US3] Add @import for src/semantic.css to src/edible.css
- [X] T074 [US3] Test semantic element differentiation: verify
  test/samples/semantic.html shows clear visual distinction between nav,
  article, aside, footer
- [X] T075 [US3] Build and validate: npm run build && npm run validate
- [X] T076 [US3] Run visual regression: npm run test:visual to verify
  semantic.html renders correctly

**Checkpoint**: All user stories should now be independently functional -
semantic elements have distinct, appropriate styling

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T077 [P] Create src/dark-mode.css with @media (prefers-color-scheme: dark)
  adjustments for any element-specific overrides beyond tokens
- [X] T078 [P] Create src/print.css with @media print styles (hide nav, adjust
  colors to black/white, remove backgrounds)
- [X] T079 Add @import for src/dark-mode.css and src/print.css to src/edible.css
- [X] T080 [P] Optimize CSS output: review dist/edible.css for redundancy,
  ensure logical order of rules
- [X] T081 [P] Add focus indicators: audit all interactive elements (a, button,
  input, select, textarea) for :focus styles with visible outline
- [X] T082 [P] Add smooth transitions: add subtle transitions for hover/focus
  states in src/forms.css and src/typography.css
- [X] T083 Test dark mode: manually verify all test/samples/*.html in dark mode
  using browser/OS dark theme setting
- [X] T084 Test print styles: manually verify test/samples/*.html print preview
  looks appropriate
- [X] T085 Final accessibility audit: run npm run test:a11y on all test samples,
  ensure WCAG 2.1 AA compliance (4.5:1 contrast)
- [X] T086 Final W3C validation: run npm run validate, ensure zero CSS3
  validation errors
- [X] T087 Final visual regression: run npm run test:visual, review all diffs,
  approve reference images if changes are intentional
- [X] T088 Measure performance: test stylesheet load/parse time in browser
  DevTools, ensure <100ms (SC-007)
- [X] T089 Verify file size: check dist/edible.css <50KB uncompressed,
  dist/edible.min.css <10KB gzipped (gzip -c dist/edible.min.css | wc -c)
- [X] T090 [P] Create documentation site: docs/index.html with project
  description, installation instructions, live examples
- [X] T091 [P] Add examples to docs/examples/ directory with copy-paste HTML
  samples from quickstart.md
- [X] T092 [P] Create API reference: docs/api.md listing all styled elements
  with descriptions
- [X] T093 Validate quickstart.md accuracy: ensure all examples in
  specs/001-classless-framework/quickstart.md work correctly with built CSS
- [X] T094 Update README.md with CDN links (jsDelivr, unpkg), npm installation,
  download instructions
- [X] T095 Final constitution check: verify all 4 Core Principles and 8
  Immutable Laws are satisfied in final implementation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T019) - BLOCKS
  all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  (T020-T028)
  - User Story 1 (Phase 3) can start after Phase 2
  - User Story 2 (Phase 4) can start after Phase 2 (builds on US1 CSS files but
    adds responsive behavior)
  - User Story 3 (Phase 5) can start after Phase 2 (independent semantic styles)
- **Polish (Phase 6)**: Depends on all user stories being complete (T029-T076)

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No
  dependencies on other stories
  - Creates core CSS files: typography.css, lists.css, tables.css, forms.css,
    media.css
  - Styles 50+ HTML5 elements for instant professional appearance
  - **Independent test**: Plain HTML + link tag = professional look

- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1
  files but modifies them with media queries
  - Adds responsive behavior to existing typography.css, base.css, tables.css,
    forms.css, media.css
  - Each task adds @media queries to files created in US1
  - **Independent test**: Same HTML works on mobile/tablet/desktop without
    horizontal scrolling

- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of
  US1 and US2
  - Creates new file: semantic.css with semantic element styles (nav, article,
    aside, footer, etc.)
  - Does not modify US1 or US2 files
  - **Independent test**: Semantic elements have distinct visual treatment vs
    generic divs

### Within Each User Story

**User Story 1** (T029-T053):

- T029-T047: Parallel CSS file creation (each file independent)
- T048: Build (depends on T029-T047 completion)
- T049-T053: Sequential validation steps (depend on T048 build)

**User Story 2** (T054-T063):

- T054-T060: Can be done in parallel (modifying different CSS files)
- T061-T063: Sequential testing/validation (depend on T054-T060)

**User Story 3** (T064-T076):

- T064-T072: Parallel semantic element styling (all in semantic.css)
- T073-T076: Sequential integration/testing (depend on T064-T072)

**Polish Phase** (T077-T095):

- T077-T082: Parallel enhancements (different concerns)
- T083-T089: Sequential final validation
- T090-T092: Parallel documentation
- T093-T095: Final checks

### Parallel Opportunities

**Phase 1 (Setup)**: All tasks T003-T017 can run in parallel after T001-T002
complete

**Phase 2 (Foundational)**: Tasks T022-T026 (token definitions) can run in
parallel; T027-T028 depend on tokens

**Phase 3 (User Story 1)**: Tasks T029-T047 can all run in parallel (different
CSS files and concerns)

**Phase 4 (User Story 2)**: Tasks T054-T060 can run in parallel (adding media
queries to different files)

**Phase 5 (User Story 3)**: Tasks T064-T072 can run in parallel (all styling
semantic.css)

**Phase 6 (Polish)**: Tasks T077-T079, T080-T082, T090-T092 can run in parallel

**Between User Stories**: Once Foundational phase completes, US1, US2, and US3
can be worked on in parallel by different developers (US2 modifies US1 files but
adds distinct media query sections, US3 is fully independent)

---

## Parallel Example: User Story 1

```bash
# Launch all CSS partial creation tasks together:
# T029: "Implement typography styles in src/typography.css"
# T030: "Implement text formatting elements in src/typography.css"
# T031: "Implement list styles in src/lists.css"
# T032: "Implement definition list styles in src/lists.css"
# T033: "Implement table styles in src/tables.css"
# T034: "Add table zebra striping in src/tables.css"
# T035-T040: "Implement form element styles in src/forms.css"
# T041-T044: "Implement code/blockquote/kbd styles in src/typography.css"
# T045-T046: "Implement image/figure styles in src/media.css"
# T047: "Implement hr style in src/base.css"

# Once all CSS partials complete, run sequential validation:
# T048: Build with PostCSS
# T049: W3C CSS validation
# T050: Visual regression testing
# T051: Accessibility testing
# T052: File size check
# T053: Minification
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T019) → Project structure and test
   infrastructure ready
2. Complete Phase 2: Foundational (T020-T028) → Core CSS architecture ready
3. Complete Phase 3: User Story 1 (T029-T053) → Instant styling with single link
   tag
4. **STOP and VALIDATE**:
   - Test on real HTML pages
   - Verify professional appearance with zero classes
   - Verify W3C CSS3 validation passes
   - Verify accessibility compliance
   - Verify file size <50KB
5. MVP READY: Users can now add single link tag and get professional-looking
   pages

### Incremental Delivery

1. **Foundation** (Phase 1-2) → Development environment ready
2. **MVP** (Phase 3 - US1) → Core value: instant professional styling
   - Deploy to CDN (jsDelivr/unpkg)
   - Publish to npm as v0.1.0
   - Demo on documentation site
3. **Responsive** (Phase 4 - US2) → Added value: works on all devices
   - Update CDN
   - Publish to npm as v0.2.0
4. **Semantic** (Phase 5 - US3) → Added value: semantic HTML reinforcement
   - Update CDN
   - Publish to npm as v0.3.0
5. **Production Ready** (Phase 6 - Polish) → Final polish and documentation
   - Update CDN
   - Publish to npm as v1.0.0

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (Phase 1-2)
2. **Once Foundational is done, work in parallel:**
   - **Developer A: User Story 1** (T029-T053) - Core element styling
   - **Developer B: User Story 3** (T064-T076) - Semantic elements (fully
     independent)
   - **Developer C: Setup documentation** (T090-T092) - Can start early
3. **After US1 completes:**
   - **Developer A: User Story 2** (T054-T063) - Add responsive behavior to US1
     files
   - **Developer B: Polish tasks** (T077-T089) - Cross-cutting improvements
4. **Final integration and validation together**

**Note**: User Story 2 should ideally be done by the same developer as User
Story 1 since it modifies the same CSS files (adding media queries). User Story
3 is fully independent and can be done by a different developer in parallel.

---

## Notes

- [P] tasks = different files or independent concerns, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- CSS framework testing is validation-focused (W3C, visual regression,
  accessibility) not unit/integration tests
- Tests are NOT written first - this is not TDD since output is
  visual/declarative (CSS)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Build early and often - run `npm run build` after every few CSS changes to
  catch issues
- Validate continuously - run `npm run validate` to ensure CSS3 compliance
- File size matters - monitor dist/edible.css size throughout development (must
  stay <50KB)
- Visual regression baseline - first run of BackstopJS creates reference images,
  subsequent runs compare against them
- Dark mode testing - manually toggle OS/browser dark mode setting to test
  prefers-color-scheme behavior
- Constitution compliance - no classes, no JavaScript, element-only selectors
  maintained throughout

---

## Total Task Count: 95 tasks

**By Phase**:

- Phase 1 (Setup): 19 tasks (T001-T019)
- Phase 2 (Foundational): 9 tasks (T020-T028)
- Phase 3 (User Story 1): 25 tasks (T029-T053)
- Phase 4 (User Story 2): 10 tasks (T054-T063)
- Phase 5 (User Story 3): 13 tasks (T064-T076)
- Phase 6 (Polish): 19 tasks (T077-T095)

**By User Story**:

- User Story 1 (P1 - Instant Styling): 25 tasks
- User Story 2 (P2 - Responsive Design): 10 tasks
- User Story 3 (P3 - Semantic HTML): 13 tasks

**Parallel Opportunities**: 47 tasks marked with [P] across all phases

**MVP Scope** (Recommended): Phase 1 + Phase 2 + Phase 3 (User Story 1 only) =
53 tasks
