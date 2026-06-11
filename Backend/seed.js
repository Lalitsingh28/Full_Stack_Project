const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db.js");
const User = require("./models/user.js");
const Product = require("./models/product.js");
const Order = require("./models/order.js");

dotenv.config();

const users = [
  {
    username: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    verified: true,
  },
  {
    username: "Demo User",
    email: "user@example.com",
    password: "user123",
    role: "user",
    verified: true,
  },
];

const products = [
  {
    name: "iPhone 15",
    description: "Apple smartphone with A16 Bionic chip and advanced dual-camera system.",
    price: 79999,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900",
    category: "Mobiles",
    stock: 15,
    rating: 4.7,
  },
  {
    name: "Sony WH-1000XM5",
    description: "Wireless noise cancelling headphones with long battery life.",
    price: 29990,
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=900",
    category: "Audio",
    stock: 25,
    rating: 4.6,
  },
  {
    name: "MacBook Air M2",
    description: "Thin and light laptop with Apple M2 chip and all-day battery life.",
    price: 99900,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900",
    category: "Laptops",
    stock: 8,
    rating: 4.8,
  },
  {
    name: "Nike Running Shoes",
    description: "Comfortable running shoes for daily training and walking.",
    price: 6499,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
    category: "Fashion",
    stock: 40,
    rating: 4.4,
  },
  {
    name: "Samsung 4K Smart TV",
    description: "Ultra HD smart TV with vivid display and streaming apps.",
    price: 45999,
    imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=900",
    category: "Electronics",
    stock: 12,
    rating: 4.5,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    const createdProducts = await Product.insertMany(products);

    const demoUser = createdUsers.find((user) => user.role === "user");
    const iphone = createdProducts[0];
    const headphones = createdProducts[1];
    const shoes = createdProducts[3];

    const orders = [
      {
        user: demoUser._id,
        product: [
          {
            productId: iphone._id,
            quantity: 1,
            price: iphone.price,
          },
          {
            productId: headphones._id,
            quantity: 1,
            price: headphones.price,
          },
        ],
        totalPrice: iphone.price + headphones.price,
        Address: {
          fullName: "Demo User",
          addressLine1: "123 Market Street",
          addressLine2: "Near City Mall",
          city: "Delhi",
          postalCode: "110001",
          country: "India",
        },
        paymentID: "pay_dummy_001",
        razorpayOrderId: "order_dummy_001",
        razorpaySignature: "dummy_signature_001",
        paymentStatus: "paid",
        status: "pending",
      },
      {
        user: demoUser._id,
        product: [
          {
            productId: shoes._id,
            quantity: 2,
            price: shoes.price,
          },
        ],
        totalPrice: shoes.price * 2,
        Address: {
          fullName: "Demo User",
          addressLine1: "45 Park Avenue",
          addressLine2: "Apartment 302",
          city: "Mumbai",
          postalCode: "400001",
          country: "India",
        },
        paymentID: "pay_dummy_002",
        razorpayOrderId: "order_dummy_002",
        razorpaySignature: "dummy_signature_002",
        paymentStatus: "paid",
        status: "shipped",
      },
    ];

    await Order.insertMany(orders);

    console.log("Dummy data seeded successfully");
    console.log("Admin login: admin@example.com / admin123");
    console.log("User login: user@example.com / user123");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();
