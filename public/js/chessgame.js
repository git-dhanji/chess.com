const { Chess } = require("chess.js");

const socket = io();
const chess = new Chess();

socket.emit("emit_init");
