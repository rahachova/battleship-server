import { WebSocket } from "ws";
import {
  IRequestMessage,
  IRequestLoginData,
  IRequestAddUserToRoomData,
} from "../types/messages";
import { handleLoginMessage } from "./login-controller";
import { db } from "../db";
import {
  addUserToRoom,
  createRoom,
  sendAvailableRooms,
} from "./room-controller";

export const handleClientMessage = (
  { type, data }: IRequestMessage<unknown>,
  ws: WebSocket,
  sessionId: string
) => {
  try {
    switch (type) {
      case "reg":
        handleLoginMessage(data as IRequestLoginData, ws, sessionId);
        sendAvailableRooms(ws);
        break;
      case "create_room":
        createRoom(sessionId);
        sendAvailableRooms(ws);
        break;
      case "add_user_to_room":
        addUserToRoom(data as IRequestAddUserToRoomData, ws, sessionId);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(`Failed to parse ${type} event data:`, error);
  }
};

// const handleClientDisconnect = ({ name }: IRequestLoginData, ws: WebSocket) => {
//   if (db.players[name]) {
//     db.players[name].isActive = false;
//     console.log(`Player ${name} logged out`);
//   }
// };
