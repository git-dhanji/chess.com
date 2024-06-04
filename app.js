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
let currentPlayers = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Multi chess game " });
});

// io is on here
io.on("connection", (socket) => {
  console.log("connected");  


  socket.on('disconnect',()=>{
    console.log('disconnected',)
  })

  socket.on('reply',()=>{
    socket.emit("reply send successfully")
  })
  
});

server.listen(port, () => {
  console.log(`server is runnig on port ${port}`);
});
