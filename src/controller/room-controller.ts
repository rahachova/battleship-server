import { WebSocket } from "ws";
import { db } from "../db";
import { IRoom } from "../types/common";
import { v4 as uuidv4 } from "uuid";
import { stringifyMessage } from "../utils";
import { IRequestAddUserToRoomData } from "../types/messages";
import { createGame } from "./game-controller";

export const sendAvailableRooms = (broadcast: (message: string) => void) => {
  const availableRooms = db.rooms.filter(({ roomUsers }) => {
    return roomUsers.length < 2;
  });

  broadcast(
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
  sessionId: string
) => {
  const roomToAdd = db.rooms.find(({ roomId }) => roomId === indexRoom);
  const userToAdd = Object.values(db.players).find(
    (player) => player.sessionId === sessionId
  );

  if (userToAdd) {
    roomToAdd?.roomUsers.push(userToAdd);
  }
  if (roomToAdd?.roomUsers.length === 2) {
    const gameId = uuidv4();
    createGame(gameId, roomToAdd.roomUsers);
    roomToAdd.roomUsers.forEach(({ ws, sessionId }) => {
      ws.send(
        stringifyMessage({
          type: "create_game",
          data: {
            idGame: gameId,
            idPlayer: sessionId,
          },
          id: 0,
        })
      );
    });
  }
};
