import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
    customerName: String,
    phoneNumber: String,
    jewelleryType: String,
    issueDescription: String,
    status: { type: String, default: "Pending" },
    otp: String,
    assignedKaragir: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Repair", repairSchema);





// import mongoose from 'mongoose';

// const repairSchema = new mongoose.Schema({
//     customerName: String,
//     phoneNumber: String,
//     jewelleryType: String,
//     issueDescription: String,
//     status: { type: String, default: 'Pending' },
//     otp: String,
//     otpExpiry: { type: Date },
//     assignedKaragir: String,
//     createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Repair', repairSchema);




// import mongoose from "mongoose";

// const repairSchema = mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true },
//     address: { type: String, required: true },
//     jewelleryType: { type: String, required: true },
//     status: { type: String, default: "Pending" },  // Pending, In Progress, Completed
//     otp: { type: String, required: true },
//     paymentStatus: { type: String, default: "Unpaid" }, // Paid / Unpaid
//     location: { type: Object, default: { lat: 0, lng: 0 } }, // Van Location
//   },
//   { timestamps: true }
// );

// const Repair = mongoose.model("Repair", repairSchema);
// export default Repair;
