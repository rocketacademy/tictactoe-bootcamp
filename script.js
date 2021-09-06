const PLAYER_MODE = 'player mode';
const COMPUTER_MODE = 'computer mode';

let board = [];
let boardSize = 0;
let winLength = 0;
let gameMode = PLAYER_MODE;
let boardContainer;
let boardElement;
let currentPlayer = 'X';
let isPlaying = false;
let goingToWin = false;
const textDiv = document.createElement('div');
const selectDiv = document.createElement('div');
const winList = document.createElement('select');

// ###################### HELPER FUNCTIONS ########################

// builds empty array for the board eg. size 3: [['','',''],['','',''],['','','']]
const createEmptyArray = (size) => {
  const boardArray = [];
  for (let i = 0; i < size; i += 1) {
    boardArray.push([]);
    for (let j = 0; j < size; j += 1) {
      boardArray[i].push('');
    }
  }
  return boardArray;
};

// GIVEN FUNCTION - create dom board
// eslint-disable-next-line
const buildBoard = (board) => {
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  for (let i = 0; i < board.length; i += 1) {
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    for (let j = 0; j < row.length; j += 1) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      square.addEventListener('click', () => {
        // eslint-disable-next-line
        squareClick(i, j);
      });
    }

    boardContainer.appendChild(rowElement);
  }
};

// reset global variables and empties array/board
const resetBoard = () => {
  // checks that boardSize/winLength have been selected
  if (boardSize <= 2 || winLength <= 2) {
    isPlaying = false;
    textDiv.innerText = 'Please choose the settings!';
  } else {
    isPlaying = true;
    textDiv.innerText = "New game started! Player X's turn!";
  }
  currentPlayer = 'X';
  goingToWin = false;
  board = createEmptyArray(boardSize);
  buildBoard(board);
};

// sets board size from option list, creates winlength list accordingly (3~boardSize)
// eslint-disable-next-line
const setSize = () => {
  boardSize = document.querySelector('#size').value;
  boardSize = Number(boardSize) + 2;
  resetBoard();

  winList.innerHTML = '';
  for (let i = 0; i < boardSize - 1; i += 1) {
    const winOption = document.createElement('option');
    winOption.value = String(i);
    if (i === 0) {
      winOption.innerText = 'To Win:';
    } else {
      winOption.innerText = String(i + 2);
    }
    winList.appendChild(winOption);
  }
};

// sets win length from option list
// eslint-disable-next-line
const setWinLength = () => {
  winLength = document.querySelector('#win').value;
  winLength = Number(winLength) + 2;
  resetBoard();
};

// sets game mode from option list (default is pvp)
// eslint-disable-next-line
const setMode = () => {
  const mode = document.querySelector('#mode').value;
  if (mode === '0') {
    gameMode = PLAYER_MODE;
  } else if (mode === '1') {
    gameMode = COMPUTER_MODE;
  }
};

// ###################### GAMEPLAY LOGIC ########################

// checks for winning configurations, returns true if found
const checkWin = () => {
  let result = false;
  let diagRightCheck = 0;
  let diagLeftCheck = 0;

  for (let i = 0; i < board.length; i += 1) {
    let rowCheck = 0;
    let columnCheck = 0;

    for (let j = 0; j < board[i].length; j += 1) {
      // check rows
      if (board[i][j] === currentPlayer) {
        rowCheck += 1;
        if (rowCheck === winLength) {
          result = true;
        } else if (rowCheck === winLength - 1) {
          goingToWin = true;
        }

        for (let k = 0; k < winLength; k += 1) {
          if (j - k >= 0) {
            // check diagright
            if (i - k >= 0) {
              if (board[i - k][j - k] === currentPlayer) {
                diagRightCheck += 1;
                if (diagRightCheck === winLength) {
                  result = true;
                } else if (diagRightCheck === winLength - 1) {
                  goingToWin = true;
                }
              }
            }

            // check diagleft
            if (i + k < winLength) {
              if (board[i + k][j - k] === currentPlayer) {
                diagLeftCheck += 1;
                if (diagLeftCheck === winLength) {
                  result = true;
                } else if (diagLeftCheck === winLength - 1) {
                  goingToWin = true;
                }
              }
            }
          }
        }
      } else {
        rowCheck = 0;
        diagRightCheck = 0;
        diagLeftCheck = 0;
      }

      // check columns
      if (board[j][i] === currentPlayer) {
        columnCheck += 1;
        if (columnCheck === winLength) {
          result = true;
        } else if (columnCheck === winLength - 1) {
          goingToWin = true;
        }
      } else {
        columnCheck = 0;
      }
    }
  }
  return result;
};

