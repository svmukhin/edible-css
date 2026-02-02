# Quickstart: Licensing and Linting Standards

**Feature**: 002-licensing-linting | **Date**: 2026-02-02  
**Time to Complete**: ~45 minutes  
**Prerequisites**: Node.js 22+, Git, text editor

---

## Overview

This guide will help you implement SPDX headers and markdown linting for EdibleCSS in the correct order to avoid CI failures and ensure smooth integration.

---

## Phase 1: Setup Infrastructure (10 minutes)

### Step 1.1: Install markdownlint-cli2

```bash
cd /home/mukhin/repos/edible-css
npm install --save-dev markdownlint-cli2
```

**Verify**:
```bash
npx markdownlint-cli2 --version
```

### Step 1.2: Update markdownlint Configuration

Edit `.markdownlint-cli2.yaml` (already exists):

```yaml
gitignore: true
config:
  MD013:  # Line length
    code_blocks: false
    tables: false
    headings: false
  MD033:  # Inline HTML
    allowed_elements:
      - br
      - details
      - summary
  MD041: false  # First line heading - disabled for SPDX headers
  MD024:  # Duplicate headings
    siblings_only: true
```

### Step 1.3: Add npm Script

Edit `package.json`, add to `scripts` section:

```json
{
  "scripts": {
    "lint:md": "markdownlint-cli2 \"**/*.md\"",
    "lint:license": "reuse lint"
  }
}
```

### Step 1.4: Test Markdown Linting (Baseline)

```bash
npm run lint:md
```

**Expected**: Likely failures due to MD041 (first-line-heading). This is OK - we'll fix after adding SPDX headers.

---

## Phase 2: Create REUSE Structure (5 minutes)

### Step 2.1: Create LICENSES Directory

```bash
mkdir -p LICENSES
```

### Step 2.2: Add MIT License Text

Create `LICENSES/MIT.txt`:

```text
MIT License

Copyright (c) 2026 Sergei Mukhin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Step 2.3: Create DEP5 File

Create `.reuse/dep5`:

```
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/
Upstream-Name: edible-css
Upstream-Contact: Sergei Mukhin <contact@example.com>
Source: https://github.com/svmukhin/edible-css

Files: dist/* package-lock.json test/backstop/test/* node_modules/* .gitignore package.json .markdownlint-cli2.yaml backstop.json test/backstop/backstop.json
Copyright: 2026 Sergei Mukhin
License: MIT
```

---

## Phase 3: Add SPDX Headers (20 minutes)

### Step 3.1: CSS Files (13 files)

Add to **top of each file** in `src/`:

```css
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */
```

**Files to modify**:
- `src/base.css`
- `src/dark-mode.css`
- `src/edible.css`
- `src/forms.css`
- `src/lists.css`
- `src/media.css`
- `src/print.css`
- `src/reset.css`
- `src/semantic.css`
- `src/tables.css`
- `src/tokens.css`
- `src/typography.css`
- `src/utilities.css`

**Tip**: Use multi-file replace in VS Code:
1. Search: `^` (start of file, regex mode)
2. Replace: (paste CSS header + newline)
3. Files to include: `src/*.css`

### Step 3.2: JavaScript Files (1 file)

Add to **top** of `postcss.config.js`:

```javascript
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */
```

### Step 3.3: HTML Files (14 files)

Add to **top** of each HTML file:

```html
<!--
  SPDX-FileCopyrightText: 2026 Sergei Mukhin
  SPDX-License-Identifier: MIT
-->
```

**Files in docs/**:
- `docs/index.html`
- `docs/examples/basic.html`
- `docs/examples/form.html`
- `docs/examples/navigation.html`
- `docs/examples/table.html`
- `docs/examples/typography.html`

**Files in test/samples/**:
- `test/samples/code.html`
- `test/samples/forms.html`
- `test/samples/interactive.html`
- `test/samples/kitchen-sink.html`
- `test/samples/lists.html`
- `test/samples/media.html`
- `test/samples/semantic.html`
- `test/samples/tables.html`
- `test/samples/typography.html`

### Step 3.4: Markdown Files (~30 files)

Add to **top** of each markdown file:

```markdown
<!--
SPDX-FileCopyrightText: 2026 Sergei Mukhin
SPDX-License-Identifier: MIT
-->
```

**Root files**:
- `README.md`

**Docs**:
- `docs/api.md`

**Specs** (all files in `specs/`):
- `specs/001-classless-framework/*.md`
- `specs/002-licensing-linting/*.md`

**Note**: Ensure blank line after closing `-->` before first H1 heading.

---

## Phase 4: Verify Locally (5 minutes)

### Step 4.1: Test Markdown Linting

```bash
npm run lint:md
```

**Expected**: Should pass now with updated MD041 config and SPDX headers.

### Step 4.2: Install REUSE Tool (Optional but Recommended)

```bash
pip install reuse
# OR use Docker:
# docker run --rm -v $(pwd):/repo fsfe/reuse:latest lint
```

### Step 4.3: Test REUSE Compliance

```bash
reuse lint
# OR
npm run lint:license
```

**Expected Output**:
```
# SUMMARY

* Bad licenses: 0
* Deprecated licenses: 0
* Licenses without file extension: 0
* Missing licenses: 0
* Unused licenses: 0
* Used licenses: MIT
* Read errors: 0
* Files with copyright information: [number] / [number]
* Files with license information: [number] / [number]

Congratulations! Your project is compliant with version 3.0 of the REUSE Specification :-)
```

### Step 4.4: Test Build (Ensure Headers Don't Break Minification)

```bash
npm run build
npm run minify
```

**Verify**: Check `dist/edible.min.css` - SPDX comments should be stripped or minimal.

---

## Phase 5: Setup GitHub Actions (5 minutes)

### Step 5.1: Create Workflow Directory

```bash
mkdir -p .github/workflows
```

### Step 5.2: Create Compliance Workflow

Create `.github/workflows/compliance.yml`:

```yaml
name: Compliance Checks

on:
  push:
    branches: ['**']
  pull_request:
    branches: [main]

jobs:
  reuse-compliance:
    name: REUSE License Compliance
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: REUSE Compliance Check
        uses: fsfe/reuse-action@v6

  markdown-lint:
    name: Markdown Linting
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Markdown Lint Check
        uses: DavidAnson/markdownlint-cli2-action@v16
        with:
          globs: '**/*.md'
