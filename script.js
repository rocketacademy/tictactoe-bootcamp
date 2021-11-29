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
let gameMode = "2 player";
let gameInfo;
let userGame;
// keep data about the game in a 2-D array
let boardSize;
let board;
let simulatedBoard;
let lockBoard = false;
let emptyCells = [];
//let xCells = [];
//let oCells = [];
let blockMove = [];

/*#############
HELPER FUNCTIONS
##############*/

// initialize Matrix
const Matrix =(n) => {
var matrix = new Array(n).fill(null).map(() => Array(n).fill(""));
board = matrix;
return matrix;
}

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
//check empty cells
const emptyCellCheck = () => {
  emptyCells = [];
  for (let i = 0; i < board.length; i++) {
  for (let j = 0; j <board.length; j++) {
    if (board[i][j] === "") {
        emptyCells.push([i,j]);
    }
}}
return emptyCells;
}

/* ############
//check XO cells
const XOCellCheck = (isX) => {
  xCells = [];
  oCells = [];
  for (let i = 0; i < board.length; i++) {
  for (let j = 0; j <board.length; j++) {
    if (isX ? board[i][j] === "X" : board[i][j] === "O") {
        isX ? xCells.push([i,j]) : oCells.push([i,j]);
    }
}}
return isX ? xCells : oCells;
}
############ */


// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

/*#############
GAMEPLAY LOGIC
##############*/

// switch the global values from one player to the next
const togglePlayer = (isComp) => {
  emptyCellCheck();
  gameInfo.innerText = "";
  if (checkWin()===true) {
      gameInfo.innerText = `${currentPlayer} is winner`;
      lockBoard = true;
    }
  if (gameTie() === false) {
    if (currentPlayer === "X") {
    currentPlayer = "O";
    isComp ? blockX() : null;
  } else {
    currentPlayer = "X";
  }
  }
  else {
    gameInfo.innerText = "It's a tie";
    lockBoard = true;
  } 
};

// computer choose randomly
const computerPlay = (anArray) => {
  let randomIndex = getRandomIndex(anArray.length);
  setTimeout (function () {
    squareClick(anArray[randomIndex][0],anArray[randomIndex][1]);
  },500);
}

// computer block X
const blockX = () => {
  //empty block move
  blockMove = [];
  
  // make a copy of the board
  simulatedBoard = JSON.parse(JSON.stringify(board));
  
  // simulate X click
  for (let i = 0; i < emptyCells.length; i++) {
    let possibleRow = emptyCells[i][0]
    let possibleCol = emptyCells[i][1]
    simulatedBoard[possibleRow][possibleCol] = "X";
    console.log(`coordinates ${possibleRow} ${possibleCol}`);
    //check the best coordinate for X to win
    if (checkVH(true,simulatedBoard,"X")
    || checkVH(false,simulatedBoard,"X")
    || checkDiagonal(true,simulatedBoard,"X")
    || checkDiagonal(false,simulatedBoard,"X")) {
      console.log("Found best move to block");
      console.log(blockMove);
      blockMove.push([possibleRow,possibleCol]);
    };
    console.log("simulatedBoard is reset");
    simulatedBoard = JSON.parse(JSON.stringify(board));
    console.log(simulatedBoard);
  };
  
  //computer pick that coordinate
  if (blockMove.length === 0) {
    computerPlay(emptyCells);
  } else {
  computerPlay(blockMove);}
} 

const squareClick = (column, row) => {
  console.log("coordinates", column, row);
  if (lockBoard === true) return;
  // see if the clicked square has been clicked on before
  if (board[column][row] === "") {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard();
    // change the player
    togglePlayer(gameMode === "AI");
  }
};

//check gameTie to show message
const gameTie = () => {
  if (emptyCells.length ===0 && checkWin() === false) {
    return true
  } else return !!(emptyCells.length ===0 && checkWin() === false)
};

//check vertical horizontal diagonal

const checkVH = (isCol, anArray, player) => {
  let score = 0;
  for (let j=0; j<anArray.length; j+=1) {
    for (let i=0; i<anArray.length; i+=1) {
      if ((isCol? anArray[i][j] : anArray[j][i]) === player) {
        console.log("VH");
        score += 1;
      }
      if (score === anArray.length) {
        console.log("VH is true");
        return true;
      }
    }
    score = 0;
  }
}

const checkDiagonal = (isReversed,anArray,player) => {
  let score = 0;
  for (let i=0; i<anArray.length; i+=1) {
    if ((isReversed ?anArray[i][anArray.length-1-i] : anArray[i][i]) === player) {
      console.log("Diagonal");
      score += 1;
    }
    if (score === anArray.length) {
      console.log("Diagonal is true");
      return true;
    }
}
  score = 0;
};


// checkWinner
const checkWin = () => {
  if (checkVH(true,board,currentPlayer) || checkVH(false,board,currentPlayer) || checkDiagonal(true,board,currentPlayer) || checkDiagonal(false,board,currentPlayer)) {
    return true;
  } else return !!(checkVH(true,board,currentPlayer) && checkVH(false,board,currentPlayer) && checkDiagonal(true,board,currentPlayer) && checkDiagonal(false,board,currentPlayer));
};

/*#############
GAME INITIALIZATION
##############*/

// create user board choice
const userBoardChoice = () => {
  //create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-text", "visible");
  overlay.innerHTML = "Choose game mode & matrix size then hit Enter";
  document.body.appendChild(overlay);

  //user choose game mode
  const options = ["2 player","AI"]
  userGame = document.createElement("select");
  userGame.classList.add("input");
  userGame.autofocus = false;
  overlay.appendChild(userGame);

  //Create and append the options
  for (let list of options) {
    const option = document.createElement("option");
    option.value = list;
    option.text = list;
    userGame.appendChild(option);
  }

  //user choose matrix (boardSize)
  const userBoard = document.createElement("input");
  userBoard.classList.add("input");
  userBoard.setAttribute("placeholder","Matrix size");
  userBoard.setAttribute("type","number");
  userBoard.setAttribute("min","2");
  userBoard.autofocus = true;
  overlay.appendChild(userBoard);

  userBoard.addEventListener("keydown", (e) => {
     if ( 
      e.key === "Enter" && !isNaN(userBoard.value)) {
      boardSize = userBoard.value;
      Matrix(Number(boardSize));
      initGame();
      overlay.classList.remove("visible");
      gameInfo.innerText = `${boardSize} x ${boardSize} game`;
    } else {
      return null
    }
  });

  userGame.addEventListener("change", () => {
    if(userGame.value == "AI") {
    gameMode = "AI";
    } else {
    gameMode = "2 player"}
  },false);
  };

userBoardChoice();

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