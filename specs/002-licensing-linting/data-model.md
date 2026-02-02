# Data Model: Licensing and Linting Standards

**Feature**: 002-licensing-linting | **Date**: 2026-02-02  
**Purpose**: Define entities, attributes, and relationships for SPDX headers and
linting configuration

---

## Entity: SPDX Header

**Description**: Machine-readable copyright and license metadata embedded in
source files as comments.

### Attributes

| Attribute           | Type    | Required | Validation                                      | Example              |
| ------------------- | ------- | -------- | ----------------------------------------------- | -------------------- |
| `fileCopyrightText` | String  | Yes      | Format: `YYYY Author Name`                      | `2026 Sergei Mukhin` |
| `licenseIdentifier` | SPDX ID | Yes      | Must be valid SPDX license ID                   | `MIT`                |
| `commentFormat`     | Enum    | Yes      | One of: `CSS_BLOCK`, `HTML_COMMENT`, `JS_BLOCK` | `CSS_BLOCK`          |
| `position`          | Integer | Yes      | Line number (must be ≤ 5)                       | `1`                  |

### Rules

1. **Position Constraint**: SPDX header MUST appear within first 5 lines of file
2. **Copyright Format**: Year MUST be 4-digit, name MUST be non-empty string
3. **License Validity**: Identifier MUST match SPDX license list (validated by
   REUSE tool)
4. **Comment Syntax**: Format MUST match file type:
   - CSS/JS: `/* ... */`
   - HTML: `<!-- ... -->`
5. **Multiple Copyright Holders**: Multiple `SPDX-FileCopyrightText` lines
   permitted, each on separate line

### State Transitions

```mermaid
[File Created] → [SPDX Header Added] → [REUSE Compliant]
                       ↓
                 [Modified] → [Year Updated (Optional)]
```

**States**:

- **File Created**: New file without SPDX header (non-compliant)
- **SPDX Header Added**: Header present, awaiting validation
- **REUSE Compliant**: Validated by `reuse lint`, CI passes
- **Modified**: File edited, may need year range update (optional)

---

## Entity: File Classification

**Description**: Categorization of repository files for SPDX header
requirements.

### Attributes

| Attribute       | Type    | Required    | Example                                                                  |
| --------------- | ------- | ----------- | ------------------------------------------------------------------------ |
| `filePath`      | String  | Yes         | `src/edible.css`                                                         |
| `fileType`      | Enum    | Yes         | `CSS`, `JAVASCRIPT`, `HTML`, `MARKDOWN`, `CONFIG`, `BINARY`, `GENERATED` |
| `requiresSPDX`  | Boolean | Yes         | `true`                                                                   |
| `spdxMethod`    | Enum    | Conditional | `INLINE_HEADER`, `DEP5`, `EXCLUDED`                                      |
| `excludeReason` | String  | Optional    | `Configuration file`                                                     |

### Categorization Rules

| File Type       | Requires SPDX | Method        | Examples                                                           |
| --------------- | ------------- | ------------- | ------------------------------------------------------------------ |
| **CSS**         | ✅ Yes        | Inline Header | `src/*.css`                                                        |
| **JavaScript**  | ✅ Yes        | Inline Header | `postcss.config.js`                                                |
| **HTML**        | ✅ Yes        | Inline Header | `docs/examples/*.html`                                             |
| **Markdown**    | ❌ No         | Excluded      | `README.md`, `docs/*.md`, `specs/**/*.md` - covered by LICENSE.txt |
| **JSON Config** | ❌ No         | Excluded      | `package.json`, `.markdownlint-cli2.yaml`                          |
| **YAML Config** | ❌ No         | Excluded      | `.github/workflows/*.yml`                                          |
| **Binary**      | ⚠️ Yes        | DEP5          | Images, fonts (if any)                                             |
| **Generated**   | ❌ No         | DEP5          | `dist/*`, `node_modules/*`, `package-lock.json`                    |

### Validation

```pseudocode
IF fileType IN [CSS, JAVASCRIPT, HTML]:
  MUST have inline SPDX header
ELSE IF fileType == BINARY:
  MUST have DEP5 entry OR sidecar .license file
ELSE IF fileType IN [CONFIG, GENERATED]:
  MUST be listed in .gitignore OR DEP5
```

