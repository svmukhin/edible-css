# Research: Licensing and Linting Standards

**Feature**: 002-licensing-linting | **Date**: 2026-02-02  
**Purpose**: Resolve technical unknowns and establish best practices for SPDX
headers and markdown linting

## Research Questions

### Q1: SPDX Header Format Best Practices

**Question**: What are the exact SPDX header formats for CSS, JavaScript, HTML,
and Markdown files according to REUSE.software specification v3.0?

**Findings**:

**REUSE Specification v3.0 Requirements**:

- Headers must appear at the top of files (within first few lines)
- Two required tags: `SPDX-FileCopyrightText` and `SPDX-License-Identifier`
- Format: `SPDX-FileCopyrightText: [year] [copyright holder]`
- License: `SPDX-License-Identifier: MIT`
- Multiple copyright holders allowed with multiple `SPDX-FileCopyrightText`
  lines

**File-Specific Formats**:

**CSS/JavaScript**:

```css
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */
```text

**HTML**:

```html
<!--
  SPDX-FileCopyrightText: 2026 Sergei Mukhin
  SPDX-License-Identifier: MIT
-->
```text

**Markdown**:

```markdown
<!--
SPDX-FileCopyrightText: 2026 Sergei Mukhin
SPDX-License-Identifier: MIT
-->
```text

**Decision**: Use multi-line comment blocks with SPDX tags on separate lines for
better readability. This format is compatible with `reuse lint` and
`fsfe/reuse-action@v6`.

**Rationale**: Multi-line format is more readable than single-line for humans
while being fully machine-parseable. Consistent indentation improves visual
appearance.

**Alternatives Considered**:

- Single-line format (`// SPDX-FileCopyrightText:...`) - Rejected: Less
  readable, not supported in all file types
- Inline at end of file - Rejected: REUSE spec requires headers at top
- DEP5 file only - Rejected: Doesn't meet requirement for inline headers in
  source files

---

### Q2: REUSE Specification File Structure

**Question**: What additional files does REUSE.software require beyond inline
headers (LICENSES/, .reuse/dep5)?

**Findings**:

**Required REUSE Structure**:

1. **LICENSES/ directory**: Must contain full license text
   - Filename format: `MIT.txt` (SPDX identifier + .txt extension)
   - Content: Full MIT license text from SPDX license list
   - Purpose: Machine-readable license reference

2. **.reuse/dep5 file**: Optional but recommended for:
   - Binary files (images, fonts) that can't contain text headers
   - Generated files (build outputs, node_modules)
   - Files where headers are impractical

3. **LICENSE.txt vs LICENSES/MIT.txt**:
   - `LICENSE.txt` at root: Human-readable convention (kept for GitHub)
   - `LICENSES/MIT.txt`: REUSE spec requirement
   - Both can coexist - REUSE prefers LICENSES/ directory

**DEP5 Format** (`.reuse/dep5`):

```text
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/
Upstream-Name: edible-css
Upstream-Contact: Sergei Mukhin
Source: https://github.com/svmukhin/edible-css

Files: package-lock.json dist/* test/backstop/test/*
Copyright: 2026 Sergei Mukhin
License: MIT
```text

**Decision**:

- Create `LICENSES/MIT.txt` with full SPDX MIT license text
- Create `.reuse/dep5` for generated files and binaries
- Keep existing `LICENSE.txt` for GitHub compatibility

**Rationale**: Full REUSE compliance while maintaining GitHub conventions. DEP5
file simplifies handling of generated artifacts.

**Alternatives Considered**:

- Sidecar `.license` files for each binary - Rejected: Too many files, DEP5 is
  cleaner
- Remove root LICENSE.txt - Rejected: GitHub best practice to keep it

---

### Q3: markdownlint-cli2 Configuration Best Practices

**Question**: What are recommended markdownlint-cli2 rules for technical
documentation repositories?

**Findings**:

**Existing Configuration** (`.markdownlint-cli2.yaml`):

```yaml
gitignore: true
config:
  MD013:
    code_blocks: false
    tables: false
```text

**Common Rule Customizations for Specs/Docs**:

- **MD013 (line length)**: Already configured - allow long lines in code blocks
  and tables
- **MD033 (inline HTML)**: Should ALLOW for SPDX headers in markdown
- **MD041 (first line H1)**: Should DISABLE - SPDX headers come first, not H1
- **MD024 (duplicate headings)**: Should ALLOW with `siblings_only: true` -
  specs often have repeated "Requirements" sections

**Recommended Configuration**:

```yaml
gitignore: true
config:
  MD013:  # Line length
    code_blocks: false
    tables: false
    headings: false  # ADD: Allow long headings
  MD033:  # Inline HTML
    allowed_elements:
      - br
      - details
      - summary
  MD041: false  # First line heading - disabled for SPDX headers
  MD024:  # Duplicate headings
    siblings_only: true
```text

**Decision**: Extend existing config with MD041 disabled and MD024 configured
for siblings_only. This accommodates SPDX headers at file top.

**Rationale**: SPDX headers in HTML comments must come before H1 heading, which
violates MD041 by default. Sibling-only duplicate heading check is appropriate
for structured specs.

**Alternatives Considered**:

