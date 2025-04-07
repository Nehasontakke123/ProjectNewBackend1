import express from "express";
import { createRequest, verifyOTP, quotePrice, markPaid } from "../controllers/exchangeController.js";
const router = express.Router();

router.post("/create", createRequest);
router.post("/verify-otp", verifyOTP);
router.post("/quote", quotePrice);
router.post("/mark-paid", markPaid);

export default router;
