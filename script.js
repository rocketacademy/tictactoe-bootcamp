//= =======================Global Variables=========================//
// Set boardSize for TTT
let boardSize = 3;

// keep data about the game in a 2-D array
const board = [];
// a matrix used for checking matches horizontally
const posMatrix = [];

// the element that contains the rows and squares
let boardElement;

// Track who is the winning player
let gameWon = false;
let winner = '';

// Game display page
let gamePage;

// Global variables for various displays and outputValues
let gameResultDisplay1;
let gameResultDisplay2;
let gameResultDisplay3;
let gameResultDisplay4;

// For displaying variable game results
let gameResultDisplay5;
let gameResultDisplay6;
let gameResultDisplay7;
let gameResultDisplay8;

// For displaying other outputMessages
const outputMessages = document.createElement('div');
outputMessages.innerText = 'Please input number of squares or if blank, play the full board size. \nPlayer X begins first.';

// Display of checks for fixed BoardSize
let outputValue1 = '';
let outputValue2 = '';
let outputValue3 = '';
// Display of checks for variable numOfSquares
let outputValue4 = '';
let outputValue5 = '';
let outputValue6 = '';

// For tracking initial anchor points (origins) for variable numOfSquares; variables are 0 indexed
let initialRow;
let initialCol;

// Global var for taking in specified numOfSquares to win
let numSquaresInput;
let boardSizeInput;
let numSquaresBtn; // submit numSquares
let boardSizeBtn; // submit boardSize
let numSquaresInputDisplay;
let boardSizeInputDisplay;
let numOfSquares = numSquaresInput;

let currentPlayer = 'X';
// the element that contains the entire board
// we can empty it out for convenience
const boardContainer = document.createElement('div');

// Global variables to manage co-ordinates tracking for matching purposes
// x and y are also the 'origins' of the match-checking(horizontal + vertical)
// x and y are also the 'origins' of checking from bottom-right to top left
const x = boardSize - 1;
const y = boardSize - 1;
// Variable Z is a starting co-ordinate used for used for traversing columns when checking diagonally (instead of y from bot-left to top-right );
let z = 0;

//= ========================Helper Functions=========================//

// Used to create an initial position Matrix for checking for matches horizontally
const createPosMatrix = () => {
  for (let i = 0; i < boardSize; i += 1) {
    posMatrix.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      // output a matrix that labels each square with a unique number for checking later
      posMatrix[i][j] = `${i * boardSize + j}`;
    }
  }
};

// completely rebuilds the entire board every time there's a click
const buildBoard = () => {
  // start with an empty container

  //   boardContainer.innerHTML = "";
  board.length = 0;
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  gamePage = document.createElement('div');

  gameResultDisplay1 = document.createElement('div');
  gameResultDisplay2 = document.createElement('div');
  gameResultDisplay3 = document.createElement('div');
  gameResultDisplay4 = document.createElement('div');

  gameResultDisplay5 = document.createElement('div');
  gameResultDisplay6 = document.createElement('div');
  gameResultDisplay7 = document.createElement('div');
  gameResultDisplay8 = document.createElement('div');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    // set each square
    // j is the column number
    for (let j = 0; j < boardSize; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);

        if (square.innerText === '') {
          square.innerText = posMatrix[i][j];
          outputMessages.innerText = `It is Player ${currentPlayer}'s turn`;
        } else if (square.innerText !== '') {
          outputMessages.innerText = 'You may not click on the same square again!';
          setTimeout(() => {
            outputMessages.innerText = `It is Player ${currentPlayer}'s turn`;
          }, 2000);
        }

        // ======================Logic for checking for matches======================//
        if (!numOfSquares) {
        // Check from end to end of the board
        // Check Horizontally
          resetCoordinates();
          trackAnchorPoints(x, y, 'horizontal', 'boardSize');
          checkWinXY(x, y, 'horizontal', boardSize);
          gameResultDisplay1.innerText = `Checked horizontally: ${outputValue1}`;

          // Check Vertically
          resetCoordinates();
          trackAnchorPoints(x, y, 'vertical', 'boardSize');
          checkWinXY(x, y, 'vertical', boardSize);
          gameResultDisplay2.innerText = `Checked vertically: ${outputValue1}`;

          // Check Diagonally Left
          trackAnchorPoints(x, y, 'bot-left', boardSize);
          checkWinZ(x, y, z, 'bot-left', boardSize);
          gameResultDisplay3.innerText = `Check top-right to bottom-left diagonally: ${outputValue3}`;

          // Check Diagonally Right
          trackAnchorPoints(x, y, 'bot-right', boardSize);
          checkWinZ(x, y, z, 'bot-right', boardSize);
          gameResultDisplay4.innerText = `Check top-left to bottom-right diagonally: ${outputValue2}`;

          // after checking, if gameWon is true, then restart Game and output relevant message
          gameOver();
        } else {
        // Check for matches if variable numOfSquares are defined
          checkVarWin();
          gameOver();
        }
      });
    }
    console.log('test2');
    // add a single row to the board
    boardContainer.appendChild(rowElement);
    gamePage.appendChild(boardContainer);
    gamePage.appendChild(gameResultDisplay1);
    gamePage.appendChild(gameResultDisplay2);
    gamePage.appendChild(gameResultDisplay3);
    gamePage.appendChild(gameResultDisplay4);
    gamePage.appendChild(gameResultDisplay5);
    gamePage.appendChild(gameResultDisplay6);
    gamePage.appendChild(gameResultDisplay7);
    gamePage.appendChild(gameResultDisplay8);
    // gamePage.appendChild(outputMessages);
    document.body.appendChild(gamePage);
  }
};

