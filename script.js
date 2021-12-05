/**
 * Helper function for output to abstract complexity of DOM 
 * manipulation away from game logic.
 * @param {*} message Game information message
 */
const output = (message) => {
  document.querySelector('.game-info').innerText = message;
};

/**
 * Build board-size input and number-of-squares-to-win input.
 */
const buildUserChoiceInput = () => {
  const userInputs = document.createElement('div');
  userInputs.classList.add('user-inputs');

  boardSizeInput = document.createElement('input');
  boardSizeInput.classList.add('user-input');
  boardSizeInput.placeholder = 'Type in board size (3-10)';
  userInputs.appendChild(boardSizeInput);

  squaresInARowInput = document.createElement('input');
  squaresInARowInput.classList.add('user-input');
  squaresInARowInput.placeholder = 'Type in # of squares in a row to win (3-10)';
  userInputs.appendChild(squaresInARowInput);

  document.body.appendChild(userInputs);
};

/**
 * Build game mode selection buttons.
 */
const buildGameModeInput = () => {
  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const vsPlayerButton = document.createElement('button');
  vsPlayerButton.classList.add('button');
  vsPlayerButton.addEventListener('click', () => buttonClick('VS_PLAYER'));
  vsPlayerButton.innerText = 'vs Player';
  buttons.appendChild(vsPlayerButton);

  const vsComputerEasyButton = document.createElement('button');
  vsComputerEasyButton.classList.add('button');
  vsComputerEasyButton.addEventListener('click', () => buttonClick('VS_COMPUTER_EASY'));
  vsComputerEasyButton.innerText = 'vs Computer (Easy)';
  buttons.appendChild(vsComputerEasyButton);

  const vsComputerNormal = document.createElement('button');
  vsComputerNormal.classList.add('button');
  vsComputerNormal.addEventListener('click', () => buttonClick('VS_COMPUTER_NORMAL'));
  vsComputerNormal.innerText = 'vs Computer (Normal)';
  buttons.appendChild(vsComputerNormal);

  const vsComputerHard = document.createElement('button');
  vsComputerHard.classList.add('button');
  vsComputerHard.addEventListener('click', () => buttonClick('VS_COMPUTER_HARD'));
  vsComputerHard.innerText = 'vs Computer (Hard)';
  buttons.appendChild(vsComputerHard);

  document.body.appendChild(buttons);
};

/**
 * Build the game information area.
 */
const buildGameInfo = () => {
  // add area for game information
  gameInfoElement = document.createElement('div');
  gameInfoElement.classList.add('game-info');
  document.body.appendChild(gameInfoElement);
};

/**
 * Build the game board.
 * Completely rebuilds the entire board every time there's a click.
 */
const buildBoard = () => {
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
 * Get maximum depth in all directions.
 * @param {*} depth Array of depths in all directions
 * @returns Max depth
 */
const getMaximumDepth = (depth) => {
  let longest = 0;
  let length = 0;

  length = Math.max(depth);
  if (length > longest) longest = length;

  length = depth[UP] + depth[DOWN];
  if (length > longest) longest = length;

  length = depth[UP_RIGHT] + depth[DOWN_LEFT];
  if (length > longest) longest = length;

  length = depth[RIGHT] + depth[LEFT];
  if (length > longest) longest = length;

  length = depth[UP_LEFT] + depth[DOWN_RIGHT];
  if (length > longest) longest = length;

  return longest;
};

/**
 * Traverse the adjacent squares to see get how many values in a row.
 * @param {*} movement Direction of movement
 * @param {*} row Row index of clicked square
 * @param {*} column Column index of clicked square
 * @param {*} depth Last known depth as traversing is in progress
 * @returns Maximum depth of a direction
 */
const traverseSquares = (movement, row, column, depth) => {
  const newRow = row + movement.y;
  const newColumn = column + movement.x;

  // if the new row / column indexes are out of bounds
  if ((newRow < 0) || (newColumn < 0)
    || (newRow >= board.length) || (newColumn >= board.length)) {
    return depth;
  }

  // if the next square has a different value
  if (board[row][column] !== board[newRow][newColumn]) {
    return depth;
  }

  return traverseSquares(movement, newRow, newColumn, depth += 1);
};

/**
 * Check if a player has won the game.
 * @param {*} row Row index of the last move
 * @param {*} column Column index of the last move
 * @returns True, if a player has won. False, otherwise.
 */
const checkWin = (row, column) => {
  const depth = [];

  for (let directionIndex = 0; directionIndex < MOVEMENT.length; directionIndex += 1) {
    depth.push(traverseSquares(MOVEMENT[directionIndex], row, column, 0));
  }

  return ((getMaximumDepth(depth) + 1) >= howManyInARow);
};

/**
 * Switch the global values from one player to the next.
 */
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

/**
 * Is game board full? Is game done?
 * @returns True, if full. False, otherwise.
 */
const isBoardFull = () => {
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === '') return false;
    }
  }

  return true;
};

/**
 * Initialize board with specified size.
 */
const initBoard = (size) => {
  board = [];
  for (let i = 0; i < size; i += 1) {
    board.push(Array(size).fill(''));
  }
};

/**
 * Set square to be clickable or not clickable.
 * @param {*} isSquareClickable True, if clickable. False, otherwise.
 */
const setSquareClickable = (isSquareClickable) => {
  const squares = document.querySelectorAll('.square');
  for (let i = 0; i < squares.length; i += 1) {
    if (isSquareClickable) {
      squares[i].style.setProperty('pointer-events', 'auto');
    } else {
      squares[i].style.setProperty('pointer-events', 'none');
    }
  }
};

