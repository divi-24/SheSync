// routes/spotify.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const router = express.Router();

// ✅ Use env variables
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = null;
let tokenExpiration = 0;

// 🔐 Get or refresh access token
async function getAccessToken() {
  const now = Date.now();
  if (accessToken && tokenExpiration > now) return accessToken;

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiration = now + response.data.expires_in * 1000 - 60000;
  return accessToken;
}

// 🎧 GET /spotify/recommend?mood=happy
router.get("/recommend", async (req, res) => {
  const { mood } = req.query;
  if (!mood) return res.status(400).json({ error: "Mood is required." });

  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        mood + " mood"
      )}&type=playlist&limit=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const playlist = response.data.playlists.items[0];
    res.json({ playlist });
  } catch (error) {
    console.error("Spotify error:", error.message);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
});

export default router;
