// import express from 'express';
// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// import { uploadVideo, sendSMS } from '../controllers/videoController.js';

// const router = express.Router();

// // ✅ Cloudinary Config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// // ✅ Cloudinary Storage Setup
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'videos', // Cloudinary folder name
//     resource_type: 'video', // Important for video files
//     allowed_formats: ['mp4', 'mov', 'avi'],
//   },
// });

// // ✅ Multer Setup
// const upload = multer({ storage });

// router.post('/upload', upload.single('video'), uploadVideo);
// router.get('/videos', getVideos);
// router.post('/send-whatsapp', sendWhatsAppMessage);

// export default router;


import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import { uploadVideo, sendSMS } from '../controllers/videoController.js';

const router = express.Router();

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// ✅ Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos', // Cloudinary folder name
    resource_type: 'video', // Important for video files
    allowed_formats: ['mp4', 'mov', 'avi'],
  },
});

// ✅ Multer Setup for file uploads
const upload = multer({ storage });

// ✅ Route to upload video and send SMS with video call link
router.post('/upload', upload.single('video'), uploadVideo);

// ✅ Route to get all videos (optional, if you need to retrieve video data)
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Route to send SMS
router.post('/send-sms', sendSMS);

export default router;

