import express from "express";
import { createOrder } from "../controllers/paymentController.js";

const router = express.Router();

// Route: POST /api/payment/create-order
router.post("/create-order", createOrder);

export default router;
