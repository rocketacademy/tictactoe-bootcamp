// create board size according to user input
const createBoardSize = () => {
  const gameboard = [];
  // create the rows
  for (let i = 0; i < input; i += 1) {
    //  create empty rows
    gameboard.push([]);

    for (let j = 0; j < input; j += 1) {
      // create empty square into each array(col)
      gameboard[i].push('');
    }
  }

  return gameboard;
};

// completely rebuilds the entire board every time there's a click
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
        if (canClick) {
          squareClick(i, j);
        }
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
    gameInfo.innerText = 'Player O\'s turn';
  } else {
    currentPlayer = 'X';
    gameInfo.innerText = 'Player X\'s turn';
  }
};

const checkWin = () => {
  // check for win conditions in rows
  let score = 0;
  for (let i = 0; i < input; i += 1) {
    for (let j = 0; j < input; j += 1) {
      if (board[i][j] === currentPlayer) { score += 1; }
      else { score = 0; }

      if (score === input) {
        return true;
      }
    }
    score = 0;
  }
  // check for win conditions in cols
  for (let i = 0; i < input; i += 1) {
    for (let j = 0; j < input; j += 1) {
      if (board[j][i] === currentPlayer) { score += 1; }
      else { score = 0; }

      if (score === input) {
        return true;
      }
    }
    score = 0;
  }

  // check for win conditions diagonally left to right 00 -> 11 -> 22
  for (let i = 0; i < input; i += 1) {
    for (let j = 0; j < input; j += 1) {
      if (board[i][j] === currentPlayer) { score += 1; }
      else { score = 0; }

      i += 1;
      if (score === input) {
        return true;
      }
    }
    score = 0;
  }

  // check for win conditions diagonally right to left 02 -> 11 -> 20
  for (let i = 0; i < input; i += 1) {
    for (let j = (input - 1); j >= 0; j -= 1) {
      if (board[i][j] === currentPlayer) { score += 1; }
      else { score = 0; }
      i += 1;
      if (score === input) {
        return true;
      }
    }
    score = 0;
  } return false;
};

const squareClick = (row, column) => {
  console.log('coordinates', row, column);
  // see if the clicked square has been clicked on before
  if (board[row][column] === '') {
    console.log('1');
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;
    buildBoard(board);

    if (checkWin() === true) {
      canClick = false;
      gameInfo.innerHTML = `Congrats Player ${currentPlayer}, you won!`;
    } else {
    // refresh the screen with a new board
    // according to the array that was just changed
      canClick = true;
      // change the player
      togglePlayer();
      console.log('2');
    }
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  boardContainer.id = 'boardContainer';
  document.body.appendChild(boardContainer);
  input = Number(inputBoardSize.value);
  board = createBoardSize(input);
  buildBoard(board);
  gameInfo.innerText = `Player ${currentPlayer}, check a box!`;

  startButton.disabled = true;
};

const resetGame = () => {
  canClick = true;
  gameInfo.innerHTML = `Player ${currentPlayer}'s turn`;
  const ele = document.getElementById('boardContainer');
  ele.remove();
  initGame();
};

resetButton.addEventListener('click', resetGame);
startButton.addEventListener('click', initGame);
