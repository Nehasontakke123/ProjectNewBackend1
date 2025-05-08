import fs from 'fs';
import path from 'path';
import Video from '../models/VideoModel.js';
import Twilio from 'twilio';

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;  // Ensure you are using the correct Twilio number
const client = Twilio(accountSid, authToken);

// ✅ Standalone SMS sender with improved error handling
export const sendSMS = async (req, res) => {
    const { to, messageBody, videoUrl } = req.body;

    try {
        // Ensure the phone number is in the correct format
        const formattedPhoneNumber = to.startsWith('whatsapp:') ? to.replace('whatsapp:', '') : to;  // Remove whatsapp prefix if exists

        // Combine the message body and video URL
        const fullMessage = `${messageBody}\n${videoUrl}`;

        console.log("Sending SMS to:", formattedPhoneNumber);
        console.log("Message content:", fullMessage);

        // Send SMS via Twilio
        const message = await client.messages.create({
            from: twilioPhoneNumber,  // Twilio phone number, used for SMS
            to: formattedPhoneNumber, // The recipient's phone number
            body: fullMessage,        // The content of the SMS
        });

        console.log("✅ SMS Sent:", message.sid);
        res.status(200).json({ message: "SMS sent successfully", sid: message.sid });

    } catch (error) {
        console.error("❌ Error sending SMS:", error.message);
        res.status(500).json({ message: "Failed to send SMS", error: error.message });
    }
};


// // ✅ Function to get all video data
// export const getVideos = async (req, res) => {
//     try {
//         const videos = await Video.find();
//         res.json(videos);
//     } catch (error) {
//         console.error("Error fetching videos:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// ✅ Function to upload video and send SMS with video call link
export const uploadVideo = async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;

        // ✅ Cloudinary video URL (after upload)
        const uploadedVideo = req.file;
        const videoUrl = uploadedVideo.path; // This is secure_url from Cloudinary

        // ✅ Save video info to MongoDB
        const newVideo = new Video({
            videoUrl: videoUrl,
            phoneNumber: phoneNumber,
        });

        await newVideo.save();

        // ✅ Fixed Zoom Meeting Link (no file name should be added here)
        const zoomLink = `https://us05web.zoom.us/j/84223349123?pwd=IKmZfbMtmJuQsSofbm78f8xi1pzJ1z.1`;

        // ✅ SMS message content
        const messageBody = `👋 Hello! You have a video call.\n\n🔗 Join Zoom: ${zoomLink}\n📹 Uploaded Video: ${videoUrl}`;

        // Send SMS using Twilio
        await sendSMS({
            body: {
                to: phoneNumber,  // The phone number to send the SMS to
                messageBody: messageBody,  // The content of the SMS message
                videoUrl: videoUrl // URL of the uploaded video
            }
        });

        res.status(200).json({
            message: "✅ Video uploaded and SMS sent successfully",
            videoUrl: videoUrl, // Cloudinary public URL
        });

    } catch (err) {
        console.error("❌ Error uploading video:", err);
        res.status(500).json({ error: err.message });
    }
};






