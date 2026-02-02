# Feature Specification: Licensing and Linting Standards

**Feature Branch**: `002-licensing-linting`  
**Created**: 2026-02-01  
**Status**: Draft  
**Input**: User description: "SPDX headers in all source files: SPDX-FileCopyrightText and SPDX-License-Identifier. Use markdownlint-cli2 for linting markdown files"

## Clarifications

### Session 2026-02-02

- Q: What GitHub Action should be used for REUSE compliance checking in CI? → A: fsfe/reuse-action@v6
- Q: What GitHub Action should be used for markdown linting in CI? → A: DavidAnson/markdownlint-cli2-action
- Q: Should markdown linting be enforced locally (pre-commit hooks)? → A: No, CI-only enforcement
- Q: What level of CI error message detail needed for compliance failures? → A: Default action logs sufficient
- Q: Should SPDX headers be required in config files (package.json, postcss.config.js)? → A: Only source files
- Q: What minimum Node.js version required for markdownlint-cli2? → A: Node.js 22+ (development only)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clear License Attribution in Source Files (Priority: P1)

A developer or legal reviewer opens any source file (CSS, JavaScript, HTML) or documentation file (markdown) in the EdibleCSS repository and immediately sees standardized SPDX headers indicating copyright holder and license type. This enables quick license compliance audits, automated tooling integration, and clear attribution without reading separate LICENSE files.

**Why this priority**: License compliance is a legal requirement for open-source projects. SPDX is the industry standard for machine-readable license metadata. This is foundational infrastructure that should exist before public distribution.

**Independent Test**: Select any source file, verify SPDX headers are present and correctly formatted with copyright and license identifier.

**Acceptance Scenarios**:

1. **Given** a CSS source file (e.g., `src/edible.css`), **When** a developer opens it, **Then** the file contains `SPDX-FileCopyrightText: 2026 Sergei Mukhin` and `SPDX-License-Identifier: MIT` in a comment block at the top.
2. **Given** a markdown documentation file (e.g., `README.md`, spec files), **When** inspected, **Then** the file contains SPDX headers in HTML comment format `<!-- SPDX-FileCopyrightText: ... -->`.
3. **Given** a JavaScript source file (e.g., `postcss.config.js`), **When** viewed, **Then** the file contains SPDX headers in JS comment format at the top (configuration JSON/YAML files are excluded from SPDX requirements).

---

### User Story 2 - Consistent Markdown Quality (Priority: P2)

Contributors write or modify markdown files (README, specs, documentation) and receive immediate feedback on formatting inconsistencies before committing. CI/CD pipelines automatically validate markdown quality, preventing poorly formatted documentation from being merged. This maintains professional documentation standards without manual review burden.

**Why this priority**: EdibleCSS is a CSS framework with extensive markdown documentation (specs, quickstart, research). Consistent markdown quality improves readability and professionalism. Secondary to licensing compliance but critical for project quality.

**Independent Test**: Run `markdownlint-cli2` against all markdown files and verify zero errors. Intentionally introduce a markdown error and verify it's caught.

**Acceptance Scenarios**:

1. **Given** a markdown file with formatting issues (e.g., inconsistent heading levels, missing blank lines), **When** `markdownlint-cli2` is run, **Then** the tool reports specific errors with line numbers and rule violations.
2. **Given** a developer commits markdown changes, **When** CI pipeline runs `DavidAnson/markdownlint-cli2-action`, **Then** markdownlint validation executes automatically and fails the build if errors exist.
3. **Given** a markdown file with configuration exceptions (e.g., long lines in code blocks allowed per `.markdownlint-cli2.yaml`), **When** linted, **Then** the file passes validation despite containing otherwise-flagged patterns.

---

### User Story 3 - Automated License Compliance Verification (Priority: P3)

Open-source license compliance tools (specifically `fsfe/reuse-action@v6` GitHub Action) automatically verify the project's license metadata without manual inspection. This enables EdibleCSS to earn compliance badges, simplifies legal audits, and ensures all contributed code maintains proper attribution.

