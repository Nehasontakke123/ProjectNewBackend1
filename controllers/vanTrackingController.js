// controllers/vanTrackingController.js
import { io } from '../index.js'; // Corrected import path


export const trackVanLocation = (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, message: "Latitude and Longitude are required" });
  }

  const locationData = { latitude, longitude, timestamp: new Date() };
  
  // Emit the location update to all connected clients
  io.emit("vanLocationUpdate", locationData);

  res.json({ success: true, message: "Location broadcasted", data: locationData });
};
