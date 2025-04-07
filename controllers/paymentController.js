// import Razorpay from "razorpay";

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create order
// export const createOrder = async (req, res) => {
//     const { amount } = req.body;

//     try {
//         const order = await razorpayInstance.orders.create({
//             amount: amount * 100, // Razorpay expects amount in paise
//             currency: "INR",
//             receipt: "order_receipt_123",
//         });
//         res.status(201).json(order);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Capture payment
// export const capturePayment = async (req, res) => {
//     const { payment_id, order_id } = req.body;

//     try {
//         const capture = await razorpayInstance.payments.capture(payment_id, order_id);
//         res.status(200).json(capture);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




// controllers/paymentController.js
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = { amount: amount * 100, currency, payment_capture: 1 };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Razorpay order' });
  }
};

export const handleWebhook = (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const hmac = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');
  if (hmac === signature) {
    console.log('Payment event received:', req.body);
    res.json({ status: 'Webhook received' });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
};
