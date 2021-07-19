// Please implement exercise logic here
// keep data about the game in a 2-D array
/**
 * GLOBAL VARIABLES
 */
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// board size
let boardSize = 3;

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// game state canClick
let canClick = true;

/**
 * STRING CONSTANTS
 */

const WELCOME_MESSAGE = 'Hello, please type in a number (from 3 to 8) for the board size. For instance, typing in 3 will generate a 3x3 Tic Tac Toe board.';
const INPUT_FIELD_PLACEHOLDER = 'Key in a number from 3 (inclusive) to 8 (inclusive).';
const BUTTON_TEXT = 'Submit';
const WARNING_TEXT = 'Please enter a valid number from 3 (inclusive) to 8 (inclusive).'

/**
 * TIMEOUT OR INTERVAL VARIABLES
 */

let computerSetSquareTimeout;

/**
 * EVENT LISTENERS
 */

const handleSubmit = () => {
  const INPUT_FIELD = document.querySelector('.inputField');
  if (INPUT_FIELD.value < 3 || INPUT_FIELD.value > 8) {
    const WARNING_TEXTS = document.querySelectorAll('.color-red');
    if (WARNING_TEXTS.length === 0) {
      const WARNING_TEXT_PARAGRAPH = document.createElement('p');
      WARNING_TEXT_PARAGRAPH.classList.add('color-red');
      WARNING_TEXT_PARAGRAPH.style.width = '500px';
      WARNING_TEXT_PARAGRAPH.innerText = WARNING_TEXT;
      document.body.appendChild(WARNING_TEXT_PARAGRAPH);
    }
  } else {
    boardSize = INPUT_FIELD.value
    board = initBoard(boardSize, board);
    // erase existing inputs
    const INPUTS = document.querySelectorAll('input');
    for (let i = 0; i < INPUTS.length; i++) {
      INPUTS[i].remove();
    }
    // erase existing paragraphs
    const PARAGRAPHS = document.querySelectorAll('p');
    for (let i = 0; i < PARAGRAPHS.length; i++) {
      PARAGRAPHS[i].remove();
    }
    // erase existing buttons
    const BUTTONS = document.querySelectorAll('button');
    for (let i = 0; i < BUTTONS.length; i++) {
      BUTTONS[i].remove();
    }
    initGame();
  }
}

const checkSubmit = (e) => {
  if (e.code == "Enter") {
    handleSubmit();
  }
}

const resetRound = () => {
  // clear all HTML elements
  const DIVS = document.querySelectorAll('div');
  for (let i = 0; i < DIVS.length; i++) {
    DIVS[i].remove();
  }
  const BUTTONS = document.querySelectorAll('button');
  for (let i = 0; i < BUTTONS.length; i++) {
    BUTTONS[i].remove();
  }
  const INPUTS = document.querySelectorAll('input');
  for (let i = 0; i < INPUTS.length; i++) {
    INPUTS[i].remove();
  }
  const PARAGRAPHS = document.querySelectorAll('p');
  for (let i = 0; i < PARAGRAPHS.length; i++) {
    PARAGRAPHS[i].remove();
  }
  // init board
  board = initBoard(boardSize, board);
  // init game
  initGame();
}

/**
 * HELPER FUNCTIONS
 */
// build board based on user input
const initBoard = (size, boardObj) => {
  // empty string item to be pushed for initialising board size
  const ELEMENT = '';

  // empty board
  while (boardObj.length > 0) {
    boardObj.pop();
  }

  for (let i = 0; i < size; i++) {
    const ARRAY = [];
    for (let j = 0; j < size; j++) {
      ARRAY.push(ELEMENT);
    }
    boardObj.push(ARRAY);
  }

  return boardObj;
}
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

/**
 * GAME INITIALISATION LOGIC
 */
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // text for determining player turn
  const TURN_PARAGRAPH = document.createElement('p');
  TURN_PARAGRAPH.classList.add('turnParagraph');
  if (currentPlayer === 'O') {
    TURN_PARAGRAPH.innerText = `This is the Computer's (${currentPlayer}) turn. Please wait while the Computer makes its move and mark an empty square with a '${currentPlayer}'.`;
  } else {
    TURN_PARAGRAPH.innerText = `This is your turn, Player. Please make your move by marking a '${currentPlayer}' on a blank square.`;
  }
  document.body.appendChild(TURN_PARAGRAPH);

  // build the board - right now it's empty
  buildBoard(board);

  // enable or re-enable clicking
  canClick = true;
};

const initSettings = () => {
  // welcome message
  const WELCOME_MESSAGE_PARAGRAPH = document.createElement('p');
  WELCOME_MESSAGE_PARAGRAPH.innerText = WELCOME_MESSAGE;
  WELCOME_MESSAGE_PARAGRAPH.style.width = '500px';
  document.body.appendChild(WELCOME_MESSAGE_PARAGRAPH);
  // input field
  const INPUT_FIELD = document.createElement('input');
  INPUT_FIELD.classList.add('inputField');
  INPUT_FIELD.setAttribute('type', 'number');
  INPUT_FIELD.style.width = '400px';
  INPUT_FIELD.placeholder = INPUT_FIELD_PLACEHOLDER;
  INPUT_FIELD.addEventListener('keypress', checkSubmit);
  document.body.appendChild(INPUT_FIELD);
  // submit button
  const BUTTON = document.createElement('button');
  BUTTON.innerText = BUTTON_TEXT;
  INPUT_FIELD.setAttribute('min', 3);
  INPUT_FIELD.setAttribute('max', 8);
  BUTTON.addEventListener('click', handleSubmit);
  document.body.appendChild(BUTTON);
}

