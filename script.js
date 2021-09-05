// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let boardSizeToBuild = 3;
let numSquaresToWin = 3;
let playerWon = false;
let currentPlayer = 'X';

// ############# DOM Element ###########
// ####################################

let boardElement;
let boardContainer;
let message;
const field = document.createElement('input');
const field2 = document.createElement('input');
const boardSize = document.createElement('p');
const squaresToWin = document.createElement('p');
const submitButton = document.createElement('button');

// ########### Helper Functions ###########
// ###################################

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const getElement = (a) => document.getElementById(`${a}`);

const createBoardArray = () => {
  board = [];
  for (let i = 0; i < boardSizeToBuild; i += 1) {
    const emptyArray = [];
    board.push(emptyArray);
    for (let j = 0; j < boardSizeToBuild; j += 1) {
      const emptyText = '';
      board[i].push(emptyText);
    }
  }
};

const checkWin = (array) => {
  // check horizontal
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length; j += 1) {
      if (array[i][j] === currentPlayer && playerWon === false) {
        for (let k = 0; k < numSquaresToWin; k += 1) {
          if (array[i][j + k] !== currentPlayer) {
            k = numSquaresToWin;
          } else if (k === numSquaresToWin - 1) {
            playerWon = true;
            console.log('horizontal win');
          }
        }
      }
    }
  }
  // check vertical
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length; j += 1) {
      if (array[i][j] === currentPlayer && playerWon === false) {
        for (let k = 0; k < numSquaresToWin; k += 1) {
          if ((i + k) >= array.length) {
            k = numSquaresToWin;
          } else if (array[i + k][j] !== currentPlayer) {
            k = numSquaresToWin;
          } else if (k === numSquaresToWin - 1) {
            playerWon = true;
            console.log('vertical win');
          }
        }
      }
    }
  }
  // diagonal top L to bot R
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length; j += 1) {
      if (array[i][j] === currentPlayer && playerWon === false) {
        for (let k = 0; k < numSquaresToWin; k += 1) {
          if ((i + k) >= array.length) {
            k = numSquaresToWin;
          } else if (array[i + k][j + k] !== currentPlayer) {
            k = numSquaresToWin;
          } else if (k === numSquaresToWin - 1) {
            playerWon = true;
            console.log('diagonal top L to bot R win');
          }
        }
      }
    }
  }
  // diagonal bot L to top R
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length; j += 1) {
      if (array[i][j] === currentPlayer && playerWon === false) {
        for (let k = 0; k < numSquaresToWin; k += 1) {
          if ((i - k) < 0) {
            k = numSquaresToWin;
          } else if (array[i - k][j + k] !== currentPlayer) {
            k = numSquaresToWin;
          } else if (k === numSquaresToWin - 1) {
            playerWon = true;
            console.log('diagonal bot L to top R win');
          }
        }
      }
    }
  }
  // end of this function
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);
  if (board[column][row] === '') {
    board[column][row] = currentPlayer;
    checkWin(board);
    if (playerWon === true) {
      message.innerHTML = `${currentPlayer} has Won!!!`;
    }
    else {
      togglePlayer();
    }
  }
  buildBoard(board);
};

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

// create the board container element and put it on the screen
const initGame = () => {
  getElement('boardSize').remove();
  getElement('userInput').remove();
  getElement('userInput2').remove();
  getElement('squaresToWin').remove();
  getElement('submit').remove();

  createBoardArray();

  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  message = document.createElement('p');
  document.body.appendChild(message);
  message.innerHTML = `Selected a board size of ${boardSizeToBuild} by ${boardSizeToBuild}. <br> Each player would need to have ${numSquaresToWin} of squares in a row to win.`;

  // build the board - right now it's empty
  buildBoard(board);
};

// initGame();

const capture = () => {
  // capture user input into board size to be built
  boardSizeToBuild = Number(field.value);
  // capture user input into number of squares in order to win
  numSquaresToWin = Number(field2.value);
  // check that maxCard is a whole positive number
  if (Number.isInteger(boardSizeToBuild) && Number.isInteger(numSquaresToWin))
  {
    initGame();
  } };

const setUpGame = () => {
  boardSize.setAttribute('id', 'boardSize');
  boardSize.innerHTML = 'How many rows in your TicTacToe Board?';
  document.body.appendChild(boardSize);

  // input field for board size
  field.setAttribute('id', 'userInput');
  document.body.appendChild(field);

  squaresToWin.setAttribute('id', 'squaresToWin');
  squaresToWin.innerHTML = 'How many squares in a row to win?';
  document.body.appendChild(squaresToWin);

  // input field for number of squares in a row
  field2.setAttribute('id', 'userInput2');
  document.body.appendChild(field2);

  const divider = document.createElement('div');
  divider.innerHTML = '<br>';
  document.body.appendChild(divider);

  // submit button
  submitButton.setAttribute('id', 'submit');
  submitButton.innerHTML = 'Submit';
  document.body.appendChild(submitButton);
  submitButton.addEventListener('click', capture);
};

setUpGame();
