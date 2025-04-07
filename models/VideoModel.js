import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    filename: String,
    filePath: String,
    uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Video', videoSchema);