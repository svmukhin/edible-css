# EdibleCSS: "Just add HTML"

A primitive, classless CSS framework for developers with no design skills. Style
semantic HTML5 with a single `<link>` tag.

## Features

- **Zero Classes** - Style pure HTML5 elements only, no CSS classes required
- **No JavaScript** - Pure CSS solution with zero runtime dependencies
- **Single Link Tag** - Just add `<link rel="stylesheet" href="edible.css">` and
  you're done
- **Responsive by Default** - Works on mobile, tablet, and desktop automatically
- **Adaptive Dark Mode** - Automatic light/dark theme based on user preference
- **Accessible** - WCAG 2.1 AA compliant with proper contrast and focus
  indicators
- **Tiny** - 24.8KB uncompressed, 3.8KB gzipped
- **Modern Browsers** - Chrome, Firefox, Safari, Edge (last 2 versions)

## Installation

### CDN (Recommended)

Add this line to your HTML `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/svmukhin/edible-css@main/dist/edible.min.css">
```

Or via unpkg:

```html
<link rel="stylesheet" href="https://unpkg.com/edible-css@latest/dist/edible.min.css">
```

### npm

```bash
npm install edible-css
```

Then import in your CSS or JavaScript:

```css
@import 'edible-css/dist/edible.css';
```

Or link to `node_modules/edible-css/dist/edible.css` in your HTML.

### Download

Download the CSS file directly from GitHub:

- [edible.css](https://github.com/svmukhin/edible-css/raw/main/dist/edible.css)
  (24.8KB uncompressed)
- [edible.min.css](https://github.com/svmukhin/edible-css/raw/main/dist/edible.min.css)
  (16KB minified)

Then include it in your project:

```html
<link rel="stylesheet" href="path/to/edible.min.css">
```

## Usage

### Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/svmukhin/edible-css@main/dist/edible.min.css">
</head>
<body>
  <header>
    <h1>Welcome to My Site</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>Article Title</h2>
      <p>Just write semantic HTML. EdibleCSS takes care of the styling.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 Your Name</p>
  </footer>
</body>
</html>
```

### Form Example

```html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" placeholder="you@example.com">

  <label for="message">Message:</label>
  <textarea id="message" rows="5"></textarea>

  <button type="submit">Send</button>
</form>
```

### Table Example

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>User</td>
    </tr>
  </tbody>
</table>
```

## What Gets Styled

EdibleCSS styles 50+ HTML5 elements including:

- **Typography**: h1-h6, p, a, strong, em, small, mark, code, pre, blockquote
- **Forms**: input, textarea, select, button, fieldset, legend, label
- **Tables**: table, thead, tbody, tfoot, tr, th, td, caption
- **Lists**: ul, ol, li, dl, dt, dd
- **Media**: img, figure, figcaption, audio, video
- **Semantic**: nav, main, article, section, aside, header, footer
- **Interactive**: details, summary, dialog

## Dark Mode

Dark mode works automatically based on your operating system or browser setting.
No configuration needed.

```css
/* Automatically switches when user enables dark mode */
@media (prefers-color-scheme: dark) {
  /* Dark mode styles applied */
}
```

## Browser Support

EdibleCSS works in all modern evergreen browsers:

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

Legacy browsers (IE11) are not supported.

## Customization

EdibleCSS is intentionally **not customizable**. It provides one opinionated
design that looks professional out of the box.

If you need to override styles, EdibleCSS uses low-specificity element
selectors, so your own CSS will take precedence:

```css
/* Your custom styles override EdibleCSS */
h1 {
  color: purple;
}
```

## Philosophy

EdibleCSS follows four core principles:

1. **Zero Classes** - No CSS classes whatsoever
2. **No JavaScript Required** - Pure CSS solution
3. **Minimal Configuration** - Single link tag to get started
4. **For Non-Designers** - Built for developers with no design skills

## Development

```bash
# Install dependencies
npm install

# Build CSS
npm run build

# Run tests
npm test

# Run visual regression tests
npm run test:visual

# Run accessibility tests
npm run test:a11y
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! However, please note that EdibleCSS is
intentionally minimal and opinionated. New features must align with the
[Constitution](.specify/memory/constitution.md) principles.

## Credits

Created by [Sergei Mukhin](https://github.com/svmukhin)

Inspired by classless CSS frameworks: Tacit, Water.css, new.css, MVP.css, and
sakura.
