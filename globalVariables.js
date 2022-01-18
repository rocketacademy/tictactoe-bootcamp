let board = [];

let boardSize = -1;

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
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", () => {
  resetBoard();
});

const initializationDiv = document.createElement("div");
initializationDiv.classList.add("initializationDiv");
initializationDiv.innerText =
  "How many rows and columns would you like to have?\nEnter a numerical value.";

const initializationInputField = document.createElement("input");
initializationInputField.id = "initializationInputField";
initializationInputField.classList.add("initializationInputField");

initializationDiv.appendChild(initializationInputField);
