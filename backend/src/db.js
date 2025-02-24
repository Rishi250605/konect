import mongoose from "mongoose";
import { monogDbConnectionString } from "./config.js"; 

mongoose.connect(monogDbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
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

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mailid: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                return email.endsWith('@rajalakshmi.edu.in');
            },
            message: 'Email must be from rajalakshmi.edu.in domain'
        }
    },
    yearofstudy: {
        type: Number,
        required: true
    }
});

const CommunitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: {type : String},
  tags: [{ type: String }],
}
);


const User = mongoose.model('User', userSchema);
const Post = mongoose.model("Post", postSchema);
const Community = mongoose.model("Community", CommunitySchema);
export { User, Post,  Community };