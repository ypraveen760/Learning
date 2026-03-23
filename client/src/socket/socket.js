import { io } from "socket.io-client";
import baseUrl from "../config/urls";

let socket = null;

const getSocket = () => {
  if (!socket) {
    socket = io(baseUrl, {
      withCredentials: true,
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
};

export default getSocket;
