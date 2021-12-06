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

      // set the text of the square according to the array
      square.innerHTML = "";
      boardRow.push("");

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener("click", (event) => {
        squareClick(event, i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
    board.push(boardRow);
  }
};

const squareClick = (event, row, column) => {
  // see if the clicked square has been clicked on before
  if (!roundWon) {
    if (board[row][column] === "") {
      // alter the data array, set it to the current player
      board[row][column] = currentPlayer;

      // refresh the screen with a new board
      // according to the array that was just changed
      // buildBoard(board);
      event.target.innerText = currentPlayer;

      if (currentPlayer === "X") {
        event.target.classList.add("red");
      } else {
        event.target.classList.add("green");
      }

      // check winner
      checkWinner(row, column);

      // change the player
      togglePlayer();
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
    row = startReverseRow + 1;
    column = startReverseColumn + 1;

    if (row < boardLength && column < boardLength && board[row] !== undefined) {
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

    if (row < boardLength && column < boardLength && board[row] !== undefined) {
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

    if (row < boardLength && column < boardLength && board[row] !== undefined) {
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
};
