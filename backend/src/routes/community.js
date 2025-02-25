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

communityRouter.get("/:id", async (req, res) => {
    console.log("Fetching community with ID:", req.params.id);
    try {
        const community = await Community.findById({_id : req.params.id}); // Fix: Use `req.params.id`

        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        res.json(community);
    } catch (error) {
        console.error("Error fetching community:", error);
        res.status(500).json({ error: "Server error" });
    }
});
communityRouter.get("/:id", async (req, res) => {
    console.log("Fetching community with ID:", req.params.id);
    try {
        const community = await Community.findById({_id : req.params.id}); // Fix: Use `req.params.id`

        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        res.json(community);
    } catch (error) {
        console.error("Error fetching community:", error);
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


communityRouter.get("/:id/:tag", async (req, res) => {
    console.log("Fetching community with ID:", req.params.id, "and tag:", req.params.tag);

    try {
        const { id, tag } = req.params;

        // Find the community by ID
        const community = await Community.findById(id);

        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        // Check if the tag exists in the community's tags array
        if (!community.tags.includes(tag)) {
            return res.status(404).json({ error: `Tag '${tag}' not found in this community` });
        }

        res.json(community);
    } catch (error) {
        console.error("Error fetching community:", error);
        res.status(500).json({ error: "Server error" });
    }
});



export { communityRouter };
