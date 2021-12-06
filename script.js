const board = [];
let boardContainer = document.getElementById("ticTacToe");
let boardElement;
let boardLength = 0;

let roundWon = false;

let leftSquareCount;
let rightSquareCount;
let topSquareCount;
let bottomSquareCount;

let verticalCount;
let horizontalCount;
let topLeftToBottomRightCount;
let bottomLeftToTopRightCount;

let squareWinCount = 0;
let currentPlayer = "X";

let availableSquareIds = [];

document.getElementById("boardLengthInput").addEventListener("keyup", () => {
  let boardLengthInput = parseInt(
    document.getElementById("boardLengthInput").value
  );
  let noOfSquaresInput = parseInt(
    document.getElementById("noOfSquaresInput").value
  );

  if (
    boardLengthInput.length !== 0 &&
    noOfSquaresInput.length !== 0 &&
    noOfSquaresInput <= boardLengthInput
  ) {
    document.getElementById("start").disabled = false;
  } else {
    document.getElementById("start").disabled = true;
  }
});

document.getElementById("noOfSquaresInput").addEventListener("keyup", () => {
  let boardLengthInput = parseInt(
    document.getElementById("boardLengthInput").value
  );
  let noOfSquaresInput = parseInt(
    document.getElementById("noOfSquaresInput").value
  );

  if (
    boardLengthInput.length !== 0 &&
    noOfSquaresInput.length !== 0 &&
    noOfSquaresInput <= boardLengthInput
  ) {
    document.getElementById("start").disabled = false;
  } else {
    document.getElementById("start").disabled = true;
  }
});

document.getElementById("start").addEventListener("click", () => {
  document.getElementById("userInput").style.display = "none";
  document.getElementById("ticTacToe").style.display = "";

  boardLength = document.getElementById("boardLengthInput").value;

  buildBoard(boardLength);
  squareWinCount = parseInt(document.getElementById("noOfSquaresInput").value);
});

