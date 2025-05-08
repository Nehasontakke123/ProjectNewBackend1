// import mongoose from "mongoose";

// const PaymentSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     repairId: { type: mongoose.Schema.Types.ObjectId, ref: "RepairRequest" },
//     amount: Number,
//     transactionId: String,  // Razorpay Transaction ID
//     paymentId: String,      // Razorpay Payment ID (New Field)
//     status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Payment", PaymentSchema);




import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // 🔐 Always good to require who made the payment
    },
    repairId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RepairRequest",
      required: true, // 🔧 Connects payment to the repair job
    },
    amount: {
      type: Number,
      required: true, // ₹ amount in paisa
    },
    transactionId: {
      type: String, // Razorpay Order ID (e.g., 'order_ABC123')
      required: true,
      unique: true, // 🔐 Prevent duplicate orders
    },
    paymentId: {
      type: String, // Razorpay Payment ID (e.g., 'pay_DEF456')
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
