const pool = require("../db");
const jwt = require("jsonwebtoken");

// Middleware to verify admin token
exports.verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    if (!decoded.isAdmin || decoded.id !== 2) {
      return res.status(403).json({ error: "Admin access required" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

/**
 * Middleware to verify admin by x-user-id header.
 * Fix: Normalize header key to lowercase to ensure consistent access.
 * Add logging and user existence check.
 */
exports.verifyAdminByUserIdHeader = async (req, res, next) => {
  // Normalize headers keys to lowercase for consistent access
  const headers = {};
  for (const key in req.headers) {
    headers[key.toLowerCase()] = req.headers[key];
  }
  console.log("Received headers in verifyAdminByUserIdHeader:", headers);
  const userId = headers["x-user-id"];
  if (!userId) {
    return res.status(401).json({ error: "No user ID provided" });
  }
  try {
    const result = await pool.query("SELECT id, is_admin FROM users WHERE id = $1", [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!result.rows[0].is_admin) {
      return res.status(403).json({ error: "Yetkisiz erişim" });
    }
    console.log(`User ${userId} is admin, access granted.`);
    next();
  } catch (err) {
    console.error("Database error in verifyAdminByUserIdHeader:", err);
    return res.status(500).json({ error: "Database error", detail: err.message });
  }
};

// Upload handler (example: add product)
exports.upload = async (req, res) => {
  const { name, description, size, price } = req.body;
  const image = req.file ? req.file.filename : null; // Assuming file upload middleware

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO products (name, description, size, price, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, size, price, image]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error", detail: err.message });
  }
};

// Delete handler (example: delete product by id)
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error", detail: err.message });
  }
};

// Update price handler (example: update product price by id)
exports.updatePrice = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  if (!price) {
    return res.status(400).json({ error: "Price is required" });
  }
  try {
    const result = await pool.query(
      "UPDATE products SET price = $1 WHERE id = $2 RETURNING *",
      [price, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error", detail: err.message });
  }
};
