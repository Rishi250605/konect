import express from "express";
import cors from "cors";
import http from "http";
import { rootRouter } from "./routes/index.js"; // Ensure correct file extension
import { PORT } from "./config.js"; // Ensure correct file extension

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());


app.use("/api/v1", rootRouter);
console.log("Hello 1");
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app, server };
