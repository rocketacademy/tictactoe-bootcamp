// JS FILE: GLOBAL VARIABLES #############################################

const messageBox = document.createElement('div');
messageBox.innerHTML = 'Welcome to tic tac toe, click on a square to begin.';
document.body.appendChild(messageBox);

// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

const boardSize = 3;

// JS FILE: HELPER FUNCTIONS ##############################################

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    checkAllWin(board);

    // change the player
    togglePlayer();
  }
};

// const checkWin = (board) => {
//   // check every position
//   // there is a conditional for all 15 win conditions
//   if  (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== '') {
//        messageBox.innerHTML = currentPlayer + ", Won!"
//        resetBoard()

//   }
//   else if  (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== '') {
//        messageBox.innerHTML = currentPlayer + ", Won!"
//        resetBoard()

//   }
//   else if  (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== '') {
//        messageBox.innerHTML = currentPlayer + ", Won!"
//        resetBoard()

//   }
//   else if  (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== '') {
//        messageBox.innerHTML = currentPlayer + ", Won!"
//        resetBoard()

//   }
//   else if  (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== '') {
//        messageBox.innerHTML = currentPlayer + ", Won!"
//        resetBoard()

//   }
//   else if  (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== '') {
//        messageBox.innerHTML = currentPlayer + ", Won!"
//        resetBoard()

//   }
//   else if  (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
//        messageBox.innerHTML = currentPlayer + ", Won!"
//        resetBoard()

//   }
//   else if  (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
//        messageBox.innerHTML = currentPlayer + ", Won!"
//        resetBoard()

//   }

//   else if ((board[0][0] && board[0][1] && board[0][2] &&
//            board[1][0] && board[1][1] && board[1][2] &&
//            board[2][0] && board[2][1] && board[2][2] !== '')) {

//           messageBox.innerHTML = "Its a Tie!"
//           resetBoard()
//           console.log(x)
//   }

// };

// const resetBoard = () => {
//   board = [
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
// ];
// }

// JS FILE: GAME INIT ##############################################

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();
console.log(board.length, 'start board');

// Check for the win by advancing through the game board with two nested loops. You will need to be able to write a loop that moves vertically, horizontally, diagonally left to right and diagonally right to left across the board.

// If we imagine that the board element indexes create coordinates, board[i][j] is like 0,0; What is a loop where the coordinate numbers change in the pattern we want? i.e., 0,0 -> 0,1 -> 0,2 moves across the top of the board horizontally.

let win = false;

const checkAllWin = () => {
  checkRowWin();
  checkColumnWin();
  checkDiagonalWin();
  console.log(win);
  if (win === true) {
    messageBox.innerHTML = `${currentPlayer}, Won!`;
  }
};

const checkDiagonalWin = () => {
  const diagonalArray1 = [];
  const diagonalArray2 = [];

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const tempRow = [...row];
    diagonalArray1.push(tempRow[i]);
    diagonalArray2.push(tempRow.reverse()[i]);
    console.log(row, 'row');
    console.log(i, 'i');
  }
  const diagonalArray1Win = checkListElements(diagonalArray1);
  const diagonalArray2Win = checkListElements(diagonalArray2);
  if (diagonalArray1Win || diagonalArray2Win) {
    win = true;
  }
};

const checkColumnWin = () => {
  for (let i = 0; i < board.length; i++) {
    const columnArray = [];

    for (let j = 0; j < board.length; j++) {
      columnArray.push(board[j][i]);
    }
    console.log(columnArray);
    const columnWin = checkListElements(columnArray);
    if (columnWin === true) {
      win = true;
    }
  }
};

const checkRowWin = () => {
  for (let i = 0; i < board.length; i++) {
    const rowWin = checkListElements(board[i]);
    if (rowWin === true) {
      win = true;
    }
  }
};

const checkListElements = (array) => {
  let previousElement = null;
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== '') {
      if (array[i] !== previousElement) {
        count = 0;
        previousElement = array[i];
      }
      count += 1;
      if (count === boardSize) {
        return true;
      }
    }
  }
  return false;
};
