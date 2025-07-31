const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
  res.json(result.rows);
});

// POST new product (admin only)
router.post('/', async (req, res) => {
  const { name, description, size, price, image, category } = req.body;

  if (req.headers['x-user-id'] !== '2') {
    return res.status(403).json({ error: 'Yetkisiz' });
  }

  const result = await pool.query(
    'INSERT INTO products (name, description, size, price, image, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, description, size, price, image, category || 'store']
  );
  res.json(result.rows[0]);
});

// DELETE product by id (admin only)
router.delete('/:id', async (req, res) => {
  if (req.headers['x-user-id'] !== '2') {
    return res.status(403).json({ error: 'Yetkisiz' });
  }
  const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
  res.json(result.rows[0]);
});

// UPDATE price (admin only)
router.put('/:id/price', async (req, res) => {
  const { price } = req.body;

  if (req.headers['x-user-id'] !== '2') {
    return res.status(403).json({ error: 'Yetkisiz' });
  }

  const result = await pool.query('UPDATE products SET price = $1 WHERE id = $2 RETURNING *', [price, req.params.id]);
  res.json(result.rows[0]);
});

module.exports = router;
