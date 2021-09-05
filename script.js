// Please implement exercise logic here
// Please implement exercise logic here
// GLOBAL VARIABLES
// keep data about the game in a 2-D array
let board = [
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

//message display
let message;

//HELPER FUNCTIONS
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
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

//GAME INITIALIZATION LOGIC
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement("div");
  document.body.appendChild(boardContainer);

  message = document.createElement("p");
  document.body.appendChild(message);

  // build the board - right now it's empty
  buildBoard(board);
};

//GAMEPLAY LOGIC
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

const squareClick = (column, row) => {
  console.log("coordinates", column, row);

  message.innerHTML = "";

  // see if the clicked square has been clicked on before
  if (board[column][row] === "") {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the Screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    if (checkWin(board) === true) {
      //display the result
      message.innerHTML = `The game have ended, the winner is Player ${currentPlayer}!!`;

      //display the meesage to restart
      setTimeout(() => {
        board = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
        buildBoard(board);
        message.innerHTML = `Restarting the game... click a square to start!`;
      }, 2000);
    } else {
      togglePlayer();
    }
  }
};

const checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions

  //need to make sure the board element is not empty

  //first row
  if (
    board[0][0] != "" &&
    board[0][0] === board[0][1] &&
    board[0][1] === board[0][2]
  ) {
    return true;
  }

  //second row
  if (
    board[1][0] != "" &&
    board[1][0] === board[1][1] &&
    board[1][1] === board[1][2]
  ) {
    return true;
  }

  //third row
  if (
    board[2][0] != "" &&
    board[2][0] === board[2][1] &&
    board[2][1] === board[2][2]
  ) {
    return true;
  }

  //first column
  if (
    board[0][0] != "" &&
    board[0][0] === board[1][0] &&
    board[1][0] === board[2][0]
  ) {
    return true;
  }

  //second column
  if (
    board[0][1] != "" &&
    board[0][1] === board[1][1] &&
    board[1][1] === board[2][1]
  ) {
    return true;
  }

  //third column
  if (
    board[0][2] != "" &&
    board[0][2] === board[1][2] &&
    board[1][2] === board[2][2]
  ) {
    return true;
  }

  //diagonal down from left to right
  if (
    board[0][0] != "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }

  //diagonal up from left to right
  if (
    board[2][0] != "" &&
    board[2][0] === board[1][1] &&
    board[1][1] === board[0][2]
  ) {
    return true;
  }

  return false;
};

initGame();
