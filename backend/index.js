/** @format */

import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = 4000;
const MONGO_URI =
  "mongodb+srv://varshneysanidhya:2vxV6ViufOGmqCIE@cluster0.amw6e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI);

app.post("/register", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = new User({ name, email, phone });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({
      error:
        "User registration failed. Email or phone may already be registered.",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, phone } = req.body;
  if (!email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email, phone });

    if (!user) {
      res.send(400).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User found Successfully" });
  } catch (error) {
    res.status(500).json({ error: "login failed" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
