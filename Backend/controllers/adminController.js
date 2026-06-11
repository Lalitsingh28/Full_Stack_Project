const Order = require("../models/order.js");
const Product = require("../models/product.js");
const User = require("../models/user.js");


// Get admin stats
const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    
    const orders = await Order.find();
    
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
        totalProducts,
        totalUsers,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getAdminStats };