// GIVEN FUNCTION - X -> O; O -> X
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
    textDiv.innerText = "Player O's turn!";
  } else {
    currentPlayer = 'X';
    textDiv.innerText = "Player X's turn!";
  }
};

// plays computer's move
const randomClick = () => {
  if (goingToWin === true) {
    // block move
  }
  let playedMove = false;
  while (playedMove === false) {
    const randomColumn = Math.floor(Math.random() * boardSize);
    const randomRow = Math.floor(Math.random() * boardSize);
    if (board[randomColumn][randomRow] === '') {
      board[randomColumn][randomRow] = currentPlayer;
      buildBoard(board);
      playedMove = true;
    }
  }
  if (checkWin() === true) {
    textDiv.innerText = 'Computer wins!';
    isPlaying = false;
  } else {
    togglePlayer();
  }
};

// GIVEN FUNCTION ++ check for wins and computer move
const squareClick = (column, row) => {
  if (isPlaying === true) {
    if (board[column][row] === '') {
      board[column][row] = currentPlayer;
      buildBoard(board);
    }

    if (checkWin() === true) {
      textDiv.innerText = `Player ${currentPlayer} wins!`;
      isPlaying = false;
    } else {
      togglePlayer();
      // gives some delay before computer makes move
      if (gameMode === COMPUTER_MODE) {
        textDiv.innerText = 'Computer is thinking.';
        // eslint-disable-next-line
        const addDot = setTimeout(() => { textDiv.innerText += '.'; }, 200);
        // eslint-disable-next-line
        const addAnotherDot = setTimeout(() => { textDiv.innerText += '.'; }, 400);
        // eslint-disable-next-line
        const delayMove = setTimeout(randomClick, 500);
      }
    }
  }
};

// ###################### INITIALIZATION ########################
const initGame = () => {
  isPlaying = true;

  // message box
  textDiv.classList.add('message');
  textDiv.innerText = "Welcome! Player X's turn!";
  document.body.appendChild(textDiv);

  // container for option lists/reset button
  selectDiv.classList.add('container');
  document.body.appendChild(selectDiv);

  // board size
  const sizeList = document.createElement('select');
  sizeList.classList.add('list');
  sizeList.setAttribute('id', 'size');
  sizeList.setAttribute('onchange', 'setSize();');
  for (let i = 0; i < 8; i += 1) {
    const sizeOption = document.createElement('option');
    sizeOption.value = String(i);
    if (i === 0) {
      sizeOption.innerText = 'Board Size:';
    } else {
      sizeOption.innerText = String(i + 2);
    }
    sizeList.appendChild(sizeOption);
  }
  selectDiv.appendChild(sizeList);

  // win length
  winList.classList.add('list');
  winList.setAttribute('id', 'win');
  winList.setAttribute('onchange', 'setWinLength();');
  const winOption = document.createElement('option');
  winOption.value = '0';
  winOption.innerText = 'To Win:';
  winList.appendChild(winOption);
  selectDiv.appendChild(winList);

  // game mode
  const modeList = document.createElement('select');
  modeList.classList.add('list');
  modeList.setAttribute('id', 'mode');
  modeList.setAttribute('onchange', 'setMode();');
  const modeOption0 = document.createElement('option');
  const modeOption1 = document.createElement('option');
  modeOption0.value = '0';
  modeOption1.value = '1';
  modeOption0.innerText = 'Player vs. Player';
  modeOption1.innerText = 'Player vs. Computer';
  modeList.appendChild(modeOption0);
  modeList.appendChild(modeOption1);
  selectDiv.appendChild(modeList);

  // reset button
  const resetButton = document.createElement('button');
  resetButton.innerText = 'Reset';
  resetButton.classList.add('reset-button');
  resetButton.addEventListener('click', resetBoard);
  selectDiv.appendChild(resetButton);

  // GIVEN - game board
  boardContainer = document.createElement('div');
  boardContainer.classList.add('container');
  document.body.appendChild(boardContainer);

  resetBoard();
};

initGame();
