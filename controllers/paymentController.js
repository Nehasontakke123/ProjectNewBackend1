import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// export const createOrder = async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const options = {
//       amount: amount * 100, // paise
//       currency: "INR",
//       receipt: "order_rcptid_" + Math.floor(Math.random() * 10000),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json({ success: true, order });  // ✅ sends in expected format

//   } catch (error) {
//     console.error("Order Creation Error:", error);
//     res.status(500).json({ message: "Failed to create Razorpay order" });
//   }
// };



// POST /api/payment/create-order

export const createOrder = async (req, res) => {
  const { amount, userId, repairId } = req.body;

  const options = {
    amount: amount * 100, // Convert to paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    const payment = new Payment({
      userId,
      repairId,
      amount,
      transactionId: order.id,
      status: "pending",
    });

    await payment.save();

    res.json({ order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// POST /api/payment/verify
export const verifyPayment = async (req, res) => {
  const { transactionId, paymentId } = req.body;

  const payment = await Payment.findOne({ transactionId });

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  payment.paymentId = paymentId;
  payment.status = "success";
  await payment.save();

  res.json({ message: "Payment verified and saved." });
};