// create fn that takes in user input + validation
const createUserInput = () => {
  numSquaresInput = document.createElement('input');
  numSquaresInput.setAttribute('id', 'numSquaresInput');
  numSquaresInput.setAttribute('placeholder', 'Enter number of squares in a row that makes a win.');

  boardSizeInput = document.createElement('input');
  boardSizeInput.setAttribute('id', 'boardSizeInput');
  boardSizeInput.setAttribute('placeholder', 'Enter board size.');

  // displays message on user's input on num of squares
  numSquaresInputDisplay = document.createElement('div');
  boardSizeInputDisplay = document.createElement('div');
  // submit button for numSquaresInput
  numSquaresBtn = document.createElement('button');
  numSquaresBtn.innerHTML = 'Submit';
  numSquaresBtn.setAttribute('id', 'button');
  numSquaresBtn.addEventListener('click', () => {
    const input = document.querySelector('#numSquaresInput');
    if (isNaN(input.value)) {
      numSquaresInputDisplay.innerHTML = 'Please enter a valid number';
    } else {
      numSquaresInputDisplay.innerHTML = `User chose ${input.value} consecutive squares as winning criteria.`;
      numOfSquares = Number(input.value);
    }
  });

  boardSizeBtn = document.createElement('button');
  boardSizeBtn.innerHTML = 'Submit';
  boardSizeBtn.setAttribute('id', 'button');
  boardSizeBtn.addEventListener('click', () => {
    const input = document.querySelector('#boardSizeInput');
    if (isNaN(input.value)) {
      boardSizeInputDisplay.innerHTML = 'Please enter a valid number';
    } else {
      boardSizeInputDisplay.innerHTML = `User chose ${input.value} as board size.`;
      boardSizeInput = Number(input.value);
    }
    resetGame();
    boardSize = boardSizeInput;
  });

  gamePage.appendChild(numSquaresInput);
  gamePage.appendChild(numSquaresBtn);
  gamePage.appendChild(numSquaresInputDisplay);

  gamePage.appendChild(boardSizeInput);
  gamePage.appendChild(boardSizeBtn);
  gamePage.appendChild(boardSizeInputDisplay);
};

