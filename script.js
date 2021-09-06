// ============= GLOBAL VARIABLES ===================

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

let square;

let messageCont;

const playAgainButton = document.createElement('button');
playAgainButton.classList.add('button');
playAgainButton.innerText = 'Play Again';

// let squareElement;

// ============== HELPER FUNCTIONS =================
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
      square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', (event) => {
        squareClick(i, j);
        console.log(event.currentTarget);
      });

      rowElement.appendChild(square);
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

const output = (message) => {
  messageCont.innerHTML = message;
};

// =============== GAME INITIALISATION LOGIC =================
// create the board container element and put it on the screen
const initGame = () => {
  messageCont = document.createElement('div');
  messageCont.classList.add('message');
  output('Win by plotting your Xs or Os in a<br>diagonal, horizontal or vertical manner');
  document.body.appendChild(messageCont);

  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

// ================ GAMEPLAY LOGIC =================
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const checkWin = () => {
  let diagonalRightValue = '';
  let diagonalLeftValue = '';

  for (let j = 0; j < 3; j += 1) {
    let rowValue = '';
    let colValue = '';

    for (let i = 0; i < 3; i += 1) {
      rowValue += board[j][i];
      colValue += board[i][j];
      console.log(colValue);

      if (i === j) {
        console.log(i, j);
        diagonalRightValue += board[j][i];
        console.log(diagonalRightValue, i, j);
      }
      console.log(diagonalRightValue);

      if (i === 0 && j === 2) {
        diagonalLeftValue += board[i][j];
      }
      if (i === 1 && j === 1) {
        diagonalLeftValue += board[i][j];
      }
      if (i === 2 && j === 0) {
        diagonalLeftValue += board[i][j];
      }
    }
    if (rowValue === 'XXX' || colValue === 'XXX' || diagonalRightValue === 'XXX' || diagonalLeftValue === 'XXX') {
      output('X wins!');
      document.body.appendChild(playAgainButton);
      playAgainButton.addEventListener('click', playAgainClick);
    } else if (rowValue === 'OOO' || colValue === 'OOO' || diagonalRightValue === 'OOO' || diagonalLeftValue === 'OOO') {
      output('O wins!');
      document.body.appendChild(playAgainButton);
      playAgainButton.addEventListener('click', playAgainClick);
    } }
};

const squareClick = (column, row) => {
  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    checkWin();

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    // squareElement.style.backgroundColor = 'red';

    // change the player
    togglePlayer();
  }
};

const playAgainClick = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  output('');
  buildBoard(board);
  output('Win by plotting your Xs or Os in a<br>diagonal, horizontal or vertical manner');
  // playAgainButton.innerHTML = '';
};

initGame();
