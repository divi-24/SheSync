import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import periodTrackingRoutes from "./routes/periodTrackingRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import spotifyRoutes from "./routes/spotify.js";
dotenv.config();
export const MONGO_URL = process.env.MONGO_URL;
const app = express();

// Configure CORS to allow Clerk webhook requests
app.use(cors({
  origin: ['https://api.clerk.dev', process.env.FRONTEND_URL || 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Svix-Id', 'Svix-Timestamp', 'Svix-Signature'],
}));

// For Clerk webhooks, we need the raw body
app.use(express.json({
  verify: (req, res, buf) => {
    // Make the raw body available for webhook verification
    req.rawBody = buf.toString();
  },
}));

connectDb();

// Include auth routes for Clerk webhooks
app.use("/api/auth", authRoutes);
app.use("/api/period", periodTrackingRoutes);
app.use("/api/post", postRoutes);
app.use("/api/spotify", spotifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
