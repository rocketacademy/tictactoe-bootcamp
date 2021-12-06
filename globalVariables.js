let board = [];

let boardSize = 3; // default

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = -1;

let winner = null;

const boardContentsMap = {
  "-1": "O",
  0: "",
  1: "X",
  // javascript doesn't like having negative integers as object keys
  // so remember to use parseInt leter on in the code
  // at least for the "-1"
};

const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
