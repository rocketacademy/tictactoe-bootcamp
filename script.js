/*#############
GLOBAL VARIABLES
##############*/
const boardSize = 3;
//let origBoard;
// the element that contains the rows and squares
let boardElement;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
// current player global starts at X
let currentPlayer = "X";
// this element contains game text
let gameInfo;
//this element contains all the squares
let cells;

/*#############
HELPER FUNCTIONS
##############*/

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = "";
  boardElement = document.createElement("div");
  boardElement.classList.add("board");
  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < 3; i += 1) {
    // separate var for one row / row element
    //const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    // set each square
    // j is the column number
    for (let j = 0; j < board; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");
      if (j === board - 1) {
        square.classList.add("right");
      }
      if (j === 0) {
        square.classList.add("left");
      }
      if (i === 0) {
        square.classList.add("top");
      }
      if (i === board - 1) {
        square.classList.add("bottom");
      }
      rowElement.appendChild(square);
    }
    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }

  //give each cell a position using id for reference
  cells = document.querySelectorAll(".square");
  for (let cell = 0; cell < cells.length; cell++) {
    cells[cell].setAttribute("id", cell + 1);
    cells[cell].addEventListener("click", () => {
      squareClick(cell);
    });
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

const squareClick = (cellIndex) => {
  console.log(cellIndex);

  // see if the clicked square has been clicked on before
  if (cells[cellIndex].innerText === "") {
    console.log(cellIndex);
    console.log("this happens");
    // alter the data array, set it to the current player
    cells[cellIndex].innerHTML = currentPlayer;

    // change the player
    togglePlayer();
  }
};

/*#############
GAME INITIALIZATION
##############*/
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement("div");
  document.body.appendChild(boardContainer);
  // build the board - right now it's empty
  buildBoard(boardSize);
  //origBoard = Array.from(Array(boardSize * boardSize).keys());
  gameInfo = document.createElement("div");
  gameInfo.classList.add("game-info");
  gameInfo.innerText = "Start";
  document.body.appendChild(gameInfo);
};

initGame();
