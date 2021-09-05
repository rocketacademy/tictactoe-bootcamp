// GLOBAL VARIABLES

//board size
let boardSize;

//input for board size
let boardSizeInput;

//submit button for board size
let submit;

// keep data about the game in a 2-D array
let board = [];
// let board = [
//   ["", "", ""],
//   ["", "", ""],
//   ["", "", ""],
// ];

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

  boardSizeInput = document.createElement("input");
  document.body.appendChild(boardSizeInput);

  submit = document.createElement("button");
  document.body.appendChild(submit);
  submit.innerHTML = "Submit the board size";

  submit.addEventListener("click", () => {
    boardSize = Number(boardSizeInput.value);
    console.log(boardSize);
    for (let i = 0; i < boardSize; i += 1) {
      let rowArr = [];
      for (let j = 0; j < boardSize; j += 1) {
        rowArr.push("");
      }
      board.push(rowArr);
      // build the board - right now it's empty
      buildBoard(board);
    }
  });
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

      //display the message to restart
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

  let rowCountX = 0;
  let rowCountO = 0;
  let columnCountX = 0;
  let columnCountO = 0;
  let diagonalUpCountX = 0;
  let diagonalUpCountO = 0;
  let diagonalDownCountX = 0;
  let diagonalDownCountO = 0;

  for (let i = 0; i < board.length; i += 1) {
    rowCountX = 0;
    rowCountO = 0;
    columnCountX = 0;
    columnCountO = 0;
    for (let j = 0; j < board.length; j += 1) {
      //rows
      if (board[i][j] === "X") {
        rowCountX += 1;
      } else if (board[i][j] === "O") {
        rowCountO += 1;
      }

      //columns
      if (board[j][i] === "X") {
        columnCountX += 1;
      } else if (board[j][i] === "O") {
        columnCountO += 1;
      }
      if (
        rowCountX === board.length ||
        rowCountO === board.length ||
        columnCountX === board.length ||
        columnCountO === board.length
      ) {
        return true;
      }
    }

    //diagonal up
    if (board[i][i] === "X") {
      diagonalUpCountX += 1;
    } else if (board[i][i] === "O") {
      diagonalUpCountO += 1;
    }

    //diagonal down
    if (board[i][board.length - 1 - i] === "X") {
      diagonalDownCountX += 1;
    } else if (board[i][board.length - 1 - i] === "O") {
      diagonalDownCountO += 1;
    }
  }

  if (
    diagonalUpCountX === board.length ||
    diagonalUpCountO === board.length ||
    diagonalDownCountX === board.length ||
    diagonalDownCountO === board.length
  ) {
    return true;
  }

  return false;
};

initGame();
