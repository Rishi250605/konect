import mongoose from "mongoose";
import { mongoDbConnectionString } from "./config.js"; 
import { User } from './models/User.js';

mongoose.connect(mongoDbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected"));

// Define Post Schema
const postSchema = new mongoose.Schema({
  image: { type: String, default: null },
  title: { type: String, required: true },
  body: { type: String, required: true },
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Referencing User
  tags: [{ type: String }], // Tags for filtering
  createdAt: { type: Date, default: Date.now },
});

const CommunitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: {type : String},
  tags: [{ type: String }],
});

const Post = mongoose.model("Post", postSchema);
const Community = mongoose.model("Community", CommunitySchema);

export { User, Post, Community };