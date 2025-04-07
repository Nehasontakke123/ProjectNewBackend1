import Repair from '../models/RepairModel.js';
import otpGenerator from 'otp-generator';
import { sendOtp } from '../services/twilioService.js';

// Request Repair Service (Create Repair Request)
export const requestRepairService = async (req, res) => {
  const { customerName, phoneNumber, jewelleryType, issueDescription } = req.body;
  const otp = otpGenerator.generate(6, { digits: true });
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

  try {
      const repair = await Repair.findOneAndUpdate(
          { phoneNumber },
          { customerName, jewelleryType, issueDescription, otp, otpExpiry },
          { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      console.log('✅ OTP Sent:', otp);
      console.log('✅ OTP Expiry Time Stored:', otpExpiry);

      await sendOtp(phoneNumber, otp);
      res.status(201).json({ message: 'Repair request created', repairId: repair._id });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


export const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
      const repair = await Repair.findOne({ phoneNumber });

      if (!repair) return res.status(404).json({ message: "Repair request not found" });

      if (repair.otp !== otp || new Date() > repair.otpExpiry) {
          return res.status(400).json({ message: "Invalid OTP or OTP expired" });
      }

      // OTP is correct, remove it from the database (for security)
      repair.otp = null;
      repair.otpExpiry = null;
      await repair.save();

      res.json({ message: "OTP verified successfully!" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};




// repairController.js

// Add the missing export for updateRepairStatus
export const updateRepairStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const repair = await Repair.findById(id);
        if (!repair) return res.status(404).json({ message: "Repair request not found" });

        repair.status = status;
        await repair.save();

        res.json({ message: "Repair status updated", updatedRepair: repair });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



