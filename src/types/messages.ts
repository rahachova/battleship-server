// Login or create player

import { IShip } from "./common";

export interface IRequestLoginData {
  name: string;
  password: string;
  sessionId: string;
}

export interface IRequestAddUserToRoomData {
  indexRoom: string;
}

export interface IRequestAddShipsData {
  gameId: string;
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: "small" | "medium" | "large" | "huge";
    },
  ];
  indexPlayer: string;
}

export interface IResponseStartGameData {
  ships: IShip[];
  currentPlayerIndex: string;
}

export interface IResponseLoginData {
  name: string;
  index?: number | string;
  error?: boolean;
  errorText?: string;
}

export interface IResponseRoomData {
  roomId: string;
  roomUsers: Array<{
    name: string;
    index: string;
  }>;
}

export interface IResponseCreateGameData {
  idGame: string;
  idPlayer: string;
}

export interface IRequestMessage<T> {
  type: "reg" | "create_room" | "add_user_to_room" | "add_ships";
  data: T;
}

export interface IResponseMessage {
  type: "reg" | "update_room" | "create_game" | "start_game";
  data:
    | IResponseLoginData
    | IResponseRoomData[]
    | IResponseCreateGameData
    | IResponseStartGameData;
  id: 0;
}
