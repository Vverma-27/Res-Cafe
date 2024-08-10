import { Socket, io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? `https://${location?.host.split(".")[0]}.api.${location?.host
        .split(".")
        .slice(1)
        .join(".")}/`
    : "ws://localhost:3000/";
// let restSocket: Socket | null = null; // Declare restSocket outside the function scope

// Function to get the socket connection
export const getDefaultSocket = (restaurant: string) => {
  // Connect to the default namespace to initiate the namespace creation/joining process
  const defaultSocket = io(URL || "", {
    reconnectionDelayMax: 10000,
    autoConnect: false,
    query: {
      restaurant,
    },
    transports: ["websocket", "polling"],
  });
  // restSocket.connect();

  // Handle the event when connected to the default namespace

  // // Handle errors in the default namespace
  // defaultSocket.on("error", (error) => {
  //   console.error(
  //     `Error in default namespace for restaurant: ${restaurant}`,
  //     error
  //   );
  // });

  return defaultSocket; // Return the restaurant socket (initially null, updated asynchronously)
};
export const getRestaurantSocket = (
  restaurant: string,
  table: any,
  clientName: string
) => {
  // Connect to the default namespace to initiate the namespace creation/joining process
  const restSocket = io(`${URL || ""}${restaurant}`, {
    reconnectionDelayMax: 10000,
    autoConnect: false, // Automatically reconnect if disconnected
    query: {
      table: `${table}`,
      name: `${clientName}`,
    },
    transports: ["websocket", "polling"],
    forceNew: true,
  });
  // restSocket.connect();

  // Handle the event when connected to the default namespace

  // // Handle errors in the default namespace
  // defaultSocket.on("error", (error) => {
  //   console.error(
  //     `Error in default namespace for restaurant: ${restaurant}`,
  //     error
  //   );
  // });

  return restSocket; // Return the restaurant socket (initially null, updated asynchronously)
};
