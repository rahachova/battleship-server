import { WebSocket } from "ws";
import { IRequestMessage, IRequestLoginData } from "../types/messages";
import { handleLoginMessage } from "./login-controller";
import { db } from "../db";

export const handleClientMessage = (
  { type, data }: IRequestMessage,
  ws: WebSocket
) => {
  try {
    switch (type) {
      case "reg":
        handleLoginMessage(data, ws);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(`Failed to parse ${type} event data:`, error);
  }

  ws.on("close", () => {
    handleClientDisconnect(data, ws);
  });
};

const handleClientDisconnect = ({ name }: IRequestLoginData, ws: WebSocket) => {
  if (db.players[name]) {
    db.players[name].isActive = false;
    console.log(`Player ${name} logged out`);
  }
};