const buildBoard = (boardLength) => {
  // start with an empty container
  boardContainer.innerHTML = "";
  boardElement = document.createElement("div");
  boardElement.classList.add("board");

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < boardLength; i += 1) {
    // separate var for one row / row element
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    rowElement.classList.add("flex");

    let boardRow = [];

    // set each square
    // j is the column number
    for (let j = 0; j < boardLength; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("marker");
      square.id = `${i}|${j}`;

      availableSquareIds.push(square.id);

      // set the text of the square according to the array
      square.innerHTML = "";
      boardRow.push("");

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener("click", (event) => {
        if (event.target.innerHTML == "") {
          squareClick(event.target.id, i, j);
        }
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
    board.push(boardRow);
  }
};

const squareClick = (squareId, row, column) => {
  // see if the clicked square has been clicked on before
  if (!roundWon) {
    availableSquareIds.splice(availableSquareIds.indexOf(squareId), 1);
    document.getElementById(squareId).innerText = currentPlayer;

    if (currentPlayer === "X") {
      document.getElementById(squareId).classList.add("red");
    } else {
      // row is -1 and col is -1
      // squareId contains the row and col
      const rowCol = squareId.split("|");
      row = rowCol[0];
      column = rowCol[1];
      document.getElementById(squareId).classList.add("green");
    }

    board[row][column] = currentPlayer;
    checkWinner(row, column);
    togglePlayer();
    makeAMoveIfComputer();
  }
};

const makeAMoveIfComputer = () => {
  console.log("inside makeAMoveIfComputer");
  if (currentPlayer === "O") {
    // make a random choice that has not been taken
    let squareIsEmpty = false;

    while (!squareIsEmpty) {
      // decide a random row and column
      const randomId = Math.floor(Math.random() * availableSquareIds.length);
      console.log(
        "🚀 ~ file: script.js ~ line 150 ~ makeAMoveIfComputer ~ randomId",
        randomId
      );
      console.log(`availableSquareIds: ${availableSquareIds}`);
      console.log(
        `availableSquareIds[randomId]: ${availableSquareIds[randomId]}`
      );

      if (
        document.getElementById(availableSquareIds[randomId]).innerHTML == ""
      ) {
        squareClick(availableSquareIds[randomId], -1, -1);
        squareIsEmpty = true;
      }
    }
  }
};

const togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

// check up and down to find matches
const checkVertical = (row, column, counter) => {
  let currentForwardSquare;
  let currentReverseSquare;

  let previousForwardSquare;
  let previousReverseSquare;

  let startForwardRow = row + counter;
  let startReverseRow = row - counter;

  if (board[startForwardRow] !== undefined) {
    previousForwardSquare = board[startForwardRow][column];
    row = startForwardRow + 1;

    if (row < boardLength && board[row] !== undefined) {
      currentForwardSquare = board[row][column];

      if (
        currentForwardSquare == previousForwardSquare &&
        currentForwardSquare !== ""
      ) {
        verticalCount++;

        if (verticalCount == squareWinCount) {
          roundWon = true;
        }
      }
    }
  }

  if (board[startReverseRow] !== undefined) {
    previousReverseSquare = board[startReverseRow][column];
    row = startReverseRow - 1;

    if (row >= 0 && board[row] !== undefined) {
      currentReverseSquare = board[row][column];

      if (
        currentReverseSquare == previousReverseSquare &&
        currentReverseSquare !== ""
      ) {
        verticalCount++;

        if (verticalCount == squareWinCount) {
          roundWon = true;
        }
      }
    }
  }
};

// check left and right to find matches
const checkHorizontal = (row, column, counter) => {
  let currentForwardSquare;
  let currentReverseSquare;

  let previousForwardSquare;
  let previousReverseSquare;

  let startForwardColumn = column + counter;
  let startReverseColumn = column - counter;

  previousForwardSquare = board[row][startForwardColumn];
  column = startForwardColumn + 1;

  if (column < boardLength) {
    currentForwardSquare = board[row][column];

    if (
      currentForwardSquare == previousForwardSquare &&
      currentForwardSquare !== ""
    ) {
      horizontalCount++;

      if (horizontalCount == squareWinCount) {
        roundWon = true;
      }
    }
  }

  previousReverseSquare = board[row][startReverseColumn];
  column = startReverseColumn - 1;

  if (column >= 0) {
    currentReverseSquare = board[row][column];

    if (
      currentReverseSquare == previousReverseSquare &&
      currentReverseSquare !== ""
    ) {
      horizontalCount++;

      if (horizontalCount == squareWinCount) {
        roundWon = true;
      }
    }
  }
};

// check from top left to bottom right to find matches
const checkDiagonalTopLeftToBottomRight = (row, column, counter) => {
  let currentForwardSquare;
  let currentReverseSquare;

  let previousForwardSquare;
  let previousReverseSquare;

  let startForwardRow = row + counter;
  let startForwardColumn = column + counter;

  let startReverseRow = row - counter;
  let startReverseColumn = column - counter;

  if (board[startForwardRow] !== undefined) {
    previousForwardSquare = board[startForwardRow][startForwardColumn];
    row = startForwardRow + 1;
    column = startForwardColumn + 1;

    if (row < boardLength && column < boardLength && board[row] !== undefined) {
      currentForwardSquare = board[row][column];

      if (
        currentForwardSquare == previousForwardSquare &&
        currentForwardSquare !== ""
      ) {
        topLeftToBottomRightCount++;

        if (topLeftToBottomRightCount == squareWinCount) {
          roundWon = true;
        }
      }
    }
  }

  if (board[startReverseRow] !== undefined) {
    previousReverseSquare = board[startReverseRow][startReverseColumn];
    row = startReverseRow - 1;
    column = startReverseColumn - 1;

    if (row >= 0 && column >= 0 && board[row] !== undefined) {
      currentReverseSquare = board[row][column];

      if (
        currentReverseSquare == previousReverseSquare &&
        currentReverseSquare !== ""
      ) {
        topLeftToBottomRightCount++;

        if (topLeftToBottomRightCount == squareWinCount) {
          roundWon = true;
        }
      }
    }
  }
};

// check from bottom left to top right to find matches
const checkDiagonalBottomLeftToTopRight = (row, column, counter) => {
  let currentForwardSquare;
  let currentReverseSquare;

  let previousForwardSquare;
  let previousReverseSquare;

  let startForwardRow = row - counter;
  let startForwardColumn = column + counter;

  let startReverseRow = row + counter;
  let startReverseColumn = column - counter;

  if (board[startForwardRow] !== undefined) {
    previousForwardSquare = board[startForwardRow][startForwardColumn];
    row = startForwardRow - 1;
    column = startForwardColumn + 1;

    if (row >= 0 && column < boardLength && board[row] !== undefined) {
      currentForwardSquare = board[row][column];

      if (
        currentForwardSquare == previousForwardSquare &&
        currentForwardSquare !== ""
      ) {
        bottomLeftToTopRightCount++;

        if (bottomLeftToTopRightCount == squareWinCount) {
          roundWon = true;
        }
      }
    }
  }

  if (board[startReverseRow] !== undefined) {
    previousReverseSquare = board[startReverseRow][startReverseColumn];
    row = startReverseRow + 1;
    column = startReverseColumn - 1;

    if (row < boardLength && column >= 0 && board[row] !== undefined) {
      currentReverseSquare = board[row][column];

      if (
        currentReverseSquare == previousReverseSquare &&
        currentReverseSquare !== ""
      ) {
        bottomLeftToTopRightCount++;

        if (bottomLeftToTopRightCount == squareWinCount) {
          roundWon = true;
        }
      }
    }
  }
};

const checkWinner = (row, column) => {
  console.log("inside checkWinner");
  console.log(`currentPlayer: ${currentPlayer}`);
  console.log("🚀 ~ file: script.js ~ line 393 ~ checkWinner ~ row", row);
  console.log("🚀 ~ file: script.js ~ line 393 ~ checkWinner ~ column", column);
  // everytime user clicks a box, check 360 degrees
  // for all boxes up till squareWinCount to find matches
  topLeftToBottomRightCount = 1;
  bottomLeftToTopRightCount = 1;
  verticalCount = 1;
  horizontalCount = 1;

  for (let counter = 0; counter < squareWinCount; counter++) {
    checkVertical(row, column, counter);
    checkHorizontal(row, column, counter);
    checkDiagonalTopLeftToBottomRight(row, column, counter);
    checkDiagonalBottomLeftToTopRight(row, column, counter);
  }

  console.log(
    "🚀 ~ file: script.js ~ line 399 ~ checkWinner ~ topLeftToBottomRightCount",
    topLeftToBottomRightCount
  );
  console.log(
    "🚀 ~ file: script.js ~ line 401 ~ checkWinner ~ bottomLeftToTopRightCount",
    bottomLeftToTopRightCount
  );
  console.log(
    "🚀 ~ file: script.js ~ line 403 ~ checkWinner ~ verticalCount",
    verticalCount
  );
  console.log(
    "🚀 ~ file: script.js ~ line 405 ~ checkWinner ~ horizontalCount",
    horizontalCount
  );
};
