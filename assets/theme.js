/**
 * KINETIX PRO - Shopify 2.0 Theme JS Engine
 * Core interactions, Cart Drawer API, Quick View, Image Gallery, Micro-interactions
 */

(function () {
  'use strict';

  // Product Database for Offline / Static Preview & Fallback
  const KINETIX_CATALOG = {
    'kinetix-apex-pro': {
      id: 'apex-pro-01',
      title: 'Kinetix Apex Pro Titanium Smartwatch',
      vendor: 'Kinetix Apex Series',
      price: '$249.00',
      compare_at_price: '$329.00',
      image: 'watch-apex-pro.jpg',
      badge: 'APEX TECH',
      description: 'Crafted with aerospace Grade 5 titanium, synthetic sapphire crystal, and BioPulse™ 8-channel optical sensor matrix. Delivers 45-day battery runtime, dual-frequency L1+L5 multi-satellite navigation, and 100-meter oceanic waterproof certification.'
    },
    'kinetix-thrux-military': {
      id: 'thrux-military-02',
      title: 'Kinetix Thrux Rugged Military GPS (170 Sports Modes)',
      vendor: 'Tactical Armor',
      price: '$189.00',
      compare_at_price: '$249.00',
      image: 'watch-thrux-military.jpg',
      badge: 'MIL-SPEC 810H',
      description: 'Engineered to withstand extreme polar drops, shock vibrations, and deep mud submersion. Features 170+ military sports telemetry modes, built-in barometric altimeter, storm radar, and ballistic strap.'
    },
    'kinetix-heritage-royale': {
      id: 'heritage-royale-03',
      title: 'Heritage Royale Teal & Rose Gold Smart Chronograph',
      vendor: 'Horology Royale',
      price: '$299.00',
      compare_at_price: '$399.00',
      image: 'watch-heritage-royale.jpg',
      badge: 'ROYALE LUXURY',
      description: 'Swiss horology aesthetics fused with smart biometrics. Finished with 18K rose gold ion plating, deep emerald sunray dial, dual smart chronograph subdials, and Italian leather strap.'
    },
    'kinetix-pulse-elite': {
      id: 'pulse-elite-04',
      title: 'Kinetix Pulse Elite Curved OLED Fitness & ECG Tracker',
      vendor: 'BioTelemetry Series',
      price: '$149.00',
      compare_at_price: '$199.00',
      image: 'watch-pulse-elite.jpg',
      badge: 'BIOPULSE 2.0',
      description: 'Borderless ultra-bright curved OLED screen with 24/7 medical-grade ECG arrhythmia monitoring, SpO2 blood oxygen tracking, HRV stress recovery analysis, and 20-day battery life.'
    }
  };

  window.KinetixCart = {
    items: [
      {
        handle: 'kinetix-apex-pro',
        title: 'Kinetix Apex Pro Titanium Smartwatch',
        price: 249.00,
        qty: 1,
        variant: 'Stealth Titanium Carbon',
        image: 'watch-apex-pro.jpg'
      }
    ],
    threshold: 150.00,

    getTotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    getCount() {
      return this.items.reduce((sum, item) => sum + item.qty, 0);
    },

    addItem(handle, title, price, image, variant) {
      const existing = this.items.find(i => i.title === title || i.handle === handle);
      if (existing) {
        existing.qty += 1;
      } else {
        this.items.push({
          handle: handle || 'kinetix-apex-pro',
          title: title || 'Kinetix Smartwatch',
          price: parseFloat(price) || 249.00,
          qty: 1,
          variant: variant || 'Stealth Titanium Carbon',
          image: image || 'watch-apex-pro.jpg'
        });
      }
      this.render();
      window.KinetixTheme.showToast(`✨ "${title}" added to tactical cart!`);
      window.KinetixTheme.openCart();
    },

    updateQty(index, delta) {
      if (this.items[index]) {
        this.items[index].qty += delta;
        if (this.items[index].qty <= 0) {
          this.items.splice(index, 1);
        }
      }
      this.render();
    },

    render() {
      const count = this.getCount();
      const total = this.getTotal();

      // Badges
      document.querySelectorAll('.cart-count-badge').forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
      });

      // Total
      const totalEl = document.getElementById('cart-drawer-total');
      if (totalEl) {
        totalEl.textContent = `$${total.toFixed(2)}`;
      }

      // Shipping progress
      const shippingContainer = document.querySelector('.cart-drawer__shipping');
      if (shippingContainer) {
        const percent = Math.min(100, Math.round((total / this.threshold) * 100));
        const diff = Math.max(0, this.threshold - total);
        shippingContainer.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 8px; font-weight: 600;">
            ${diff === 0 
              ? '<span style="color: #10b981; font-weight: 700;">🎉 Unlocked: Free Worldwide Express Courier!</span>' 
              : `<span style="color: var(--text-secondary);">Add <strong style="color: var(--accent-gold);">$${diff.toFixed(2)}</strong> more for Free Worldwide Courier</span>`}
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 999px; overflow: hidden;">
            <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, var(--accent-gold), #10b981); transition: width 0.4s ease; border-radius: 999px;"></div>
          </div>
        `;
      }

      // Items list in drawer
      const listEl = document.querySelector('.cart-drawer__items');
      if (listEl) {
        if (this.items.length === 0) {
          listEl.innerHTML = `
            <div style="padding: 48px 16px; text-align: center; color: var(--text-muted);">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px auto;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <h4 style="color: var(--text-primary); margin-bottom: 8px;">Your cart is empty</h4>
              <p style="font-size: 0.85rem;">Explore our tactical smartwatches to gear up.</p>
            </div>
          `;
        } else {
          listEl.innerHTML = this.items.map((item, idx) => `
            <div class="cart-drawer-item" style="display: flex; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
              <img
                src="${item.image.includes('/') ? item.image : (window.ShopifyThemeAssets ? window.ShopifyThemeAssets[item.image] : item.image)}"
                alt="${item.title}"
                style="width: 72px; height: 72px; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"
                onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'"
              >
              <div style="flex: 1;">
                <h4 style="font-size: 0.92rem; margin-bottom: 4px; font-weight: 600; color: var(--text-primary); line-height: 1.3;">
                  ${item.title}
                </h4>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px;">${item.variant}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                  <div style="display: flex; align-items: center; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); background: rgba(255,255,255,0.04);">
                    <button type="button" style="padding: 4px 10px; color: var(--text-secondary);" onclick="KinetixCart.updateQty(${idx}, -1)">-</button>
                    <span style="font-size: 0.85rem; font-weight: 700; padding: 0 6px;">${item.qty}</span>
                    <button type="button" style="padding: 4px 10px; color: var(--text-secondary);" onclick="KinetixCart.updateQty(${idx}, 1)">+</button>
                  </div>
                  <span style="font-weight: 700; color: var(--accent-gold); font-size: 0.95rem;">$${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            </div>
          `).join('');
        }
      }
    }
  };

  // Global Theme Object
  window.KinetixTheme = {
    init() {
      this.initStickyHeader();
      this.initCartDrawer();
      this.initMobileNav();
      this.initQuickView();
      this.initAccordions();
      this.initQuickAddButtons();
      window.KinetixCart.render();
    },

    // 1. Sticky & Reactive Header
    initStickyHeader() {
      const header = document.querySelector('.site-header');
      if (!header) return;

      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }, { passive: true });
    },

    // 2. Slide-out AJAX Cart Drawer
    initCartDrawer() {
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-drawer-overlay');
      const openBtns = document.querySelectorAll('[data-cart-drawer-toggle]');
      const closeBtns = document.querySelectorAll('[data-cart-drawer-close]');

      const openDrawer = () => {
        if (drawer) drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      };

      const closeDrawer = () => {
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      };

      openBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      }));

      closeBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      }));

      if (overlay) {
        overlay.addEventListener('click', closeDrawer);
      }

      this.openCart = openDrawer;
      this.closeCart = closeDrawer;
    },

    // 3. Mobile Navigation
    initMobileNav() {
      const toggle = document.querySelector('.mobile-nav-toggle');
      const nav = document.querySelector('.mobile-nav-drawer');
      const closeBtn = document.querySelector('.mobile-nav-close');

      if (!toggle || !nav) return;

      toggle.addEventListener('click', () => {
        nav.style.left = '0';
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          nav.style.left = '-100%';
        });
      }
    },

    // 4. Quick View Modal
    initQuickView() {
      const modal = document.getElementById('quick-view-modal-container');
      if (!modal) return;

      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-quick-view]');
        if (!btn) return;

        e.preventDefault();
        const handle = btn.getAttribute('data-product-handle') || 'kinetix-apex-pro';
        this.openQuickViewModal(handle);
      });
    },

    openQuickViewModal(handle) {
      const modal = document.getElementById('quick-view-modal-container');
      if (!modal) return;

      const product = KINETIX_CATALOG[handle] || KINETIX_CATALOG['kinetix-apex-pro'];
      const imgSrc = window.ShopifyThemeAssets ? window.ShopifyThemeAssets[product.image] : product.image;

      modal.innerHTML = `
        <div class="quick-view-modal__dialog">
          <button type="button" class="btn-icon quick-view-modal__close" onclick="document.getElementById('quick-view-modal-container').classList.add('hidden')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 32px; padding: 36px;" class="quick-view-grid">
            <div>
              <img src="${imgSrc}" style="width:100%; border-radius:14px; object-fit:cover; height:380px; box-shadow:0 15px 35px rgba(0,0,0,0.5);" alt="${product.title}">
            </div>
            <div style="display:flex; flex-direction:column; justify-content:center;">
              <span class="badge badge-sale" style="width:fit-content; margin-bottom:12px;">${product.badge}</span>
              <div style="font-size:0.8rem; color:var(--accent-gold); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">${product.vendor}</div>
              <h2 style="font-size:1.6rem; margin-bottom:10px; line-height:1.2;">${product.title}</h2>
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                <span style="font-size:1.5rem; font-weight:800; color:var(--accent-gold);">${product.price}</span>
                <span style="text-decoration:line-through; color:var(--text-muted); font-size:1.1rem;">${product.compare_at_price}</span>
              </div>
              <p style="margin-bottom:24px; font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">${product.description}</p>
              
              <div style="display:flex; gap:12px;">
                <button type="button" class="btn btn-primary btn-lg" style="flex-grow:1;" onclick="KinetixCart.addItem('${handle}', '${product.title}', '${product.price.replace('$', '')}', '${product.image}'); document.getElementById('quick-view-modal-container').classList.add('hidden');">
                  Add to Cart
                </button>
                <a href="/products/${handle}" class="btn btn-secondary btn-lg">View Full Page</a>
              </div>
            </div>
          </div>
        </div>
      `;
      modal.classList.remove('hidden');
    },

    // 5. Accordion System
    initAccordions() {
      document.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const item = header.closest('.accordion-item');
        if (!item) return;

        const group = item.closest('.accordion-group') || item.parentElement;
        const isActive = item.classList.contains('active');

        if (group) {
          group.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
        }

        if (!isActive) {
          item.classList.add('active');
        }
      });
    },

    // 6. Quick Add AJAX
    initQuickAddButtons() {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-quick-add-btn]');
        if (!btn) return;

        e.preventDefault();
        const title = btn.getAttribute('data-product-title') || 'Kinetix Apex Pro Smartwatch';
        const price = btn.getAttribute('data-product-price') || '249.00';
        const card = btn.closest('.product-card');
        const handle = card ? card.getAttribute('data-product-handle') : 'kinetix-apex-pro';
        const img = card ? card.querySelector('img').src : 'watch-apex-pro.jpg';

        window.KinetixCart.addItem(handle, title, price, img);
      });
    },

    // 7. Toast Notifications
    showToast(message) {
      let container = document.getElementById('toast-notification-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-notification-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${message}</span>
      `;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }
  };

  // Auto initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.KinetixTheme.init());
  } else {
    window.KinetixTheme.init();
  }
})();
