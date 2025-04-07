import express from 'express';
import multer from 'multer';
import path from 'path';

import { uploadVideo, getVideos } from '../controllers/videoController.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/upload', upload.single('video'), uploadVideo);
router.get('/videos', getVideos);

export default router;