import { RawData, WebSocket } from "ws";

export const handleClientMessage = (message: IMessage, ws: WebSocket) => {
  console.log(message);
};
