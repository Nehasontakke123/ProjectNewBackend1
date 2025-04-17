import cron from 'node-cron';
import { getLiveGoldRate } from '../services/goldPriceService.js';

cron.schedule('*/30 * * * *', async () => {
  const price = await getLiveGoldRate();
  if (price) {
    console.log('⏰ Fetched Gold Rate:', price);
    // Optionally save to DB or cache
  }
});
