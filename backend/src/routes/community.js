import express from "express";
import { Community } from "../db.js";

const communityRouter = express.Router();

// Get all communities
communityRouter.get("/", async (req, res) => {
  try {
    const communities = await Community.find().populate("tags", "title");
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a community
communityRouter.post("/", async (req, res) => {
  try {
    const { name, description, tags } = req.body;
    const community = new Community({ name, description, tags });
    await community.save();
    res.json(community);
  } catch (error) {
    res.status(500).json({ error: "Failed to create community" });
  }
});

export { communityRouter };
