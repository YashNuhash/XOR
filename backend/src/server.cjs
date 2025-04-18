const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('XOR Backend is running!');
});

const rooms = {}; // Store room data
const roomCode = {}; // Store code for each room
const roomProfiles = {}; // Store profiles for each room

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", (data) => {
    if (!data || typeof data !== "object" || !data.roomId || !data.name) {
      console.error("Invalid joinRoom payload:", data);
      return;
    }

    const { roomId, name } = data;

    if (!rooms[roomId]) {
      rooms[roomId] = [];
      roomCode[roomId] = ""; // Initialize room code as empty
      roomProfiles[roomId] = {}; // Initialize profiles for the room
    }

    // Join the socket.io room first
    socket.join(roomId);

    // Check if the user is already in the room
    const isUserInRoom = rooms[roomId].some((user) => user.name === name);
    if (!isUserInRoom) {
      const peopleId = (rooms[roomId].length % 4) + 1;
      const newUser = { id: socket.id, name, peopleId };

      rooms[roomId].push(newUser);
      roomProfiles[roomId][socket.id] = { name, peopleId }; // Store profile data

      // Ensure profiles are updated before broadcasting
      io.to(roomId).emit("updateRoom", rooms[roomId]);
      io.to(roomId).emit("updateProfiles", roomProfiles[roomId]); // Send updated profiles

      // Send the current room data and code to the newly connected client
      socket.emit("updateRoom", rooms[roomId]);
      socket.emit("updateProfiles", roomProfiles[roomId]); // Send profiles to the new user
      socket.emit("codeUpdate", roomCode[roomId]);

      console.log(`${name} joined room ${roomId}`);
    } else {
      // If the user is already in the room, send the current room data and profiles
      socket.emit("updateRoom", rooms[roomId]);
      socket.emit("updateProfiles", roomProfiles[roomId]);
      socket.emit("codeUpdate", roomCode[roomId]);
    }
  });

  // Handle code changes
  socket.on("codeChange", ({ roomId, code }) => {
    if (roomCode[roomId] !== undefined) {
      roomCode[roomId] = code; // Update the room's code
      socket.to(roomId).emit("codeUpdate", code); // Broadcast the updated code to others in the room
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((user) => user.id !== socket.id);
      delete roomProfiles[roomId][socket.id]; // Remove profile data

      io.to(roomId).emit("updateRoom", rooms[roomId]);
      io.to(roomId).emit("updateProfiles", roomProfiles[roomId]); // Send updated profiles
    }
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});