export interface IPlayer {
  id: string;
  name: string;
  password: string;
  sessionId: string;
}

export interface IRoom {
  roomId: string;
  roomUsers: IPlayer[];
}
