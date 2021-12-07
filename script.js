// Please implement exercise logic here
// <--------- GLOBAL VARIABLES ------------>
// keep data about the game in a 2-D array
let boardSize = 0;
const board = [];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

let win;

let emptyBox = 0;

let canClick = true;

// <---------- DOM ELEMENTS ----------->

const inputField = document.createElement('input');
inputField.classList.add('input');

const startButton = document.createElement('button');
startButton.classList.add('button');
startButton.innerText = 'Start!';

// boardSizeInput.type = 'number';
// boardSizeInput.min = '3';
// boardSizeInput.max = '5';
// boardSizeInput.addEventListener('input');

const gameInfo = document.createElement('div');
document.body.appendChild(gameInfo);
gameInfo.classList.add('messages');

// <----------- HELPER FUNCTIONS ------------->
// Function for output to abstract complexity of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// function to build board array
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
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// function to get board size
const getBoardSize = () => {
  const input = inputField.value;

  if (input === '' || isNaN(input)) {
    output('You gotta type a number!');
  } else if (input !== '') {
    boardSize = input;

    for (let i = 0; i < boardSize; i += 1) {
      board.push([]);
      for (let j = 0; j < boardSize; j += 1) {
        board[i].push('');
      }
    }

    inputField.remove();
    startButton.remove();

    output('X starts first!');

    boardContainer = document.createElement('div');
    document.body.appendChild(boardContainer);

    // build the board - right now it's empty
    buildBoard(board);
  }
};

// <--------- GAMEPLAY LOGIC ----------->
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// function to check for winner
const checkSame = (array) => {
  let count = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === currentPlayer) {
      count += 1;
      if (count >= array.length) {
        return true;
      }
    }
  }
};

const checkWinner = () => {
  // check rows for winner
  board.forEach((row) => {
    const rowWin = checkSame(row);
    if (rowWin) {
      win = true;
    }
  });

  // check columns for winner
  board.forEach((row, i) => {
    const columnArray = [];
    row.forEach((element, j) => {
      columnArray.push(board[j][i]);
    });
    const columnWin = checkSame(columnArray);
    if (columnWin) {
      win = true;
    }
  });

  // check diagonally
  const diagonalArray1 = [];
  const diagonalArray2 = [];
  board.forEach((row, i) => {
    const tempRow = [...row];
    diagonalArray1.push(row[i]);
    diagonalArray2.push(tempRow.reverse()[i]);
  });

  const diagonalWin1 = checkSame(diagonalArray1);
  const diagonalWin2 = checkSame(diagonalArray2);

  if (diagonalWin1 || diagonalWin2) {
    win = true;
  }

  return win;
};

// function to check if there are empty squares left
const checkEmpty = () => {
  emptyBox = 0;
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (board[i][j] === '') {
        emptyBox += 1;
      }
    }
  }
  return emptyBox;
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    if (canClick === true) {
      buildBoard();
      checkWinner();
      checkEmpty();
      console.log(emptyBox);
      if (win) {
        output(`Game over! ${currentPlayer} wins!`);
        canClick = false;
      } else if (!win && emptyBox >= 1) {
      // change the player
        togglePlayer();
        output(`It's ${currentPlayer}'s turn!`);
      } else if (!win && emptyBox === 0) {
        output('Game over! It\'s a tie!');
      }
    }
  }
};

// <------- GAME INITIALISATION ------->
// create the board container element and put it on the screen
const initGame = () => {
  output('Welcome! Start by typing a number to set the length of the board.');
  document.body.appendChild(inputField);
  document.body.appendChild(startButton);
  startButton.addEventListener('click', getBoardSize);
};

initGame();

// create tally to tally card names

// Create hand array of 5 cards
// var hand = [];
// for (let i = 0; i < 5; i += 1) {
//   hand.push(deck.pop());
// }

// // Create Object as tally
// var cardNameTally = {};

// // Loop over hand
// for (let i = 0; i < hand.length; i += 1) {
//   var cardName = hand[i].name;
//   // If we have seen the card name before, increment its count
//   if (cardName in cardNameTally) {
//     cardNameTally[cardName] += 1;
//   }
//   // Else, initialise count of this card name to 1
//   else {
//     cardNameTally[cardName] = 1;
//   }
// }

// // to read tally
// for (cardName in cardNameTally) {
//   console.log(`There are ${cardNameTally[cardName]} ${cardName}s in the hand`);
// }
