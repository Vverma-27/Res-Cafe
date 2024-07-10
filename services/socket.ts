import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "ws://localhost:3000/";

export const getSocket = (table: string | number, clientName: string) =>
  io(URL, {
    reconnectionDelayMax: 10000,
    autoConnect: false,
    query: {
      table: `${table}`,
      name: `${clientName}`,
    },
    transports: ["websocket", "polling"],
  });
