//Global Variables
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let boardContainer;
let currentPlayer = "X";
let win = false;
let canClick = true;
let full = true;

//html elements
const playerDetails = document.getElementById("player");
const output = document.getElementById("output");

//Build the board
// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  boardContainer.innerHTML = "";

  for (let i = 0; i < board.length; i += 1) {
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
  document.body.appendChild(boardContainer);
  buildBoard(board);
  playerDetails.innerHTML = `Player: ${currentPlayer}`;
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  playerDetails.innerHTML = `Player: ${currentPlayer}`;
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
      let check = checkForFull(board);
      console.log(full);
      if (win === true) {
        canClick = false;
        output.innerText = `Player with marker, ${currentPlayer}, has won! `;
      }
      if (full === true) {
        output.innerText = `It is a draw! Press refresh to restart `;
      }

      togglePlayer();
    }
  }
};

const checkForWin = (board) => {
  console.log("boardlength", board.length);
  for (let i = 0; i < board.length; i += 1) {
    //check for horizontal
    let h = board[i][0];
    let h2 = board[i][1];
    let h3 = board[i][2];
    if (h === "" && h2 === "" && h3 === "") {
      win = false;
    } else if (h === h2 && h2 === h3) {
      console.log(win);
      win = true;
      break;
    }

    //check for vertical
    let v = board[0][i];
    let v2 = board[1][i];
    let v3 = board[2][i];
    if (v === "" && v2 === "" && v3 === "") {
      win = false;
    } else if (v === v2 && v2 === v3) {
      console.log(win);
      win = true;
      break;
    }
  }

  //check for slanted
  let s = board[0][0];
  let s2 = board[1][1];
  let s3 = board[2][2];
  let sl1 = board[0][2];
  let sl2 = board[2][0];
  if (
    (s === "" && s2 === "" && s3 === "") ||
    (sl1 === "" && s2 === "" && sl2 === "")
  ) {
    win = false;
  } else if ((s === s2 && s2 === s3) || (sl1 === s2 && s2 === sl2)) {
    win = true;
  }
};

const checkForFull = (board) => {
  full = true;
  for (let a = 0; a < board.length; a += 1) {
    for (let b = 0; b < board.length; b += 1) {
      let index = board[a][b];
      if (index === "") {
        full = false;
        break;
      }
    }
  }
};

initGame();