```

### Step 5.3: Commit and Push

```bash
git add .
git commit -m "Add SPDX headers and markdown linting

- Add SPDX-FileCopyrightText and SPDX-License-Identifier to all source files
- Create LICENSES/MIT.txt for REUSE compliance
- Add .reuse/dep5 for generated/config file exclusions
- Update .markdownlint-cli2.yaml config (disable MD041, add MD024 siblings_only)
- Add GitHub Actions workflow for automated compliance checks
- Install markdownlint-cli2 dev dependency

Closes #[issue-number] (if applicable)"

git push origin 002-licensing-linting
```

### Step 5.4: Verify CI

1. Go to GitHub repository
2. Navigate to Actions tab
3. Find "Compliance Checks" workflow
4. Verify both jobs pass:
   - ✅ REUSE License Compliance
   - ✅ Markdown Linting

---

## Phase 6: Update Documentation (Optional, 5 minutes)

### Step 6.1: Add Contributing Guide Section

Edit `README.md` or create `CONTRIBUTING.md`:

```markdown
## SPDX License Headers

All source files (CSS, JavaScript, HTML, Markdown) must include SPDX headers at the top:

**CSS/JS files**:
```css
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */
```

**HTML/Markdown files**:
```html
<!--
  SPDX-FileCopyrightText: 2026 Sergei Mukhin
  SPDX-License-Identifier: MIT
-->
```

Configuration files (package.json, .yaml) are excluded. CI will fail if headers are missing.
```

### Step 6.2: Add REUSE Badge (Optional)

Add to `README.md`:

```markdown
[![REUSE status](https://api.reuse.software/badge/github.com/svmukhin/edible-css)](https://api.reuse.software/info/github.com/svmukhin/edible-css)
```

---

## Troubleshooting

### Issue: Markdown Linting Fails with MD041

**Cause**: SPDX header before H1 heading  
**Fix**: Ensure `.markdownlint-cli2.yaml` has `MD041: false`

### Issue: REUSE Lint Reports Missing Headers

**Cause**: File not in `.gitignore` or DEP5  
**Fix**: 
- Add SPDX header if it's a source file
- Add to `.reuse/dep5` if it's generated/config file
- Add to `.gitignore` if it shouldn't be tracked

### Issue: Build Breaks After Adding Headers

**Cause**: Unlikely, but check PostCSS config  
**Fix**: CSS comments are valid, should not break build. Verify `postcss.config.js` syntax.

### Issue: GitHub Actions Workflow Not Running

**Cause**: Workflow file in wrong location or invalid YAML  
**Fix**: Ensure `.github/workflows/compliance.yml` exists and is valid YAML

---

## Success Criteria Checklist

- [ ] All CSS files (13) have SPDX headers
- [ ] All JavaScript files (1) have SPDX headers
- [ ] All HTML files (14) have SPDX headers
- [ ] All Markdown files (~30) have SPDX headers
- [ ] `LICENSES/MIT.txt` exists with full license text
- [ ] `.reuse/dep5` exists with generated file exclusions
- [ ] `npm run lint:md` passes with zero errors
- [ ] `reuse lint` passes with zero errors
- [ ] `npm run build && npm run minify` succeeds
- [ ] GitHub Actions workflow exists and passes
- [ ] Contributing documentation updated (optional)

---

## Next Steps

After successful implementation:

1. **Merge to main**: Create PR from `002-licensing-linting` to `main`
2. **Monitor CI**: Ensure compliance checks run on future commits
3. **Educate contributors**: Share SPDX header template in issues/PRs
4. **Optional**: Add pre-commit hook for local validation (currently not required)

---

## Time Breakdown

| Phase | Estimated Time | Description |
|-------|----------------|-------------|
| 1. Setup Infrastructure | 10 min | Install tools, configure markdownlint |
| 2. REUSE Structure | 5 min | Create LICENSES/ and .reuse/dep5 |
| 3. Add SPDX Headers | 20 min | Add headers to ~60 files |
| 4. Verify Locally | 5 min | Run linting and build tests |
| 5. GitHub Actions | 5 min | Create and test CI workflow |
| 6. Documentation | 5 min | Update contributing guide (optional) |
| **Total** | **45-50 min** | Complete implementation |

---

**Document Version**: 1.0.0  
**Last Updated**: 2026-02-02  
**Tested On**: Node.js 22.0, markdownlint-cli2 0.16.0, REUSE 3.0
