import { io } from "socket.io-client";

export let socket; // Declare a shared socket instance

export const initSocket = async () => {
  if (!socket) {
    const options = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, options);
  }
  return socket;
};