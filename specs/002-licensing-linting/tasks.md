# Tasks: Licensing and Linting Standards

**Input**: Design documents from `/specs/002-licensing-linting/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/spdx-header-formats.md, quickstart.md

**Tests**: No test tasks included - this is infrastructure setup with CI validation

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install tooling and create REUSE-compliant directory structure

- [X] T001 Install markdownlint-cli2 npm package as dev dependency
- [X] T002 Add npm scripts to package.json: "lint:md" and "lint:license"
- [ ] T003 [P] Create LICENSES/ directory with MIT.txt full license text
- [ ] T004 [P] Create .reuse/ directory with dep5 file for generated/binary files
- [ ] T005 [P] Update .markdownlint-cli2.yaml config: disable MD041, add MD024 siblings_only, add MD033 allowed_elements

**Checkpoint**: Infrastructure ready - REUSE structure exists, linting tools installed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: None required - this feature has no blocking foundational tasks

**⚠️ NOTE**: User stories can begin immediately after Phase 1

---

## Phase 3: User Story 1 - Clear License Attribution in Source Files (Priority: P1) 🎯 MVP

**Goal**: Add SPDX headers to source code files (CSS, JS, HTML) for license compliance. Markdown files are excluded from SPDX requirements.

**Independent Test**: Open any source code file and verify SPDX header is present with correct format. Run `reuse lint` and verify zero errors for SPDX compliance.

### CSS Files (13 files in src/)

- [ ] T006 [P] [US1] Add SPDX header to src/base.css
- [ ] T007 [P] [US1] Add SPDX header to src/dark-mode.css
- [ ] T008 [P] [US1] Add SPDX header to src/edible.css
- [ ] T009 [P] [US1] Add SPDX header to src/forms.css
- [ ] T010 [P] [US1] Add SPDX header to src/lists.css
- [ ] T011 [P] [US1] Add SPDX header to src/media.css
- [ ] T012 [P] [US1] Add SPDX header to src/print.css
- [ ] T013 [P] [US1] Add SPDX header to src/reset.css
- [ ] T014 [P] [US1] Add SPDX header to src/semantic.css
- [ ] T015 [P] [US1] Add SPDX header to src/tables.css
- [ ] T016 [P] [US1] Add SPDX header to src/tokens.css
- [ ] T017 [P] [US1] Add SPDX header to src/typography.css
- [ ] T018 [P] [US1] Add SPDX header to src/utilities.css

### JavaScript Files (1 file)

- [ ] T019 [P] [US1] Add SPDX header to postcss.config.js

### HTML Files in docs/ (6 files)

- [ ] T020 [P] [US1] Add SPDX header to docs/index.html
- [ ] T021 [P] [US1] Add SPDX header to docs/examples/basic.html
- [ ] T022 [P] [US1] Add SPDX header to docs/examples/form.html
- [ ] T023 [P] [US1] Add SPDX header to docs/examples/navigation.html
- [ ] T024 [P] [US1] Add SPDX header to docs/examples/table.html
- [ ] T025 [P] [US1] Add SPDX header to docs/examples/typography.html

### HTML Files in test/samples/ (9 files)

- [ ] T026 [P] [US1] Add SPDX header to test/samples/code.html
- [ ] T027 [P] [US1] Add SPDX header to test/samples/forms.html
- [ ] T028 [P] [US1] Add SPDX header to test/samples/interactive.html
- [ ] T029 [P] [US1] Add SPDX header to test/samples/kitchen-sink.html
- [ ] T030 [P] [US1] Add SPDX header to test/samples/lists.html
- [ ] T031 [P] [US1] Add SPDX header to test/samples/media.html
- [ ] T032 [P] [US1] Add SPDX header to test/samples/semantic.html
- [ ] T033 [P] [US1] Add SPDX header to test/samples/tables.html
- [ ] T034 [P] [US1] Add SPDX header to test/samples/typography.html

### Validation for User Story 1

- [ ] T035 [US1] Run npm run build to verify CSS headers don't break compilation
- [ ] T036 [US1] Run npm run minify to verify headers are stripped in production build
- [ ] T037 [US1] Install reuse tool (pip install reuse) and run reuse lint to verify compliance
- [ ] T038 [US1] Verify reuse lint reports zero errors and 100% compliance

**Checkpoint**: At this point, User Story 1 is complete - all source code files have SPDX headers, REUSE compliance achieved

---

## Phase 4: User Story 2 - Consistent Markdown Quality (Priority: P2)

**Goal**: Enforce markdown linting via markdownlint-cli2 with proper configuration

**Independent Test**: Run `npm run lint:md` and verify zero errors. Intentionally introduce a markdown formatting error and verify it's caught.

### Configuration Updates

- [ ] T039 [US2] Verify .markdownlint-cli2.yaml has all required rules from research.md (MD013, MD033, MD041, MD024)
- [ ] T040 [US2] Test npm run lint:md against all markdown files to ensure baseline passes

### Fix Any Markdown Violations (if needed)

- [ ] T041 [US2] Fix any existing markdown violations reported by markdownlint-cli2 (adjust config or fix files)
- [ ] T042 [US2] Verify all markdown files pass linting after fixes/config adjustments

**Checkpoint**: At this point, User Story 2 is complete - all markdown files pass linting with configured rules

---

## Phase 5: User Story 3 - Automated License Compliance Verification (Priority: P3)

**Goal**: Add GitHub Actions CI workflow to automate REUSE and markdown linting checks

**Independent Test**: Push code to GitHub and verify CI workflow runs successfully. Introduce a violation (remove SPDX header) and verify CI fails with clear logs.

### GitHub Actions Workflow

- [ ] T043 [US3] Create .github/workflows/ directory if it doesn't exist
- [ ] T044 [US3] Create .github/workflows/compliance.yml with two jobs: reuse-compliance and markdown-lint
- [ ] T045 [US3] Configure reuse-compliance job to use fsfe/reuse-action@v6
- [ ] T046 [US3] Configure markdown-lint job to use DavidAnson/markdownlint-cli2-action@v16 with globs: '**/*.md'
- [ ] T047 [US3] Set workflow triggers: on push to all branches and PR to main

### CI Validation

- [ ] T048 [US3] Commit and push compliance.yml to trigger first CI run
- [ ] T049 [US3] Verify both CI jobs (reuse-compliance and markdown-lint) pass in GitHub Actions
- [ ] T050 [US3] Test CI failure: temporarily remove SPDX header from one file, push, verify CI fails
- [ ] T051 [US3] Test CI failure: introduce markdown error, push, verify markdown-lint job fails
- [ ] T052 [US3] Restore files and verify CI passes again

**Checkpoint**: At this point, User Story 3 is complete - CI automatically enforces compliance on every commit

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation and final verification

- [ ] T053 [P] Update README.md with REUSE badge (optional): [![REUSE status](https://api.reuse.software/badge/github.com/svmukhin/edible-css)](https://api.reuse.software/info/github.com/svmukhin/edible-css)
- [ ] T054 [P] Add SPDX header examples to CONTRIBUTING.md or README.md for new contributors
- [ ] T055 Run complete test suite: npm run build && npm run minify && npm run test (visual + a11y)
- [ ] T056 Verify dist/edible.min.css size is similar to pre-SPDX size (headers stripped)
- [ ] T057 Run quickstart.md validation: follow guide step-by-step to ensure accuracy
- [ ] T058 Final reuse lint check: verify 100% compliance message
- [ ] T059 Final markdown lint check: npm run lint:md with zero errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 3)**: Depends on Setup completion
- **User Story 2 (Phase 4)**: Can run independently after Setup, but practically should run after US1 (need markdown files to lint)
- **User Story 3 (Phase 5)**: Depends on US1 and US2 being complete (CI validates both)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start immediately after Setup - No dependencies on other stories
- **User Story 2 (P2)**: Independent of US1, but needs markdown files to exist
- **User Story 3 (P3)**: Validates US1 and US2 - should complete after both are done

### Within Each User Story

#### User Story 1 (SPDX Headers):
- All file header additions (T006-T034) can run in parallel - marked [P]
- Validation tasks (T035-T038) must run sequentially after all headers added

#### User Story 2 (Markdown Linting):
- Configuration (T054-T055) sequential
- Fixes (T056-T057) sequential after configuration

#### User Story 3 (CI):
- Workflow creation (T058-T062) sequential
- Validation (T063-T067) sequential after workflow created

### Parallel Opportunities

- **Within Setup**: T003, T004, T005 can run in parallel
- **Within User Story 1**: All 29 file header tasks (T006-T034) can run in parallel
- **Within Polish**: T053, T054 can run in parallel

---

## Parallel Example: User Story 1 (SPDX Headers)

```bash
# All CSS files can be modified simultaneously:
parallel T006-T018 (13 CSS files in src/)

