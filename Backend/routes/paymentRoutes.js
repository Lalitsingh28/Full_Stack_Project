const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const { createRazorpayOrder, verifyPayment } = require("../controllers/paymentController.js");

router.post("/order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);

module.exports = router;
