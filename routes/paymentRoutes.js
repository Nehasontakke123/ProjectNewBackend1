// import express from "express";
// import { createOrder, capturePayment } from "../controllers/paymentController.js";

// const router = express.Router();

// // Create Order
// router.post("/create-order", createOrder);

// // Capture Payment
// router.post("/capture-payment", capturePayment);

// export default router;


// routes/paymentRoutes.js
import express from 'express';
import { createOrder, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/createOrder', createOrder);
router.post('/webhook', handleWebhook);

export default router;