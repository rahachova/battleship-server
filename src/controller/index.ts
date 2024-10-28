import { WebSocket } from "ws";
import {
  IRequestMessage,
  IRequestLoginData,
  IRequestAddUserToRoomData,
  IRequestAddShipsData,
} from "../types/messages";
import { handleLoginMessage } from "./login-controller";
import { db } from "../db";
import {
  addUserToRoom,
  createRoom,
  sendAvailableRooms,
} from "./room-controller";
import { addShips } from "./game-controller";

export const handleClientMessage = (
  { type, data }: IRequestMessage<unknown>,
  ws: WebSocket,
  sessionId: string,
  broadcast: (message: string) => void
) => {
  try {
    switch (type) {
      case "reg":
        handleLoginMessage(data as IRequestLoginData, ws, sessionId);
        sendAvailableRooms(broadcast);
        break;
      case "create_room":
        createRoom(sessionId);
        sendAvailableRooms(broadcast);
        break;
      case "add_user_to_room":
        addUserToRoom(data as IRequestAddUserToRoomData, sessionId);
        sendAvailableRooms(broadcast);
        break;
      case "add_ships":
        addShips(data as IRequestAddShipsData);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(`Failed to parse ${type} event data:`, error);
  }
};
