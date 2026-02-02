# EdibleCSS API Reference

Complete reference of all HTML elements styled by EdibleCSS v0.1.0.

## Typography Elements

### Headings

**Elements:** `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`

All heading levels are styled with appropriate font sizes using a 1.25 modular
scale. Margins are automatically adjusted for proper spacing.

- `<h1>`: Largest heading (3.052rem)
- `<h2>`: Second level (2.441rem)
- `<h3>`: Third level (1.953rem)
- `<h4>`: Fourth level (1.563rem)
- `<h5>`: Fifth level (1.25rem)
- `<h6>`: Sixth level (1.25rem, semi-bold)

### Paragraphs

**Element:** `<p>`

Standard paragraph styling with comfortable line-height (1.6) and bottom margin
for spacing.

### Links

**Element:** `<a>`

Links are styled with:

- Accent color (blue)
- Underline decoration
- Thicker underline on hover
- Visible focus outline for accessibility
- Smooth transitions

### Text Formatting

**Elements:** `<strong>`, `<b>`, `<em>`, `<i>`, `<small>`, `<mark>`, `<del>`,
`<ins>`, `<sub>`, `<sup>`

- `<strong>`, `<b>`: Bold text (font-weight: 700)
- `<em>`, `<i>`: Italic text
- `<small>`: Smaller text with secondary color
- `<mark>`: Highlighted text with yellow background
- `<del>`: Strikethrough for deleted text
- `<ins>`: Underlined for inserted text
- `<sub>`: Subscript text
- `<sup>`: Superscript text

### Code Elements

**Elements:** `<code>`, `<pre>`, `<kbd>`, `<samp>`, `<var>`

- `<code>`: Inline code with monospace font and subtle background
- `<pre>`: Preformatted code blocks with background and padding
- `<kbd>`: Keyboard input styling
- `<samp>`: Sample output styling
- `<var>`: Variable name styling

### Quotes and Citations

**Elements:** `<blockquote>`, `<q>`, `<cite>`

- `<blockquote>`: Block quotes with left border and padding
- `<q>`: Inline quotes with quotation marks
- `<cite>`: Citation styling (italic)

### Other Text Elements

**Elements:** `<abbr>`, `<time>`

- `<abbr>`: Abbreviations with dotted underline and tooltip on hover
- `<time>`: Time elements styled consistently

## List Elements

### Unordered Lists

**Elements:** `<ul>`, `<li>`

Bullet lists with nested support:

- First level: disc (•)
- Second level: circle (○)
- Third level: square (■)

### Ordered Lists

**Elements:** `<ol>`, `<li>`

Numbered lists with nested support:

- First level: decimal (1, 2, 3)
- Second level: lower-alpha (a, b, c)
- Third level: lower-roman (i, ii, iii)

### Definition Lists

**Elements:** `<dl>`, `<dt>`, `<dd>`

- `<dl>`: Definition list container
- `<dt>`: Definition term (bold)
- `<dd>`: Definition description (indented)

## Table Elements

**Elements:** `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`,
`<caption>`

Tables include:

- Bordered cells with consistent spacing
- Zebra striping (alternate row colors)
- Hover effects on rows
- Responsive horizontal scrolling
- Bold header cells (`<th>`)

## Form Elements

### Text Inputs

**Elements:** `<input type="text">`, `<input type="email">`, `<input
type="password">`, `<input type="search">`, `<input type="url">`, `<input
type="tel">`, `<input type="number">`, `<input type="date">`, `<input
type="datetime-local">`, `<input type="month">`, `<input type="week">`, `<input
type="time">`, `<textarea>`

All text inputs feature:

- Full-width by default
- Padding and comfortable font size
- Border with focus state (accent color)
- Box shadow on focus
- Disabled/readonly states

### Buttons

**Elements:** `<button>`, `<input type="submit">`, `<input type="button">`,
`<input type="reset">`

Buttons include:

- WCAG AA compliant colors (4.5:1 contrast)
- Hover and active states
- Focus outline
- Disabled state styling
- Smooth transitions

### Select Dropdowns

**Elements:** `<select>`, `<option>`

Styled select menus with:

- Consistent sizing with other inputs
- Focus states
- Multiple select support

### Checkboxes and Radio Buttons

**Elements:** `<input type="checkbox">`, `<input type="radio">`

- Accent color applied
- Focus outline for accessibility
- Proper sizing and spacing

### Form Grouping

**Elements:** `<fieldset>`, `<legend>`, `<label>`

