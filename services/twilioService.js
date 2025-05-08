 import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// Check if Twilio environment variables are loaded correctly
console.log('Twilio Account SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('Twilio Auth Token:', process.env.TWILIO_AUTH_TOKEN);
console.log('Twilio Phone Number:', process.env.TWILIO_PHONE_NUMBER);

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtp = async (phoneNumber, otp) => {
    try {
        // Ensure phoneNumber and OTP are valid
        if (!phoneNumber || !otp) {
            console.error('Phone number or OTP missing');
            return false;
        }

        const message = await client.messages.create({
            body: `Your OTP for jewellery repair is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,  // Your Twilio phone number
            to: phoneNumber
        });

        console.log(`✅ OTP sent successfully: ${message.sid}`);
        return true;
    } catch (error) {
        console.error(`❌ Error sending OTP: ${error.message}`);
        return false;
    }
};
