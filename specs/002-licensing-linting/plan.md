# Implementation Plan: Licensing and Linting Standards

**Branch**: `002-licensing-linting` | **Date**: 2026-02-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-licensing-linting/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add SPDX license headers to all source files (CSS, JavaScript, HTML, markdown) and integrate markdownlint-cli2 for automated markdown quality enforcement in CI. This feature establishes license compliance infrastructure using `fsfe/reuse-action@v6` for REUSE specification validation and `DavidAnson/markdownlint-cli2-action` for markdown linting, both running as GitHub Actions in CI pipelines. No pre-commit hooks or local enforcement required - validation happens exclusively in CI.

## Technical Context

**Language/Version**: Node.js 22+ (development tooling only, not runtime dependency)
**Primary Dependencies**: 
  - `markdownlint-cli2` (markdown linting)
  - GitHub Actions: `fsfe/reuse-action@v6`, `DavidAnson/markdownlint-cli2-action`
**Storage**: N/A (file-based headers, no database)
**Testing**: Manual verification of SPDX headers, CI pipeline validation, `reuse lint` tool
**Target Platform**: GitHub Actions CI environment (Linux), developer workstations (cross-platform)
**Project Type**: CSS framework with documentation - single project structure
**Performance Goals**: 
  - Markdown linting: < 5 seconds for entire repository
  - REUSE validation: < 30 seconds for complete compliance check
**Constraints**: 
  - SPDX headers must not impact CSS performance (stripped during minification)
  - No runtime JavaScript dependencies (aligns with constitution)
  - No pre-commit hooks (CI-only enforcement by user request)
  - Config files (JSON/YAML) excluded from SPDX requirements
**Scale/Scope**: 
  - ~15 CSS source files in src/
  - ~30 markdown files across docs/, specs/, README.md
  - ~5 HTML example files in docs/examples/ and test/samples/
  - ~3 JavaScript config files (postcss.config.js, etc.)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Immutable Laws Evaluation

| Law | Status | Notes |
|-----|--------|-------|
| 1. No classes, ever | ✅ PASS | Feature adds headers/linting only - no CSS classes involved |
| 2. Single opinionated style | ✅ PASS | No theming changes - purely infrastructure |
| 3. HTML5 semantic elements only | ✅ PASS | No HTML modifications |
| 4. W3C validation mandatory | ✅ PASS | Does not affect CSS/HTML validation |
| 5. Zero JavaScript dependency | ✅ PASS | Node.js used for dev tooling only, not runtime |
| 6. Instant drop-in usage | ✅ PASS | SPDX headers in comments - no user impact |
| 7. Responsive by default | ✅ PASS | No responsive behavior changes |
| 8. MIT licensed | ✅ PASS | Explicitly enforces MIT licensing via SPDX |

### Decision Framework

1. **Does it require CSS classes?** → NO - Infrastructure feature
2. **Does it require JavaScript?** → NO - Node.js for dev only, not runtime
3. **Does it add configuration options?** → NO - No user-facing config
4. **Does it target non-standard HTML?** → NO - No HTML changes
5. **Does it break W3C validation?** → NO - Comments are valid
6. **Does it significantly increase file size?** → NO - Comments stripped in minification
7. **Does it solve a common use case?** → YES - Legal compliance required for open source
8. **Can users achieve it themselves?** → NO - Project-level infrastructure
9. **Does it maintain simplicity?** → YES - Transparent to end users

**GATE RESULT**: ✅ **APPROVED** - All constitution requirements satisfied. Feature is purely infrastructure that ensures legal compliance without affecting framework behavior or user experience.

---

### Post-Design Re-Evaluation (After Phase 1)

**Re-checked**: 2026-02-02 after research, data model, contracts, and quickstart generation

| Law | Status | Post-Design Notes |
|-----|--------|-------------------|
| 1. No classes, ever | ✅ PASS | Confirmed: No CSS classes added |
| 2. Single opinionated style | ✅ PASS | Confirmed: No theming or style variants |
| 3. HTML5 semantic elements only | ✅ PASS | Confirmed: HTML examples unchanged |
| 4. W3C validation mandatory | ✅ PASS | Confirmed: SPDX comments are valid HTML/CSS |
| 5. Zero JavaScript dependency | ✅ PASS | Confirmed: Node.js dev-only, not distributed |
| 6. Instant drop-in usage | ✅ PASS | Confirmed: Headers stripped in minification |
| 7. Responsive by default | ✅ PASS | Confirmed: No responsive behavior changes |
| 8. MIT licensed | ✅ PASS | Confirmed: Explicitly enforces MIT via SPDX |

