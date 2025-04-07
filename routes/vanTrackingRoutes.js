import express from 'express';
import { trackVanLocation } from '../controllers/vanTrackingController.js';

const router = express.Router();

router.post('/vanLocation', trackVanLocation);

export default router;