// Please implement exercise logic here
// keep data about the game in a 2-D array
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = "X";

const squareClick = (column, row) => {
  console.log("coordinates", column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === "") {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // change the player
    togglePlayer();
  }
};

const checkWin = (board) => {
  let checkVertical = Array(board.length).fill(true);
  let checkDiagonal = Array(2).fill(true);

  for (let i = 0; i < board.length; i++) {
    let rowElement = board[i];
    let checkHorizontal = [...new Set(rowElement)];
    // Check horizontal win
    if (checkHorizontal.length === 1 && checkHorizontal[0] != "") {
      return true;
    }

    for (let j = 0; j < board.length; j++) {
      // Check vertical for diff character
      if (board[i][j] == "") {
        checkVertical[j] = false;
      } else if (i != 0 && board[i][j] != board[i - 1][j]) {
        checkVertical[j] = false;
      }

      // Check diagonal for diff character
      if (i === j) {
        if (board[i][j] == "") {
          checkDiagonal[0] = false;
        } else if (i != 0 && board[i][j] != board[i - 1][j - 1]) {
          checkDiagonal[0] = false;
        }
      } else if (i + j + 1 === board.length) {
        if (board[i][j] == "") {
          checkDiagonal[1] = false;
        } else if (i != 0 && board[i][j] != board[i - 1][j + 1]) {
          checkDiagonal[1] = false;
        }
      }
    }
  }

  if (checkVertical.indexOf(true) != -1 || checkDiagonal.indexOf(true) != -1) {
    // console.log(checkVertical);
    // console.log(checkDiagonal);
    return true;
  }

  return false;
};

const printMessage = (board) => {
  if (checkWin(board)) {
    console.log("WINNNNNNNNNNN");
    console.log(board);
    const message = document.createElement("p");
    message.innerText = "Someone won!";
    const allsquares = document.getElementsByClassName("square");
    for (let i = 0; i < allsquares.length; i++) {
      allsquares[i].classList.add("disable-click");
    }
  }
};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = "";
  boardElement = document.createElement("div");
  boardElement.classList.add("board");

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener("click", () => {
        squareClick(i, j);
      });

      square.addEventListener("click", () => {
        printMessage(board);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement("div");
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();
