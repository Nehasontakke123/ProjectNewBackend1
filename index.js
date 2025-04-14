import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
// import multer from "multer";

import dbConnect from "./db/connectDB.js";

// Routes
import repairRoutes from "./routes/repairRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import vanTrackingRoutes from "./routes/vanTrackingRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import exchangeRoutes from "./routes/exchangeRoutes.js";
import authRoutes from './routes/authRoutes.js';
import smsRoutes from './routes/smsRoutes.js'; 

dotenv.config();
dbConnect(process.env.DBURL, process.env.DBNAME);

const app = express();
const server = http.createServer(app);
const __dirname = path.resolve();

// ✅ Middlewares
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files
app.use("/uploads", express.static("uploads")); 
// ✅ Multer Config (for file uploads)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });
// export const upload = multer({ storage });

// ✅ Socket.IO Setup
// const io = new Server(server, {
//     cors: { origin: "*" },
// });

// io.on("connection", (socket) => {
//     console.log("🟢 Client connected");

//     socket.on("vanLocation", (data) => {
//         io.emit("updateLocation", data);
//     });

//     socket.on("videoStream", (data) => {
//         io.emit("broadcastStream", data);
//     });

//     socket.on("offer", (data) => {
//         socket.broadcast.emit("offer", data);
//     });

//     socket.on("answer", (data) => {
//         socket.broadcast.emit("answer", data);
//     });

//     socket.on("ice-candidate", (data) => {
//         socket.broadcast.emit("ice-candidate", data);
//     });

//     socket.on("disconnect", () => {
//         console.log("🔴 Client disconnected");
//     });
// });

// // ✅ WebRTC Offer Route (optional)
// app.post("/api/webrtc/offer", async (req, res) => {
//     try {
//         console.log("Received WebRTC Offer:", req.body.offer);
//         res.json({ message: "Offer received" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });




// const { Server } = require("socket.io");

const io = new Server(server, {
    cors: { origin: "*" },
});

const users = {}; // userId -> socket.id map

io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // 🔐 Register user (Ex: userId = 'customer1' or 'vendor123')
    socket.on("register", (userId) => {
        users[userId] = socket.id;
        console.log(`✅ Registered: ${userId} -> ${socket.id}`);
    });

    // 📍 Van Location broadcast
    socket.on("vanLocation", (data) => {
        io.emit("updateLocation", data);
    });

    // 📡 Video stream (if needed for non-WebRTC)
    socket.on("videoStream", (data) => {
        io.emit("broadcastStream", data);
    });

    // 📞 Offer - Send only to receiver
    socket.on("offer", ({ offer, to }) => {
        const receiverSocketId = users[to];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("offer", offer);
            console.log(`📨 Offer sent to ${to}`);
        }
    });

    // ✅ Answer - Send back to caller
    socket.on("answer", ({ answer, to }) => {
        const callerSocketId = users[to];
        if (callerSocketId) {
            io.to(callerSocketId).emit("answer", answer);
            console.log(`✅ Answer sent to ${to}`);
        }
    });

    // 🌐 ICE Candidate - Send to specific peer
    socket.on("ice-candidate", ({ candidate, to }) => {
        const targetSocketId = users[to];
        if (targetSocketId) {
            io.to(targetSocketId).emit("ice-candidate", candidate);
        }
    });

    socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
        // Cleanup
        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                console.log(`🗑 Removed user mapping: ${userId}`);
                break;
            }
        }
    });
});




// ✅ Routes
app.use("/api/repair", repairRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/vanTracking", vanTrackingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/exchange", exchangeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', smsRoutes);

// ✅ Server Start
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Export IO (optional if used in controller)
export { io };
export default server;
