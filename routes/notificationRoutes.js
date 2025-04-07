// routes/notificationRoutes.js
import express from 'express';
import { sendNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/sendNotification', sendNotification);

export default router;