/**
 * Reset game board.
 */
const resetBoard = () => {
  setTimeout(() => {
    initBoard(boardSize);
    buildBoard();
    output('');
    setSquareClickable(true);
    currentPlayer = 'X';
  }, 3000);
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const findEmptySquares = () => {
  const emptySquares = [];

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === '') emptySquares.push({ row: i, column: j });
    }
  }

  return emptySquares;
};

/**
 * Find the next move that will make you win.
 * @param {*} mark X or O
 * @param {*} emptySquares Empty squares still available to choose
 * @returns Square that will make you win
 */
const findWinningMove = (mark, emptySquares) => {
  let winningMove = {};

  // check all empty squares and put mark in each to see if that's a winning move
  for (let i = 0; i < emptySquares.length; i += 1) {
    // temporarily put a mark to test if that's a winning move
    board[emptySquares[i].row][emptySquares[i].column] = mark;

    if (checkWin(emptySquares[i].row, emptySquares[i].column)) {
      winningMove = { row: emptySquares[i].row, column: emptySquares[i].column };

      // erase the mark from the square used for testing
      board[emptySquares[i].row][emptySquares[i].column] = '';

      // winning move found, stop searching
      break;
    } else {
      // erase the mark from the square used for testing
      board[emptySquares[i].row][emptySquares[i].column] = '';
    }
  }

  return winningMove;
};

/**
 * Decide AI's next move.
 * @returns Row and column indexes of AI next move
 */
const decideAIMove = () => {
  let aiDecision = {};

  const emptySquares = findEmptySquares();

  if (gameMode === 'VS_COMPUTER_EASY') {
    aiDecision = emptySquares[getRandomIndex(emptySquares.length)];
  } else if (gameMode === 'VS_COMPUTER_NORMAL') {
    aiDecision = findWinningMove('X', emptySquares);

    // if no winning move is found, choose random square
    if (Object.keys(aiDecision).length === 0) {
      aiDecision = emptySquares[getRandomIndex(emptySquares.length)];
    }
  } else {
    // find best next move
    aiDecision = emptySquares[getRandomIndex(emptySquares.length)];
  }

  return aiDecision;
};

/**
 * Let AI / Computer play.
 */
const artificialIntelligentPlay = () => {
  const AIMove = decideAIMove();
  setTimeout(() => {
    squareClick(AIMove.row, AIMove.column);
  }, 1000);
};

/**
 * Handle square's click event.
 * @param {*} row Row index of square clicked
 * @param {*} column Column index of square clicked
 */
const squareClick = (row, column) => {
  if (board[row][column] === '') {
    board[row][column] = currentPlayer;
    buildBoard();

    if (checkWin(row, column)) {
      output(`Game over! ${currentPlayer} won!`);
      setSquareClickable(false);
      resetBoard();
    } else if (isBoardFull()) {
      output('It\'s a draw! Let\'s play again!');
      setSquareClickable(false);
      resetBoard();
    } else {
      togglePlayer();
      if ((currentPlayer === 'O') && (gameMode !== 'VS_PLAYER')) {
        artificialIntelligentPlay();
      }
    }
  }
};

/**
 * Set board size based on user input.
 * If user input is not a number, board size set to default.
 * If user input is out of range, board size set to MIN/MAX.
 */
const setBoardSize = () => {
  if ((boardSizeInput.value !== '') && !Number.isNaN(boardSizeInput.value)) {
    boardSize = parseInt(boardSizeInput.value, 10);

    if (Number.isNaN(boardSize)) boardSize = MIN_BOARD_SIZE;
    else if (boardSize > MAX_BOARD_SIZE) boardSize = MAX_BOARD_SIZE;
    else if (boardSize < MIN_BOARD_SIZE) boardSize = MIN_BOARD_SIZE;
  }

  boardSizeInput.value = boardSize;
};

/**
 * Set number in a row to win based on user input.
 * If user input is not a number, number in a row to win set to default.
 * If user input is out of range, number in a row to win set to MIN/board size.
 */
const setNumberInARow = () => {
  if ((squaresInARowInput.value !== '') && !Number.isNaN(squaresInARowInput.value)) {
    howManyInARow = parseInt(squaresInARowInput.value, 10);

    if (Number.isNaN(howManyInARow)) howManyInARow = boardSize;
    else if (howManyInARow > boardSize) howManyInARow = boardSize;
    else if (howManyInARow < MIN_BOARD_SIZE) howManyInARow = MIN_BOARD_SIZE;
  }
  squaresInARowInput.value = howManyInARow;
};

/**
 * Disabled user input after game starts.
 */
const disableUserInput = () =>{
  const userInputs = document.querySelectorAll('.user-input');
  for (let i = 0; i < userInputs.length; i += 1) {
    userInputs[i].disabled = 'disabled';
  }
  const buttons = document.querySelectorAll('.button');
  for (let j = 0; j < buttons.length; j += 1) {
    buttons[j].disabled = 'disabled';
  }
};

/**
 * Handle 'vsPlayer' button click.
 */
const buttonClick = (mode) => {
  gameMode = mode;

  setBoardSize();
  setNumberInARow();
  disableUserInput();

  initBoard(boardSize);

  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  buildBoard();
  buildGameInfo();
};

/**
 * Create the board container element and put it on the screen.
 */
const initGame = () => {
  buildUserChoiceInput();
  buildGameModeInput();
};
initGame();
