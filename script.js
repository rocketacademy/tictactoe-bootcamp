// ----------GLOBAL VARIABLES
// keep data about the game in a 2-D array
let board = [
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

//
let canClick = true;

//----------HELPER FUNCTIONS
// completely rebuilds the entire board every time there's a click where each square is an eventListener and appends the board to boardContainer
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');
  outputMessage = document.createElement('div');
  outputMessage.classList.add('output-message');
  boardContainer.appendChild(outputMessage);

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

// create the board container element and put it on the screen
const initGame = () => {
  output = 'Click on any square';
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

const resetGame = () => {
  board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
  ];
  buildBoard(board);
  canClick = true;
}

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};


let counter = 0;

const checkVertical = (board) => {
  for (j=0; j<board.length; j+=1) {
    for (i=0; i<board.length; i+=1) {
      if (board[i][j] === currentPlayer) {
        counter += 1;
      }
      if (counter === 3) {
        console.log('checkVertical: true')
        return true;
      }
    }
    counter = 0;
  }
}

const checkH = (value) => value === 'X';

const checkHorizontal = (board) => {
  for (i=0; i<board.length; i+=1) {
    console.log(board[i].every(checkH));
    if (board[i].every(checkH)) {
      console.log('checkHorizontal: true');
      return true;
    }
  }
}

const checkDiagonal1 = (board) => {
  for (i=0; i<board.length; i+=1) {
    if (board[i][i] === currentPlayer) {
      counter += 1;
    }
    if (counter === 3) {
      console.log('checkDiagonal1: true')
      return true;
    }
  }
  counter = 0;
};

const checkDiagonal2 = (board) => {
  let cloneBoard = board.map((x) => x);
  cloneBoard = cloneBoard.reverse();
  for (i=0; i<cloneBoard.length; i+=1) {
    if (cloneBoard[i][i] === currentPlayer) {
      counter += 1;
    }
    if (counter === 3) {
      console.log('checkDiagona2: true')
      return true;
    }
  }
  counter = 0;
};

const checkWin = (board) => {
  if (checkVertical(board) || checkHorizontal(board) || checkDiagonal1(board) || checkDiagonal2(board)) {
    return true;
  } else {
    return false;
  }
}

const squareClick = (column, row) => {
  console.log('coordinates', column, row);
  if (canClick == false) {
    return;
  }
  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    if (checkWin(board) === true) {
      outputMessage.innerHTML = `${currentPlayer} win`;
      canClick = false;
      setTimeout(() => {resetGame()},3000);
    } else {
    // change the player
      togglePlayer();
    }
  }
};

// Gameplay
initGame();