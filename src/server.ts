import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { handleClientMessage } from "./controller";
import { parseMessage } from "./utils";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export const server = () => {
  const PORT = process.env.PORT || 3000;
  const wss = new WebSocketServer({ port: PORT as number });

  function broadcast(message: string) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  wss.on("connection", (ws, req) => {
    const sessionId = uuidv4();
    console.log("New client connected");
    ws.on("message", (message) => {
      try {
        const parsedMessage = parseMessage(message);
        handleClientMessage(parsedMessage, ws, sessionId, broadcast);
      } catch (error) {
        console.error("Failed to process message:", error);
      }
    });
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`WebSocket server started on port ${PORT}`);
};
