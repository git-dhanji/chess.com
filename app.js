// import express from "express";
// import http, { createServer } from "http";
// import { Chess } from "chess.js";
// import { Socket } from "socket.io";

const express = require("express");
const { createServer } = require("http");
const { Chess } = require("chess.js");
const socket = require("socket.io");
const path = require("path");

const app = express();

const port = 4000;

// io
const server = createServer(app);
const io = socket(server);

//chess

const chess = new Chess();
let players = {};
let currentPlayers = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Multi chess game " });
});

// when user is connect on io
io.on("connection", (socket) => {
  // socket.id is connected user unique id
  console.log("connected", socket.id);

  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
  }
  // if not black player role
  else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
  } else {
    socket.emit("spectedRole");
  }

  // stop the match if any player disconnect the session
  socket.on("disconnect", () => {
    if (socket.id === players.black) {
      delete players.black;
    } else if (socket.id === players.white) {
      delete players.white;
    }
  });

  // move any chal
  socket.on("move", (move) => {
    try {
      // check which player have turn
      if (chess.turn() === "w" && socket.id !== players.white) return;
      if (chess.turn() === "b" && socket.id !== players.black) return;

      // valid turn so move the turn
      const moveResult = chess.move(move);
    } catch (error) {}
  });
});

server.listen(port, () => {
  console.log(`server is runnig on port ${port}`);
});