**Decision Framework Re-Check**:
- File size impact: Headers add ~100 bytes per file, stripped in dist/
- User experience: Zero impact (comments are invisible to end users)
- Complexity added: Minimal (automated by CI, transparent to contributors after initial setup)

**FINAL GATE RESULT**: ✅ **APPROVED FOR IMPLEMENTATION** - Design maintains full constitution compliance.

## Project Structure

### Documentation (this feature)

```text
specs/002-licensing-linting/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification (already exists)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── spdx-header-formats.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Single project structure (CSS framework)
.github/
├── workflows/
│   └── compliance.yml   # NEW: CI workflow for REUSE + markdown linting

src/
├── base.css             # MODIFY: Add SPDX headers
├── dark-mode.css        # MODIFY: Add SPDX headers
├── edible.css           # MODIFY: Add SPDX headers
├── forms.css            # MODIFY: Add SPDX headers
├── lists.css            # MODIFY: Add SPDX headers
├── media.css            # MODIFY: Add SPDX headers
├── print.css            # MODIFY: Add SPDX headers
├── reset.css            # MODIFY: Add SPDX headers
├── semantic.css         # MODIFY: Add SPDX headers
├── tables.css           # MODIFY: Add SPDX headers
├── tokens.css           # MODIFY: Add SPDX headers
├── typography.css       # MODIFY: Add SPDX headers
└── utilities.css        # MODIFY: Add SPDX headers

docs/
├── api.md               # MODIFY: Add SPDX headers
├── index.html           # MODIFY: Add SPDX headers
└── examples/
    ├── basic.html       # MODIFY: Add SPDX headers
    ├── form.html        # MODIFY: Add SPDX headers
    ├── navigation.html  # MODIFY: Add SPDX headers
    ├── table.html       # MODIFY: Add SPDX headers
    └── typography.html  # MODIFY: Add SPDX headers

test/samples/
├── code.html            # MODIFY: Add SPDX headers
├── forms.html           # MODIFY: Add SPDX headers
├── interactive.html     # MODIFY: Add SPDX headers
├── kitchen-sink.html    # MODIFY: Add SPDX headers
├── lists.html           # MODIFY: Add SPDX headers
├── media.html           # MODIFY: Add SPDX headers
├── semantic.html        # MODIFY: Add SPDX headers
├── tables.html          # MODIFY: Add SPDX headers
└── typography.html      # MODIFY: Add SPDX headers

README.md                # MODIFY: Add SPDX headers
postcss.config.js        # MODIFY: Add SPDX headers (JS file, not JSON)

.markdownlint-cli2.yaml  # ALREADY EXISTS: No SPDX needed (config file)
package.json             # NO CHANGE: Config file excluded from SPDX
LICENSE.txt              # NO CHANGE: License file itself

# NEW FILES
.reuse/
└── dep5                 # NEW: Binary/generated file licensing declarations
LICENSES/
└── MIT.txt              # NEW: SPDX-compliant license text
```

**Structure Decision**: Single project structure maintained. This is a CSS framework with no backend/frontend split. All source files get inline SPDX headers, configuration files excluded per clarification session. GitHub Actions workflow added for CI enforcement.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No complexity violations detected. Constitution check fully passed with no exceptions needed.

---

## Implementation Phases

### Phase 0: Research & Planning ✅ COMPLETE

**Deliverables**:
- ✅ [research.md](research.md) - SPDX formats, REUSE structure, markdownlint config, GitHub Actions strategy
- ✅ [data-model.md](data-model.md) - Entity definitions for SPDX headers, file classifications, lint rules
- ✅ [contracts/spdx-header-formats.md](contracts/spdx-header-formats.md) - Exact format specifications
- ✅ [quickstart.md](quickstart.md) - 45-minute implementation guide

**Status**: All research questions resolved. No open unknowns.

---

### Phase 1: Infrastructure Setup (Priority: P1)

**Goal**: Create REUSE-compliant structure without modifying source files yet

**Tasks**:
1. Install `markdownlint-cli2` npm package
2. Update `.markdownlint-cli2.yaml` with MD041, MD024, MD033 configs
3. Create `LICENSES/MIT.txt` with full SPDX license text
4. Create `.reuse/dep5` with generated file exclusions
5. Add npm scripts: `lint:md`, `lint:license`
6. Test baseline: Run `reuse lint` (expect failures - headers not added yet)

