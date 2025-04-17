// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// export const getLiveGoldRate = async () => {
//   try {
//     const response = await axios.get(process.env.GOLDAPI_BASE_URL, {
//       headers: {
//         'x-access-token': process.env.GOLDAPI_KEY,
//         'Content-Type': 'application/json'
//       }
//     });

//     return response.data.price;
//   } catch (error) {
//     console.error('❌ Error fetching gold rate:', error.message);
//     return null;
//   }
// };


// services/goldPriceService.js
import axios from 'axios';

export const getLiveGoldRate = async () => {
  try {
    const response = await axios.get('https://www.goldapi.io/api/XAU/INR', {
      headers: {
        'x-access-token': process.env.GOLDAPI_KEY,  // Use your actual API key here
        'Content-Type': 'application/json',
      },
    });

    // Return the gold price
    return response.data.price;
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return null;  // Return null if there's an error
  }
};
