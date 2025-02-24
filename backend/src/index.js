import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Import it here
import { rootRouter } from "./routes/index.js"; // Ensure correct file extension
// import { PORT } from "./config.js"; // Ensure correct file extension

const PORT = 5000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// ✅ Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve 'uploads' folder correctly
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); 

// API routes
app.use("/api/v1", rootRouter);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app, server };
