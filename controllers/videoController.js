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





import Twilio from 'twilio';  // Import Twilio SDK
import Video from '../models/VideoModel.js';

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = Twilio(accountSid, authToken); // Twilio client

// Controller for uploading video and sending SMS with video link
export const uploadVideo = async (req, res) => {
    try {
        const videoUrl = req.file.path; // Path of the uploaded video
        const phoneNumber = req.body.phoneNumber; // Get phone number from request body

        // Construct the video call link with a timestamp
        const timestamp = new Date().getTime();
        const videoCallLink = `https://yourdomain.com/video-call/${timestamp}`;

        // Send SMS to the provided phone number with the video call link
        await client.messages.create({
            body: `Hello! You have a video call. Join using the link: ${videoCallLink}`,
            from: twilioPhoneNumber,  // Your Twilio phone number
            to: phoneNumber,          // Recipient phone number
        });

        // Save video details in your database (optional)
        const video = new Video({ videoUrl, phoneNumber });
        await video.save();

        res.status(200).json({ message: "Video uploaded and SMS sent", videoUrl, videoCallLink });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};