// create the board container element and put it on the screen
const gameInit = () => {
  // build the board - right now it's empty
  // createPositionMatrix for tracking coordinates
  createPosMatrix();
  buildBoard();
  createUserInput();
  document.body.appendChild(outputMessages);
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
  // see if the clicked square has been clicked on before
  if (gameWon !== true && posMatrix[row][column] !== 'X' && posMatrix[row][column] !== 'O') {
    // alter the data array, set it to the current player
    posMatrix[row][column] = currentPlayer;
    togglePlayer();
  }
};
// Fn to reset all global co-ordinates to the (assigned) initial origin(anchor) co-ordinates
const resetCoordinates = () => {
  initialRow = '';
  initialCol = '';
  // z = 0;
};
// Fn to track every possible anchorpoints for each run of checkWinXY and checkWinZ
const trackAnchorPoints = (oX, oY, direction, size) => {
  if (direction === 'horizontal') {
    initialRow = oX;
    initialCol = oY;
  } else if (direction === 'vertical') { // swap the anchor points
    initialRow = oY;
    initialCol = oX;
  } else if (direction === 'bot-right') {
    initialRow = oX;
    initialCol = oY;
  } else if (direction === 'bot-left') {
    initialRow = oX;
    initialCol = oY;
    z = oY - (size - 1);
    console.log('z is reset');
  }
};
// Fn to check for matches vertically or horizontally
// Input 'horizontal' or  'vertical' to check for matches
// x and y are global variables which hold the global co-ordinates
// note that X refers to the ROW and Y refers to the COLUMN in horizontal mode
const checkWinXY = (x, y, direction, size) => {
  // Swap X and Y to check vertically by using intermediate variables
  let a;
  let b;
  let c;
  let d;

  if (direction === 'horizontal') {
    a = x;
    b = y - 1;
    c = x;
    d = y;
  } else if (direction === 'vertical') {
    a = x - 1;
    b = y;
    c = y;
    d = x;
  }
  // We begin the horizontal and vertical checks from the last co-ordinate (bottom right)
  // if it is equal to the box on its immediate left
  // Comments are written for the case of checking horizontally
  // Scenario 1: if the bottom 2 right boxes are not the same,
  // go up 1 row and re-evaluate the 2 right most boxes

  if (posMatrix[x][y] !== posMatrix[a][b] && c >= initialRow - (size - 1)) {
    // In the event we reached the last row where x is 0
    if (c === initialRow - (size - 1)) { // c === 0
      // As long as right pointer is not pointing at the 2nd last box
      // Continue to check the same row's for matches, starting from the 2 right most boxes
      // BASE CASE: Once we reached the top left 2 boxes where y === 1
      // implicitly there is no match and hence no winner
      if (d === initialCol - (size - 2)) { // d===1
        console.log('no winner');
        outputValue1 = 'There is no winner';
        return outputValue1;
      }
      // Otherwise where y > 1, shift the pointer 1 box to the left and check for matches
      // Otherwise, go up one row and start from the most right position and check for }}matches
    } else {
      if (direction === 'horizontal') {
        x -= 1;
        y = size - 1;
      } else {
        y -= 1;
        x = size - 1;
      }
      checkWinXY(x, y, direction, size);
    }

    // Scenario 2, if 2 consecutive boxes match (regardless of where in the row)
  } else if (posMatrix[x][y] === posMatrix[a][b] && d >= initialCol - (size - 2)) {
    // And if the 2 left most boxes are being compared,
    // implicitly means that the whole row is matched - hence the winner
    if (d === initialCol - (size - 2)) { // d === 1
      console.log(`Player ${posMatrix[a][b]} has won!`);
      winner = `${posMatrix[a][b]}`;
      gameWon = true;
      outputValue1 = `Player ${posMatrix[a][b]} has won!`;
      outputValue4 = `Player ${posMatrix[a][b]} has won!`;
      return outputValue1;
    } // Otherwise, shift the pointer 1 left
    // and check for matches for the next consecutive 2 box
    if (direction === 'horizontal') {
      y -= 1;
    } else {
      x -= 1;
    }
    // include some count here to make sure
    checkWinXY(x, y, direction, size);
  }
};

// Fn to check for matches diagonally
const checkWinZ = (x, y, z, direction, size) => {
  // using X and Y at initialization implies starting to check from the bottom right hand corner
  if (direction === 'bot-right') {
    if (posMatrix[x][y] === posMatrix[x - 1][y - 1]) {
      if (x === initialRow - (size - 2) && y === initialCol - (size - 2)) { // (x === 1 && y === 1)
        console.log(`Player ${posMatrix[x][y]} has won!`);
        winner = `${posMatrix[x][y]}`;
        gameWon = true;
        outputValue2 = `Player ${posMatrix[x][y]} has won!`;
        outputValue5 = outputValue2;

        return outputValue2;
      }
      x -= 1;
      y -= 1;

      checkWinZ(x, y, z, direction, size);
    }
    // Start matching from the left
  } else if (direction === 'bot-left') {
    if (posMatrix[x][z] === posMatrix[x - 1][z + 1]) {
      if (x === initialRow - (size - 2) && z === initialCol - 1) { // x === 1 & z === 1
        winner = `${posMatrix[x][z]}`;
        gameWon = true;
        console.log(`Player ${posMatrix[x][z]} has won!`);
        outputValue3 = `Player ${posMatrix[x][z]} has won!`;
        outputValue6 = outputValue3;
        return outputValue3;
      }
      x -= 1;
      z += 1;
      checkWinZ(x, y, z, direction, size);
    } else {
      // 2 different outputvalues are required so that it does not conflict
      console.log('no winner');
      outputValue2 = 'There is no match';
      outputValue3 = 'There is no match';
    }
  }
};

