import Reel from '../models/Reel.js';

export const createReel = async (req, res) => {
  try {
    const { caption, songTitle, songUrl } = req.body;
    const videoUrl = `/uploads/${req.file.filename}`;

    const newReel = new Reel({ caption, videoUrl, songTitle, songUrl });
    await newReel.save();
    res.status(201).json(newReel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json(reels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
