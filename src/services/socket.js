import { io } from "socket.io-client";

const SOCKET_URL = "https://taptalent-backend.onrender.com"; // change later for production

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});