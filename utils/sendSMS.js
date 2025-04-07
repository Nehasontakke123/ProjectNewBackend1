// import twilio from "twilio";

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendSMS = async (to, otp) => {
//   try {
//     const message = `Your OTP for jewellery repair booking is: ${otp}`;
//     await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//     });
//     console.log("✅ OTP Sent Successfully!");
//   } catch (error) {
//     console.error("❌ Error sending OTP:", error);
//   }
// };

// export default sendSMS;



import twilio from "twilio";

const sendSMS = async (to, otp) => {
  try {
    console.log("📲 Sending OTP to:", to);
    console.log("📩 OTP Message:", `Your OTP for jewellery repair booking is: ${otp}`);

    const message = await client.messages.create({
      body: `Your OTP for jewellery repair booking is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    console.log("✅ OTP Sent Successfully!", message.sid);
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
  }
};

export default sendSMS
