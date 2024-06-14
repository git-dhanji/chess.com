const socket = io();
const chess = new Chess();

const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";
  board.forEach((row, rowIndex) => {
    row.forEach((squire, squireIndex) => {
      const squireElement = document.createElement("div");
      squireElement.classList.add(
        "squire",
        // for making pettern black white black white
        (rowIndex + squireIndex) % 2 == 0 ? "light" : "dark"
      );

      squireElement.dataset.row = rowIndex;
      squireElement.dataset.col = squireIndex;
      if (squire) {
        const pieceElement = document.createElement("div");

        pieceElement.classList.add(
          "piece",
          squire.color === "w" ? "white" : "black"
        );

        pieceElement.innerText = "";
        pieceElement.draggable = playerRole === squire.color;
        pieceElement.addEventListener("dragstart", (e) => {
          if (pieceElement.draggable) {
            draggedPiece = pieceElement;
            sourceSquare = { row: rowIndex, col: squireIndex };
            e.dataTransfer.setData("text/plain", "");
          }
        });

        pieceElement.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });

        squireElement.appendChild(pieceElement);
      }

      squireElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      squireElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
          const targetSquare = {
            row: parseInt(squireElement.dataset.row),
            col: parseInt(squireElement.dataset.col),
          };
        }
        handleMove(sourceSquare, targetSquare);
      });
    boardElement.appendChild(squireElement)
    });
  });
};

renderBoard();

const handleMove = () => {};
const getPieceUnicode = () => {};
