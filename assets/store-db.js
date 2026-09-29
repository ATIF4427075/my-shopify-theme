/**
 * KINETIX PRO - Centralized Store Database & State Engine
 * Manages Dynamic Products (CRUD), Orders, Tracking, Cart, Auth & Store Settings with LocalStorage persistence.
 */

(function () {
  'use strict';

  const DEFAULT_PRODUCTS = [
    {
      id: 'KP-001',
      handle: 'kinetix-apex-pro',
      title: 'Kinetix Apex Pro Titanium Smartwatch',
      category: 'tactical-titanium',
      categoryName: 'Apex Titanium Series',
      price: 249.00,
      comparePrice: 329.00,
      stock: 14,
      image: 'assets/watch-apex-pro.jpg',
      badge: 'APEX TECH',
      rating: 4.98,
      reviewsCount: 842,
      specs: {
        material: 'Aerospace Grade 5 Titanium (Ti-6Al-4V)',
        waterRating: '10 ATM (100 Meters / 330 Ft Submersible)',
        battery: '45 Days Eco / 18 Days Heavy Usage',
        gps: 'Dual-Frequency L1+L5 (6 Satellite Constellations)',
        sensors: 'BioPulse™ 8-Channel Optical Photodiode Matrix, ECG & SpO2',
        glass: 'Synthetic Sapphire Crystal (9H Mohs Hardness)'
      },
      description: 'The pinnacle of tactical luxury horology. CNC-machined from solid aerospace Grade 5 titanium, equipped with synthetic sapphire crystal, dual-frequency L1+L5 multi-satellite navigation, and 100-meter oceanic waterproof certification.'
    },
    {
      id: 'KP-002',
      handle: 'kinetix-thrux-military',
      title: 'Kinetix Thrux Rugged Military GPS (170 Sports Modes)',
      category: 'military-rugged',
      categoryName: 'Tactical Military',
      price: 189.00,
      comparePrice: 249.00,
      stock: 22,
      image: 'assets/watch-thrux-military.jpg',
      badge: 'MIL-SPEC 810H',
      rating: 4.95,
      reviewsCount: 620,
      specs: {
        material: 'Reinforced Polycarbonate + 316L Stainless Steel Bezel',
        waterRating: '5 ATM (50 Meters Hydrostatic)',
        battery: '30 Days Extreme Endurance',
        gps: 'Multi-GNSS Precision Tracking & Offline Topo Maps',
        sensors: 'Barometric Altimeter, 3-Axis Compass & Storm Radar',
        glass: 'Corning Gorilla Glass Victus Shatterproof'
      },
      description: 'Engineered for tactical field operators and wilderness expeditions. Drop-tested to MIL-STD-810H military standards with 170+ sports telemetry modes, ballistic strap, and emergency storm alert system.'
    },
    {
      id: 'KP-003',
      handle: 'kinetix-heritage-royale',
      title: 'Heritage Royale Teal & Rose Gold Smart Chronograph',
      category: 'luxury-chronograph',
      categoryName: 'Luxury Chronograph',
      price: 299.00,
      comparePrice: 399.00,
      stock: 8,
      image: 'assets/watch-heritage-royale.jpg',
      badge: 'ROYALE LUXURY',
      rating: 5.00,
      reviewsCount: 419,
      specs: {
        material: '18K Rose Gold Ion-Plated 316L Steel Case',
        waterRating: '3 ATM Daily Splashproof',
        battery: '14 Days Smart Hybrid Battery',
        gps: 'Phone-Assisted Precision Assisted GPS',
        sensors: 'Hybrid Biometric Sensor & Real-time Subdial Telemetry',
        glass: 'Anti-Reflective Mineral Hardlex Domed Crystal'
      },
      description: 'Where 150 years of Swiss horology elegance meets modern smart technology. Featuring 18K rose gold ion plating, deep emerald teal sunray dial, dual smart chronograph subdials, and Italian top-grain stitched leather strap.'
    },
    {
      id: 'KP-004',
      handle: 'kinetix-pulse-elite',
      title: 'Kinetix Pulse Elite Curved OLED Fitness & ECG Tracker',
      category: 'fitness-health',
      categoryName: 'BioTelemetry Health',
      price: 149.00,
      comparePrice: 199.00,
      stock: 35,
      image: 'assets/watch-pulse-elite.jpg',
      badge: 'BIOPULSE 2.0',
      rating: 4.88,
      reviewsCount: 512,
      specs: {
        material: 'Ultra-Light Aero Aluminum Alloy (32g)',
        waterRating: '5 ATM Waterproof (Swim-Ready)',
        battery: '20 Days Smart Health Monitoring',
        gps: 'Integrated GPS & Step Pacing Telemetry',
        sensors: 'Clinical-Grade ECG Arrhythmia, SpO2 & Sleep Stage Tracker',
        glass: '3D Curved Borderless AMOLED Display'
      },
      description: 'Ultra-modern curved borderless OLED screen with 24/7 medical-grade ECG arrhythmia monitoring, continuous arterial oxygen (SpO2) tracking, HRV stress recovery metrics, and 20-day battery life.'
    }
  ];

  const DEFAULT_SETTINGS = {
    storeName: 'Kinetix Pro Smartwatches',
    whatsappNumber: '+923001234567',
    whatsappMessage: 'Hi Kinetix Pro, I would like to inquire about ordering a smartwatch.',
    contactEmail: 'support@kinetixpro-watches.com',
    contactPhone: '+1 (800) 456-8920',
    currency: '$',
    freeShippingThreshold: 150.00,
    codEnabled: true,
    onlinePaymentEnabled: true,
    bankDetails: 'Bank: Swiss Horology Federal Bank | Title: Kinetix Pro Global | Account: 0092-4820-9182',
    metaTitle: 'Kinetix Pro | Luxury & Military High-Tech Smartwatches',
    metaDescription: 'Official store of Kinetix Pro Smartwatches. Grade-5 Titanium, Dual-frequency GPS, Sapphire display, 10 ATM 100M Water Resistance, 2-Year Warranty.'
  };

  const DEFAULT_ORDERS = [
    {
      orderId: 'KP-84920',
      date: '2026-09-28',
      customerName: 'Marcus Vance',
      customerEmail: 'marcus.vance@example.com',
      customerPhone: '+1 (555) 382-9102',
      address: '742 Evergreen Terrace, Suite 400',
      city: 'Boulder',
      country: 'United States',
      items: [
        { title: 'Kinetix Apex Pro Titanium Smartwatch', qty: 1, price: 249.00 }
      ],
      totalAmount: 249.00,
      paymentMethod: 'Cash on Delivery (COD)',
      status: 'In Transit (DHL Express)',
      trackingNumber: 'DHL-84920-USA',
      steps: [
        { label: 'Order Placed & Verified', done: true, time: 'Sep 28, 09:30 AM' },
        { label: 'Quality Tested & Cleanroom Packed', done: true, time: 'Sep 28, 02:15 PM' },
        { label: 'Dispatched via Air Courier', done: true, time: 'Sep 29, 08:45 AM' },
        { label: 'In Transit to Regional Hub', done: true, time: 'Sep 29, 06:20 PM' },
        { label: 'Out for Final Delivery', done: false, time: 'Estimated Sep 30' }
      ]
    },
    {
      orderId: 'KP-73915',
      date: '2026-09-29',
      customerName: 'Dr. David Laurent',
      customerEmail: 'd.laurent@horology.ch',
      customerPhone: '+41 79 123 45 67',
      address: 'Rue du Rhône 42',
      city: 'Geneva',
      country: 'Switzerland',
      items: [
        { title: 'Heritage Royale Teal & Rose Gold Smart Chronograph', qty: 1, price: 299.00 }
      ],
      totalAmount: 299.00,
      paymentMethod: 'Credit / Debit Card (Online)',
      status: 'Quality Tested & Cleanroom Packed',
      trackingNumber: 'SWISS-73915-EXP',
      steps: [
        { label: 'Order Placed & Verified', done: true, time: 'Sep 29, 11:20 AM' },
        { label: 'Quality Tested & Cleanroom Packed', done: true, time: 'Sep 29, 04:00 PM' },
        { label: 'Dispatched via Air Courier', done: false, time: 'Pending Dispatch' },
        { label: 'In Transit to Regional Hub', done: false, time: 'Pending' },
        { label: 'Out for Final Delivery', done: false, time: 'Pending' }
      ]
    }
  ];

  window.StoreDB = {
    // 1. Products Management
    getProducts() {
      const stored = localStorage.getItem('kinetix_products');
      if (stored) {
        try { return JSON.parse(stored); } catch (e) { }
      }
      localStorage.setItem('kinetix_products', JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    },

    saveProducts(products) {
      localStorage.setItem('kinetix_products', JSON.stringify(products));
    },

    getProductByHandle(handle) {
      const products = this.getProducts();
      return products.find(p => p.handle === handle || p.id === handle) || products[0];
    },

    addProduct(productData) {
      const products = this.getProducts();
      const id = 'KP-' + String(products.length + 1).padStart(3, '0');
      const handle = (productData.title || 'custom-watch').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newProduct = {
        id: id,
        handle: handle,
        title: productData.title || 'New Smartwatch Model',
        category: productData.category || 'tactical-titanium',
        categoryName: productData.categoryName || 'Tactical Watches',
        price: parseFloat(productData.price) || 199.00,
        comparePrice: parseFloat(productData.comparePrice) || 249.00,
        stock: parseInt(productData.stock, 10) || 10,
        image: productData.image || 'assets/watch-apex-pro.jpg',
        badge: productData.badge || 'NEW ARRIVAL',
        rating: 5.0,
        reviewsCount: 1,
        specs: productData.specs || {
          material: 'Aerospace Grade 5 Titanium',
          waterRating: '10 ATM Waterproof',
          battery: '30 Days Runtime',
          gps: 'Precision Multi-GNSS',
          sensors: 'BioPulse Optical Photodiode Matrix',
          glass: 'Sapphire Crystal (9H)'
        },
        description: productData.description || 'Precision engineered smart instrument.'
      };
      products.unshift(newProduct);
      this.saveProducts(products);
      return newProduct;
    },

    updateProduct(id, updatedData) {
      const products = this.getProducts();
      const index = products.findIndex(p => p.id === id || p.handle === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        this.saveProducts(products);
        return products[index];
      }
      return null;
    },

    deleteProduct(id) {
      let products = this.getProducts();
      products = products.filter(p => p.id !== id && p.handle !== id);
      this.saveProducts(products);
    },

    // 2. Orders Management
    getOrders() {
      const stored = localStorage.getItem('kinetix_orders');
      if (stored) {
        try { return JSON.parse(stored); } catch (e) { }
      }
      localStorage.setItem('kinetix_orders', JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    },

    saveOrders(orders) {
      localStorage.setItem('kinetix_orders', JSON.stringify(orders));
    },

    createOrder(orderData) {
      const orders = this.getOrders();
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const orderId = 'KP-' + randomNum;
      const today = new Date().toISOString().split('T')[0];

      const newOrder = {
        orderId: orderId,
        date: today,
        customerName: orderData.customerName || 'Valued Customer',
        customerEmail: orderData.customerEmail || 'customer@example.com',
        customerPhone: orderData.customerPhone || '+1 000 000 0000',
        address: orderData.address || 'Delivery Address',
        city: orderData.city || 'City',
        country: orderData.country || 'Global',
        postalCode: orderData.postalCode || '00000',
        items: orderData.items || [],
        totalAmount: parseFloat(orderData.totalAmount) || 249.00,
        paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
        status: 'Order Placed & Verified',
        trackingNumber: 'EXP-' + randomNum + '-GLOBAL',
        steps: [
          { label: 'Order Placed & Verified', done: true, time: 'Just now' },
          { label: 'Quality Tested & Cleanroom Packed', done: false, time: 'Estimated within 6 hrs' },
          { label: 'Dispatched via Air Courier', done: false, time: 'Estimated tomorrow' },
          { label: 'In Transit to Regional Hub', done: false, time: 'Pending' },
          { label: 'Out for Final Delivery', done: false, time: 'Pending' }
        ]
      };

      orders.unshift(newOrder);
      this.saveOrders(orders);
      return newOrder;
    },

    updateOrderStatus(orderId, newStatus) {
      const orders = this.getOrders();
      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        order.status = newStatus;
        if (newStatus.toLowerCase().includes('pack')) {
          order.steps[1].done = true;
          order.steps[1].time = 'Completed';
        } else if (newStatus.toLowerCase().includes('dispatch')) {
          order.steps[1].done = true;
          order.steps[2].done = true;
          order.steps[2].time = 'Dispatched';
        } else if (newStatus.toLowerCase().includes('transit')) {
          order.steps[1].done = true;
          order.steps[2].done = true;
          order.steps[3].done = true;
          order.steps[3].time = 'In Transit';
        } else if (newStatus.toLowerCase().includes('deliver')) {
          order.steps.forEach(s => s.done = true);
        }
        this.saveOrders(orders);
        return order;
      }
      return null;
    },

    getOrderByTracking(query) {
      if (!query) return null;
      const cleanQ = query.trim().toUpperCase();
      const orders = this.getOrders();
      return orders.find(o => 
        o.orderId.toUpperCase() === cleanQ || 
        o.trackingNumber.toUpperCase() === cleanQ ||
        o.customerPhone.includes(cleanQ) ||
        o.customerEmail.toLowerCase() === query.trim().toLowerCase()
      );
    },

    // 3. Store Settings
    getSettings() {
      const stored = localStorage.getItem('kinetix_settings');
      if (stored) {
        try { return JSON.parse(stored); } catch (e) { }
      }
      localStorage.setItem('kinetix_settings', JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    },

    saveSettings(newSettings) {
      localStorage.setItem('kinetix_settings', JSON.stringify(newSettings));
    }
  };

  // Pre-seed storage if not exists
  StoreDB.getProducts();
  StoreDB.getOrders();
  StoreDB.getSettings();
})();
