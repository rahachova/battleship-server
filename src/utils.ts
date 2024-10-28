import { IRequestMessage, IResponseMessage } from "./types/messages";
import { RawData } from "ws";

export const parseMessage = (message: RawData): IRequestMessage<unknown> => {
  const messageStr = message.toString();
  const { data, type } = JSON.parse(messageStr);
  return {
    type,
    data: data ? JSON.parse(data) : {},
  };
};

export const stringifyMessage = ({ data, type }: IResponseMessage): string => {
  return JSON.stringify({
    type,
    data: JSON.stringify(data),
  });
};
