import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { handleClientMessage } from "./controller";

dotenv.config();

export const server = () => {
  const PORT = process.env.PORT || 3000;
  const wss = new WebSocketServer({ port: PORT as number });

  wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.on("message", (message) => {
      try {
        const messageStr = message.toString();
        const parsedMessage = JSON.parse(messageStr);
        handleClientMessage(parsedMessage, ws);
      } catch (error) {
        console.error("Failed to process message:", error);
      }
    });
    ws.on("close", () => console.log("Client disconnected"));
  });

  console.log(`WebSocket server started on port ${PORT}`);
};
