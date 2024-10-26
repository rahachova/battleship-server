import { IPlayer } from "./types/common";

interface IDataBase {
  players: Record<string, IPlayer>;
}

export const db: IDataBase = {
  players: {},
};