---

## Entity: Markdownlint Rule Configuration

**Description**: Rule customizations for markdown quality enforcement.

### Attributes

| Attribute  | Type    | Required | Example                                 |
| ---------- | ------- | -------- | --------------------------------------- |
| `ruleId`   | String  | Yes      | `MD013`                                 |
| `ruleName` | String  | Yes      | `line-length`                           |
| `enabled`  | Boolean | Yes      | `true`                                  |
| `config`   | Object  | Optional | `{ code_blocks: false, tables: false }` |
| `severity` | Enum    | Yes      | `ERROR`, `WARNING`                      |

### Configuration Schema

```yaml
# .markdownlint-cli2.yaml structure
gitignore: Boolean # Respect .gitignore patterns
config: # Rule customizations
  [RuleId]: # Rule identifier (e.g., MD013)
    [option]: value # Rule-specific option
```

### Active Rules

| Rule ID | Name                 | Enabled | Configuration                                            | Reason                  |
| ------- | -------------------- | ------- | -------------------------------------------------------- | ----------------------- |
| MD013   | line-length          | ✅ Yes  | `code_blocks: false`, `tables: false`, `headings: false` | Allow long code/tables  |
| MD033   | no-inline-html       | ✅ Yes  | `allowed_elements: [br, details, summary]`               | Common doc patterns     |
| MD041   | first-line-heading   | ❌ No   | N/A                                                      | SPDX headers come first |
| MD024   | no-duplicate-heading | ✅ Yes  | `siblings_only: true`                                    | Allow repeated sections |

---

## Entity: REUSE Compliance Status

**Description**: Aggregated compliance state for the repository.

### Attributes

| Attribute              | Type      | Description                               |
| ---------------------- | --------- | ----------------------------------------- |
| `totalFiles`           | Integer   | Count of files requiring compliance check |
| `compliantFiles`       | Integer   | Files with valid SPDX headers             |
| `nonCompliantFiles`    | Integer   | Files missing or with invalid headers     |
| `excludedFiles`        | Integer   | Files excluded via .gitignore or DEP5     |
| `compliancePercentage` | Float     | `(compliantFiles / totalFiles) * 100`     |
| `validationStatus`     | Enum      | `PASS`, `FAIL`                            |
| `validatedAt`          | Timestamp | Last CI run timestamp                     |

### Validation Rule

```pseudocode
IF compliantFiles == totalFiles AND nonCompliantFiles == 0:
  validationStatus = PASS
ELSE:
  validationStatus = FAIL
```

### Success Criteria Mapping

- **SC-001**: `compliantFiles == totalFiles` (for source files only)
- **SC-002**: `validationStatus == PASS` (reuse lint produces zero errors)

---

## Relationships

```text
┌─────────────────┐       contains       ┌──────────────┐
│  Source File    │───────────────────────│ SPDX Header  │
└─────────────────┘                       └──────────────┘
        │                                         │
        │ classified as                           │ validates against
        ↓                                         ↓
┌─────────────────┐                       ┌──────────────┐
│ File Category   │                       │ REUSE Spec   │
└─────────────────┘                       └──────────────┘

┌──────────────────┐       defines       ┌──────────────────┐
│ Markdown File    │───────────────────────│ Lint Rules      │
└──────────────────┘                       └──────────────────┘
        │                                         │
        │ validated by                            │ enforced by
        ↓                                         ↓
┌─────────────────┐                       ┌──────────────────┐
│ markdownlint-   │                       │ CI Pipeline      │
│ cli2            │                       │ (GitHub Actions) │
└─────────────────┘                       └──────────────────┘
```

---

## Invariants

### Global Invariants

1. **All Source Files Have Headers**: Every file classified as
   `requiresSPDX=true` MUST have valid SPDX header
2. **Config Files Excluded**: Files with `fileType=CONFIG` MUST have
   `requiresSPDX=false`
3. **Unique Comment Format**: Each file type has exactly one valid comment
   format for SPDX headers
4. **MIT License Only**: All `licenseIdentifier` values MUST be `MIT` (no
   multi-license support)

### Per-File Invariants

1. **Header Position**: SPDX header MUST be at line 1-5 (before substantive
   content)