**Why this priority**: Nice-to-have automation that validates Stories 1 and 2. Provides confidence but isn't strictly necessary for initial release.

**Independent Test**: Run `reuse lint` or trigger `fsfe/reuse-action@v6` in CI and verify 100% of files are compliant or properly excluded.

**Acceptance Scenarios**:

1. **Given** the repository with SPDX headers applied, **When** `fsfe/reuse-action@v6` runs in CI, **Then** the action reports zero licensing issues and confirms all source files have proper metadata.
2. **Given** a new source file is added without SPDX headers, **When** CI runs license compliance checks via `fsfe/reuse-action@v6`, **Then** the build fails and developers can inspect the action logs for violation details.
3. **Given** binary files or auto-generated files (e.g., `node_modules/`, `dist/`), **When** compliance is checked, **Then** these files are properly excluded via `.reuse/dep5` or `.gitignore` patterns.

---

### Edge Cases

- What happens with binary files (images, fonts) that can't contain text headers?
  - **Answer**: Use `.reuse/dep5` file to declare licensing for binary assets, or include `LICENSE` sidecars (`filename.ext.license`).
- How are auto-generated files handled (e.g., `dist/edible.min.css`, `package-lock.json`)?
  - **Answer**: Exclude from SPDX requirements via `.gitignore`. Generated files inherit source file licenses.
- What if a file has multiple copyright holders (e.g., external contributions)?
  - **Answer**: Multiple `SPDX-FileCopyrightText` lines are allowed: one per copyright holder.
- How are markdown files handled given different comment syntaxes?
  - **Answer**: Markdown uses HTML comments `<!-- SPDX-... -->` for SPDX headers.
- What if markdownlint rules conflict with project needs (e.g., long lines in tables)?
  - **Answer**: Configure `.markdownlint-cli2.yaml` with rule exceptions (already done for code blocks and tables).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All source code files (CSS, JavaScript, TypeScript, HTML, etc.) MUST contain SPDX headers in their native comment syntax at the top of the file.
- **FR-002**: All markdown documentation files MUST contain SPDX headers in HTML comment format (`<!-- SPDX-FileCopyrightText: ... -->`).
- **FR-002a**: Configuration files (JSON, YAML, etc.) are excluded from SPDX header requirements.
- **FR-003**: SPDX headers MUST include two required lines:
  - `SPDX-FileCopyrightText: <year> <copyright holder>`
  - `SPDX-License-Identifier: <SPDX-license-expression>`
- **FR-004**: Copyright year MUST match the year of file creation (or range for multi-year modifications).
- **FR-005**: License identifier MUST be `MIT` (matching `LICENSE.txt` in repository root).
- **FR-006**: Project MUST use `markdownlint-cli2` as the markdown linting tool (not original markdownlint).
- **FR-007**: Configuration file `.markdownlint-cli2.yaml` MUST exist in repository root with project-specific rule configurations.
- **FR-008**: Markdown linting MUST be enforceable via npm script (e.g., `npm run lint:md`).
- **FR-009**: CI/CD pipeline MUST automatically run markdown linting via `DavidAnson/markdownlint-cli2-action` and fail builds on violations.
- **FR-010**: Binary files and generated artifacts MUST either have sidecar `.license` files or be excluded via `.reuse/dep5`.
- **FR-011**: SPDX header format MUST be compatible with REUSE.software specification v3.0.
- **FR-012**: Documentation (README or contributing guide) MUST explain SPDX header requirements for new contributors.
- **FR-013**: CI/CD pipeline MUST use `fsfe/reuse-action@v6` GitHub Action for REUSE compliance verification.
- **FR-014**: Development environment MUST use Node.js 22 or higher for markdown linting tools.

### Key Entities

**SPDX Header**:
- Format: Comment block at top of file
- Required fields:
  - `SPDX-FileCopyrightText`: Copyright year and holder(s)
  - `SPDX-License-Identifier`: SPDX license expression (MIT)
