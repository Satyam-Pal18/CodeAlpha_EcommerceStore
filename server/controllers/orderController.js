const { dbRun, dbGet, dbAll } = require('../config/db');

// Create New Order
exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item.' });
    }

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.email || !shippingAddress.address || !shippingAddress.city || !shippingAddress.zip) {
      return res.status(400).json({ success: false, message: 'Please provide all required shipping details.' });
    }

    let calculatedTotal = 0;
    const validatedItems = [];

    // Validate products & stock
    for (const item of items) {
      const product = await dbGet('SELECT * FROM products WHERE id = ?', [item.productId]);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product with ID ${item.productId} not found.` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for '${product.name}'. Only ${product.stock} left.`
        });
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;

      validatedItems.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });
    }

    // Insert Order
    const orderResult = await dbRun(
      `INSERT INTO orders (user_id, total_amount, status, shipping_name, shipping_email, shipping_address, shipping_city, shipping_zip, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        calculatedTotal.toFixed(2),
        'Processing',
        shippingAddress.name.trim(),
        shippingAddress.email.trim(),
        shippingAddress.address.trim(),
        shippingAddress.city.trim(),
        shippingAddress.zip.trim(),
        paymentMethod || 'Credit Card'
      ]
    );

    const orderId = orderResult.insertId || orderResult.lastID;

    // Insert Order Items & update product stock
    for (const item of validatedItems) {
      await dbRun(
        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity, image)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.productId, item.productName, item.price, item.quantity, item.image]
      );

      // Decrement stock
      await dbRun(
        `UPDATE products SET stock = stock - ? WHERE id = ?`,
        [item.quantity, item.productId]
      );
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId,
      totalAmount: calculatedTotal.toFixed(2),
      status: 'Processing'
    });
  } catch (error) {
    next(error);
  }
};

// Get User Orders
exports.getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await dbAll(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    // Fetch items for each order
    for (const order of orders) {
      const items = await dbAll(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.id]
      );
      order.items = items;
    }

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// Get Order Details by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await dbGet(
      `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const items = await dbAll(`SELECT * FROM order_items WHERE order_id = ?`, [order.id]);
    order.items = items;

    res.json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};
