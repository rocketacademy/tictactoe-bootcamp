// Please implement exercise logic here
// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';


//message container
let messageContainer = document.createElement('div')
messageContainer.classList.add("message")
document.body.appendChild(messageContainer)

// message output

let messageOutput = document.createElement('span')
messageContainer.append(messageOutput)
messageOutput.innerText = ""

// reset button

let resetButton = document.createElement('button')
messageContainer.appendChild(resetButton)
resetButton.innerText = "reset"
resetButton.addEventListener('click', ()=>{window.location.reload()})

let canClick = true

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
      if (canClick === true){
      square.addEventListener('click', () => {
        squareClick(i, j);
      })
      
      };
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const checkWin = (board) => {

  // check every position
  // there is a conditional for all 15 win conditions
  if ((board[0][0]!== '') && (board[0][0]=== board[0][1]) && (board[0][1] === board[0][2])) {
    // XXX 1st row
  console.log('XXX 1st row')
  return true
  } 

  if (board[1][0]!== '' && board[1][0]=== board[1][1] && board[1][1] === board[1][2]) {
    // XXX 2nd row
  console.log('XXX 2md row')
  return true
  }

  if (board[2][0]!== '' && board[2][0]=== board[2][1] && board[2][1] === board[2][2]) {
    // XXX 3rd row
  return true
  } 
  

  if ( board[0][0]!== '' && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    // X 1st column
    // X
    // X
  return true
  }

  if ( board[0][1]!== '' && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
    // X 2nd column
    // X
    // X
  return true
  }

  if ( board[0][2]!== '' && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
    // X 3rd column
    // X
    // X
  return true
  }

  if ( board[0][0]!== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    // 1st diagonal 
  return true
  }
  if ( board[0][2]!== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    // 2nd diagonal 
  return true
  }
  
  return false
};


// const checkWin = (board) => {
// // move through the board data array and create the
//   // is is the row number
//   for (let i = 0; i < board.length; i += 1) {
//     // j is the column number
//     for (let j = 0; j < board[i].length; j += 1) {
      
//       if (board[i][j] === currentPlayer && board[i][j] !== ""){
//         console.log ("1" + board[i][j])
//         return true
//       }
//       if (board[j][i] === currentPlayer && board[j][i] !== ""){
//         console.log ("2")
//         return true
//       }
//       return false
//     }
//     if (board [i][i] === currentPlayer && board [i][i] !== ""){
      
//       console.log ("3")
//       return true
//     }
//     if(board [i][abs(i-2)] === currentPlayer && board [i][abs(i-2)] !== ""){console.log ("4")
//       return true
//     }
//     return false
//   }
// };

const squareClick = function (row, column) {
  console.log('coordinates', row, column);
  if (board[row][column] === '') {
    board[row][column] = currentPlayer;
    // buildBoard(board)
    if (checkWin(board) === true) {
      messageOutput.innerText = `${currentPlayer} wins!`
      canClick = false
      buildBoard(board)
      
      // game over
    } else {
      togglePlayer();    
      buildBoard(board)
    }
  }
  
};



initGame()