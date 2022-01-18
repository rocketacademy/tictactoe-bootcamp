// Please implement exercise logic here

// GLOBAL VARIABLES

// keep data about the game in a 2-D array
// let board = [
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
// ];

// whether the user can click the board or not
let canClick = true;
let squareClicks = 0; // checks if game is over or not

// for checking wins are determining cpu move
let xCount = 0;
let oCount = 0;

let numberToWin = 0; // board.length;
const getNumbertoWin = () => {
  numberToWin = board.length;
};

// for advanced cpu
let xAboutToWin = false; // for computer to make block
let aboutToWinType = '';
let iValue = 0;
let moveBlockArray = [];

let boardSize;
const board = [];
let questionDiv;

const buildBoardArray = () => {
  for (let i = 0; i < boardSize; i += 1) {
    board[i] = [];
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push('');
    }
  }
};

// reset game
const resetGame = () => {
  location.reload();
};

// builds the reset button when you win/lose;
const buildResetButton = () => {
  const resetButton = document.createElement('button');
  resetButton.innerText = 'Rematch?';
  resetButton.addEventListener('click', resetGame);
  document.body.appendChild(resetButton);
  console.log('builded');
};

// check for win conditions
// if value of board elements in a row/column/diagonal are equal to each other, win.
// code for same row: board[i][j] == board[i][j+1] && board[i][j] == board[i][j+2], loop i < 3
// code for same column: board[j][i] == board[j+1][i] board[j][i] == board[j+2][i]
// code for diagonal win: board[0][0] == board[1][1] && board [0][0] == board[2][2]

const winConditions = () => {
  // new attempt

  for (let i = 0; i < board.length; i += 1) {
    // check rows
    xCount = 0;
    oCount = 0;

    for (let j = 0; j < board.length; j += 1) {
      if (board[i][j] === 'X') {
        xCount += 1;
      }
      if (board[i][j] === 'O') {
        oCount += 1;
      }
    }
    if (xCount === boardSize - 1 && oCount === 0) {
      xAboutToWin = true;
      aboutToWinType = 'row';
      iValue = i;
      console.log(`about to win: ${xAboutToWin}, type: ${aboutToWinType}`);
    }
    if (xCount === numberToWin || oCount === numberToWin) {
      return true;
    }

    // check columns
    xCount = 0;
    oCount = 0;

    for (let j = 0; j < board.length; j += 1) {
      if (board[j][i] === 'X') {
        xCount += 1;
      }
      if (board[j][i] === 'O') {
        oCount += 1;
      }
    }
    if (xCount === boardSize - 1 && oCount === 0 && aboutToWinType === '') { //  do not store new values for cpu if aboutToWinType is already stored
      xAboutToWin = true;
      aboutToWinType = 'column';
      iValue = i;
    }
    if (xCount === numberToWin || oCount === numberToWin) {
      return true;
    }
  }

  // check diagonals: top left to bottom right
  xCount = 0;
  oCount = 0;

  for (let j = 0; j < board.length; j += 1) {
    if (board[j][j] === 'X') {
      xCount += 1;
    }
    if (board[j][j] === 'O') {
      oCount += 1;
    }
    if (xCount === boardSize - 1 && oCount === 0 && aboutToWinType === '') {
      xAboutToWin = true;
      aboutToWinType = 'tlbr';
    }
    if (xCount === numberToWin || oCount === numberToWin) {
      return true;
    }
  }

  // check diagonals: top right to bottom left
  xCount = 0;
  oCount = 0;

  for (let j = 0; j < board.length; j += 1) {
    if (board[j][board.length - 1 - j] === 'X') {
      xCount += 1;
    }
    if (board[j][board.length - 1 - j] === 'O') {
      oCount += 1;
    }
    if (xCount === boardSize - 1 && oCount === 0 && aboutToWinType === '') {
      xAboutToWin = true;
      aboutToWinType = 'trbl';
    }
    if (xCount === numberToWin || oCount === numberToWin) {
      return true;
    }
  }

  return false;
};

// current player global starts at X
let currentPlayer = 'X';
let boardContainer;

// // switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else if (currentPlayer === 'O')
  {
    currentPlayer = 'X';
  }
};

