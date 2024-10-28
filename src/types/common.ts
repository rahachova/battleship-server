import { WebSocket } from "ws";

export interface IPlayer {
  id: string;
  name: string;
  password: string;
  sessionId: string;
  ws: WebSocket;
}

export interface IRoom {
  roomId: string;
  roomUsers: IPlayer[];
}

export interface IShip {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
}
