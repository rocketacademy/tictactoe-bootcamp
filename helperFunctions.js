// this creates a 2D array
const generateEmptyBoard = function (boardSize) {
  let tempRow = [];
  for (i = 0; i < boardSize; i += 1) {
    for (j = 0; j < boardSize; j += 1) {
      tempRow.push(0);
    }
    // console.log(tempRow);
    board.push(tempRow);
    tempRow = [];
  }
};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = "";
  boardContainer.id = "boardContaienr";
  boardContainer.classList.add("board");

  // boardElement = document.createElement("div");
  // boardElement.id = "boardElement";
  // boardElement.classList.add("board");

  // move through the board data array and create the
  // current state of the board
  // generateEmptyBoard(boardSize);

  for (let i = 0; i < boardSize; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    // set each square
    // j is the column number
    for (let j = 0; j < boardSize; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");

      let contents = boardContentsMap[board[i][j]];

      // set the text of the square according to the array
      square.innerText = contents;
      if (contents != 0) {
        square.classList.add("filled");
      }

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

// matrices and whatever
// step 1: take a row, filter elements to either +1 or -1 and check sum.
// step 2: if sum == boardSize, you win
// repeat the filter, sum, and check steps for other conditions
// for columns, transpose the matrix and check rows again
// for diagonals, get the primary and seconday diagonals and check those

const checkRows = function (boardArr) {
  let rowCounter = 0;
  while (rowCounter < boardSize) {
    checkFlatArrayWin(boardArr[rowCounter]);
    rowCounter += 1;
  }
};

const transposeMaxtrix = function (matrix) {
  const transposed = matrix[0].map((col, i) => matrix.map((row) => row[i]));
  return transposed;
};

const getMatrixPrimaryDiagonal = function (squareMatrix, matrixSize) {
  let primaryDiagonalArary = [];
  for (let i = 0; i < matrixSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (i == j) {
        primaryDiagonalArary.push(squareMatrix[i][j]);
      }
    }
  }
  return primaryDiagonalArary;
};

const getMatrixSecondaryDiagonal = function (squareMatrix, matrixSize) {
  let secondaryDiagonalArary = [];
  for (let i = 0; i < matrixSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (i + j == matrixSize - 1) {
        secondaryDiagonalArary.push(squareMatrix[i][j]);
      }
    }
  }
  return secondaryDiagonalArary;
};

const checkFlatArrayWin = function (arr) {
  let xFilteredRow = arr.filter(function (value) {
    return value == 1;
  });
  let oFilteredRow = arr.filter(function (value) {
    return value == -1;
  });

  xFilteredRow = xFilteredRow.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  oFilteredRow = oFilteredRow.reduce((a, b) => parseInt(a) + parseInt(b), 0);

  if (Math.abs(xFilteredRow) == boardSize) {
    winner = "x";
  }
  if (Math.abs(oFilteredRow) == boardSize) {
    winner = "O";
  }
};

const checkDiagonals = function (boardArr) {
  let primaryDiag = getMatrixPrimaryDiagonal(boardArr, boardSize);
  let secondaryDiag = getMatrixSecondaryDiagonal(boardArr, boardSize);

  checkFlatArrayWin(primaryDiag);
  checkFlatArrayWin(secondaryDiag);
};

const checkWin = function (boardArr) {
  checkRows(boardArr);
  // flips columns into rows and vice versa
  checkRows(transposeMaxtrix(boardArr));
  checkDiagonals(boardArr);

  if (winner != null) {
    winningMessageTextElement.innerText = `${winner} wins!`;
    winningMessageElement.classList.add("show");
  }
  // flips boardArr back to original state
  transposeMaxtrix(boardArr);
};

const resetBoard = function () {
  winningMessageElement.classList.remove("show");
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  buildBoard(board);
};

const setBoardSize = function () {
  boardSize = initializationInputField.value;
};

const initGame = function () {
  document.body.appendChild(initializationDiv);
  document.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && boardSize == -1) {
      boardSize = initializationInputField.value;
      if (isNaN(boardSize) || boardSize < 1) {
        boardSize = 3; //defaults to 3
      }
      initializationDiv.remove();
      generateEmptyBoard(boardSize);
      startGame();
    }
  });
};
