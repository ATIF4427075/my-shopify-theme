/**
 * KINETIX PRO - Admin Control Panel Controller
 * Handles Navigation Tabs, Product CRUD, Live Order Status Updates, Customer Directory, and Settings
 */

(function () {
  'use strict';

  window.initAdmin = function () {
    initTabs();
    renderDashboard();
    renderProducts();
    renderOrders();
    renderCustomers();
    loadSettingsIntoForms();
  };

  // 1. Tab Switcher
  function initTabs() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        switchAdminTab(tab);
      });
    });
  }

  window.switchAdminTab = function (tabId) {
    document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

    const activeNav = document.querySelector(`.admin-nav-item[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(`tab-${tabId}`);
    const pageTitle = document.getElementById('admin-page-title');

    if (activeNav) activeNav.classList.add('active');
    if (activeContent) activeContent.classList.add('active');

    const titles = {
      'dashboard': 'Dashboard Overview',
      'products': 'Watch Catalog Management',
      'orders': 'Orders & Fulfillment Telemetry',
      'customers': 'Customer Directory',
      'payments': 'Payment Methods & Gateway Settings',
      'whatsapp': 'WhatsApp Integration Settings',
      'seo': 'SEO & Google Indexing'
    };
    if (pageTitle && titles[tabId]) {
      pageTitle.textContent = titles[tabId];
    }
  };

  // 2. Dashboard KPIs & Recent Orders
  function renderDashboard() {
    const orders = StoreDB.getOrders();
    const products = StoreDB.getProducts();
    const settings = StoreDB.getSettings();

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const kpiRevenue = document.getElementById('kpi-revenue');
    const kpiOrders = document.getElementById('kpi-orders');
    const kpiProducts = document.getElementById('kpi-products');
    const kpiWa = document.getElementById('kpi-wa-number');

    if (kpiRevenue) kpiRevenue.textContent = `$${totalRevenue.toFixed(2)}`;
    if (kpiOrders) kpiOrders.textContent = `${orders.length} Orders`;
    if (kpiProducts) kpiProducts.textContent = `${products.length} Models`;
    if (kpiWa) kpiWa.textContent = settings.whatsappNumber || '+923001234567';

    // Render Recent Orders Table
    const tbody = document.getElementById('dashboard-recent-orders-tbody');
    if (tbody) {
      if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">No orders placed yet.</td></tr>';
      } else {
        tbody.innerHTML = orders.slice(0, 5).map(o => `
          <tr>
            <td style="font-weight:700; color:var(--accent-gold); font-family:monospace;">${o.orderId}</td>
            <td><strong>${o.customerName}</strong></td>
            <td>${o.customerPhone}<br><small style="color:var(--text-muted);">${o.city}, ${o.country}</small></td>
            <td>${o.items.map(i => `${i.title} (x${i.qty})`).join(', ')}</td>
            <td style="font-weight:700; color:var(--text-primary);">$${o.totalAmount.toFixed(2)}</td>
            <td><span class="badge ${o.paymentMethod.includes('COD') ? 'badge-new' : 'badge-featured'}">${o.paymentMethod.includes('COD') ? 'COD' : 'Online'}</span></td>
            <td><span style="color:#10b981; font-weight:600;">${o.status}</span></td>
          </tr>
        `).join('');
      }
    }
  }

  // 3. Products Management (CRUD)
  window.renderProducts = function () {
    const products = StoreDB.getProducts();
    const tbody = document.getElementById('admin-products-tbody');
    if (!tbody) return;

    tbody.innerHTML = products.map(p => `
      <tr>
        <td style="display:flex; align-items:center; gap:14px;">
          <img src="${p.image}" style="width:48px; height:48px; border-radius:8px; object-fit:cover; border:1px solid var(--border-subtle);" onerror="this.src='assets/watch-apex-pro.jpg'">
          <div>
            <div style="font-weight:700; color:var(--text-primary); font-size:0.95rem;">${p.title}</div>
            <div style="font-size:0.78rem; color:var(--text-muted); font-family:monospace;">ID: ${p.id}</div>
          </div>
        </td>
        <td><span class="badge" style="background:rgba(255,255,255,0.06);">${p.categoryName || p.category}</span></td>
        <td style="font-weight:700; color:var(--accent-gold);">$${p.price.toFixed(2)} ${p.comparePrice ? `<del style="color:var(--text-muted); font-size:0.8rem; margin-left:4px;">$${p.comparePrice.toFixed(2)}</del>` : ''}</td>
        <td><span style="color:${p.stock > 5 ? '#10b981' : '#fb7185'}; font-weight:700;">${p.stock} units</span></td>
        <td><span class="badge badge-sale">${p.badge || 'PRO'}</span></td>
        <td>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn btn-outline btn-sm" onclick="editProductModal('${p.id}')">Edit</button>
            <button type="button" class="btn btn-outline btn-sm" style="color:#fb7185; border-color:rgba(244,63,94,0.3);" onclick="deleteProductConfirm('${p.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  // Modal Open / Close
  window.openAddProductModal = function () {
    document.getElementById('modal-title').textContent = 'Add New Smartwatch';
    document.getElementById('modal-product-id').value = '';
    document.getElementById('modal-title-input').value = '';
    document.getElementById('modal-price-input').value = '';
    document.getElementById('modal-compare-input').value = '';
    document.getElementById('modal-stock-input').value = '15';
    document.getElementById('modal-badge-input').value = 'NEW ARRIVAL';
    document.getElementById('modal-image-input').value = 'assets/watch-apex-pro.jpg';
    document.getElementById('modal-desc-input').value = 'Crafted with Grade-5 titanium chassis, sapphire crystal, and BioPulse™ sensor matrix.';
    document.getElementById('product-modal').classList.remove('hidden');
  };

  window.editProductModal = function (productId) {
    const products = StoreDB.getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modal-title').textContent = 'Edit Watch: ' + product.title;
    document.getElementById('modal-product-id').value = product.id;
    document.getElementById('modal-title-input').value = product.title;
    document.getElementById('modal-price-input').value = product.price;
    document.getElementById('modal-compare-input').value = product.comparePrice || '';
    document.getElementById('modal-stock-input').value = product.stock;
    document.getElementById('modal-badge-input').value = product.badge || 'PRO';
    document.getElementById('modal-category-input').value = product.category || 'tactical-titanium';
    document.getElementById('modal-image-input').value = product.image;
    document.getElementById('modal-desc-input').value = product.description;

    document.getElementById('product-modal').classList.remove('hidden');
  };

  window.closeProductModal = function () {
    document.getElementById('product-modal').classList.add('hidden');
  };

  window.handleProductFormSubmit = function () {
    const id = document.getElementById('modal-product-id').value;
    const title = document.getElementById('modal-title-input').value;
    const category = document.getElementById('modal-category-input').value;
    const price = parseFloat(document.getElementById('modal-price-input').value);
    const comparePrice = parseFloat(document.getElementById('modal-compare-input').value) || 0;
    const stock = parseInt(document.getElementById('modal-stock-input').value, 10) || 10;
    const badge = document.getElementById('modal-badge-input').value;
    const image = document.getElementById('modal-image-input').value;
    const description = document.getElementById('modal-desc-input').value;

    const categoryNames = {
      'tactical-titanium': 'Apex Titanium Series',
      'military-rugged': 'Military Tactical Rugged',
      'luxury-chronograph': 'Luxury Chronograph',
      'fitness-health': 'BioTelemetry Fitness ECG'
    };

    if (id) {
      StoreDB.updateProduct(id, {
        title, category, categoryName: categoryNames[category], price, comparePrice, stock, badge, image, description
      });
      showAdminToast('✓ Watch model updated successfully!');
    } else {
      StoreDB.addProduct({
        title, category, categoryName: categoryNames[category], price, comparePrice, stock, badge, image, description
      });
      showAdminToast('🎉 New watch added to store catalog!');
    }

    closeProductModal();
    renderProducts();
    renderDashboard();
  };

  window.deleteProductConfirm = function (id) {
    if (confirm('Are you sure you want to remove this watch model from the catalog?')) {
      StoreDB.deleteProduct(id);
      showAdminToast('Watch model deleted.');
      renderProducts();
      renderDashboard();
    }
  };

  // 4. Orders Management & Status Updates
  window.renderOrders = function () {
    const orders = StoreDB.getOrders();
    const tbody = document.getElementById('admin-orders-tbody');
    if (!tbody) return;

    if (orders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; color:var(--text-muted); padding:32px;">No orders found.</td></tr>';
      return;
    }

    tbody.innerHTML = orders.map(o => `
      <tr>
        <td style="font-weight:700; color:var(--accent-gold); font-family:monospace;">${o.orderId}</td>
        <td style="color:var(--text-muted);">${o.date}</td>
        <td><strong>${o.customerName}</strong><br><small style="color:var(--text-muted);">${o.customerEmail}</small></td>
        <td>${o.customerPhone}</td>
        <td><small>${o.address}, ${o.city}</small></td>
        <td style="font-weight:700; color:var(--text-primary);">$${o.totalAmount.toFixed(2)}</td>
        <td><span class="badge ${o.paymentMethod.includes('COD') ? 'badge-new' : 'badge-featured'}">${o.paymentMethod.includes('COD') ? 'COD' : 'Card'}</span></td>
        <td>
          <select class="form-select" style="padding:6px 10px; font-size:0.82rem;" onchange="handleOrderStatusChange('${o.orderId}', this.value)">
            <option value="Order Placed & Verified" ${o.status.includes('Placed') ? 'selected' : ''}>Order Placed & Verified</option>
            <option value="Quality Tested & Cleanroom Packed" ${o.status.includes('Packed') ? 'selected' : ''}>Quality Tested & Cleanroom Packed</option>
            <option value="Dispatched via Air Courier" ${o.status.includes('Dispatched') ? 'selected' : ''}>Dispatched via Air Courier</option>
            <option value="In Transit (DHL / FedEx Express)" ${o.status.includes('Transit') ? 'selected' : ''}>In Transit (Air Express)</option>
            <option value="Delivered Successfully" ${o.status.includes('Delivered') ? 'selected' : ''}>Delivered Successfully</option>
          </select>
        </td>
        <td>
          <button type="button" class="btn btn-outline btn-sm" onclick="alert('Order ID: ${o.orderId}\\nCustomer: ${o.customerName}\\nItems:\\n' + JSON.stringify(${JSON.stringify(o.items)}, null, 2))">Details</button>
        </td>
      </tr>
    `).join('');
  };

  window.handleOrderStatusChange = function (orderId, newStatus) {
    StoreDB.updateOrderStatus(orderId, newStatus);
    showAdminToast(`✓ Order ${orderId} updated to "${newStatus}"! Live tracking updated.`);
    renderDashboard();
  };

  // 5. Customers Directory
  function renderCustomers() {
    const orders = StoreDB.getOrders();
    const tbody = document.getElementById('admin-customers-tbody');
    if (!tbody) return;

    // Deduplicate customers by email/phone
    const customerMap = {};
    orders.forEach(o => {
      const key = o.customerEmail || o.customerPhone;
      if (!customerMap[key]) {
        customerMap[key] = {
          name: o.customerName,
          email: o.customerEmail,
          phone: o.customerPhone,
          city: o.city + ', ' + o.country,
          ordersCount: 1,
          totalSpent: o.totalAmount
        };
      } else {
        customerMap[key].ordersCount += 1;
        customerMap[key].totalSpent += o.totalAmount;
      }
    });

    const customers = Object.values(customerMap);
    if (customers.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:24px;">No customer records.</td></tr>';
      return;
    }

    tbody.innerHTML = customers.map(c => `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.city}</td>
        <td><span class="badge badge-new">${c.ordersCount} Orders ($${c.totalSpent.toFixed(2)})</span></td>
      </tr>
    `).join('');
  }

  // 6. Settings Handlers
  function loadSettingsIntoForms() {
    const s = StoreDB.getSettings();
    if (document.getElementById('setting-cod-toggle')) document.getElementById('setting-cod-toggle').checked = s.codEnabled;
    if (document.getElementById('setting-online-toggle')) document.getElementById('setting-online-toggle').checked = s.onlinePaymentEnabled;
    if (document.getElementById('setting-bank-details')) document.getElementById('setting-bank-details').value = s.bankDetails || '';
    if (document.getElementById('setting-free-shipping')) document.getElementById('setting-free-shipping').value = s.freeShippingThreshold || 150;
    if (document.getElementById('setting-wa-number')) document.getElementById('setting-wa-number').value = s.whatsappNumber || '+923001234567';
    if (document.getElementById('setting-wa-message')) document.getElementById('setting-wa-message').value = s.whatsappMessage || '';
    if (document.getElementById('setting-seo-title')) document.getElementById('setting-seo-title').value = s.metaTitle || '';
    if (document.getElementById('setting-seo-desc')) document.getElementById('setting-seo-desc').value = s.metaDescription || '';
  }

  window.savePaymentSettings = function () {
    const s = StoreDB.getSettings();
    s.codEnabled = document.getElementById('setting-cod-toggle').checked;
    s.onlinePaymentEnabled = document.getElementById('setting-online-toggle').checked;
    s.bankDetails = document.getElementById('setting-bank-details').value;
    s.freeShippingThreshold = parseFloat(document.getElementById('setting-free-shipping').value) || 150;
    StoreDB.saveSettings(s);
    showAdminToast('✓ Payment methods and COD settings saved!');
  };

  window.saveWhatsAppSettings = function () {
    const s = StoreDB.getSettings();
    s.whatsappNumber = document.getElementById('setting-wa-number').value;
    s.whatsappMessage = document.getElementById('setting-wa-message').value;
    StoreDB.saveSettings(s);
    showAdminToast('✓ WhatsApp business integration updated!');
    renderDashboard();
  };

  window.saveSEOSettings = function () {
    const s = StoreDB.getSettings();
    s.metaTitle = document.getElementById('setting-seo-title').value;
    s.metaDescription = document.getElementById('setting-seo-desc').value;
    StoreDB.saveSettings(s);
    showAdminToast('✓ SEO & Google Indexing metadata saved!');
  };

  function showAdminToast(msg) {
    let container = document.getElementById('toast-notification-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
  } else {
    initAdmin();
  }
})();
