import { IPlayer } from "./types/common";
import { IDataBase } from "./types/db";

export const db: IDataBase = {
  players: {},
  games: {},
  rooms: [],
};