- Keep MD041 enabled, move SPDX after H1 - Rejected: Violates REUSE best
  practice of headers at top
- Disable all markdown linting - Rejected: Defeats purpose of consistent
  documentation quality
- Use inline comments to disable rules per file - Rejected: Creates
  inconsistency

---

### Q4: GitHub Actions Integration Strategy

**Question**: How should `fsfe/reuse-action@v6` and
`DavidAnson/markdownlint-cli2-action` be configured in CI?

**Findings**:

**fsfe/reuse-action@v6**:

- Zero configuration required for basic usage
- Automatically runs `reuse lint` on repository
- Fails if any files lack proper SPDX headers
- Output: Detailed list of non-compliant files

**DavidAnson/markdownlint-cli2-action**:

- Automatically detects `.markdownlint-cli2.yaml` config
- Supports glob patterns for file selection
- Can run on all markdown or specific paths
- Output: Detailed violations with line numbers

**Workflow Structure**:

```yaml
name: Compliance Checks

on:
  push:
    branches: ['**']
  pull_request:
    branches: [main]

jobs:
  reuse-compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: fsfe/reuse-action@v6

  markdown-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: DavidAnson/markdownlint-cli2-action@v16
        with:
          globs: '**/*.md'
```text

**Decision**:

- Create single workflow file `.github/workflows/compliance.yml` with two
  independent jobs
- Run on all branches (not just main) to catch issues early
- Use latest stable versions of actions
- No additional configuration needed - actions use defaults + repo config files

**Rationale**: Two separate jobs allow parallel execution and independent
failure reporting. Running on all branches provides fast feedback before PRs.

**Alternatives Considered**:

- Separate workflow files - Rejected: Adds complexity, single file easier to
  maintain
- Run only on main/PR to main - Rejected: User wants early detection on feature
  branches
- Add manual triggers - Rejected: Not needed, automatic on push is sufficient
- Add npm scripts for local testing - Already covered by FR-008, separate from
  CI

---

### Q5: SPDX Copyright Year Strategy

**Question**: Should copyright year be current year for all files, or track
original creation year?

**Findings**:

**REUSE Best Practices**:

- **New files**: Use current year
- **Existing files**: Use original creation year OR current year
- **Modified files**: Can use year range: `2026-2027` OR update to current year
- **Consistency**: Project should choose one strategy

**Options**:

1. **Single year (current)**: `2026 Sergei Mukhin` for ALL files
2. **Year ranges**: `2026-2027 Sergei Mukhin` when modified
3. **Git history-based**: Extract creation year from first commit

**Decision**: Use **current year (2026) for all files** in initial
implementation.

**Rationale**:

- Simplest to implement and maintain
- This is the initial addition of SPDX headers (not retroactive)
- Git history remains source of truth for actual authorship timeline
- Future modifications can add year ranges if needed

**Alternatives Considered**:

- Extract years from git log - Rejected: Complex, not required by REUSE
- Use year ranges immediately - Rejected: Adds maintenance burden, no clear
  benefit for initial addition
- Leave some files undated - Rejected: REUSE requires copyright statement

---

## Technology Decisions

### Primary Tools

- **REUSE Compliance**: `fsfe/reuse-action@v6` (GitHub Action)
- **Markdown Linting**: `DavidAnson/markdownlint-cli2-action` (GitHub Action)
- **Local Linting**: `markdownlint-cli2` npm package (optional for developers)

### File Exclusions

- **Config files**: JSON, YAML files excluded from SPDX requirements (per
  clarification)
- **Generated files**: `dist/`, `node_modules/`, `package-lock.json` excluded
  via DEP5
- **Test outputs**: `test/backstop/test/` reports excluded via DEP5

### Node.js Version

- **Requirement**: Node.js 22+ (development only)
- **Scope**: Not a runtime dependency, aligns with EdibleCSS constitution

---

## Implementation Risks

### Risk 1: SPDX Headers Breaking CSS Minification

**Likelihood**: Low | **Impact**: High

**Mitigation**: CSS comments are standard and should be stripped by cssnano
during minification. Verify with test build.

**Validation**: Run `npm run minify` after adding headers, compare file size.

---

### Risk 2: Existing Markdown Files Failing Linting

**Likelihood**: Medium | **Impact**: Medium

**Mitigation**: Run `markdownlint-cli2 "**/*.md"` early to identify existing
violations. Fix files or adjust config before enforcing in CI.

**Validation**: Pre-implementation audit of all markdown files against proposed
config.

---

### Risk 3: GitHub Actions Quota Limits

**Likelihood**: Low | **Impact**: Low

**Mitigation**: Both actions are lightweight (< 30s execution). Public repos
have generous free tier. Can add conditional triggers if needed.

**Validation**: Monitor first few CI runs for execution time.

---

## Open Questions

None - all clarifications resolved in specification clarification session
(2026-02-02).

---

## References

- [REUSE Specification 3.0](https://reuse.software/spec/)
- [fsfe/reuse-action GitHub](https://github.com/fsfe/reuse-action)
- [markdownlint-cli2
  Documentation](https://github.com/DavidAnson/markdownlint-cli2)
- [SPDX License List](https://spdx.org/licenses/)
- [DEP5
  Specification](https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/)
