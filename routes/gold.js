// routes/goldPriceRouter.js
import express from 'express';
import { getLiveGoldRate } from '../services/goldPriceService.js';

const router = express.Router();

router.get('/current-price', async (req, res) => {
  const price = await getLiveGoldRate();
  if (price) {
    res.status(200).json({ goldPrice: price });
  } else {
    res.status(500).json({ error: 'Failed to fetch gold price' });
  }
});

export default router;
