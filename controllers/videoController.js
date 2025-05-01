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
        const videoCallLink = `https://us05web.zoom.us/j/84223349123?pwd=IKmZfbMtmJuQsSofbm78f8xi1pzJ1z.1/${videoFileName}`;

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

// const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (req, res) => {
    try {
      const { to, messageBody, videoUrl } = req.body;
  
      // ✅ Validate phone number
      if (!to || !/^\d{10}$/.test(to)) {
        return res.status(400).json({ message: "Invalid phone number format. Use 10-digit Indian number." });
      }
  
      // ✅ Compose full message
      const fullMessage = `${messageBody}\n${videoUrl}`;
  
      // ✅ Send WhatsApp message via Twilio
      const message = await client.messages.create({
        from: 'whatsapp:+14155238886', // Twilio sandbox number
        to: `whatsapp:+91${to}`,        // Automatically formats with +91
        body: fullMessage,
      });
  
      console.log("✅ WhatsApp Sent:", message.sid);
      res.status(200).json({ message: "WhatsApp message sent", sid: message.sid });
  
    } catch (error) {
      console.error("❌ Error sending WhatsApp:", error.message);
      res.status(500).json({ message: "Failed to send WhatsApp message", error: error.message });
    }
  };
  