const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/auth");
const stripeRoutes = require("./routes/stripe");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 🔽 img klasörünü statik sun (backend/img → http://localhost:5050/img)
app.use('/img', express.static(path.join(__dirname, 'img')));

app.use("/api/auth", authRoutes);
app.use("/api/payment", stripeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend çalışıyor: http://localhost:${PORT}`);
});
