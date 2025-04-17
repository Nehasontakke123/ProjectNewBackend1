// import express from 'express';
// import multer from 'multer';
// import path from 'path';

// import { uploadVideo, getVideos } from '../controllers/videoController.js';

// const router = express.Router();
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });
// const upload = multer({ storage });

// router.post('/upload', upload.single('video'), uploadVideo);
// router.get('/videos', getVideos);

// export default router;



import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import { uploadVideo, getVideos,sendWhatsAppMessage } from '../controllers/videoController.js';

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

router.post('/upload', upload.single('video'), uploadVideo);
router.get('/videos', getVideos);
router.post('/send-whatsapp', sendWhatsAppMessage);

export default router;
