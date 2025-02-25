import express from 'express';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import { PORT } from './config.js';
import { authRouter } from './routes/auth.js';
import { rootRouter } from './routes/index.js';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', rootRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/konect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

console.log("Hello 1");
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app, server };