# All HTML files can be modified simultaneously:
parallel T019-T034 (15 HTML files: 1 JS + 6 docs/ + 9 test/samples/)

# Total parallel batch: 29 file modifications can happen at once
# Sequential only: T035-T038 (validation after headers added)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (5 tasks)
2. Complete Phase 3: User Story 1 (48 tasks - 44 parallel + 4 sequential validation)
3. **STOP and VALIDATE**: Run `reuse lint` - should show 100% compliance
4. Result: All source files have SPDX headers, legal compliance achieved

**Time Estimate**: ~45 minutes following quickstart.md

### Incremental Delivery

1. Setup → Foundation ready (10 min)
2. Add User Story 1 → Test with `reuse lint` → SPDX compliance achieved (25 min)
3. Add User Story 2 → Test with `npm run lint:md` → Markdown quality enforced (5 min)
4. Add User Story 3 → Test CI workflow → Automation complete (5 min)
5. Polish → Documentation and final validation (10 min)

**Total Time**: ~55 minutes for complete feature

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup together (Phase 1)
2. Divide file modifications:
   - Developer A: CSS files (T006-T018)
   - Developer B: HTML files (T019-T034)
   - Developer C: Markdown files (T035-T049)
3. One developer: US2 markdown linting (T054-T057)
4. One developer: US3 CI setup (T058-T067)
5. Team: Polish together (T068-T074)

