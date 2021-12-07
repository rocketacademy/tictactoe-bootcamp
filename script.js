const board = [];
let boardContainer = document.getElementById("ticTacToe");
let boardElement;
let boardLength = 0;

let roundWon = false;

let verticalCount;
let horizontalCount;
let topLeftToBottomRightCount;
let bottomLeftToTopRightCount;

let squareWinCount = 0;
let currentPlayer = "X";

let availableSquareIds = [];
let squareIdsByPlayer = {};
squareIdsByPlayer.vertical = [];
squareIdsByPlayer.horizontal = [];
squareIdsByPlayer.topLeftToBottomRight = [];
squareIdsByPlayer.bottomLeftToTopRight = [];

let squareIdsByComputer = {};
squareIdsByComputer.vertical = [];
squareIdsByComputer.horizontal = [];
squareIdsByComputer.topLeftToBottomRight = [];
squareIdsByComputer.bottomLeftToTopRight = [];

let computerSquareCount = 0;

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
      row = parseInt(rowCol[0]);
      column = parseInt(rowCol[1]);
      document.getElementById(squareId).classList.add("green");
    }

    board[row][column] = currentPlayer;
    checkWinner(row, column);
    togglePlayer();
    makeAMoveIfComputer();
  }
};

const makeAMoveIfComputer = () => {
  if (currentPlayer === "O") {
    // check if user is 1 square away from a win
    // if not, computer randomly selects
    // loop through squareIdsByPlayer
    // once we find an available square for computer
    // to play, break out from loop.

    // find the first box with an "X" and move through loop to find
    // more "X". the goal is to find (squareWinCount - 1) number of "X"
    // we can entertain only 1 blank square - which is the square
    // for the computer to play
    let squareIdToPlay = "";
    let xCount = 0;
    let blankCount = 0;
    let currentValue = "";
    let currentId = "";

    for (let i = 0; i < squareIdsByPlayer.vertical.length; i++) {
      let currentValue = squareIdsByPlayer.vertical[i].value;
      let currentId = squareIdsByPlayer.vertical[i].id;

      if (currentValue == "") {
        squareIdToPlay = currentId;

        if (xCount == squareWinCount - 1 && squareIdToPlay !== "") {
          // this is the square to play!
          squareClick(squareIdToPlay, -1, -1);
          return;
        }
      } else if (currentValue == "X") {
        xCount++;

        if (xCount == squareWinCount - 1 && squareIdToPlay !== "") {
          // this is the square to play!
          squareClick(squareIdToPlay, -1, -1);
          return;
        }
      } else if (currentValue == "O") {
        xCount = 0;
      }
    }
    squareIdToPlay = "";
    xCount = 0;
    blankCount = 0;
    currentValue = "";
    currentId = "";
    if (squareIdToPlay == "") {
      for (let i = 0; i < squareIdsByPlayer.horizontal.length; i++) {
        currentValue = squareIdsByPlayer.horizontal[i].value;
        currentId = squareIdsByPlayer.horizontal[i].id;

        if (currentValue == "") {
          squareIdToPlay = currentId;

          if (xCount == squareWinCount - 1 && squareIdToPlay !== "") {
            // this is the square to play!
            squareClick(squareIdToPlay, -1, -1);
            return;
          }
        } else if (currentValue == "X") {
          xCount++;

          if (xCount == squareWinCount - 1 && squareIdToPlay !== "") {
            // this is the square to play!
            squareClick(squareIdToPlay, -1, -1);
            return;
          }
        } else if (currentValue == "O") {
          xCount = 0;
        }
      }
    }
    squareIdToPlay = "";
    xCount = 0;
    blankCount = 0;
    currentValue = "";
    currentId = "";
    if (squareIdToPlay == "") {
      for (let i = 0; i < squareIdsByPlayer.topLeftToBottomRight.length; i++) {
        currentValue = squareIdsByPlayer.topLeftToBottomRight[i].value;
        currentId = squareIdsByPlayer.topLeftToBottomRight[i].id;

        if (currentValue == "") {
          squareIdToPlay = currentId;

          if (xCount == squareWinCount - 1 && squareIdToPlay !== "") {
            // this is the square to play!
            squareClick(squareIdToPlay, -1, -1);
            return;
          }
        } else if (currentValue == "X") {
          xCount++;

          if (xCount == squareWinCount - 1 && squareIdToPlay !== "") {
            // this is the square to play!
            squareClick(squareIdToPlay, -1, -1);
            return;
          }
        } else if (currentValue == "O") {
          xCount = 0;
        }
      }
    }
    squareIdToPlay = "";
    xCount = 0;
    blankCount = 0;
    currentValue = "";
    currentId = "";
    if (squareIdToPlay == "") {
      for (let i = 0; i < squareIdsByPlayer.bottomLeftToTopRight.length; i++) {
        currentValue = squareIdsByPlayer.bottomLeftToTopRight[i].value;
        currentId = squareIdsByPlayer.bottomLeftToTopRight[i].id;

        if (currentValue == "") {
          squareIdToPlay = currentId;

          if (xCount == squareWinCount - 1 && squareIdToPlay !== "") {
            // this is the square to play!
            squareClick(squareIdToPlay, -1, -1);
            return;
          }
        } else if (currentValue == "X") {
          xCount++;

          if (xCount == squareWinCount - 1 && squareIdToPlay !== "") {
            // this is the square to play!
            squareClick(squareIdToPlay, -1, -1);
            return;
          }
        } else if (currentValue == "O") {
          xCount = 0;
        }
      }
    }

    // make a random choice that has not been taken
    // for computer player 3, instead of making a random choice
    // try to win!

    // if this is the first time computer is choosing a square
    // we want the most center square if possible
    if (computerSquareCount == 0) {
      // select center most square
      const row = Math.floor(boardLength / 2);
      const col = row;

      // check if it's already taken
      if (board[row][col] == "") {
        squareClick(`${row}|${col}`, -1, -1);
        computerSquareCount++;
        return;
      }
    }

    // check corners
    if (board[0][0] == "") {
      squareClick(`0|0`, -1, -1);
    } else if (board[boardLength - 1][0] == "") {
      squareClick(`${boardLength - 1}|0`, -1, -1);
    } else if (board[0][boardLength - 1] == "") {
      squareClick(`0|${boardLength - 1}`, -1, -1);
    } else if (board[boardLength - 1][boardLength - 1] == "") {
      squareClick(`${boardLength - 1}|${boardLength - 1}`, -1, -1);
    }

    computerSquareCount++;

    // let squareIsEmpty = false;

    // while (!squareIsEmpty) {
    //   // decide a random row and column
    //   const randomId = Math.floor(Math.random() * availableSquareIds.length);

    //   if (
    //     document.getElementById(availableSquareIds[randomId]).innerHTML == ""
    //   ) {
    //     squareClick(availableSquareIds[randomId], -1, -1);
    //     squareIsEmpty = true;
    //   }
    // }
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
// if player falls short of winning by 1 box
// it means computer can use it to block player
// provided the box is empty
const checkVertical = (row, column, counter) => {
  let currentForwardSquare;
  let currentReverseSquare;

  let previousForwardSquare;
  let previousReverseSquare;

  let startForwardRow = row + counter;
  let startReverseRow = row - counter;

  if (currentPlayer === "X" && counter == 0) {
    squareIdsByPlayer.vertical.push({
      id: `${row}|${column}`,
      value: board[row][column],
    });
  }

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

      // only check if player is 1 box win away
      // on the last loop and if user has not
      // win yet. if squareWinCount is 3, counter
      // goes from 0 to 2. program traverses 3 squares
      // excluding clicked square. we do not want to
      // include the last square.

      if (currentPlayer === "X") {
        squareIdsByPlayer.vertical.unshift({
          id: `${row}|${column}`,
          value: board[row][column],
        });
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

      // only check if player is 1 box win away
      // on the last loop and if user has not
      // win yet. if squareWinCount is 3, counter
      // goes from 0 to 2. program traverses 3 squares
      // excluding clicked square. we do not want to
      // include the last square.

      if (currentPlayer === "X") {
        squareIdsByPlayer.vertical.push({
          id: `${row}|${column}`,
          value: board[row][column],
        });
      }
    }
  }
};

// check left and right to find matches
// if player falls short of winning by 1 box
// it means computer can use it to block player
// provided the box is empty
const checkHorizontal = (row, column, counter) => {
  let currentForwardSquare;
  let currentReverseSquare;

  let previousForwardSquare;
  let previousReverseSquare;

  let startForwardColumn = column + counter;
  let startReverseColumn = column - counter;

  if (currentPlayer === "X" && counter == 0) {
    squareIdsByPlayer.horizontal.push({
      id: `${row}|${column}`,
      value: board[row][column],
    });
  }

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

    // only check if player is 1 box win away
    // on the last loop and if user has not
    // win yet. if squareWinCount is 3, counter
    // goes from 0 to 2. program traverses 3 squares
    // excluding clicked square. we do not want to
    // include the last square.

    if (currentPlayer === "X") {
      squareIdsByPlayer.horizontal.unshift({
        id: `${row}|${column}`,
        value: board[row][column],
      });
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

    // only check if player is 1 box win away
    // on the last loop and if user has not
    // win yet. if squareWinCount is 3, counter
    // goes from 0 to 2. program traverses 3 squares
    // excluding clicked square. we do not want to
    // include the last square.

    if (currentPlayer === "X") {
      squareIdsByPlayer.horizontal.push({
        id: `${row}|${column}`,
        value: board[row][column],
      });
    }
  }
};

// check from top left to bottom right to find matches
// if player falls short of winning by 1 box
// it means computer can use it to block player
// provided the box is empty
const checkDiagonalTopLeftToBottomRight = (row, column, counter) => {
  let currentForwardSquare;
  let currentReverseSquare;

  let previousForwardSquare;
  let previousReverseSquare;

  let startForwardRow = row + counter;
  let startForwardColumn = column + counter;

  let startReverseRow = row - counter;
  let startReverseColumn = column - counter;

  if (currentPlayer === "X" && counter == 0) {
    squareIdsByPlayer.topLeftToBottomRight.push({
      id: `${row}|${column}`,
      value: board[row][column],
    });
  }

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

      if (currentPlayer === "X") {
        squareIdsByPlayer.topLeftToBottomRight.unshift({
          id: `${row}|${column}`,
          value: board[row][column],
        });
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

      if (currentPlayer === "X") {
        squareIdsByPlayer.topLeftToBottomRight.push({
          id: `${row}|${column}`,
          value: board[row][column],
        });
      }
    }
  }
};

