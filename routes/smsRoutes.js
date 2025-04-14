

// import express from 'express';
// import Twilio from 'twilio';

// const router = express.Router();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = Twilio(accountSid, authToken);

// router.post('/send-sms', async (req, res) => {
//     const { phoneNumber, videoCallLink } = req.body;

//     try {
//         await client.messages.create({
//             body: `Join the video call: ${videoCallLink}`,
//             from: twilioPhoneNumber,
//             to: phoneNumber,
//         });
//         res.status(200).json({ message: 'SMS sent successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error sending SMS' });
//     }
// });

// export default router;




// routes/smsRoutes.js
import express from 'express';
import Twilio from 'twilio';

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = Twilio(accountSid, authToken);

router.post('/send-sms', async (req, res) => {
  const { phoneNumber, videoCallLink } = req.body;

  try {
    await client.messages.create({
      body: `Join the video call: ${videoCallLink}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });
    res.status(200).json({ message: 'SMS sent successfully' });
  } catch (error) {
    console.error('Twilio Error:', error);
    res.status(500).json({ error: 'Error sending SMS' });
  }
});

export default router;
