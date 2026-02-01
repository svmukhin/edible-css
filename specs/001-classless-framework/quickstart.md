# EdibleCSS Quick Start Guide

**For developers who want nice-looking web pages without learning CSS.**

## What is EdibleCSS?

EdibleCSS is a primitive CSS framework that makes your HTML pages look professional with **zero effort**. No CSS classes, no configuration, no JavaScript—just add one line of HTML and you're done.

## Installation

### Option 1: CDN (Recommended - Fastest)

Add this single line to your HTML `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/svmukhin/edible-css@main/dist/edible.min.css">
```

**That's it.** Your page now looks good.

### Option 2: npm (For build tools)

```bash
npm install edible-css
```

Then import in your project:

```javascript
import 'edible-css/edible.css';
```

### Option 3: Download

Download `edible.min.css` from [GitHub Releases](https://github.com/svmukhin/edible-css/releases) and link it:

```html
<link rel="stylesheet" href="path/to/edible.min.css">
```

## Basic Usage

### Step 1: Write normal HTML5

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First EdibleCSS Page</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/svmukhin/edible-css@main/dist/edible.min.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <p>This is my tagline</p>
  </header>

  <main>
    <article>
      <h2>About Me</h2>
      <p>I'm a developer who doesn't know graphic design, but my pages still look nice!</p>
      
      <h3>My Skills</h3>
      <ul>
        <li>Writing HTML</li>
        <li>Not writing CSS (EdibleCSS does it for me)</li>
        <li>Building stuff</li>
      </ul>
    </article>
  </main>

  <footer>
    <p>© 2026 My Name. Made with <a href="https://ediblecss.com">EdibleCSS</a>.</p>
  </footer>
</body>
</html>
```

### Step 2: There is no step 2

Open the HTML file in your browser. It looks professional. You're done.

## Features (That Work Automatically)

### ✅ Responsive Design

Your page automatically looks good on mobile, tablet, and desktop. No media queries needed.

### ✅ Dark Mode

If your users have dark mode enabled in their OS/browser, your page automatically switches to a dark theme. No toggle, no JavaScript—it just works.

### ✅ Semantic HTML Styling

All standard HTML5 elements are styled:
- **Headings**: `<h1>` through `<h6>`
- **Text**: `<p>`, `<a>`, `<strong>`, `<em>`, `<small>`, `<code>`
- **Lists**: `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>`
- **Tables**: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- **Forms**: `<input>`, `<textarea>`, `<button>`, `<select>`, `<label>`
- **Layout**: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- **Content**: `<blockquote>`, `<pre>`, `<figure>`, `<figcaption>`

### ✅ Accessibility Built-In

- WCAG 2.1 AA compliant (proper color contrast)
- Visible focus indicators for keyboard navigation
- Semantic HTML encourages screen reader compatibility

## Common Examples

### Navigation

```html
<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

### Forms

```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="5"></textarea>
  
  <button type="submit">Send Message</button>
</form>
```

### Tables

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Developer</td>
      <td>San Francisco</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Designer</td>
      <td>New York</td>
    </tr>
  </tbody>
</table>
```

### Code Blocks

```html
<p>Install the package:</p>
<pre><code>npm install edible-css</code></pre>

<p>Or use inline code like <code>const x = 42;</code>.</p>
```

### Images

```html
<figure>
  <img src="photo.jpg" alt="Description of photo">
  <figcaption>This is the photo caption</figcaption>
</figure>
```

## Customization

### "But I want to change the colors!"

EdibleCSS is **opinionated by design**. It has one style, no configuration. That's the point.

If you need custom styling, you can override it with your own CSS:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/edible-css/edible.min.css">
<style>
  /* Your custom overrides */
  body {
    max-width: 60ch;  /* Narrower content */
  }
  
  a {
    color: hotpink;  /* Your brand color */
  }
</style>
```

EdibleCSS uses low-specificity selectors, so your rules will override easily.

### "But I need a grid/layout system!"

EdibleCSS doesn't provide layout systems. Use semantic HTML (like `<nav>`, `<main>`, `<article>`) and it will look fine. If you need complex layouts, this isn't the framework for you.

## Browser Support

Modern browsers only:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

**No Internet Explorer support.** It's 2026. Let it go.

## Performance

- **~25KB uncompressed** (easily cacheable)
- **~4KB gzipped** (tiny network footprint)
- **Zero JavaScript** (no runtime overhead)
- **Instant rendering** (<100ms parse time)

## FAQ

### Q: Can I use CSS classes with EdibleCSS?

**A:** Yes, but EdibleCSS doesn't provide any. It only styles HTML elements. You can add your own classes for custom styling.

### Q: Does it work with React/Vue/Angular?

**A:** Yes! It's just a CSS file. Works with any framework, or no framework.

### Q: Why is it called "EdibleCSS"?

**A:** Because it makes your web pages look "edible" (good enough to serve to users) without requiring design skills.

### Q: Can I use it in commercial projects?

**A:** Yes! It's MIT licensed—free forever.

### Q: What if I don't like the design?

**A:** Then this framework isn't for you. EdibleCSS is opinionated. If you want customization, try [Bootstrap](https://getbootstrap.com/) or [Tailwind CSS](https://tailwindcss.com/).

### Q: How do I contribute?

**A:** Check the [GitHub repository](https://github.com/svmukhin/edible-css) for contribution guidelines. Pull requests welcome!

## Troubleshooting

### My page still looks ugly

**Common causes:**
1. **Forgot the viewport meta tag**: Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to your `<head>`
2. **Invalid HTML**: EdibleCSS styles valid HTML5. Check your markup.
3. **Conflicting CSS**: Another stylesheet might be overriding EdibleCSS. Load EdibleCSS last.

### The dark mode doesn't work

Dark mode respects your OS/browser setting. Test by:
1. **macOS**: System Preferences → General → Appearance → Dark
2. **Windows**: Settings → Personalization → Colors → Choose your mode → Dark
3. **Firefox/Chrome**: DevTools → More tools → Rendering → Emulate CSS media feature prefers-color-scheme

### Content is too wide/narrow

EdibleCSS constrains content to 70ch (mobile), 75ch (tablet), or 80ch (desktop) for readability. To override:

```css
body {
  max-width: 90ch;  /* Wider */
  /* or */
  max-width: 100%;  /* Full width */
}
```

## What's Next?

You're done! Go build something. EdibleCSS handles the design so you can focus on your content.

**Links:**
- [GitHub](https://github.com/svmukhin/edible-css)
- [Report Issues](https://github.com/svmukhin/edible-css/issues)

---

**Made for developers who just want their web pages to look decent.** 🍽️
