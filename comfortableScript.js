// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== GLOBAL VARIABLES ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================
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

// whether the user can click or not
let canClick = true;

const gameInfo = document.createElement('div');
gameInfo.classList.add('game--message');
const output = (message) => {
  gameInfo.innerText = message;
};

let square;

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== HELPER FUNCTIONS  ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// completely rebuilds the entire board every time there's a click
const buildBoard = (boards) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < boards.length; i += 1) {
    // separate var for one row / row element
    const row = boards[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = boards[i][j];

      rowElement.appendChild(square);

      // set the click all over again

      square.addEventListener('click', () => {
        // eslint-disable-next-line
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== RESULT VALIDATION ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================
let horizontalCountX;
let horizontalCountO;
let verticalCountO;
let verticalCountX;
let diagonalFromTopLeftCountX;
let diagonalFromTopLeftCountO;
let diagonalFromTopRightCountX;
let diagonalFromTopRightCountO;

const checkWin = (board) => {
  diagonalFromTopLeftCountO = 0;
  diagonalFromTopLeftCountX = 0;
  diagonalFromTopRightCountO = 0;
  diagonalFromTopRightCountX = 0;
  for (let i = 0; i < board.length; i += 1) {
    horizontalCountO = 0;
    horizontalCountX = 0;
    verticalCountO = 0;
    verticalCountX = 0;

    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === 'X') {
        horizontalCountX += 1;
      } else if (board[i][j] === 'O') {
        horizontalCountO += 1;
      }
      if (board[j][i] === 'X') {
        verticalCountX += 1;
      } else if (board[j][i] === 'O') {
        verticalCountO += 1;
      }
      if (horizontalCountO === board.length || horizontalCountX === board.length
        || verticalCountO === board.length || verticalCountX === board.length) {
        return true;
      }
    }

    if (board[i][i] === 'X') {
      diagonalFromTopLeftCountX += 1;
    } else if (board[i][i] === 'O') {
      diagonalFromTopLeftCountO += 1;
    }
    if (board[i][board.length - 1 - i] === 'X') {
      diagonalFromTopRightCountX += 1;
    } else if (board[i][board.length - 1 - i] === 'O') {
      diagonalFromTopRightCountO += 1;
    }
  }
  if (diagonalFromTopLeftCountO === board.length
      || diagonalFromTopLeftCountX === board.length
      || diagonalFromTopRightCountO === board.length
      || diagonalFromTopRightCountX === board.length) {
    return true;
  }

  return false;
};

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== GAMEPLAY LOGIC  ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// result validation

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
    if (canClick === false) {
      return;
    }

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    console.log('canClick');
    if (checkWin(board) === true) {
      output(`${currentPlayer} wins!`);
      console.log('game over');

      setTimeout(() => {
        // reset game
        board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
        document.querySelector('.board--container').remove();
        currentPlayer = 'X';
        // eslint-disable-next-line
        initGame()
      }, 3000);
      canClick = true;
    }
    else {
      togglePlayer();
      console.log('toggle');
    }
  }
};

// ================================================================================================
// ================================================================================================
// ================================================================================================
//           ========================== GAME INITIALISATION  ============================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  boardContainer.classList.add('board--container');
  document.body.appendChild(boardContainer);
  document.body.appendChild(gameInfo);
  output('welcome, the first player will be player X');

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();
