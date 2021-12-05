/**
 * Helper function for output to abstract complexity of DOM 
 * manipulation away from game logic.
 * @param {*} message Game information message
 */
const output = (message) => {
  document.querySelector('.game-info').innerText = message;
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

  console.log(`before (${row},${column}) movement (${movement.x},${movement.y}) after (${newRow},${newColumn})`);

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
  console.log(`checkwin depth ${depth}`);

  return ((getMaximumDepth(depth) + 1) >= HOW_MANY_IN_A_ROW);
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
 * Reset game board.
 */
const resetBoard = () => {
  setTimeout(() => {
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    buildBoard();
    output('');
    setSquareClickable(true);
  }, 3000);
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
      output(`It's a draw! Let's play again!`);
      setSquareClickable(false);
      resetBoard();
    } else {
      togglePlayer();
    }
  }
};

/**
 * Create the board container element and put it on the screen.
 */
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  buildBoard();
  buildGameInfo();
};
initGame();
