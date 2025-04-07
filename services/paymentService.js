import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createPayment = async (req, res) => {
    const { amount, userId, repairId } = req.body;

    const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: `repair_${repairId}`
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};
