import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
  caption: String,
  songTitle: String,
  songUrl: String,
  videoUrl: String,
}, { timestamps: true });

export default mongoose.model('Reel', reelSchema);