// check from bottom left to top right to find matches
// if player falls short of winning by 1 box
// it means computer can use it to block player
// provided the box is empty
const checkDiagonalBottomLeftToTopRight = (row, column, counter) => {
  let currentForwardSquare;
  let currentReverseSquare;

  let previousForwardSquare;
  let previousReverseSquare;

  let startForwardRow = row - counter;
  let startForwardColumn = column + counter;

  let startReverseRow = row + counter;
  let startReverseColumn = column - counter;

  if (currentPlayer === "X" && counter == 0) {
    squareIdsByPlayer.bottomLeftToTopRight.push({
      id: `${row}|${column}`,
      value: board[row][column],
    });
  }

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

      if (currentPlayer === "X") {
        squareIdsByPlayer.bottomLeftToTopRight.unshift({
          id: `${row}|${column}`,
          value: board[row][column],
        });
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

      if (currentPlayer === "X") {
        squareIdsByPlayer.bottomLeftToTopRight.push({
          id: `${row}|${column}`,
          value: board[row][column],
        });
      }
    }
  }
};

const checkWinner = (row, column) => {
  // everytime user clicks a box, check 360 degrees
  // for all boxes up till squareWinCount to find matches
  if (currentPlayer === "X") {
    squareIdsByPlayer = {};
    squareIdsByPlayer.vertical = [];
    squareIdsByPlayer.horizontal = [];
    squareIdsByPlayer.topLeftToBottomRight = [];
    squareIdsByPlayer.bottomLeftToTopRight = [];
  }

  topLeftToBottomRightCount = 1;
  bottomLeftToTopRightCount = 1;
  verticalCount = 1;
  horizontalCount = 1;

  for (let counter = 0; counter < squareWinCount - 1; counter++) {
    checkVertical(row, column, counter);
    checkHorizontal(row, column, counter);
    checkDiagonalTopLeftToBottomRight(row, column, counter);
    checkDiagonalBottomLeftToTopRight(row, column, counter);
  }
};
