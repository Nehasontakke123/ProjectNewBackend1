import JewelleryRequest from "../models/Request.js";
import sendEmail from "../utils/sendEmail.js";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Create Request + Save OTP
export const createRequest = async (req, res) => {
    const { customerName, customerEmail, customerPhone, jewelleryDetails, purpose } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  
    try {
      const newRequest = await JewelleryRequest.create({
        customerName,
        customerEmail,
        customerPhone,
        jewelleryDetails,
        purpose,
        otp
      });
  
      console.log("Generated OTP:", otp);
      console.log("Saved Request:", newRequest);
  
      // Send OTP via SMS
      await client.messages.create({
        body: `Your OTP for Jewellery transaction is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: customerPhone,
      });
  
      // ✅ THIS LINE: Response to client with requestId
      res.status(201).json({
        message: "Request created and OTP sent",
        requestId: newRequest._id
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// ✅ Verify OTP
export const verifyOTP = async (req, res) => {
  const { requestId, otp } = req.body;

  try {
    const request = await JewelleryRequest.findById(requestId);

    console.log("From Body:", otp);
    console.log("From DB:", request?.otp);

    if (request && String(request.otp) === String(otp)) {
      request.status = "verified";
      await request.save();
      return res.json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Quote Price
export const quotePrice = async (req, res) => {
  const { requestId, purity, offeredPrice } = req.body;

  try {
    const request = await JewelleryRequest.findById(requestId);
    request.purity = purity;
    request.offeredPrice = offeredPrice;
    request.status = "quoted";
    await request.save();

    await sendEmail(
      request.customerEmail,
      "Your Jewellery Price Quotation",
      `Purity: ${purity}, Offered Price: ₹${offeredPrice}`
    );

    res.json({ message: "Quotation sent to customer" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Mark Payment
export const markPaid = async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await JewelleryRequest.findById(requestId);
    request.status = "paid";
    await request.save();
    res.json({ message: "Payment marked as complete" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
