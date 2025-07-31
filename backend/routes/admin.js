const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminController = require("../controllers/adminController");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Middleware to verify admin using x-user-id header
router.use(adminController.verifyAdminByUserIdHeader);

// Upload route
router.post("/upload", upload.single("image"), adminController.upload);

// Delete route
router.delete("/delete/:id", adminController.delete);

// Update price route
router.put("/update-price/:id", adminController.updatePrice);

module.exports = router;
