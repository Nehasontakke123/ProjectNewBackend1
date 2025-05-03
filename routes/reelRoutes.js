import express from 'express';
import multer from 'multer';
import { uploadReel, getAllReels } from '../controllers/reelController.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('video'), uploadReel);
router.get('/', getAllReels);

export default router;
