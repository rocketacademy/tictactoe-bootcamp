// Please implement exercise logic here
const board = [];
let boardSize;
let numSquaresToWin;

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = "X";
let canClick = true;

const checkWin = (board, numSquaresToWin) => {
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      //try to make vertical check downwards
      let i_final = i + numSquaresToWin - 1;
      if (i_final < boardSize) {
        let value = board[i][j];
        let value_count = 0;
        for (let w = 0; w < numSquaresToWin; w += 1) {
          if (board[i + w][j] === value && board[i + w][j] != "") {
            value_count += 1;
          }
        }
        if (value_count === numSquaresToWin) {
          return true;
        }
      }
      //try to make horizontal check rightwards
      let j_final = j + numSquaresToWin - 1;
      if (j_final < boardSize) {
        let value = board[i][j];
        let value_count = 0;
        for (let w = 0; w < numSquaresToWin; w += 1) {
          if (board[i][j + w] === value && board[i][j + w] != "") {
            value_count += 1;
          }
        }
        if (value_count === numSquaresToWin) {
          return true;
        }
      }
      //try to make diagonal check in south east direction
      if (i_final < boardSize && j_final < boardSize) {
        let value = board[i][j];
        let value_count = 0;
        for (let w = 0; w < numSquaresToWin; w += 1) {
          if (board[i + w][j + w] === value && board[i + w][j + w] != "") {
            value_count += 1;
          }
        }
        if (value_count === numSquaresToWin) {
          return true;
        }
      }
      //try to make diagonal check in south west direction
      let j_final_W = j - numSquaresToWin + 1;
      if (i_final < boardSize && j_final_W < boardSize) {
        let value = board[i][j];
        let value_count = 0;
        for (let w = 0; w < numSquaresToWin; w += 1) {
          if (board[i + w][j - w] === value && board[i + w][j - w] != "") {
            value_count += 1;
          }
        }
        if (value_count === numSquaresToWin) {
          return true;
        }
      }
    }
  }
  return false;
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
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  let inputContainer = document.createElement("div");
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "Submit";

  let box = document.createElement("INPUT");
  box.setAttribute("type", "text");
  box.placeholder = "Size of board?";

  let box2 = document.createElement("INPUT");
  box2.setAttribute("type", "text");
  box2.placeholder = "Num squares in row to win?";

  inputContainer.appendChild(box);
  inputContainer.appendChild(box2);
  inputContainer.appendChild(btn);
  document.body.appendChild(inputContainer);

  btn.addEventListener("click", function () {
    boardSize = Number(box.value);
    numSquaresToWin = Number(box2.value);
    for (i = 0; i < boardSize; i += 1) {
      let row = [];
      for (j = 0; j < boardSize; j += 1) {
        row.push("");
      }
      board.push(row);
    }

    inputContainer.style.display = "none";
    boardContainer = document.createElement("div");
    document.body.appendChild(boardContainer);

    gameInfo = document.createElement("div");
    gameInfo.className = "game-info";
    document.body.appendChild(gameInfo);
    gameInfo.innerText = "Welcome to Tic Tac Toe! X starts first";

    // build the board - right now it's empty
    buildBoard(board);
  });
};

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

  // see if the clicked square has been clicked on before
  if (board[column][row] === "" && canClick === true) {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);
    if (checkWin(board, numSquaresToWin) === true) {
      gameInfo.innerText = `${currentPlayer} WON!!`;
      canClick = false;
      // game over
    } else {
      togglePlayer();
      gameInfo.innerText = `It is now ${currentPlayer} 's turn.`;
    }
    // change the player
  }
};

initGame();