// To generate a permutation of places for numOfCards in a larger than 3x3 permutation grid to check for matches
const createAnchorPoints = () => {
// anchorPts store the origins for variable numOfSquare game
  // columns and rows are zero-indexed
  const rightAnchorPts = [];
  // To add another anchorPt in the array, increment by 1
  let i = 0;

  // oX refers to rows
  // oY refers to column
  // using oX instead of generic variable document the draw linkage to the oX global variable

  for (let oX = boardSize; oX - numOfSquares >= 0; oX -= 1) {
    for (let oY = boardSize; oY - numOfSquares >= 0; oY -= 1) {
      rightAnchorPts.push({});
      rightAnchorPts[i].point = i + 1;
      rightAnchorPts[i].column = oX - 1;
      rightAnchorPts[i].row = oY - 1;
      i += 1;
    }
  }
  return rightAnchorPts;
};

const checkVarWin = () => {
// Create the initial set of anchor points
  const rightAnchorPts = createAnchorPoints();
  console.log(rightAnchorPts);

  // Go through each of the possible right anchor points and check for matches in XY direction
  for (let i = 0; i < rightAnchorPts.length; i += 1) {
    const x = rightAnchorPts[i].row;
    const y = rightAnchorPts[i].column;
    z = y - (numOfSquares - 1); // column - (size-1) [numOfSquares is already 0 indexed];

    // //Check Horizontally
    resetCoordinates();
    trackAnchorPoints(x, y, 'horizontal', numOfSquares);
    checkWinXY(x, y, 'horizontal', numOfSquares);
    gameResultDisplay5.innerText = `Var Cards - Checked horizontally: ${outputValue4}`;
    // // Check Vertically
    resetCoordinates();
    trackAnchorPoints(x, y, 'vertical', numOfSquares);
    checkWinXY(x, y, 'vertical', numOfSquares);
    gameResultDisplay6.innerText = `Var Cards -Checked vertically: ${outputValue4}`;

    // Check Diagonally
    trackAnchorPoints(x, y, 'bot-left', numOfSquares);
    checkWinZ(x, y, z, 'bot-left', numOfSquares);
    gameResultDisplay7.innerText = `Var Cards -Check top-left to bottom-right diagonally: ${outputValue5}`;

    trackAnchorPoints(x, y, 'bot-right', numOfSquares);
    checkWinZ(x, y, z, 'bot-right', numOfSquares);
    gameResultDisplay8.innerText = `Var Cards -Check top-right to bottom-left diagonally: ${outputValue6}`;
  }
};

const resetGame = () => {
  let countDown = 5;
  // reset the arrays;
  board.length = 0;
  posMatrix.length = 0;
  gameWon = false;
  winner = '';
  outputValue1 = '';
  outputValue2 = '';
  outputValue3 = '';
  outputValue4 = '';
  outputValue5 = '';
  outputValue6 = '';
  currentPlayer = 'X';

  const restartGame = setInterval(() => {
    outputMessages.innerText = `Game is restarting in ${countDown}...`;
    countDown -= 1;
    if (countDown === 0) {
      clearInterval(restartGame);
      boardContainer.innerHTML = '';
      gamePage.innerHTML = '';
      gameInit();
      outputMessages.innerText = 'Please input number of squares or if blank, play the full board size. \nPlayer X begins first.';
    }
  }, 1000);
};

const gameOver = () => {
  if (gameWon === true) {
    resetGame();
    console.log(winner, 'winner');
    outputMessages.innerText = `Game over! Player ${winner} wins!`;
  }
};

// ===================MATCHING LOGIC - PATTERNS INVOLVED=========================//
// CHECKING HORIZONTALLY & VERTICALLY
// Pattern To Understand for match checking in different sizes
// NumOfCards (size) level  diff
// 3                  1     2
// 4                  2     2
// 5                  3     2
// 6                  4     2
// This is same for both rows and columns
// hence initialRow or initialColumn - (size - 2) - This works for checking horizontally as

// CHECKING DIAGONALLY
// For checking diagonally for variable number of squares:
// For Checking bottom left to bottom right
// Function is written such that it will always evaluate at the 2nd right highest point i.e 1 position left of its original anchor point. Hence initialCol - 1;
// For checking bottom right to bottom left
// Fn is written such that it will always evaluate at the 2nd right highest point i.e initialRow - (size - 2); where initialRow is zero-indexed and size is not

// =======================EXECUTE GAME=========================//
gameInit();
