# Kinetix Pro — Luxury & Military Smartwatches (Shopify 2.0 Theme)

A world-class, production-ready **Shopify Online Store 2.0** theme built for high-performance wearable technology, aerospace titanium horology, and tactical military GPS smartwatches.

---

## 🌟 Theme Overview & Features

- **Shopify Online Store 2.0 Architecture**: Full JSON template compatibility with dynamic section reordering and Shopify Theme Editor blocks.
- **Titanium & Dark Luxury Aesthetics**: Tailored palette featuring Deep Space Midnight (`#090d16`), Slate Card Glassmorphism, and Tactical Amber Gold (`#f59e0b`) & Emerald Green (`#10b981`) accents.
- **Flagship Smartwatch Showcase**: Interactive component hotspots, 360-degree telemetry inspect, finish swatch selectors, and live stock urgency badges.
- **Slide-Out AJAX Cart Drawer**: Real-time free worldwide shipping threshold progress bar ($150 target), dynamic line quantity modifier, and instant checkout.
- **Instant Quick View Modal**: Modal dialog for instant product inspection and seamless AJAX cart addition.
- **Telemetry Specifications Matrix**: Direct side-by-side comparison table between Apex Pro Titanium, Thrux Military GPS, Heritage Royale, and Pulse Elite.
- **Engineering Heritage & Cleanroom Story**: Dedicated About Us brand heritage section and page.
- **Tactical FAQ & Operator Desk**: Searchable accordion knowledge base and priority support dispatch form.
- **Self-Contained Local Preview**: Standalone `index.html` allowing instant zero-dependency preview in any web browser or via GitHub Pages.

---

## 📁 Directory Structure

```text
├── assets/                  # CSS stylesheets, JS theme engine & photorealistic watch assets
│   ├── base.css             # Core design tokens, typography, CSS reset & layout grids
│   ├── custom.css           # Glassmorphism, header, hero glow & animations
│   ├── theme.js             # Cart Drawer, Quick View modal, accordions, swatches & toasts
│   ├── watch-apex-pro.jpg
│   ├── watch-thrux-military.jpg
│   ├── watch-heritage-royale.jpg
│   ├── watch-pulse-elite.jpg
│   └── engineering-heritage.jpg
├── config/                  # Shopify Theme customizer configuration
│   ├── settings_schema.json # Merchant customizer options (colors, typography, cart, social)
│   └── settings_data.json   # Default store presets
├── layout/                  # Master liquid layout wrappers
│   ├── theme.liquid         # Main storefront layout
│   └── password.liquid      # Coming soon / password protection page
├── locales/                 # Internationalization strings
│   └── en.default.json      # English translations
├── sections/                # Dynamic modular Liquid sections
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── hero-banner.liquid
│   ├── featured-collections.liquid
│   ├── product-showcase.liquid
│   ├── featured-products.liquid
│   ├── tech-specs-matrix.liquid
│   ├── brand-heritage.liquid
│   ├── testimonials-reviews.liquid
│   ├── faq-support.liquid
│   ├── newsletter.liquid
│   ├── main-product.liquid
│   ├── main-collection.liquid
│   ├── main-about.liquid
│   ├── main-faq-support.liquid
│   ├── main-cart.liquid
│   ├── main-404.liquid
│   ├── main-search.liquid
│   ├── main-page.liquid
│   ├── cart-drawer.liquid
│   └── footer.liquid
├── snippets/                # Reusable Liquid components & SVG icons
│   ├── product-card.liquid
│   ├── price.liquid
│   ├── meta-tags.liquid
│   ├── icon-cart.liquid
│   ├── icon-search.liquid
│   ├── icon-user.liquid
│   ├── icon-close.liquid
│   ├── icon-chevron.liquid
│   ├── icon-star.liquid
│   ├── icon-shield.liquid
│   ├── icon-battery.liquid
│   ├── icon-waterproof.liquid
│   ├── icon-gps.liquid
│   ├── icon-heart.liquid
│   ├── icon-bluetooth.liquid
│   ├── icon-check.liquid
│   └── icon-arrow.liquid
├── templates/               # Shopify OS 2.0 JSON templates
│   ├── index.json
│   ├── product.json
│   ├── collection.json
│   ├── page.json
│   ├── page.about.json
│   ├── page.contact.json
│   ├── page.faq.json
│   ├── cart.json
│   ├── 404.json
│   ├── search.json
│   └── gift_card.liquid
├── index.html               # Live interactive preview for browser & GitHub Pages
└── .gitignore
```

---

## 🚀 How to Upload to GitHub & Shopify

### 1. Upload to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Kinetix Pro Shopify 2.0 Theme"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kinetix-pro-shopify-theme.git
git push -u origin main
```

### 2. Upload to Shopify Store Admin
1. Zip the entire folder contents (`assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`).
2. Go to your **Shopify Admin** &rarr; **Online Store** &rarr; **Themes**.
3. Under **Theme library**, click **Add theme** &rarr; **Upload zip file**.
4. Select your `.zip` archive and click **Upload file**.
5. Click **Customize** to edit sections, colors, menus, and products visually!

---

© 2026 Kinetix Pro Engineering. Built with Shopify Online Store 2.0.
