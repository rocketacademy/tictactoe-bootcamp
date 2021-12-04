// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  document.querySelector('.game-info').innerText = message;
};

const buildGameInfo = (board) => {
  // add area for game information
  gameInfoElement = document.createElement('div');
  gameInfoElement.classList.add('game-info');
  document.body.appendChild(gameInfoElement);
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

const getLongestInARow = (depth) => {
  const longest = 0;
  return longest;
};

const checkWin = (board, row, column) => {
  const depth = [];

  for (let directionIndex = 0; directionIndex < 8; directionIndex += 1) {
    depth.push(traverseSquares(board, directionIndex, row, column, 0));
  }
  console.log(`checkwin depth ${depth}`);

  return (depth.find(element => element >= 2)
    || ((depth[TOP] + depth[BOTTOM]) >= 2)
    || ((depth[TOP_RIGHT] + depth[BOTTOM_LEFT]) >= 2)
    || ((depth[RIGHT] + depth[LEFT]) >= 2)
    || ((depth[TOP_LEFT] + depth[BOTTOM_RIGHT]) >= 2)    
    );
};

const traverseSquares = (board, direction, row, column, depth) => {
  console.log(`before (${row},${column}) direction ${direction}`);

  let newRow = row;
  let newColumn = column;
  switch (direction) {
    case TOP:
      newRow = row - 1;
      break;
    case TOP_RIGHT:
      newRow = row - 1;
      newColumn = column + 1;
      break;
    case RIGHT:
      newColumn = column + 1;
      break;
    case BOTTOM_RIGHT:
      newRow = row + 1;
      newColumn = column + 1;
      break;
    case BOTTOM:
      newRow = row + 1;
      break;
    case BOTTOM_LEFT:
      newRow = row + 1;
      newColumn = column - 1;
      break;
    case LEFT:
      newColumn = column - 1;
      break;
    case TOP_LEFT:
      newRow = row - 1;
      newColumn = column - 1;
      break;
    default:
      newRow = row;
      newColumn = column;
  }
  console.log(`after (${newRow},${newColumn}) direction ${direction}`);

  // if the new row / column indexes are out of bounds
  if ((newRow < 0) || (newColumn < 0) 
    || (newRow >= board.length) || (newColumn >= board.length)) {
    return depth;
  }

  // if the next square has a different value
  if (board[row][column] !== board[newRow][newColumn]) {
    return depth;
  }

  return traverseSquares(board, direction, newRow, newColumn, depth += 1);
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = (row, column) => {
  if (board[row][column] === '') {
    board[row][column] = currentPlayer;
    buildBoard(board);

    if (checkWin(board, row, column)) {
      // game over, print message
      output(`Game over! ${currentPlayer} won!`);

      // reset board after a few seconds
      setTimeout(() => {
        board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];        
        buildBoard(board);
        output('');
      }, 3000);
    } else {
      togglePlayer();
    }
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);

  buildGameInfo(board);
};
initGame();