**Time Savings**: Could complete in ~20-30 minutes with 3 developers

---

## Task Count Summary

| Phase | Tasks | Parallel | Sequential | User Story |
|-------|-------|----------|------------|------------|
| Phase 1: Setup | 5 | 3 | 2 | - |
| Phase 3: US1 - SPDX Headers | 33 | 29 | 4 | P1 |
| Phase 4: US2 - Markdown Linting | 4 | 0 | 4 | P2 |
| Phase 5: US3 - CI Automation | 10 | 0 | 10 | P3 |
| Phase 6: Polish | 7 | 2 | 5 | - |
| **Total** | **59** | **34** | **25** | - |

**Parallelization Potential**: 58% of tasks (34/59) can run simultaneously

---

## Notes

- **[P] tasks**: Different files, can run in parallel safely
- **[US1], [US2], [US3] labels**: Map tasks to user stories from spec.md
- **No tests**: Feature is infrastructure with CI validation, no unit/integration tests needed
- **Header format**: See contracts/spdx-header-formats.md for exact formats
- **Markdown files**: Excluded from SPDX headers per user clarification - covered by LICENSE.txt and `.reuse/dep5`
- **Config files excluded**: package.json, .markdownlint-cli2.yaml, backstop.json do NOT need SPDX headers per FR-002
- **Generated files excluded**: dist/*, node_modules/*, package-lock.json handled via .reuse/dep5
- **Commit strategy**: Can commit per user story phase or per file type batch
- **Validation gates**: T035-T038 (US1), T040+T042 (US2), T049 (US3), T058-T059 (Polish)

---

**Status**: Ready for implementation  
**Next Step**: Begin Phase 1 (Setup) or use `/speckit.implement` to start execution  
**Estimated Completion**: ~30-40 minutes (single developer), ~15-20 minutes (parallel team)