- `<fieldset>`: Grouped form controls with border
- `<legend>`: Fieldset title
- `<label>`: Form labels with proper spacing

## Media Elements

### Images

**Elements:** `<img>`, `<picture>`

- Responsive by default (max-width: 100%)
- Height auto-adjusted
- Display as block

### Video and Audio

**Elements:** `<video>`, `<audio>`

- Responsive sizing
- Standard browser controls

### Other Media

**Elements:** `<iframe>`, `<embed>`, `<object>`, `<canvas>`, `<svg>`

- `<svg>`: Fill currentColor for easy theming
- All media elements are responsive

### Figures

**Elements:** `<figure>`, `<figcaption>`

- `<figure>`: Container for media with caption
- `<figcaption>`: Styled caption text

## Semantic HTML5 Elements

### Navigation

**Element:** `<nav>`

Navigation areas with:

- Secondary background color
- Horizontal flexbox layout for lists
- Hover states on links
- Proper spacing

### Main Content

**Element:** `<main>`

Main content area with appropriate margins.

### Articles

**Element:** `<article>`

Article containers with:

- Padding and spacing
- Subtle border on all sides
- Light background

### Aside

**Element:** `<aside>`

Sidebar content with:

- Secondary background
- Lighter text color
- Smaller font size

### Sections

**Element:** `<section>`

Content sections with vertical spacing.

### Header and Footer

**Elements:** `<header>`, `<footer>`

- `<header>`: Page/section header with bottom border
- `<footer>`: Page/section footer with top border and secondary text

### Address

**Element:** `<address>`

Contact information with italic styling.

## Interactive Elements

### Details and Summary

**Elements:** `<details>`, `<summary>`

Collapsible content blocks:

- `<summary>`: Clickable toggle with hover states
- `<details>`: Container with border and padding

### Dialog

**Element:** `<dialog>`

Modal dialogs with border and padding.

### Progress and Meter

**Elements:** `<progress>`, `<meter>`

Progress bars and meters with accent colors.

### Output

**Element:** `<output>`

Form calculation output styling.

## Layout Elements

### Horizontal Rule

**Element:** `<hr>`

Horizontal dividers with subtle border.

## Responsive Behavior

### Breakpoints

- **Mobile (default)**: 16px base font, 70ch max-width
- **Tablet (≥768px)**: 17px base font, 75ch max-width
- **Desktop (≥1024px)**: 18px base font, 80ch max-width

### Dark Mode

All elements automatically adapt to dark mode when `prefers-color-scheme: dark`
is detected:

- Inverted color scheme
- Reduced image/media brightness
- Enhanced form field backgrounds
- Adjusted focus states

### Print Styles

When printing, EdibleCSS:

- Converts to black/white
- Shows link URLs after links
- Hides navigation, forms, and media
- Optimizes page breaks
- Adjusts font sizes for print (12pt base)

## CSS Custom Properties

EdibleCSS uses these design tokens (for advanced customization):

### Colors (Light Mode)

- `--bg-primary`: #ffffff
- `--bg-secondary`: #f6f8fa
- `--bg-tertiary`: #e1e4e8
- `--text-primary`: #24292f
- `--text-secondary`: #57606a
- `--border`: #d0d7de
- `--accent`: #0969da
- `--button-bg`: #0969da
- `--button-bg-hover`: #0860ca

### Colors (Dark Mode)

- `--bg-primary`: #0d1117
- `--bg-secondary`: #161b22
- `--bg-tertiary`: #21262d
- `--text-primary`: #e6edf3
- `--text-secondary`: #8b949e
- `--border`: #30363d
- `--accent`: #58a6ff
- `--button-bg`: #1f6feb
- `--button-bg-hover`: #388bfd

### Typography Scale

- `--font-sm`: 0.8rem
- `--font-md`: 1rem
- `--font-lg`: 1.25rem
- `--font-xl`: 1.563rem
- `--font-2xl`: 1.953rem
- `--font-3xl`: 2.441rem
- `--font-4xl`: 3.052rem

### Spacing Scale

- `--space-xs`: 0.25rem (2px)
- `--space-sm`: 0.5rem (4px)
- `--space-md`: 1rem (8px)
- `--space-lg`: 1.5rem (12px)
- `--space-xl`: 2rem (16px)
- `--space-2xl`: 3rem (24px)

## Browser Support

EdibleCSS supports:

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

## Version

**Current Version:** 0.1.0  
**License:** MIT  
**Repository:** <https://github.com/svmukhin/edible-css>
