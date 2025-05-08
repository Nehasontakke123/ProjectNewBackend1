// import fs from 'fs';
// import path from 'path';
// import Video from '../models/VideoModel.js';
// import Twilio from 'twilio';

// // Twilio credentials from environment variables
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = Twilio(accountSid, authToken);

// // ✅ Function to upload video and send WhatsApp message with video call link
// export const uploadVideo = async (req, res) => {
//     try {
//         const phoneNumber = req.body.phoneNumber;

//         // ✅ Cloudinary video URL (after upload)
//         const uploadedVideo = req.file;
//         const videoUrl = uploadedVideo.path; // This is secure_url from Cloudinary

//         // ✅ Save video info to MongoDB
//         const newVideo = new Video({
//             videoUrl: videoUrl,
//             phoneNumber: phoneNumber,
//         });

//         await newVideo.save();

//         // ✅ Fixed Zoom Meeting Link (no file name should be added here)
//         const zoomLink = `https://us05web.zoom.us/j/84223349123?pwd=IKmZfbMtmJuQsSofbm78f8xi1pzJ1z.1`;

//         // ✅ WhatsApp Message
//         const messageBody = `👋 Hello! You have a video call.\n\n🔗 Join Zoom: ${zoomLink}\n📹 Uploaded Video: ${videoUrl}`;

//         await client.messages.create({
//             body: messageBody,
//             from: `whatsapp:${twilioPhoneNumber}`,
//             to: `whatsapp:${phoneNumber}`,
//         });

//         res.status(200).json({
//             message: "✅ Video uploaded and WhatsApp message sent successfully",
//             videoUrl: videoUrl, // Cloudinary public URL
//         });

//     } catch (err) {
//         console.error("❌ Error uploading video:", err);
//         res.status(500).json({ error: err.message });
//     }
// };

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

// // ✅ Standalone WhatsApp message sender
// // videoController.js

// // const client = twilio(accountSid, authToken);

// export const sendWhatsAppMessage = async (req, res) => {
//     const { to, messageBody, videoUrl } = req.body;
  
//     try {
//       const fullMessage = `${messageBody}\n${videoUrl}`;
      
//       const message = await client.messages.create({
//         from: 'whatsapp:+14155238886', // Twilio sandbox
//         to: `whatsapp:+91${to}`,
//         body: fullMessage,
//       });
  
//       console.log("✅ WhatsApp Sent:", message.sid);
//       res.status(200).json({ message: "WhatsApp message sent", sid: message.sid });
  
//     } catch (error) {
//       console.error("❌ Error sending WhatsApp:", error.message);
//       res.status(500).json({ message: "Failed", error: error.message });
//     }
//   };
  
  

import fs from 'fs';
import path from 'path';
import Video from '../models/VideoModel.js';
import Twilio from 'twilio';

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;  // Ensure you are using the correct Twilio number
const client = Twilio(accountSid, authToken);

// ✅ Function to upload video and send WhatsApp message with video call link
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

        // ✅ WhatsApp Message
        const messageBody = `👋 Hello! You have a video call.\n\n🔗 Join Zoom: ${zoomLink}\n📹 Uploaded Video: ${videoUrl}`;

        // Send WhatsApp message using Twilio
        const message = await client.messages.create({
            body: messageBody,
            from: `whatsapp:${twilioPhoneNumber}`,  // Use the updated Twilio phone number
            to: `whatsapp:${phoneNumber}`,
        });

        res.status(200).json({
            message: "✅ Video uploaded and WhatsApp message sent successfully",
            videoUrl: videoUrl, // Cloudinary public URL
        });

    } catch (err) {
        console.error("❌ Error uploading video:", err);
        res.status(500).json({ error: err.message });
    }
};

// ✅ Function to get all video data
export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ error: error.message });
    }
};

// ✅ Standalone WhatsApp message sender with improved error handling
export const sendWhatsAppMessage = async (req, res) => {
    const { to, messageBody, videoUrl } = req.body;

    try {
        // Ensure the phone number is in the correct format
        const formattedPhoneNumber = to.startsWith('whatsapp:') ? to : `whatsapp:+91${to}`;

        // Combine the message body and video URL
        const fullMessage = `${messageBody}\n${videoUrl}`;

        console.log("Sending WhatsApp message to:", formattedPhoneNumber);
        console.log("Message content:", fullMessage);

        // Send message via Twilio
        const message = await client.messages.create({
            from: `whatsapp:${twilioPhoneNumber}`,  // Updated Twilio phone number
            to: formattedPhoneNumber,
            body: fullMessage,
        });

        console.log("✅ WhatsApp Sent:", message.sid);
        res.status(200).json({ message: "WhatsApp message sent", sid: message.sid });

    } catch (error) {
        console.error("❌ Error sending WhatsApp:", error.message);
        res.status(500).json({ message: "Failed to send WhatsApp message", error: error.message });
    }
};
