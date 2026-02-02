# Contract: SPDX Header Formats

**Feature**: 002-licensing-linting | **Date**: 2026-02-02  
**Purpose**: Define exact SPDX header format specifications for each file type

---

## Overview

This contract defines the precise format of SPDX headers for all file types in
the EdibleCSS repository. These formats MUST be followed exactly to pass
REUSE.software compliance validation via `fsfe/reuse-action@v6`.

**Contract Status**: ✅ Binding - Implementation MUST match these formats exactly

---

## CSS Files

**File Extensions**: `.css`  
**Comment Syntax**: Multi-line block comment `/* ... */`  
**Examples**: `src/edible.css`, `src/reset.css`, `src/typography.css`

### Format Specification

```css
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */

[File content starts here]
```

### Rules

1. Opening comment delimiter `/*` MUST be on line 1
2. SPDX tags MUST be indented with single space + asterisk + space: ` * `
3. `SPDX-FileCopyrightText` MUST appear before `SPDX-License-Identifier`
4. Closing delimiter `*/` MUST be on separate line
5. One blank line recommended after header before content

### Example: src/tokens.css

```css
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */

:root {
  --color-primary: #2563eb;
  /* ... rest of file ... */
}
```

---

## JavaScript Files

**File Extensions**: `.js`, `.mjs`, `.cjs`  
**Comment Syntax**: Multi-line block comment `/* ... */`  
**Examples**: `postcss.config.js`

### Format Specification

```javascript
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */

[File content starts here]
```

### Rules

Same as CSS files (JavaScript uses identical comment syntax)

### Example: postcss.config.js

```javascript
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer')
  ]
};
```

---

## HTML Files

**File Extensions**: `.html`  
**Comment Syntax**: HTML comment `<!-- ... -->`  
**Examples**: `docs/index.html`, `docs/examples/basic.html`,
`test/samples/forms.html`

### Format Specification

```html
<!--
  SPDX-FileCopyrightText: 2026 Sergei Mukhin
  SPDX-License-Identifier: MIT
-->
<!DOCTYPE html>
<html lang="en">
[File content starts here]
```

### Rules

1. Opening delimiter `<!--` MUST be on line 1
2. SPDX tags MUST be indented with 2 spaces
3. `SPDX-FileCopyrightText` MUST appear before `SPDX-License-Identifier`
4. Closing delimiter `-->` MUST be on separate line
5. `<!DOCTYPE html>` MUST follow header immediately (no blank line)

### Example: docs/examples/basic.html

```html
<!--
  SPDX-FileCopyrightText: 2026 Sergei Mukhin
  SPDX-License-Identifier: MIT
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Example - EdibleCSS</title>
  <link rel="stylesheet" href="../../dist/edible.css">
</head>
<body>
  <h1>Basic Example</h1>
  <!-- ... rest of file ... -->
</body>
</html>
```

---

## Markdown Files

> **⚠️ EXCLUDED FROM SPDX REQUIREMENTS**  
>Per user clarification (2026-02-02): Markdown files do NOT require SPDX
>headers. Covered by root `LICENSE.txt` and `.reuse/dep5`.

**File Extensions**: `.md`, `.markdown`  
**SPDX Treatment**: Not required  
**Examples**: `README.md`, `docs/api.md`, `specs/002-licensing-linting/spec.md`

### Rationale

- Markdown files are documentation, not compiled source code
- Already covered by project LICENSE.txt (applies to entire repository)
- REUSE compliance via DEP5 bulk exclusion more maintainable
- Linting handled separately by markdownlint-cli2

### DEP5 Entry (Reference)

```ini
Files: *.md docs/*.md specs/**/*.md
Copyright: 2026 Sergei Mukhin
License: MIT
```

### Historical Format (For Reference Only)

<details>
<summary>If policy changes in future, this format could be used</summary>

```markdown
<!--
SPDX-FileCopyrightText: 2026 Sergei Mukhin
SPDX-License-Identifier: MIT
-->

# Document Title

[File content starts here]
```

**Note**: MD041 rule would need to be disabled to allow SPDX headers before
first heading.

</details>

---

## Multiple Copyright Holders

**Use Case**: External contributions or multi-author files  
**Format**: Multiple `SPDX-FileCopyrightText` lines  
**Applicable To**: CSS, JavaScript, HTML only (markdown excluded)

### CSS/JavaScript Example

```css
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-FileCopyrightText: 2027 Jane Contributor
 * SPDX-License-Identifier: MIT
 */
```

### HTML Example

```html
<!--
  SPDX-FileCopyrightText: 2026 Sergei Mukhin
  SPDX-FileCopyrightText: 2027 Jane Contributor
  SPDX-License-Identifier: MIT
-->
```

### Rules

1. Each copyright holder gets separate `SPDX-FileCopyrightText` line
2. Order: chronological (earliest contributor first) OR alphabetical
3. Year reflects first contribution year, not cumulative
4. License identifier appears ONCE at end (not per contributor)

