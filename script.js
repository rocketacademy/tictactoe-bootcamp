// ============= GLOBAL VARIABLES ===================

// keep data about the game in a 2-D array
let board = [];

const buildEmptyBoard = (size) => {
  board = [];
  for (let i = 0; i < size; i += 1) {
    board.push([]);
    for (let j = 0; j < size; j += 1) {
      board[i].push('');
    }
  }
};

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// global for square box on board
let square;

// global for message container
const messageCont = document.createElement('div');
messageCont.classList.add('message');

// global for playAgain button
const playAgainButton = document.createElement('button');
playAgainButton.classList.add('button');
playAgainButton.innerText = 'Play Again';

// global for selectors container
const selectorCont = document.createElement('div');
selectorCont.classList.add('message');

const boardSizeSelector = document.createElement('div');
boardSizeSelector.classList.add('selector');
boardSizeSelector.innerHTML = 'Board Size<br>';

// global for input field: board size
const boardSizeInput = document.createElement('input');
boardSizeInput.setAttribute('type', 'number');
boardSizeInput.value = 3;
boardSizeInput.classList.add('input');

console.log(typeof boardSizeInput.value);

// global for input + button
const boardSizePlusButton = document.createElement('button');
boardSizePlusButton.innerText = '+';

// global for input - button
const boardSizeMinusButton = document.createElement('button');
boardSizeMinusButton.innerText = '-';

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
      square.addEventListener('click', () => {
        squareClick(i, j);
      });

      rowElement.appendChild(square);
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// function to append text to message container
const output = (message) => {
  messageCont.innerHTML = message;
};

const plusButtonClick = (target) => {
  const currentValue = Number(target.value);
  target.value = currentValue + 1;
  buildEmptyBoard(target.value);
  buildBoard(board);
};

const minusButtonClick = (target) => {
  const currentValue = Number(target.value);
  if (currentValue >= 4) {
    target.value = currentValue - 1; }
  buildEmptyBoard(target.value);
  buildBoard(board);
};

// =============== GAME INITIALISATION LOGIC =================
// create the board container element and put it on the screen
const initGame = () => {
  // append message Container with defaulty message
  output('Win by plotting your Xs or Os in a<br>diagonal, horizontal or vertical manner');
  document.body.appendChild(messageCont);

  // append selector container
  document.body.appendChild(selectorCont);
  // append board size input field
  selectorCont.appendChild(boardSizeSelector);
  boardSizeSelector.appendChild(boardSizeInput);

  boardSizePlusButton.addEventListener('click', (event) => { plusButtonClick(boardSizeInput); });
  boardSizeMinusButton.addEventListener('click', (event) => { minusButtonClick(boardSizeInput); });
  boardSizeSelector.appendChild(boardSizePlusButton);
  boardSizeSelector.appendChild(boardSizeMinusButton);

  // create and append board container
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // append playAgain button
  playAgainButton.addEventListener('click', playAgainClick);
  document.body.appendChild(playAgainButton);

  // build the board - empty at first initialisation
  buildEmptyBoard(boardSizeInput.value);
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

// check win conditions and generate output message
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
    } else if (rowValue === 'OOO' || colValue === 'OOO' || diagonalRightValue === 'OOO' || diagonalLeftValue === 'OOO') {
      output('O wins!');
    } }
};

// things that happen when a square is clicked
const squareClick = (column, row) => {
  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // call the checkwin function at every click to check for wins
    checkWin();

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    // squareElement.style.backgroundColor = 'red';

    // change the player
    togglePlayer();
  }
};

// things that happen when playAgain button is clicked
const playAgainClick = () => {
  // empty the board
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  // build back empty board
  buildBoard(board);
  // append default message in message container
  output('Win by plotting your Xs or Os in a<br>diagonal, horizontal or vertical manner');
};

initGame();
