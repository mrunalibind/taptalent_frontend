import { io } from "socket.io-client";

// TODO: change this to the production URL when deploying
const SOCKET_URL = "https://taptalent-backend.onrender.com";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});