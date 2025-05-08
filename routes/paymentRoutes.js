// import express from "express";
// import { createOrder } from "../controllers/paymentController.js";

// const router = express.Router();

// // Route: POST /api/payment/create-order
// router.post("/create-order", createOrder);

// export default router;


import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

// POST: Create Razorpay Order
router.post("/createOrder", createOrder);

// POST: Verify Payment after success
router.post("/verify", verifyPayment);

export default router;
