const productsData = [
  {
    name: "Aura Pro Wireless Noise-Canceling Headphones",
    category: "Audio",
    price: 249.99,
    original_price: 299.99,
    rating: 4.8,
    review_count: 142,
    stock: 35,
    description: "Experience serene audio with active noise cancellation, 40-hour battery life, and spatial surround audio drivers tuned for audiophiles.",
    features: "Active Noise Cancellation (ANC), 40h Battery, Bluetooth 5.3, Multipoint Connection, Memory Foam Earcups",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    is_featured: 1
  },
  {
    name: "Chronos Ultra Smartwatch Series 7",
    category: "Wearables",
    price: 199.50,
    original_price: 249.00,
    rating: 4.7,
    review_count: 98,
    stock: 20,
    description: "Stay ahead with real-time health tracking, crisp AMOLED display, GPS navigation, and 7-day battery life in a sleek titanium frame.",
    features: "AMOLED Display, Heart Rate & SpO2 Sensor, Dual-Frequency GPS, 5ATM Water Resistance, Sleep Analytics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    is_featured: 1
  },
  {
    name: "Lumina 4K Ultra Slim Ergonomic Monitor",
    category: "Electronics",
    price: 429.00,
    original_price: 499.00,
    rating: 4.9,
    review_count: 67,
    stock: 15,
    description: "Transform your workspace with IPS color precision, 144Hz refresh rate, USB-C 90W power delivery, and ultra-thin bezel design.",
    features: "27-inch 4K UHD IPS, 144Hz, HDR400, USB-C Hub, Height-Adjustable Stand",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    is_featured: 1
  },
  {
    name: "Minimalist Leather Laptop Backpack",
    category: "Accessories",
    price: 89.99,
    original_price: 119.99,
    rating: 4.6,
    review_count: 53,
    stock: 40,
    description: "Handcrafted full-grain leather backpack featuring padded 16-inch laptop sleeve, water-resistant lining, and anti-theft secret pocket.",
    features: "Full-Grain Leather, Padded 16\" Sleeve, Water-Resistant, Ergonomic Straps",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    is_featured: 1
  },
  {
    name: "Vibe Pods True Wireless Earbuds",
    category: "Audio",
    price: 79.99,
    original_price: 99.99,
    rating: 4.5,
    review_count: 210,
    stock: 60,
    description: "Compact true wireless earbuds delivering deep bass, IPX7 sweat resistance, wireless charging case, and clear beamforming microphones.",
    features: "Touch Controls, Wireless Charging Case, IPX7 Waterproof, 30h Combined Playtime",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    is_featured: 0
  },
  {
    name: "Apex Mechanical Gaming Keyboard RGB",
    category: "Electronics",
    price: 129.00,
    original_price: 159.00,
    rating: 4.8,
    review_count: 114,
    stock: 25,
    description: "Hot-swappable mechanical keyboard with pre-lubed linear switches, per-key RGB backlight, and durable PBT double-shot keycaps.",
    features: "Hot-Swappable Switches, PBT Keycaps, Per-Key RGB, Detachable Type-C Cable, Aluminum Frame",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    is_featured: 0
  },
  {
    name: "Horizon Smart Home Security Camera 2K",
    category: "Smart Home",
    price: 59.99,
    original_price: 79.99,
    rating: 4.4,
    review_count: 89,
    stock: 45,
    description: "Keep your home safe with 360-degree pan-tilt rotation, infrared night vision, AI human recognition, and cloud/SD card storage options.",
    features: "2K Quad HD, 360° Vision, AI Motion Detection, Two-Way Audio, Night Vision",
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=800&q=80",
    is_featured: 0
  },
  {
    name: "ErgoDesk Precision Wireless Mouse",
    category: "Electronics",
    price: 49.99,
    original_price: 64.99,
    rating: 4.7,
    review_count: 176,
    stock: 50,
    description: "Redefine productivity with thumb scroll wheel, silent click switches, multi-device Bluetooth switching, and fast USB-C charging.",
    features: "Ergonomic 57° Angle, Multi-Device Flow, Silent Clicks, 70-Day Rechargeable Battery",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    is_featured: 0
  },
  {
    name: "Nova Ambient Desk Lamp with Qi Charger",
    category: "Smart Home",
    price: 69.95,
    original_price: 89.95,
    rating: 4.6,
    review_count: 42,
    stock: 30,
    description: "Sleek architectural LED desk lamp with adjustable color temperatures, smooth dimming touch slider, and built-in 15W wireless fast charger.",
    features: "15W Wireless Charging, 5 Color Modes, Auto-Off Timer, Touch Control Slider",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    is_featured: 1
  },
  {
    name: "Urban Carry Canvas & Leather Duffle Bag",
    category: "Accessories",
    price: 109.00,
    original_price: 139.00,
    rating: 4.8,
    review_count: 31,
    stock: 18,
    description: "Heavy-duty waxed canvas duffle bag ideal for weekend getaways or gym sessions, featuring dedicated shoe compartment.",
    features: "Waterproof Waxed Canvas, Genuine Leather Accents, Separate Shoe Bag, Carry-on Size",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
    is_featured: 0
  }
];

const seedProducts = async (dbRun) => {
  console.log("Seeding initial products into SQLite database...");
  for (const item of productsData) {
    await dbRun(
      `INSERT INTO products (name, category, price, original_price, rating, review_count, stock, description, features, image, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.name,
        item.category,
        item.price,
        item.original_price,
        item.rating,
        item.review_count,
        item.stock,
        item.description,
        item.features,
        item.image,
        item.is_featured
      ]
    );
  }
  console.log(`${productsData.length} products seeded successfully.`);
};

module.exports = seedProducts;
