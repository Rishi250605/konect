import { Router } from "express";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import { Post } from "../db.js";
import { authRouter } from "./login.js";
import { postRouter }from "./post.js";
export const rootRouter = Router();
// // ✅ Fix __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const rootRouter = Router();

// // ✅ Correct upload directory
// const uploadDir = path.join(__dirname, "../../uploads"); // Move up one level to match server.js
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ✅ Configure Multer for local file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); // Save images in 'uploads/' folder
//   },
//   filename: (req, file, cb) => {
//     const timestamp = Date.now();
//     const ext = path.extname(file.originalname);
//     cb(null, `${timestamp}${ext}`); // Rename file with timestamp
//   },
// });

// const upload = multer({ storage });

// // ✅ Upload Image and Create Post
// rootRouter.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const { title, body, tag } = req.body;
//     if (!title || !body || !tag) {
//       return res.status(400).json({ message: "Title, body, and tag are required" });
//     }

//     const imagePath = `/uploads/${req.file.filename}`; // Store relative path

//     const newPost = new Post({ image: imagePath, title, body, tag });
//     await newPost.save();

//     res.status(201).json({ message: "Post created", post: newPost });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // ✅ Get All Posts
// rootRouter.get("/posts", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

rootRouter.use("/user/signup", authRouter);
rootRouter.use("/post", postRouter);
rootRouter.use("/community", communityRoutes);
rootRouter.use("/tags", tagRoutes);
