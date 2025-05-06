const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const TokenSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  name: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Token = mongoose.model("Token", TokenSchema);

app.post("/tokens", async (req, res) => {
  try {
    const { userId, token, name, expiresAt } = req.body;

    await Token.findOneAndUpdate(
      { userId },
      { token, name, expiresAt, timestamp: new Date() },
      { upsert: true }
    );

    res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save token" });
  }
});

app.get("/tokens/:userId", async (req, res) => {
  try {
    const token = await Token.findOne({ userId: req.params.userId });
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }

    const now = new Date();
    const status = token.expiresAt > now ? "active" : "expired";

    res.json({
      token: token.token,
      name: token.name,
      expiryDate: token.expiresAt.toISOString().split("T")[0],
      expiryTime: token.expiresAt.toTimeString().split(" ")[0],
      status,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
