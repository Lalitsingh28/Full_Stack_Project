const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
const createRazorpayOrder = async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Valid amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"), // Unique receipt ID
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(201).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
      razorpayOrderId: order.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating Razorpay order", error: error.message });
  }
};

// Verify Razorpay payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Payment verification fields are required" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment: {
          razorpayOrderId: razorpay_order_id,
          paymentID: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
      });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };
