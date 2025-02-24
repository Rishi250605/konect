import express from 'express';
import multer from 'multer';
import path from 'path';
import { Post } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const postRouter = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploadedImages/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG and PNG allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Create a new post with image upload
postRouter.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { title, body, tag } = req.body;
        
        const newPost = new Post({
            title,
            body,
            tag,
            image: req.file ? req.file.path : null
        });

        await newPost.save();

        res.status(201).json({
            message: 'Post created successfully',
            post: newPost
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    }
});

// Get all posts
postRouter.get('/all', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching posts',
            error: error.message
        });
    }
});

// Get post by ID
postRouter.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching post',
            error: error.message
        });
    }
});

// Update post
postRouter.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { title, body, tag } = req.body;
        const updateData = {
            title,
            body,
            tag
        };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({
            message: 'Post updated successfully',
            post: updatedPost
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating post',
            error: error.message
        });
    }
});

// Delete post
postRouter.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({
            message: 'Post deleted successfully',
            post: deletedPost
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting post',
            error: error.message
        });
    }
});
postRouter.get("/community/:communityId", async (req, res) => {
    try {
      const posts = await Post.find({ community: req.params.communityId })
        .populate("user", "username mailid yearofstudy")
        .populate("community", "name")
        .populate("tags", "title");
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Get posts by tag
  postRouter.get("/tag/:tagId", async (req, res) => {
    try {
      const posts = await Post.find({ tags: req.params.tagId })
        .populate("user", "username")
        .populate("community", "name")
        .populate("tags", "title");
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
export { postRouter}; 