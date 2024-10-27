import { IPlayer, IRoom } from "./common";

export interface IDataBase {
  players: Record<string, IPlayer>;
  rooms: IRoom[];
}
