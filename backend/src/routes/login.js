import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import db from '../db';
import { User } from '../db.js';
const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        const { username, password, mailid, yearofstudy } = req.body;

        // Check email domain
        if (!mailid.endsWith('@rajalakshmi.edu.in')) {
            return res.status(400).json({ 
                message: 'Only rajalakshmi.edu.in email addresses are allowed' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ username }, { mailid }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            mailid,
            yearofstudy
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
        );

        res.status(201).json({ 
            message: 'User created successfully',
            token 
        });

    } catch (error) {
        res.status(500).json({ 
            message: error.message.includes('validation failed') 
                ? 'Invalid email domain' 
                : 'Error creating user',
            error: error.message 
        });
    }
});

// Login endpoint
authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            message: 'Login successful',
            token 
        });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

export { authRouter } ;