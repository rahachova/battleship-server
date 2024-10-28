import { IShip, IPlayer, IRoom } from "./common";

export interface IDataBase {
  players: Record<string, IPlayer>;
  games: Record<
    string,
    {
      players: IPlayer[];
      ships: Record<string, IShip[]>;
    }
  >;
  rooms: IRoom[];
}