/**
 * GAMEPLAY LOGIC
 */
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }

  // .turnParagraph is already created previously in initGame();
  const TURN_PARAGRAPH = document.querySelector('.turnParagraph');
  if (currentPlayer === 'O') {
    TURN_PARAGRAPH.innerText = `This is the Computer's (${currentPlayer}) turn. Please wait while the Computer makes its move and mark an empty square with a '${currentPlayer}'.`;

    canClick = false;

    let computerRow = Math.floor(Math.random() * boardSize);
    let computerCol = Math.floor(Math.random() * boardSize);
    while (board[computerCol][computerRow] !== '') {
      computerRow = Math.floor(Math.random() * boardSize);
      computerCol = Math.floor(Math.random() * boardSize);
    }

    clearTimeout(computerSetSquareTimeout);
    computerSetSquareTimeout = setTimeout(() => {
      setBoardAndCheckWin(computerCol, computerRow);
      canClick = true;
    }, 2000)
  } else {
    TURN_PARAGRAPH.innerText = `This is your turn, Player. Please make your move by marking a '${currentPlayer}' on a blank square.`;
  }
};

// having setBoardAndCheckWin away from squareClick
// also keeps squareClick access only to player, not computer
const setBoardAndCheckWin = (column, row) => {
  // alter the data array, set it to the current player
  board[column][row] = currentPlayer;

  // refresh the creen with a new board
  // according to the array that was just changed
  buildBoard(board);

  if (checkWin(board) === true) {
    // game over
    canClick = false;
    // remove 'turn' paragraph
    const TURN_PARAGRAPH = document.querySelector('.turnParagraph');
    TURN_PARAGRAPH.remove();
    // add 'winner' paragraph
    const WINNER_PARAGRAPH = document.createElement('p');
    WINNER_PARAGRAPH.classList.add("winnerParagraph");
    WINNER_PARAGRAPH.innerText = `${currentPlayer} is the winner!`;
    document.body.appendChild(WINNER_PARAGRAPH);
    // add 'reset' button
    const RESET_BUTTON = document.createElement('button');
    RESET_BUTTON.innerText = 'Restart Round';
    RESET_BUTTON.addEventListener('click', resetRound);
    document.body.appendChild(RESET_BUTTON);
  } else {
    // change the player
    togglePlayer();
  }
}

const squareClick = function (column, row) {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '' && canClick) {
    setBoardAndCheckWin(column, row)
  }
};

const checkLine = (item, index, line) => {
  return item === line[0];
}

const checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions

  // check for horizontal and vertical matches
  for (let i = 0; i < board.length; i += 1) {
    // retrieve all values in a row
    const ROW = [];
    const COLUMN = [];
    for (let j = 0; j < board.length; j++) {
      ROW.push(board[i][j]);
      COLUMN.push(board[j][i])
    }

    // initialize boolean conditions,
    // disregard rows or columns with empty squares
    const ROW_MATCHED = (ROW[0] !== "" && ROW.every(checkLine));
    const COLUMN_MATCHED = (COLUMN[0] !== "" && COLUMN.every(checkLine))
    
    if (ROW_MATCHED || COLUMN_MATCHED) {
      return true;
    }
  }

  // bottom-left to top-right match
  const BOTTOM_LEFT_TO_TOP_RIGHT = [];
  // i refers to row, j refers to col
  for (let i = board.length - 1, j = 0; i >= 0; i -= 1, j += 1) {
    BOTTOM_LEFT_TO_TOP_RIGHT.push(board[i][j]);
  }

  const BOTTOM_LEFT_TO_TOP_RIGHT_MATCHED = (BOTTOM_LEFT_TO_TOP_RIGHT[0] !== "" && BOTTOM_LEFT_TO_TOP_RIGHT.every(checkLine));

  if (BOTTOM_LEFT_TO_TOP_RIGHT_MATCHED) {
    return true;
  }

  // top-left to bottom-right match
  const TOP_LEFT_TO_BOTTOM_RIGHT = [];
  // i refers to row, j refers to col
  for (let i = 0; i < board.length; i += 1) {
    TOP_LEFT_TO_BOTTOM_RIGHT.push(board[i][i]);
  }

  const TOP_LEFT_TO_BOTTOM_RIGHT_MATCHED = (TOP_LEFT_TO_BOTTOM_RIGHT[0] !== "" && TOP_LEFT_TO_BOTTOM_RIGHT.every(checkLine));
  if (TOP_LEFT_TO_BOTTOM_RIGHT_MATCHED) {
    return true;
  }

  return false;
};

initSettings();

// initGame();
