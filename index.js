import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import dbConnect from "./db/connectDB.js";
import repairRoutes from "./routes/repairRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import vanTrackingRoutes from "./routes/vanTrackingRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import exchangeRoutes from "./routes/exchangeRoutes.js";
import cors from "cors";

dotenv.config();

// ✅ Connect to MongoDB
dbConnect(process.env.DBURL, process.env.DBNAME);

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());

// ✅ Initialize WebSocket Server
const io = new Server(server, {
    cors: { origin: "*" },
});

// ✅ Handle WebSocket Connections
io.on("connection", (socket) => {
    console.log("Client connected ✅");

    // 🛰️ Live Van Tracking
    socket.on("vanLocation", (data) => {
        io.emit("updateLocation", data);
    });

    // 📡 WebRTC Video Streaming
    socket.on("videoStream", (data) => {
        io.emit("broadcastStream", data);
    });

    // 📡 WebRTC Signaling for Video Call
    socket.on("offer", (data) => {
        console.log("Received Offer:", data);
        socket.broadcast.emit("offer", data);
    });

    socket.on("answer", (data) => {
        console.log("Received Answer:", data);
        socket.broadcast.emit("answer", data);
    });

    socket.on("ice-candidate", (data) => {
        console.log("Received ICE Candidate:", data);
        socket.broadcast.emit("ice-candidate", data);
    });

    // ❌ Handle Disconnections
    socket.on("disconnect", () => {
        console.log("Client disconnected ❌");
    });
});

// ✅ WebRTC Signaling Route
app.post("/api/webrtc/offer", async (req, res) => {
    try {
        console.log("Received WebRTC Offer:", req.body.offer);
        // Here, generate an answer and send it back
        res.json({ message: "Offer received" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Routes
app.use("/api/repair", repairRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/vanTracking", vanTrackingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/exchange", exchangeRoutes);

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export { io };
export default server;
