const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Gmail ayarları
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

// ✅ REGISTER
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password, is_admin) VALUES ($1, $2, false) RETURNING id, email, is_admin",
      [email, hashed]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "Kayıt başarısız" });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) return res.status(401).json({ error: "Kullanıcı bulunamadı" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Şifre hatalı" });

  const token = jwt.sign({ id: user.id, isAdmin: user.is_admin }, process.env.SESSION_SECRET, { expiresIn: "1d" });
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      isAdmin: user.is_admin
    }
  });
};

// ✅ ŞİFRE SIFIRLAMA
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

  const temporaryPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

  await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email]);

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Yeni Şifren",
    text: `Yeni geçici şifren: ${temporaryPassword}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "E-posta gönderilemedi" });
    } else {
      res.json({ message: "Yeni şifren e-posta ile gönderildi" });
    }
  });
};