**Acceptance**:
- [ ] `LICENSES/MIT.txt` exists and contains full MIT license text
- [ ] `.reuse/dep5` exists with proper DEP5 format
- [ ] `.markdownlint-cli2.yaml` has updated rules (MD041: false, etc.)
- [ ] npm scripts run without error (even if linting fails)

**Estimated Time**: 15 minutes

---

### Phase 2: Add SPDX Headers - CSS (Priority: P1)

**Goal**: Add SPDX headers to all CSS source files

**Tasks**:
1. Add header to each of 13 CSS files in `src/`:
   - base.css, dark-mode.css, edible.css, forms.css, lists.css, media.css
   - print.css, reset.css, semantic.css, tables.css, tokens.css
   - typography.css, utilities.css
2. Format: CSS multi-line block comment (see contracts/)
3. Verify no syntax errors introduced

**Acceptance**:
- [ ] All 13 CSS files have SPDX headers at line 1
- [ ] Headers use correct format: `/* ... */` with proper indentation
- [ ] `npm run build` succeeds (no CSS syntax errors)
- [ ] Visual inspection: files render correctly in browser

**Estimated Time**: 10 minutes

---

### Phase 3: Add SPDX Headers - JavaScript (Priority: P1)

**Goal**: Add SPDX headers to JavaScript config files

**Tasks**:
1. Add header to `postcss.config.js`
2. Format: JS multi-line block comment (identical to CSS)
3. Verify PostCSS build still works

**Acceptance**:
- [ ] `postcss.config.js` has SPDX header
- [ ] `npm run build` succeeds (PostCSS still functional)

**Estimated Time**: 2 minutes

---

### Phase 4: Add SPDX Headers - HTML (Priority: P1)

**Goal**: Add SPDX headers to all HTML files

**Tasks**:
1. Add header to 6 files in `docs/`:
   - index.html, examples/basic.html, examples/form.html
   - examples/navigation.html, examples/table.html, examples/typography.html
2. Add header to 9 files in `test/samples/`:
   - code.html, forms.html, interactive.html, kitchen-sink.html
   - lists.html, media.html, semantic.html, tables.html, typography.html
3. Format: HTML comment `<!-- ... -->`
4. Verify HTML validity (W3C validator)

**Acceptance**:
- [ ] All 15 HTML files have SPDX headers
- [ ] Headers appear before `<!DOCTYPE html>`
- [ ] Files open correctly in browser (no rendering issues)
- [ ] W3C HTML validator passes (optional but recommended)

**Estimated Time**: 10 minutes

---

### Phase 5: Add SPDX Headers - Markdown (Priority: P1)

**Goal**: Add SPDX headers to all markdown documentation

**Tasks**:
1. Add header to `README.md`
2. Add header to `docs/api.md`
3. Add header to all files in `specs/001-classless-framework/`:
   - spec.md, plan.md, research.md, data-model.md, quickstart.md, tasks.md
   - checklists/requirements.md
4. Add header to all files in `specs/002-licensing-linting/`:
   - spec.md, plan.md, research.md, data-model.md, quickstart.md
   - contracts/spdx-header-formats.md
   - checklists/requirements.md (if exists)
5. Format: HTML comment in markdown `<!-- ... -->` with blank line after
6. Run `npm run lint:md` - should pass with MD041 disabled

**Acceptance**:
- [ ] All ~30 markdown files have SPDX headers
- [ ] Blank line exists between header and first H1
- [ ] `npm run lint:md` passes with zero errors
- [ ] Markdown renders correctly on GitHub (preview)

**Estimated Time**: 15 minutes

---

### Phase 6: REUSE Validation (Priority: P2)

**Goal**: Verify full REUSE compliance locally before CI

**Tasks**:
1. Install REUSE tool: `pip install reuse` (or use Docker)
2. Run `reuse lint` or `npm run lint:license`
3. Fix any non-compliant files identified
4. Verify 100% compliance message

**Acceptance**:
- [ ] `reuse lint` exits with code 0
- [ ] Output shows "Congratulations! Your project is compliant"
- [ ] All source files reported as having copyright + license info
- [ ] Zero bad licenses, zero missing licenses

**Estimated Time**: 5 minutes

---

### Phase 7: GitHub Actions CI (Priority: P2)

**Goal**: Automate compliance checks in CI pipeline

**Tasks**:
1. Create `.github/workflows/compliance.yml`
2. Add two jobs: `reuse-compliance` and `markdown-lint`
3. Configure triggers: push to all branches, PR to main
4. Use actions: `fsfe/reuse-action@v6`, `DavidAnson/markdownlint-cli2-action@v16`
5. Commit and push to trigger first CI run

