// import express from "express";
// import { Tags } from "../db.js";

// const tagsRouter = express.Router();
// // Get all tags
// tagsRouter.get("/", async (req, res) => {
//     try {
//         const tags = await Tags.find();
//         res.json(tags);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // Create a tag
// tagsRouter.post("/", async (req, res) => {
//     console.log("asdasdf");
//     try {
//         const { title } = req.body;
//         const tag = new Tags({ title });
//         await tag.save();
//         res.json(tag);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to create tag" });
//     }
// });

// console.log("hello3")
// export { tagsRouter };
