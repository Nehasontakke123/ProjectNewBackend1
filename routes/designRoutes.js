import { Router } from 'express';
import * as designController from '../controllers/designController.js';

const router = Router();

router.post('/create', designController.createDesign);
router.get('/', designController.getAllDesigns);

export default router;