// cpu plays
const cpuTurn = () => {
  if (currentPlayer === 'O') { // cpu to only move if player is 'O'
    // const moveBlockArray = []; // empty array to store blocking move
    // if X is about to win;
    if (xAboutToWin) {
      // row check
      if (aboutToWinType === 'row') {
        for (let j = 0; j < boardSize; j += 1) {
          if (board[iValue][j] === '') {
            moveBlockArray.push(iValue);
            moveBlockArray.push(j);
          }
        }
      }
      // column check
      if (aboutToWinType === 'column') {
        for (let j = 0; j < boardSize; j += 1) {
          if (board[j][iValue] === '') {
            moveBlockArray.push(j);
            moveBlockArray.push(iValue);
          }
        }
      }

      // top left to bottom right / tlbr check
      if (aboutToWinType === 'tlbr') {
        for (let j = 0; j < board.length; j += 1) {
          if (board[j][j] === '') {
            moveBlockArray.push(j);
            moveBlockArray.push(j);
          }
        }
      }

      // top right to bottom left / trbl check
      if (aboutToWinType === 'trbl') {
        for (let j = 0; j < board.length; j += 1) {
          if (board[j][board.length - 1 - j] === '') {
            moveBlockArray.push(j);
            moveBlockArray.push(board.length - 1 - j);
          }
        }
      }
      console.log('advanced cpu activated');
      console.log(`array to block: ${moveBlockArray}`);
      canClick = true;
      cpuSquareClick(moveBlockArray[0], moveBlockArray[1]);
      canClick = true;

      // reset global checking variables
      xAboutToWin = false;
      aboutToWinType = '';
      moveBlockArray = [];
    }

    else {
      // regular random square select
      const emptySquares = [];
      // loop to add squares that are empty into an array:
      for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board.length; j += 1) {
          if (board[i][j] === '') {
            emptySquares.push([i, j]);
          }
        }
      }
      // get random column and row number to feed into squareClicks(row, column)
      const randomNumber = Math.floor(Math.random() * emptySquares.length);
      const randomRow = emptySquares[randomNumber][0];
      const randomColumn = emptySquares[randomNumber][1];

      canClick = true;
      cpuSquareClick(randomRow, randomColumn);
      canClick = true;
    }
  }
};

const cpuSquareClick = (column, row) => { // WRONG!!! it's actually (row, column)
  // see if the clicked square has been clicked on before
  if (board[column][row] === '' && canClick) {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // count successful square clicks:
    squareClicks += 1;

    console.log(`win:${winConditions()}`);

    if (winConditions()) {
      const winMessage = document.createElement('div');
      winMessage.classList.add('message');
      winMessage.innerText = `${currentPlayer} WINS!`;
      document.body.appendChild(winMessage);
      buildResetButton();
      // disable clicking the board
      canClick = false;
    }

    // draw conditions
    else if (!winConditions() && squareClicks === board.length * board.length) {
      const drawMessage = document.createElement('div');
      drawMessage.classList.add('message');
      drawMessage.innerText = 'IT\'S A 👔!';
      document.body.appendChild(drawMessage);
      buildResetButton();
    }

    // change the player
    else {
      togglePlayer();
    }
  }
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '' && canClick) {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // count successful square clicks:
    squareClicks += 1;

    console.log(`win:${winConditions()}`);

    if (winConditions()) {
      const winMessage = document.createElement('div');
      winMessage.classList.add('message');
      winMessage.innerText = `${currentPlayer} WINS!`;
      document.body.appendChild(winMessage);
      buildResetButton();
      // disable clicking the board
      canClick = false;
    }

    // draw conditions
    else if (!winConditions() && squareClicks === board.length * board.length) {
      const drawMessage = document.createElement('div');
      drawMessage.classList.add('message');
      drawMessage.innerText = 'IT\'S A 👔!';
      document.body.appendChild(drawMessage);
      buildResetButton();
      canClick = false;
    }

    // change the player
    else {
      togglePlayer();
      canClick = false;
      const cpuTurnRef = setTimeout(cpuTurn, 1000);
    }
  }
};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  // boardElement = document.createElement('div');
  boardContainer.classList.add('board');

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
      if (square.innerText === 'X') {
        square.setAttribute('class', 'x-cell');
      }
      else if (square.innerText === 'O') {
        square.setAttribute('class', 'o-cell');
      }

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

const getBoardSize = () => {
  console.log('clicked');

  const questionInput = document.getElementById('question-input1');

  if (questionInput.value >= 1 && questionInput.value <= 21) {
    boardSize = questionInput.value;
    buildBoardArray(); // build the board array only after letting the user define boardsize

    // const questionElements = document.getElementById('question');
    // questionElements.style = 'display:hidden';

    questionDiv.innerHTML = ''; // clear inner html because i can't figure out how to make visible
    boardContainer.style = 'display:show';

    buildBoard(board); // only build board after submitting
    getNumbertoWin(); }
};

const askBoardSize = () => {
  // create div to hold question elements
  questionDiv = document.createElement('div');
  questionDiv.style.display = 'show';
  questionDiv.setAttribute('id', 'question-div');
  document.body.appendChild(questionDiv);

  // create question to show on screen
  const question = document.createElement('div');
  question.classList.add('question');
  question.classList.add('message');
  question.innerText = 'How long is your board? 😏';
  questionDiv.appendChild(question);

  // create input
  const questionInput = document.createElement('input');
  question.classList.add('question');
  questionInput.setAttribute('id', 'question-input1');
  questionInput.placeholder = 'Pick a number from 1 to infinity';
  questionDiv.appendChild(questionInput);

  // create button for input;
  const questionButton = document.createElement('button');
  question.classList.add('question');
  questionButton.innerText = "Let's go!";
  questionButton.addEventListener('click', getBoardSize);
  questionDiv.appendChild(questionButton);
};

// INITIALISE GAME

// create the board container element and put it on the screen
const initGame = () => {
  askBoardSize();
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  boardContainer.style = 'display:none';
  // boardContainer.style = 'display:show';
};

initGame(); //
