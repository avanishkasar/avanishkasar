# Avanish Kasar - Portfolio

A high-end personal portfolio website with fluid animations, micro-interactions, and a premium neon cyan aesthetic.

![Portfolio Preview](preview.png)

## 🎨 Design Philosophy

This portfolio is inspired by modern experimental developer portfolios like [wodniack.dev](https://wodniack.dev), featuring:

- **Alive & Fluid Feel** - Not template-like, organic motion
- **Neon Cyan Accent** - Electric blue/cyan on deep charcoal
- **Perlin Noise Waves** - Interactive SVG background
- **Micro-interactions** - Hover effects, scroll reveals, tilt cards
- **Performance First** - GPU-accelerated animations, lazy loading

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in a modern browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then visit `http://localhost:8000`

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML structure
├── css/
│   ├── design-system.css   # Core design tokens (colors, typography, spacing)
│   ├── components.css      # Reusable UI components
│   ├── animations.css      # Keyframes and motion utilities
│   └── main.css           # Page-specific layouts
├── js/
│   ├── noise.js           # Perlin noise generator
│   ├── waves.js           # Interactive wave background (Web Component)
│   ├── animations.js      # Scroll animations & reveals
│   └── main.js            # App controller & utilities
└── README.md
```

## 🎯 Features

### Interactive Wave Background
- Custom Web Component (`<a-waves>`)
- Perlin noise for organic motion
- Mouse/touch reactive
- Performance optimized with RAF

### Scroll Animations
- IntersectionObserver for efficient detection
- Staggered reveals
- Counter animations for stats
- Respects `prefers-reduced-motion`

### Project Cards
- 3D tilt effect on hover
- Dynamic glow following cursor
- Smooth transitions

### Responsive Design
- Fluid typography (clamp-based)
- Mobile-first approach
- Touch-friendly interactions

## 🛠 Customization

### Changing Colors
Edit `css/design-system.css`:

```css
:root {
  /* Change accent color */
  --color-accent-primary: #00f0ff;      /* Main cyan */
  --color-accent-secondary: #00d4e8;    /* Deeper cyan */
  
  /* Change background */
  --color-bg-primary: #0a0a0f;
}
```

### Adjusting Wave Animation
Edit `js/waves.js`:

```javascript
// Line density
const xGap = 12;  // Horizontal spacing
const yGap = 36;  // Vertical spacing

// Wave speed (in movePoints)
time * 0.015  // Horizontal drift speed
time * 0.008  // Vertical drift speed

// Wave amplitude
* 28  // Horizontal displacement
* 14  // Vertical displacement
```

### Adding Projects
In `index.html`, copy a project card:

```html
<article class="project-card" data-tilt>
  <div class="project-card__glow"></div>
  <div class="project-card__content">
    <div class="project-card__header">
      <span class="project-card__label">Project Type</span>
      <div class="project-card__links">
        <a href="URL" class="project-card__link">...</a>
      </div>
    </div>
    <h3 class="project-card__title">Project Name</h3>
    <p class="project-card__description">Description...</p>
    <div class="project-card__tech">
      <span class="tech-tag">Tech</span>
    </div>
  </div>
</article>
```

## 📊 Performance

- **Lighthouse Score Target**: 95+
- GPU-accelerated transforms
- Minimal DOM manipulation
- Lazy loading ready
- Reduced motion support

## 🌐 Deployment

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Source: main branch
3. Your site will be at `https://username.github.io/repo`

### Vercel
```bash
npx vercel
```

### Netlify
Drag and drop the `portfolio` folder to Netlify.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - Feel free to use and modify.

## 🙏 Credits

- Design inspiration: [wodniack.dev](https://wodniack.dev)
- Wave animation concept: [CodePen Collection](https://codepen.io/collection/kkBWOx)
- Animation patterns: [anime.js](https://animejs.com)
- Font: [Inter](https://fonts.google.com/specimen/Inter)

---

**Built with 💙 by Avanish Kasar**
