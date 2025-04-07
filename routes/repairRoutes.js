import express from "express";
import { requestRepairService, verifyOtp, updateRepairStatus } from "../controllers/repairController.js";

const router = express.Router();

// Request Repair Service
router.post("/request", requestRepairService);

// OTP Verification
router.post("/verify-otp", verifyOtp);

// Update Repair Status
router.put("/update-status/:id", updateRepairStatus);

export default router;





// import express from "express";
// import {
//   bookRepair,
//   verifyOTP,
//   trackRepair,
//   processPayment,
//   updateVanLocation ,
// } from "../controllers/repairController.js";

// const router = express.Router();

// router.post("/book", bookRepair);
// router.post("/verify-otp", verifyOTP);
// router.get("/track/:id", trackRepair);
// router.post("/payment", processPayment);
// router.post("/update-location", updateVanLocation);


// export default router;
