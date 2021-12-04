// Please implement exercise logic here
// global variables
// keep data about the game in a 2-D array
let board = [];

let sizeOfBoard;

// create the array in board using nested loops
const pushBoard = () => {
  for (let k = 0; k < sizeOfBoard; k += 1) {
    board.push([]);
    for (let l = 0; l < sizeOfBoard; l += 1) {
      board[k].push('');
    }
  }
};

const playThumpEffect = () => {
  const audio = new Audio('https://notification-sounds.com/soundsfiles/Thump-sound-effect.mp3');
  audio.play();
};

const playApplause = () => {
  const audio = new Audio('https://notification-sounds.com/soundsfiles/Quiz-correct-sound-with-applause.mp3');
  audio.play();
};

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// create a div element to display a message
const messageDiv = document.createElement('div');
messageDiv.classList.add('outputBox');
// insert the output div
document.body.appendChild(messageDiv);

// helper function to display message
const output = (message) => {
  messageDiv.innerText = message;
};

// create a input and submit button
const userDiv = document.createElement('div');
const userInput = document.createElement('input');
const submitBtn = document.createElement('button');
submitBtn.innerText = 'Submit';
userDiv.appendChild(userInput);
userDiv.appendChild(submitBtn);

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// create the winning logic for this game
// check if there is a win in a row
const checkRowWin = (board) => {
// [x][y] run a loop to check through these coordinates
// run another loop inside to check all the rows
// [0][0],[1][0],[2][0]
// [0][1],[1][1],[2][1]
// [0][2],[1][2],[2][2]
  for (let i = 0; i < board.length; i += 1) {
    let count = 0;
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === 'X') {
        count += 1;
      }
      if (board[i][j] === 'O') {
        count -= 1;
      }
      if (count === 3 || count === -3) {
        return true;
      }
    }
  }
  return false;
};

const checkColWin = (board) => {
// [0][0],[0][1],[0][2]
// [1][0],[1][1],[1][2]
// [2][0],[2][1],[2][2]
  let count = 0;
  for (let i = 0; i < board.length; i += 1) {
    count = 0;
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[j][i] === 'X') {
        count += 1;
      }
      if (board[j][i] === 'O') {
        count -= 1;
      }
      if (count === 3 || count === -3) {
        return true;
      }
    }
  }
  return false;
};

const checkDiagWin = (board) => {
  const s0 = board[0][0];
  const s1 = board[1][1];
  const s2 = board[2][2];
  const s3 = board[0][2];
  const s4 = board[2][0];
  if ((s0 !== '') && (s0 === s1 && s1 === s2)) {
    return true;
  }
  if ((s3 !== '') && (s3 === s1 && s1 === s4)) {
    return true;
  }
  return false;
};

const checkWin2 = () => {
  if (checkRowWin(board) === true) {
    return true;
  }
  if (checkColWin(board) === true) {
    return true;
  }
  if (checkDiagWin(board) === true) {
    return true;
  }
  return false;
};

// to win the player has get x or o in a line
// const checkWin = (board) => {
//   // check every position
//   // there is a conditional for all 15 win conditions
//   if ((board[0][0] !== '') && (board[0][0] === board[0][1] && board[0][1] === board[0][2])) {
//     return true;
//   }
//   if ((board[1][0] !== '') && (board[1][0] === board[1][1] && board[1][1] === board[1][2])) {
//     return true;
//   }
//   if ((board[2][0] !== '') && (board[2][0] === board[1][2] && board[1][2] === board[2][2])) {
//     return true;
//   }
//   if ((board[0][0] !== '') && (board[0][0] === board[1][0] && board[1][0] === board[2][0])) {
//     return true;
//   }
//   if ((board[0][1] !== '') && (board[0][1] === board[1][1] && board[1][1] === board[2][1])) {
//     return true;
//   }
//   if ((board[0][2] !== '') && (board[0][2] === board[1][2] && board[1][2] === board[2][2])) {
//     return true;
//   }
//   if ((board[2][0] !== '') && (board[2][0] === board[2][1]) && board[2][1] === board[2][2]) {
//     return true;
//   }

//   if ((board[0][0] !== '') && (board[0][0] === board[1][1] && board[1][1] === board[2][2])) {
//     return true;
//   }
//   if ((board[0][2] !== '') && (board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
//     return true;
//   }
//   return false;
// };

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
      square.addEventListener("click", () => {
        // eslint-disable-next-line no-use-before-define
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

const squareClick = (column, row) => {
  // if the square user clicks is blank, check if the user wins the
  // game, if not toggle next player.
  if (board[column][row] === '') {
    playThumpEffect();
    board[column][row] = currentPlayer;
    buildBoard(board);

    if (checkWin2(board) === true) {
      playApplause();
      output(`Player ${currentPlayer} wins!`);
      // empty the board after a set time
      setTimeout(() => {
        board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
        // rebuild the board and assign default player back to 1
        buildBoard(board);
        currentPlayer = 'X';
        output('Please click on any square!');
      }, 3000);
    } else {
      togglePlayer();
    }
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  document.body.appendChild(userDiv);
  output('Please enter a number');

  // boardContainer = document.createElement('div');
  // document.body.appendChild(boardContainer);

  // // build the board - right now it's empty
  // buildBoard(board);
};

// function to get size of board user wants
const getSizeOfBoard = () => {
  sizeOfBoard = userInput.value;
  pushBoard();
  userDiv.classList.toggle('removeDiv');
  output('Please click on any square!');

  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

submitBtn.addEventListener('click', getSizeOfBoard);

initGame();
