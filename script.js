//Global Variables
let board = [];
let boardSize = 3;

let boardContainer;
let currentPlayer = "X";
let win = false;
let canClick = true;
let full = true;

//html elements
const playerDetails = document.getElementById("player");
const output = document.getElementById("output");
const body = document.getElementById("body");
output.innerText =
  "Please enter the number of rows for your tic tac toe you want to play";

//input for number of board size
const inputField = document.createElement("div");
inputField.setAttribute("id", "input-field");
body.appendChild(inputField);
const boardNumber = document.createElement("INPUT");
boardNumber.setAttribute("type", "number");
boardNumber.min = 3;
boardNumber.max = 5;
inputField.appendChild(boardNumber);
const boardNumberBtn = document.createElement("button");
boardNumberBtn.innerHTML = "Submit";
inputField.appendChild(boardNumberBtn);

//Build the board
// completely rebuilds the entire board every time there's a click

const createBoardSize = () => {
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push("");
    }
  }
};

const buildBoard = (board) => {
  boardContainer.innerHTML = "";

  for (let i = 0; i < boardSize; i += 1) {
    const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    for (let j = 0; j < row.length; j += 1) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.innerText = board[i][j];
      rowElement.appendChild(square);
      square.addEventListener("click", () => {
        squareClick(i, j);
      });
    }

    boardContainer.appendChild(rowElement);
  }
};

const initGame = () => {
  boardContainer = document.createElement("div");
  boardContainer.classList.add("container");
  body.appendChild(boardContainer);
  createBoardSize();
  buildBoard(board);
  playerDetails.innerHTML = `Player: ${currentPlayer}`;
  output.innerText =
    "Please click the box that you want to play.\n You will be playing against the computer";
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
    canClick = false;
    playerDetails.innerHTML = `Computer Turn: O `;
    setTimeout(function () {
      canClick = true;
      getRandomSquare();
      currentPlayer = "X";
      playerDetails.innerText = "Player's Turn: X ";
    }, 400);
  }
};

const squareClick = (column, row) => {
  if (canClick === false) {
    return;
  }

  if (canClick === true) {
    if (board[column][row] === "") {
      board[column][row] = currentPlayer;
      buildBoard(board);
      checkForWin(board);
      checkForFull(board);
      if (win === true) {
        canClick = false;
        output.innerText = `Player with marker, ${currentPlayer}, has won! `;
      }
      if (full === true && win === false) {
        output.innerText = `It is a draw! Press refresh to restart `;
      }
      if (full === false && win === false) {
        togglePlayer();
      }
    }
  }
};

const checkForWin = (board) => {
  for (let i = 0; i < boardSize; i += 1) {
    let row = [];
    let column = [];
    let slant1 = [];
    let slant2 = [];

    for (let v = 0; v < boardSize; v += 1) {
      //for each row
      let squareRow = board[i][v];
      let squareColumn = board[v][i];
      row.push(squareRow);
      column.push(squareColumn);

      let base = board[0 + v][0 + v];
      slant1.push(base);
      let top = board[boardSize - 1 - v][0 + v];
      slant2.push(top);
    }

    if (
      (row.includes("") === false && row.includes("X") === false) ||
      (row.includes("") === false && row.includes("O") === false) ||
      (column.includes("") === false && column.includes("O") === false) ||
      (column.includes("") === false && column.includes("X") === false) ||
      (slant1.includes("") === false && slant1.includes("X") === false) ||
      (slant2.includes("") === false && slant2.includes("X") === false) ||
      (slant1.includes("") === false && slant1.includes("O") === false) ||
      (slant2.includes("") === false && slant2.includes("O") === false)
    ) {
      win = true;
      break;
    } else {
      win = false;
    }
  }
};

const checkForFull = (board) => {
  full = true;
  for (let a = 0; a < boardSize; a += 1) {
    for (let b = 0; b < boardSize; b += 1) {
      let index = board[a][b];
      if (index === "") {
        full = false;
        break;
      }
    }
  }
};

const restartGame = () => {
  board = [];
  createBoardSize();
  buildBoard(board);
  canClick = true;
  win = false;
  output.innerText =
    "Please click the box that you want to play.\n You will be playing against the computer";
};

const getRandomIndex = (max) => Math.floor(Math.random() * max);

const getRandomSquare = () => {
  while (full === false) {
    console.log(boardSize * boardSize);
    let num = getRandomIndex(boardSize);
    let num2 = getRandomIndex(boardSize);
    console.log(num);
    console.log(num2);

    if (board[num][num2] === "") {
      squareClick(num, num2);
      break;
    }
  }
};

boardNumberBtn.addEventListener("click", function () {
  boardSize = boardNumber.value;
  if (boardSize <= 5 && boardSize >= 3) {
    inputField.remove();
    const restartDiv = document.createElement("div");
    restartDiv.setAttribute("id", "restart");
    body.appendChild(restartDiv);
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart";
    restartBtn.addEventListener("click", restartGame);
    restartDiv.appendChild(restartBtn);

    initGame();
  } else {
    output.innerText = "Please input 3-5 only.";
  }
});