**Acceptance**:
- [ ] Workflow file exists at `.github/workflows/compliance.yml`
- [ ] YAML syntax is valid (no parse errors)
- [ ] First CI run completes successfully (both jobs green)
- [ ] Workflow visible in GitHub Actions tab

**Estimated Time**: 5 minutes

---

### Phase 8: Verification & Documentation (Priority: P3)

**Goal**: Final testing and contributor documentation

**Tasks**:
1. Run full build pipeline: `npm run build && npm run minify`
2. Check `dist/edible.min.css` size (should be similar to before)
3. Run visual regression tests: `npm run test:visual` (optional)
4. Update contributing documentation with SPDX header templates
5. Consider adding REUSE badge to README.md

**Acceptance**:
- [ ] Build succeeds without errors
- [ ] Minified CSS size increase < 1% (comments stripped)
- [ ] Contributing guide includes SPDX header examples
- [ ] REUSE badge added to README (optional)

**Estimated Time**: 10 minutes

---

## Dependencies & Sequencing

```
Phase 0 (Infrastructure)
    ↓
Phase 1 (CSS Headers) ──┐
Phase 2 (JS Headers) ───┤
Phase 3 (HTML Headers) ─┼→ Phase 5 (REUSE Validation)
Phase 4 (MD Headers) ───┘        ↓
                            Phase 6 (GitHub Actions)
                                 ↓
                            Phase 7 (Final Verification)
```

**Critical Path**: Phases 0-5 must be sequential. Phase 6-7 can run in parallel if desired.

---

## Rollback Plan

If critical issues arise during implementation:

### Scenario 1: SPDX Headers Break Build

**Symptom**: `npm run build` fails after adding headers  
**Rollback**: 
```bash
git checkout HEAD -- src/*.css
git checkout HEAD -- postcss.config.js
```
**Investigation**: Check PostCSS config, verify comment syntax

### Scenario 2: Markdown Linting Blocks Progress

**Symptom**: Existing markdown files have 100+ violations  
**Temporary Fix**: 
```yaml
# .markdownlint-cli2.yaml - disable all rules temporarily
config: {}
```
**Long-term**: Fix violations incrementally or adjust config

### Scenario 3: GitHub Actions Fails in CI

**Symptom**: Actions never complete or timeout  
**Rollback**: Remove `.github/workflows/compliance.yml`  
**Investigation**: Check action versions, verify YAML syntax

---

## Success Metrics

*Mapped from spec.md Success Criteria*

| Criteria | Measurement | Target | Validation Method |
|----------|-------------|--------|-------------------|
| SC-001 | Source file compliance | 100% | `reuse lint` output |
| SC-002 | REUSE validation | Zero errors | `reuse lint` exit code 0 |
| SC-003 | Markdown linting | Zero errors | `npm run lint:md` exit code 0 |
| SC-004 | CI integration | Workflow exists & passes | GitHub Actions UI |
| SC-005 | Markdown lint performance | < 5 seconds | GitHub Actions logs |
| SC-006 | Header consistency | Identical per file type | Manual spot check |
| SC-007 | Documentation | Contributing guide updated | README.md or CONTRIBUTING.md |
| SC-008 | CI failure handling | Actionable logs | Test with missing header |
| SC-009 | Existing files pass | Zero content changes needed | `npm run lint:md` before/after |
| SC-010 | REUSE badge | Badge displays in README | GitHub repo view |

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| CSS minification strips headers incorrectly | Low | Medium | Test build before mass header addition |
| Existing markdown has many violations | Medium | Low | Update config to allow common patterns |
| GitHub Actions quota exceeded | Low | Low | Actions are lightweight, free tier sufficient |
| REUSE tool version incompatibility | Low | Medium | Pin to REUSE 3.0 spec, use GitHub Action |
| Copyright year confusion | Low | Low | Use 2026 for all files (documented in research) |

---

## Next Steps After Plan

1. **Review this plan** with stakeholders (if applicable)
2. **Run `/speckit.tasks`** to generate detailed task breakdown for Phase 2 (implementation)
3. **Begin Phase 0** following quickstart.md guide
4. **Commit plan artifacts** to git before starting implementation

---

**Plan Status**: ✅ COMPLETE - Ready for task generation  
**Generated**: 2026-02-02  
**Approved By**: Constitution Check (passed)  
**Next Command**: `/speckit.tasks` to create tasks.md
