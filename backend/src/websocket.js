const WebSocket = require("ws");
const { server } = require("./index");
const { Post } = require("./db");

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send existing posts to the new client
  Post.find().then((posts) => {
    ws.send(JSON.stringify({ type: "initial_posts", data: posts }));
  });

  // Handle messages from clients
  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "new_post") {
        const newPost = new Post({
          image: data.image,
          title: data.title,
          body: data.body,
          tag: data.tag,
        });
        await newPost.save();

        // Broadcast new post to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "new_post", data: newPost }));
          }
        });
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});