---

## Excluded Files (No SPDX Headers)

### Configuration Files

**Excluded**: `package.json`, `.markdownlint-cli2.yaml`, `backstop.json`  
**Reason**: Configuration files excluded per FR-002a  
**Compliance Method**: Listed in `.gitignore` or DEP5

### Generated Files

**Excluded**: `dist/*`, `node_modules/*`, `package-lock.json`  
**Reason**: Build artifacts, not source files  
**Compliance Method**: DEP5 entry in `.reuse/dep5`

### DEP5 Format

```ini
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/
Upstream-Name: edible-css
Upstream-Contact: Sergei Mukhin
Source: https://github.com/svmukhin/edible-css

Files: dist/* package-lock.json test/backstop/test/* node_modules/*
Copyright: 2026 Sergei Mukhin
License: MIT
```

---

## Validation Contracts

### Contract 1: Header Position

**Requirement**: SPDX header MUST start at line 1  
**Validation**: `reuse lint` checks header position  
**Failure**: CI fails with "Header not found at top of file"

**Test Cases**:

- ✅ PASS: Header at line 1
- ❌ FAIL: Header at line 5 (after docstring)
- ❌ FAIL: Header at end of file

### Contract 2: Required Fields

**Requirement**: Both `SPDX-FileCopyrightText` AND `SPDX-License-Identifier`
MUST be present
**Validation**: `reuse lint` checks for both tags  
**Failure**: CI fails with "Missing required SPDX tag"

**Test Cases**:

- ✅ PASS: Both tags present
- ❌ FAIL: Only copyright (missing license identifier)
- ❌ FAIL: Only license identifier (missing copyright)
- ❌ FAIL: Neither tag present

### Contract 3: License Identifier

**Requirement**: `SPDX-License-Identifier` MUST be `MIT`  
**Validation**: `reuse lint` validates against SPDX license list  
**Failure**: CI fails with "Invalid or missing license"

**Test Cases**:

- ✅ PASS: `MIT`
- ❌ FAIL: `Apache-2.0` (wrong license)
- ❌ FAIL: `mit` (wrong case - must be uppercase)
- ❌ FAIL: `MIT License` (must be SPDX ID only, not full name)

### Contract 4: Comment Syntax

**Requirement**: Comment format MUST match file type  
**Validation**: `reuse lint` parses comments per file extension  
**Failure**: CI fails with "Unable to parse SPDX information"

**Test Cases**:

- ✅ PASS: CSS file with `/* ... */` comments
- ✅ PASS: HTML file with `<!-- ... -->` comments
- ❌ FAIL: CSS file with `<!-- ... -->` comments (wrong syntax)
- ❌ FAIL: HTML file with `/* ... */` comments (wrong syntax)

---

## Integration Points

### GitHub Action: fsfe/reuse-action@v6

**Input**: Repository files with SPDX headers  
**Process**: Runs `reuse lint` on all tracked files  
**Output**:

- Exit code 0: All files compliant
- Exit code 1: Non-compliant files found (CI fails)
- Detailed report: Lists each non-compliant file with reason

**CI Configuration**:

```yaml
- uses: fsfe/reuse-action@v6
  # No additional configuration needed
  # Action automatically detects SPDX headers and validates
```

### Local Validation

**Command**: `reuse lint` (requires REUSE tool installed)  
**Installation**: `pip install reuse` OR use Docker image  
**Usage**:

```bash
reuse lint  # Check entire repository
```

**Optional**: Add to package.json scripts:

```json
{
  "scripts": {
    "lint:license": "reuse lint"
  }
}
```

---

## Breaking Changes

### Changes That Invalidate This Contract

1. **License Change**: Switching from MIT to another license
   - Action: Update all `SPDX-License-Identifier` tags
   - Update `LICENSES/` directory with new license text

2. **Copyright Holder Change**: Transferring copyright ownership
   - Action: Update all `SPDX-FileCopyrightText` tags
   - May require year ranges

3. **REUSE Spec Version Change**: Upgrading to REUSE 4.0 (future)
   - Action: Review spec changes, update headers if format changes
   - Update GitHub Action to new version

4. **File Type Addition**: Adding new file types (e.g., Python, TypeScript)
   - Action: Extend this contract with new format specifications
   - Determine correct comment syntax for new file types

---

## Appendix: Template Headers

### Quick Reference

**CSS/JS**:

```css
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */
```

**HTML**:

```html
<!--
  SPDX-FileCopyrightText: 2026 Sergei Mukhin
  SPDX-License-Identifier: MIT
-->
```

**Markdown**:

```markdown
<!--
SPDX-FileCopyrightText: 2026 Sergei Mukhin
SPDX-License-Identifier: MIT
-->
```

---

**Contract Version**: 1.0.0  
**Last Updated**: 2026-02-02  
**Status**: Active  
**Validated By**: REUSE Specification 3.0, fsfe/reuse-action@v6
