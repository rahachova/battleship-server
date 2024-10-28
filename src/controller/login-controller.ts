import { IRequestLoginData } from "../types/messages";
import { db } from "../db";
import { v4 as uuidv4 } from "uuid";
import { WebSocket } from "ws";
import { stringifyMessage } from "../utils";

export const handleLoginMessage = (
  { name, password }: IRequestLoginData,
  ws: WebSocket,
  sessionId: string
) => {
  if (db.players[name]) {
    const player = db.players[name];
    if (password === player.password) {
      player.sessionId = sessionId;
      player.ws = ws;
      ws.send(
        stringifyMessage({
          type: "reg",
          data: { name, index: player.id, error: false },
          id: 0,
        })
      );

      console.log(`Player ${name} logged in`);
    } else {
      ws.send(
        stringifyMessage({
          type: "reg",
          data: {
            name,
            error: true,
            errorText: "Invalid password",
          },
          id: 0,
        })
      );
      console.log(`Invalid password for player ${name}`);
    }
  } else {
    const newUserId = addNewUser({ name, password, sessionId }, ws);

    if (newUserId) {
      ws.send(
        stringifyMessage({
          type: "reg",
          data: { name, index: newUserId, error: false },
          id: 0,
        })
      );

      console.log(`Player ${name} registred andlogged in`);
    } else {
      ws.send(
        stringifyMessage({
          type: "reg",
          data: {
            name,
            error: true,
            errorText: "Invalid user data",
          },
          id: 0,
        })
      );

      console.log(`Invalid user data for player ${name}`);
    }
  }
};

const addNewUser = (
  { name, password, sessionId }: IRequestLoginData,
  ws: WebSocket
): string | void => {
  if (name && password) {
    const newPlayerId = uuidv4();

    db.players[name] = {
      id: newPlayerId,
      name,
      password: password,
      sessionId,
      ws,
    };

    return newPlayerId;
  }
};