2. **Complete Header**: Both `SPDX-FileCopyrightText` AND
   `SPDX-License-Identifier` MUST be present
3. **Valid Syntax**: Comment syntax MUST match file type (CSS uses `/* */`, HTML
   uses `<!-- -->`)

### Repository-Level Invariants

1. **100% Compliance**: `compliancePercentage == 100.0` for CI to pass
2. **Zero Markdown Violations**: All markdown files MUST pass configured linting
   rules
3. **LICENSES Directory Exists**: `LICENSES/MIT.txt` MUST exist with full
   license text

---

## Examples

### Example 1: CSS File with SPDX Header

**File**: `src/edible.css`

```css
/*
 * SPDX-FileCopyrightText: 2026 Sergei Mukhin
 * SPDX-License-Identifier: MIT
 */

@import "reset.css";
@import "tokens.css";
/* ... rest of file ... */
```

**Entity Representation**:

```json
{
  "file": {
    "filePath": "src/edible.css",
    "fileType": "CSS",
    "requiresSPDX": true,
    "spdxMethod": "INLINE_HEADER"
  },
  "spdxHeader": {
    "fileCopyrightText": "2026 Sergei Mukhin",
    "licenseIdentifier": "MIT",
    "commentFormat": "CSS_BLOCK",
    "position": 1
  }
}
```

---

### Example 2: Markdown File with SPDX Header

**File**: `README.md`

```markdown
<!--
SPDX-FileCopyrightText: 2026 Sergei Mukhin
SPDX-License-Identifier: MIT
-->

# EdibleCSS

A primitive, classless CSS framework...
```

**Entity Representation**:

```json
{
  "file": {
    "filePath": "README.md",
    "fileType": "MARKDOWN",
    "requiresSPDX": true,
    "spdxMethod": "INLINE_HEADER"
  },
  "spdxHeader": {
    "fileCopyrightText": "2026 Sergei Mukhin",
    "licenseIdentifier": "MIT",
    "commentFormat": "HTML_COMMENT",
    "position": 1
  }
}
```

---

### Example 3: Excluded Config File

**File**: `package.json`

```json
{
  "name": "edible-css",
  "version": "0.1.0",
  ...
}
```

**Entity Representation**:

```json
{
  "file": {
    "filePath": "package.json",
    "fileType": "CONFIG",
    "requiresSPDX": false,
    "spdxMethod": "EXCLUDED",
    "excludeReason": "Configuration file (JSON) - excluded per FR-002a"
  }
}
```

---

### Example 4: Generated File in DEP5

**File**: `dist/edible.min.css` (generated)

**DEP5 Entry** (`.reuse/dep5`):

```ini
Files: dist/* package-lock.json test/backstop/test/*
Copyright: 2026 Sergei Mukhin
License: MIT
```

**Entity Representation**:

```json
{
  "file": {
    "filePath": "dist/edible.min.css",
    "fileType": "GENERATED",
    "requiresSPDX": false,
    "spdxMethod": "DEP5",
    "excludeReason": "Generated build artifact"
  }
}
```

---

## Validation Queries

### Query 1: Find Non-Compliant Files

```sql
SELECT filePath
FROM Files
WHERE requiresSPDX = true
  AND NOT EXISTS (
    SELECT 1 FROM SPDXHeaders
    WHERE SPDXHeaders.filePath = Files.filePath
  )
```

### Query 2: Calculate Compliance Percentage

```pseudocode
compliantFiles = COUNT(Files WHERE requiresSPDX=true AND hasValidHeader=true)
totalFiles = COUNT(Files WHERE requiresSPDX=true)
compliancePercentage = (compliantFiles / totalFiles) * 100
```

### Query 3: List Files by Category

```text
GROUP BY fileType, requiresSPDX
ORDER BY requiresSPDX DESC, fileType ASC
```

Expected output:

```text
CSS         | requiresSPDX=true  | 13 files
MARKDOWN    | requiresSPDX=true  | 30 files
HTML        | requiresSPDX=true  | 14 files
JAVASCRIPT  | requiresSPDX=true  | 1 file
CONFIG      | requiresSPDX=false | 3 files
GENERATED   | requiresSPDX=false | N/A (excluded)
```
