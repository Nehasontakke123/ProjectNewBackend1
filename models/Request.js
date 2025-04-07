// import mongoose from "mongoose";

// const requestSchema = new mongoose.Schema({
//   customerName: String,
//   customerEmail: String,
//   customerPhone: String,
//   jewelleryDetails: String,
//   purpose: { type: String, enum: ["sell", "exchange"] },
//   purity: String,
//   offeredPrice: Number,
//   status: { type: String, enum: ["pending", "quoted", "verified", "paid", "exchanged"], default: "pending" },
//   otp: Number,
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("JewelleryRequest", requestSchema);



import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  jewelleryDetails: { type: String, required: true },
  purpose: { type: String, enum: ["sell", "exchange"], required: true },
  purity: String,
  offeredPrice: Number,
  otp: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "quoted", "verified", "paid", "exchanged"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("JewelleryRequest", requestSchema);
