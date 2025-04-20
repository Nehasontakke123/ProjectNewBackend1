import express from 'express';
import multer from 'multer';
import { createReel, getAllReels } from '../controllers/reelController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('video'), createReel);
router.get('/', getAllReels);

export default router;
