/*#############
GLOBAL VARIABLES
##############*/
// the element that contains the rows and squares
let boardElement;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
// current player global starts at X
const huPlayer = "X";
const aiPlayer = "O";
let currentPlayer = huPlayer;
let gameMode = "AI";
let gameInfo;
let userGame;
// keep data about the game in a 2-D array
let boardSize;
let board;
let simulatedBoard;
let lockBoard = false;
let emptyCells = [];
let blockMove = [];
let winMove = [];
let cornerMove = [];

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


// find available corner Moves
const emptyCornerCheck = () => {
  cornerMove = [];
  if (board[0][0] ==="") {
    cornerMove.push([0,0]);
  }
  if (board[0][board.length-1] ==="") {
    cornerMove.push([0,board.length-1]);
  }
    if (board[board.length-1][0] ==="") {
    cornerMove.push([board.length-1,0]);
  }
  if (board[board.length-1][board.length-1] ==="") {
    cornerMove.push([board.length-1,board.length-1]);
  }
  return cornerMove;
}

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
  emptyCornerCheck();
  gameInfo.innerText = "";
  if (checkWin()===true) {
      gameInfo.innerText = `${currentPlayer} is winner`;
      lockBoard = true;
    }
  if (gameTie() === false) {
    if (currentPlayer === huPlayer) {
    currentPlayer = aiPlayer;
    isComp ? aiPlay() : null;
  } else {
    currentPlayer = huPlayer;
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

const computerPick = () => {
  //computer pick the coordinate that will either win the game or block X
  if (winMove.length > 0) {
    //console.log("win move is played");
    computerPlay(winMove);
  }
  if (blockMove.length > 0 && winMove.length ===0) {
    //console.log("block move is played");
    computerPlay(blockMove);
  }
  if (cornerMove.length > 0 && blockMove.length ===0 && winMove.length ===0) {
    //console.log("corner move is played");
    computerPlay(cornerMove);
  }
  if (cornerMove.length === 0 && blockMove.length ===0 && winMove.length ===0) {
    //console.log("empty cell is played");
    computerPlay(emptyCells);}
}

const simulateClick = (player, moveArray) => {
    // simulate player click
  for (let i in emptyCells) {
    let possibleRow = emptyCells[i][0]
    let possibleCol = emptyCells[i][1]
    simulatedBoard[possibleRow][possibleCol] = player;
    //console.log(`coordinates ${possibleRow} ${possibleCol}`);
    //check the best coordinate for player to win
    if (checkVH(true,simulatedBoard,player)
    || checkVH(false,simulatedBoard,player)
    || checkDiagonal(true,simulatedBoard,player)
    || checkDiagonal(false,simulatedBoard,player)) {
      moveArray.push([possibleRow,possibleCol]);
    }
    //console.log("simulatedBoard is reset");
    simulatedBoard = JSON.parse(JSON.stringify(board));
    //console.log(simulatedBoard);
  }
}


// computer attempts to win game or block huPlayer from winning (based on last step only)
const aiPlay = () => {
  //empty block move & win move
  blockMove = [];
  winMove = [];
  // make a copy of the board
  simulatedBoard = JSON.parse(JSON.stringify(board));
  //simulate X click that will win the game
  simulateClick(huPlayer, blockMove);
  //simulate O click that will win the game
  simulateClick(aiPlayer, winMove);
  computerPick();
} 

const squareClick = (column, row) => {
  //console.log("coordinates", column, row);
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
        //console.log("VH");
        score += 1;
      }
      if (score === anArray.length) {
        //console.log("wins");
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
      //console.log("Diagonal");
      score += 1;
    }
    if (score === anArray.length) {
      //console.log("wins");
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
  const options = ["AI","2 players"]
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
    gameMode = "2 players"}
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

  const resetButton = document.createElement("button");
  resetButton.classList.add("button");
  resetButton.innerText = "Reset";
  resetButton.addEventListener("click", function () {location.reload()})
  document.body.appendChild(resetButton);
};