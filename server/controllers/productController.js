const { dbAll, dbGet } = require('../config/db');

// Get All Products (with filtering, searching, sorting)
exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, search, sort, featured } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search && search.trim() !== '') {
      query += ' AND (name LIKE ? OR description LIKE ? OR features LIKE ?)';
      const searchTerm = `%${search.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (featured === 'true' || featured === '1') {
      query += ' AND is_featured = 1';
    }

    // Sorting
    if (sort === 'price-asc') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price-desc') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'rating') {
      query += ' ORDER BY rating DESC';
    } else {
      query += ' ORDER BY created_at DESC';
    }

    const products = await dbAll(query, params);
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await dbGet('SELECT * FROM products WHERE id = ?', [id]);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// Get Product Categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await dbAll(`
      SELECT category as name, COUNT(*) as count 
      FROM products 
      GROUP BY category 
      ORDER BY count DESC
    `);
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    next(error);
  }
};

// Get Featured Products
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await dbAll('SELECT * FROM products WHERE is_featured = 1 LIMIT 4');
    res.json({
      success: true,
      products
    });
  } catch (error) {
    next(error);
  }
};
