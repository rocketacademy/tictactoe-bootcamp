/*#############
GLOBAL VARIABLES
##############*/
// the element that contains the rows and squares
let boardElement;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
// current player global starts at X
let currentPlayer = "X";
let gameInfo;
let userBoard;
let overlay;
// keep data about the game in a 2-D array
let boardSize = 3;
let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(""));


/*#############
HELPER FUNCTIONS
##############*/

// completely rebuilds the entire board every time there's a click
const buildBoard = () => {
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
      if (j === row.length - 1) {
        square.classList.add("right");
      }
      if (j === 0) {
        square.classList.add("left");
      }
      if (i === 0) {
        square.classList.add("top");
      }
      if (i === board.length - 1) {
        square.classList.add("bottom");
      }
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

/*#############
GAMEPLAY LOGIC
##############*/

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
  if (board[column][row] === "") {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard();
    if (checkWin()===true) {
      gameInfo.innerText = `${currentPlayer} is winner`;
    } else {
    // change the player
    togglePlayer();
    }

  }
};

//check vertical horizontal diagonal
let score = 0;

const checkVH = (isCol) => {
  for (let j=0; j<board.length; j+=1) {
    for (let i=0; i<board.length; i+=1) {
      if ((isCol? board[i][j] : board[j][i]) === currentPlayer) {
        score += 1;
      }
      if (score === boardSize) {
        return true;
      }
    }
    score = 0;
  }
}

const checkDiagonal = (isReversed) => {
  for (let i=0; i<board.length; i+=1) {
    if ((isReversed ?board[i][board.length-1-i] : board[i][i]) === currentPlayer) {
      score += 1;
    }
    if (score === boardSize) {
      return true;
    }
}
  score = 0;
};


// checkWinner
const checkWin = () => {
  if (checkVH(true) || checkVH(false) || checkDiagonal(true) || checkDiagonal(false)) {
    return true;
  }
};

/*#############
GAME INITIALIZATION
##############*/
/*
// create user board choice
const userBoardChoice = () => {
  //create overlay
  overlay = document.createElement("div");
  overlay.classList.add("overlay-text", "visible");
  overlay.innerHTML = "Enter matrix size (for example 3)";
  document.body.appendChild(overlay);

  userBoard = document.createElement("input");
  userBoard.classList.add("input");
  userBoard.autofocus = true;
  overlay.appendChild(userBoard);
  userBoard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !isNaN(userBoard.value)) {
      boardSize = userBoard.value;
      initGame();
      overlay.classList.remove("visible");
      gameInfo.innerText = `${boardSize} x ${boardSize} game`
    } else return null;
  });
}
userBoardChoice();*/

// create the board container element and put it on the screen
const initGame = () => {  
  boardContainer = document.createElement("div");
  document.body.appendChild(boardContainer);
  // build the board - right now it's empty
  buildBoard();

  gameInfo = document.createElement("div");
  gameInfo.classList.add("game-info");
  gameInfo.innerText = "";
  document.body.appendChild(gameInfo);
};

initGame();