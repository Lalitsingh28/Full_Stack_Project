const crypto = require("crypto");
const Order = require("../models/order.js");
const sendMail = require("../utils/sendEmail");

const verifyRazorpaySignature = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return generatedSignature === razorpaySignature;
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      product,
      totalPrice,
      Address,
      paymentID,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const finalRazorpayOrderId = razorpayOrderId || razorpay_order_id;
    const finalPaymentId = paymentID || razorpayPaymentId || razorpay_payment_id;
    const finalSignature = razorpaySignature || razorpay_signature;

    if (!Array.isArray(product) || product.length === 0 || !totalPrice || !Address || !finalRazorpayOrderId || !finalPaymentId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (finalSignature && !verifyRazorpaySignature(finalRazorpayOrderId, finalPaymentId, finalSignature)) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const order = new Order({
      user: req.user._id,
      product,
      totalPrice,
      Address,
      paymentID: finalPaymentId,
      razorpayOrderId: finalRazorpayOrderId,
      razorpaySignature: finalSignature,
      paymentStatus: "paid",
    });
    await order.save();

    // Send confirmation email
    const emailContent = `
      Order Confirmation

      Thank you for your order! Your order ID is ${order._id}.
      Razorpay Order ID: ${finalRazorpayOrderId}
      Total Price: Rs. ${totalPrice}
    `;
    await sendMail(req.user.email, "Order Confirmation", emailContent);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: order._id,
      razorpayOrderId: order.razorpayOrderId,
      paymentID: order.paymentID,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get orders by User()
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("product.productId", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders (Admin)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email").populate("product.productId", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (!["pending", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersByUser,
  updateOrderStatus,
};
