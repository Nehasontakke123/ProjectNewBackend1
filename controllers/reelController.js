import Reel from '../models/Reel.js';

export const uploadReel = async (req, res) => {
  try {
    const { caption, songTitle, songUrl } = req.body;
    const videoUrl = `/uploads/${req.file.filename}`;

    const newReel = new Reel({ caption, songTitle, songUrl, videoUrl });
    await newReel.save();

    res.status(201).json(newReel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload reel' });
  }
};

export const getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reels' });
  }
};
