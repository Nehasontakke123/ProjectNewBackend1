// import fs from 'fs';
// import path from 'path';
// import Video from '../models/VideoModel.js';



// import Twilio from 'twilio'; // Import Twilio SDK
// // import path from 'path';

// // Twilio credentials from environment variables
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = Twilio(accountSid, authToken); // Twilio client

// export const uploadVideo = async (req, res) => {
//     try {
//         const videoUrl = req.file.path; // Path of the uploaded video
//         const phoneNumber = req.body.phoneNumber; // Get phone number from request body

//         // Construct the message with the video call link
//         const videoCallLink = `https://yourdomain.com/video-call/${videoUrl}`;

//         // Send SMS to the provided phone number with the video call link
//         await client.messages.create({
//             body: `Hello! You have a video call. Join using the link: ${videoCallLink}`,
//             from: twilioPhoneNumber,  // Your Twilio phone number
//             to: phoneNumber,          // Recipient phone number
//         });

//         res.status(200).json({ message: "Video uploaded and SMS sent", videoUrl });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// export const getVideos = async (req, res) => {
//     try {
//         const videos = await Video.find();
//         res.json(videos);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




// import fs from 'fs';
// import path from 'path';
// import Video from '../models/VideoModel.js';
// import Twilio from 'twilio'; // Import Twilio SDK
// // require('dotenv').config();

// // Twilio credentials from environment variables
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = Twilio(accountSid, authToken); // Twilio client

// // Function to upload video and send WhatsApp message with video call link
// export const uploadVideo = async (req, res) => {
//     try {
//         const videoUrl = req.file.path; // Path of the uploaded video
//         const phoneNumber = req.body.phoneNumber; // Get phone number from request body

//         // Save video details to the database
//         const newVideo = new Video({
//             videoUrl: videoUrl,
//             phoneNumber: phoneNumber,
//         });

//         await newVideo.save();

//         // Construct the message with the video call link
//         const videoCallLink = `https://yourdomain.com/video-call/${videoUrl}`;

//         // Send WhatsApp message with the video call link
//         await client.messages.create({
//             body: `Hello! You have a video call. Join using the link: ${videoCallLink}`,
//             from: `whatsapp:${twilioPhoneNumber}`,  // Your Twilio WhatsApp number
//             to: `whatsapp:${phoneNumber}`,          // Recipient phone number (WhatsApp format)
//         });

//         res.status(200).json({ message: "Video uploaded and WhatsApp message sent", videoUrl });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Function to retrieve all videos from the database
// export const getVideos = async (req, res) => {
//     try {
//         const videos = await Video.find();
//         res.json(videos);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Controller function to send WhatsApp message (standalone message)
// export const sendWhatsAppMessage = (req, res) => {
//     const { to, messageBody } = req.body;  // You can pass the recipient's number and message through the request body

//     client.messages.create({
//         body: messageBody || 'Hello, this is a test message from Twilio!', // Default message if not provided
//         from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,  // Twilio WhatsApp number
//         to: `whatsapp:${to}`  // The recipient's WhatsApp number passed via the request body
//     })
//     .then(message => {
//         res.status(200).send({ success: true, messageSid: message.sid });
//     })
//     .catch(error => {
//         console.error(error);
//         res.status(500).send({ success: false, error: error.message });
//     });
// };




import fs from 'fs';
import path from 'path';
import Video from '../models/VideoModel.js';
import Twilio from 'twilio';

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = Twilio(accountSid, authToken);

// ✅ Function to upload video and send WhatsApp message with video call link
export const uploadVideo = async (req, res) => {
    try {
        const videoUrl = req.file.path; // Path of the uploaded video
        const phoneNumber = req.body.phoneNumber; // Phone number from frontend

        // Save video info to MongoDB
        const newVideo = new Video({
            videoUrl: videoUrl,
            phoneNumber: phoneNumber,
        });

        await newVideo.save();

        // Extract only file name for cleaner URL
        const videoFileName = path.basename(videoUrl);

        // Construct the public video call link
        const videoCallLink = `https://yourdomain.com/video-call/${videoFileName}`;

        // Send WhatsApp message using Twilio
        await client.messages.create({
            body: `Hello! You have a video call. Join using the link: ${videoCallLink}`,
            from: `whatsapp:${twilioPhoneNumber}`,
            to: `whatsapp:${phoneNumber}`,
        });

        res.status(200).json({
            message: "Video uploaded and WhatsApp message sent successfully",
            videoUrl: `/uploads/${videoFileName}`, // Return clean public URL
        });
    } catch (err) {
        console.error("Error uploading video:", err);
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

// ✅ Standalone WhatsApp message sender
// videoController.js

export const sendWhatsAppMessage = async (req, res) => {
    const { to, messageBody, videoUrl } = req.body;
  
    console.log("🟢 Incoming data:", to, messageBody, videoUrl);
  
    try {
      // Twilio / WhatsApp logic
      // Example dummy logic (if you're not using Twilio)
      if (!to || !messageBody || !videoUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Simulate success
      return res.status(200).json({ message: "WhatsApp message sent successfully!" });
    } catch (err) {
      console.error("❌ Backend Error:", err.message);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };
  