import { WebSocket } from "ws";
import { db } from "../db";
import { IRoom } from "../types/common";
import { v4 as uuidv4 } from "uuid";
import { stringifyMessage } from "../utils";
import { IRequestAddUserToRoomData } from "../types/messages";

export const sendAvailableRooms = (ws: WebSocket) => {
  const availableRooms = db.rooms.filter(({ roomUsers }) => {
    return roomUsers.length < 2;
  });

  ws.send(
    stringifyMessage({
      type: "update_room",
      data: availableRooms.map(({ roomId, roomUsers }) => ({
        roomId,
        roomUsers: roomUsers.map(({ name, id }) => ({
          name,
          index: id,
        })),
      })),
      id: 0,
    })
  );
};

export const createRoom = (sessionId: string) => {
  const userToAdd = Object.values(db.players).find(
    (player) => player.sessionId === sessionId
  );

  if (userToAdd) {
    const newRoom: IRoom = {
      roomId: uuidv4(),
      roomUsers: [userToAdd],
    };
    db.rooms.push(newRoom);
  }
};

export const addUserToRoom = (
  { indexRoom }: IRequestAddUserToRoomData,
  ws: WebSocket,
  sessionId: string
) => {
  const roomToAdd = db.rooms.find(({ roomId }) => roomId === indexRoom);
  const userToAdd = Object.values(db.players).find(
    (player) => player.sessionId === sessionId
  );
  if (userToAdd) {
    roomToAdd?.roomUsers.push(userToAdd);
  }
};
