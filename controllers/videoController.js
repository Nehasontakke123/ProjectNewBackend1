import fs from 'fs';
import path from 'path';
import Video from '../models/VideoModel.js';

// export const uploadVideo = async (req, res) => {
//     try {
//         const { filename, path: filePath } = req.file;
//         const newVideo = new Video({ filename, filePath });
//         await newVideo.save();
//         res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



export const uploadVideo = async (req, res) => {
    try {
      const videoUrl = req.file.path; // Cloudinary video URL
      res.status(200).json({ message: "Video uploaded", videoUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};