- Syntax variations:
  - CSS/JS: `/* SPDX-FileCopyrightText: ... */`
  - Markdown: `<!-- SPDX-FileCopyrightText: ... -->`
  - Shell/YAML: `# SPDX-FileCopyrightText: ...`
  - HTML: `<!-- SPDX-FileCopyrightText: ... -->`

**Markdownlint Configuration**:
- File: `.markdownlint-cli2.yaml`
- Structure:
  ```yaml
  gitignore: true
  config:
    MD013:  # Line length rule
      code_blocks: false
      tables: false
    # Additional rule customizations
  ```
- Purpose: Define project-specific markdown style rules

**File Categories** (for licensing):
1. **Source files**: CSS, JS, TS, HTML - require inline SPDX headers
2. **Documentation**: Markdown files - require HTML comment SPDX headers
3. **Configuration**: JSON, YAML, config files - excluded from SPDX requirements (inherit project license)
4. **Binary files**: Images, fonts - require sidecar `.license` files or dep5 entry
5. **Generated files**: `dist/`, `node_modules/` - excluded (not tracked in git)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of tracked source files (CSS, JS, HTML, markdown) contain valid SPDX headers with correct copyright and license (config files excluded).
- **SC-002**: Running `reuse lint` (REUSE.software compliance checker) on the repository produces zero errors.
- **SC-003**: Running `markdownlint-cli2 "**/*.md"` on the repository produces zero errors.
- **SC-004**: CI pipeline includes markdown linting job that fails on violations (verifiable in GitHub Actions or equivalent).
- **SC-005**: Markdown linting completes in under 5 seconds for the entire repository (performance requirement).
- **SC-006**: SPDX headers are formatted identically across all files of the same type (consistency check).
- **SC-007**: Contributing documentation (CONTRIBUTING.md or README.md) includes SPDX header template and instructions.
- **SC-008**: Adding a new source file without SPDX headers triggers CI failure; developers check action logs for details.
- **SC-009**: All existing markdown files pass markdownlint validation without requiring content changes (configuration handles edge cases).
- **SC-010**: Project can display REUSE.software compliance badge in README (indicates full SPDX compliance).

### Assumptions

- **Assumption 1**: All contributors can add text comments to source files (no workflow restrictions on file modification).
- **Assumption 2**: Copyright holder is "Sergei Mukhin" for all current files (as seen in LICENSE.txt).
- **Assumption 3**: MIT license will remain consistent for the project lifespan (no license changes planned).
- **Assumption 4**: Contributors have Node.js 22+ installed to run `markdownlint-cli2` locally (optional for manual checks, not enforced via git hooks).
- **Assumption 5**: CI/CD environment supports Node.js 22+ and can execute npm scripts and GitHub Actions.
- **Assumption 6**: Markdown files follow a consistent style that can be enforced (no deliberately non-standard formatting).
- **Assumption 7**: `.markdownlint-cli2.yaml` is sufficient for all current and planned markdown files (no need for per-file overrides).
- **Assumption 8**: SPDX headers won't negatively impact CSS file size or performance (comments are stripped during minification).

### Out of Scope

The following are explicitly NOT goals for this feature:

- **Multi-license support**: Only MIT license. No support for dual licensing or per-file license variations.
- **Copyright transfer process**: No workflow for transferring copyright or handling external contributions with different copyright holders (document only, don't automate).
- **Automated SPDX header insertion**: No tooling to automatically add headers to files. Contributors add manually following documentation.
- **License compatibility checking**: No validation of dependency licenses or compatibility analysis.
- **Patent clauses**: MIT license doesn't include patent grants. No patent-specific metadata.
- **Historical copyright attribution**: No requirement to track all historical contributors in headers (Git history is source of truth).
- **Internationalization**: SPDX headers in English only. No translated license identifiers.
- **Custom markdownlint plugins**: Use built-in markdownlint-cli2 rules only. No custom rule development.
- **Prose linting**: No grammar or spelling checks (only markdown structural linting).
- **IDE integration**: No automatic markdownlint integration with VSCode/IntelliJ (users configure their own).
- **Pre-commit hooks**: No local git hooks for markdown linting enforcement. Linting enforced only in CI.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]  
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]
