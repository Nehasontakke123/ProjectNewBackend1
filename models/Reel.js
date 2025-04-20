// models/Reel.js
import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
  caption: String,
  videoUrl: String,
  songTitle: String,
  songUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reel = mongoose.model('Reel', reelSchema);
export default Reel;
