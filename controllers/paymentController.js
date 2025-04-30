import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "order_rcptid_" + Math.floor(Math.random() * 10000),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};
