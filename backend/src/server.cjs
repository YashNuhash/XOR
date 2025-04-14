const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity
    methods: ["GET", "POST"],
  },
});

const rooms = {}; // Store room data

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", ({ roomId, name }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    // Check if the user is already in the room
    const isUserInRoom = rooms[roomId].some((user) => user.name === name);
    if (!isUserInRoom) {
      // Assign a peopleId based on the number of members
      const peopleId = (rooms[roomId].length % 4) + 1;
      const newUser = { id: socket.id, name, peopleId };

      rooms[roomId].push(newUser);

      // Notify all clients in the room
      io.to(roomId).emit("updateRoom", rooms[roomId]);

      // Send the current room data to the newly connected client
      socket.emit("updateRoom", rooms[roomId]);

      // Join the socket.io room
      socket.join(roomId);
      console.log(`${name} joined room ${roomId}`);
    } else {
      // If the user is already in the room, send the current room data
      socket.emit("updateRoom", rooms[roomId]);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((user) => user.id !== socket.id);
      io.to(roomId).emit("updateRoom", rooms[roomId]);
    }
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});