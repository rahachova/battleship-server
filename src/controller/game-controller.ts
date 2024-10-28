import { db } from "../db";
import { WebSocket } from "ws";
import { stringifyMessage } from "../utils";
import { IRequestAddShipsData } from "../types/messages";
import { IPlayer } from "../types/common";

export const createGame = (gameId: string, players: IPlayer[]) => {
  db.games[gameId] = {
    players,
    ships: {},
  };
};

export const addShips = ({
  gameId,
  ships,
  indexPlayer,
}: IRequestAddShipsData) => {
  const activeGame = db.games[gameId];
  activeGame.ships[indexPlayer] = ships;
  if (Object.keys(activeGame.ships).length === 2) {
    activeGame.players.forEach(({ ws, sessionId }) => {
      ws.send(
        stringifyMessage({
          type: "start_game",
          data: {
            currentPlayerIndex: sessionId,
            ships: activeGame.ships[sessionId],
          },
          id: 0,
        })
      );
    });
  }
};
