import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    repairId: { type: mongoose.Schema.Types.ObjectId, ref: "RepairRequest" },
    amount: Number,
    transactionId: String,  // Razorpay Transaction ID
    paymentId: String,      // Razorpay Payment ID (New Field)
    status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
