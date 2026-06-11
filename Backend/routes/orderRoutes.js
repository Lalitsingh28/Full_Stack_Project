const express = require("express");
const {protect} = require("../middleware/authMiddleware.js");
const {admin} = require("../middleware/adminMiddleware.js");
const { createOrder, getOrders, getOrdersByUser, updateOrderStatus } = require("../controllers/orderController.js");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, admin, getOrders);
router.get("/userorders", protect, getOrdersByUser);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;