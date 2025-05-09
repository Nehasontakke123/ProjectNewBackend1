import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import { uploadVideo, sendSMSMessage } from '../controllers/videoController.js';

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

// ✅ Multer Setup
const upload = multer({ storage });

// router.post('/upload', upload.single('video'), uploadVideo);
// router.get('/videos', getVideos);
// router.post('/send-whatsapp', sendWhatsAppMessage);

router.post('/upload', upload.single('video'), uploadVideo);
router.post('/send-sms', sendSMSMessage);  // ✅ Added for manual SMS sending


export default router;
