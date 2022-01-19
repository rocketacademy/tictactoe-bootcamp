//////////GLOBAL VARIABLES//////////
  
// elements for playing board
let boardElement;
let boardContainer;
let x;
let board;

// current player global starts at X
let currentPlayer = 'X';
let canClick = true;

//message container
let messageContainer = document.createElement('div')
messageContainer.classList.add("message")
document.body.appendChild(messageContainer)

// message output
let messageOutput = document.createElement('span')
messageContainer.append(messageOutput)
messageOutput.innerText = ""

//set size of board
const inputBoardSize = () => {
let boardSize = document.getElementById("boardSize");
x = `${boardSize.options[boardSize.selectedIndex].text}`;
console.log(x);
};

const createBoardSize = () => {
  document.querySelector('div').outerHTML ="";
  inputBoardSize();
  board = [];
  for (let i = 0; i < x; i += 1) {
    board.push([]);
    for (let j = 0; j < x; j += 1) {
      board[i].push('');
    }
  }
  initGame();
};

// reset board 
let resetButton = document.createElement('button');
messageContainer.appendChild(resetButton);
resetButton.innerText = "Reset";
resetButton.addEventListener('click', ()=>{window.location.reload()});


//////////HELPER FUNCTIONS//////////
// completely rebuilds the entire board every time there's a click


const buildBoard = (board) => {
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the current state of the board
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
      if(canClick === true){
        square.addEventListener('click', () => {
        squareClick(i, j);
      })
    }
    // add a single row to the board
    boardContainer.appendChild(rowElement);
    }
  }
};

///////////////CALLBACK FUNCTIONS/////////
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);
  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
  }
    //check winner at every turn
  if (checkWinner(board, currentPlayer) === true) {
        messageOutput.innerText = `${currentPlayer} wins!!!`
        canClick = false
      } else {  
        togglePlayer();  
      }
        buildBoard(board); //take this out of the if statement
};

//check winner
// if value of board elements in a row/column/diagonal are equal to each other, win.
// code for row: board[i][j] == board[i][j+1] && board[i][j] == board[i][j+2]
// code for column: board[j][i] == board[j+1][i] board[j][i] == board[j+2][i]
// code for diagonal: board[0][0] == board[1][1] && board [0][0] == board[2][2]

const checkWinner = () => { 
 for (let i = 0; i < board.length; i += 1) {
    // check rows
    xCount = 0;
    oCount = 0;

    for (let j = 0; j < board.length; j += 1) {
      if (board[i][j] === 'X') {
        xCount += 1;
      }
      if (board[i][j] === 'O') {
        oCount += 1;
      }
    }
    if (xCount === board.length || oCount === board.length) {
      return true;
    }

    // check columns
    xCount = 0;
    oCount = 0;

    for (let j = 0; j < board.length; j += 1) {
      if (board[j][i] === 'X') {
        xCount += 1;
      }
      if (board[j][i] === 'O') {
        oCount += 1;
      }
    }
    if (xCount === board.length || oCount === board.length) {
      return true;
    }
 }

  let diagSet = []
  let diagSetOpp = []
  for (let i = 0; i < board.length; i +=1){
    diagSet.push(board[i][i])
    diagSetOpp.push(board[i][Math.abs(i-(board.length-1))])
  }
  diagSet = new Set(diagSet)
  diagSetOpp = new Set(diagSetOpp)

  if (diagSet.has("") === false && diagSet.size === 1){
    return true
  }
  if (diagSetOpp.has("") === false && diagSetOpp.size === 1){
    return true
  }
  return false   
};
  
//   // check diagonals: top left to bottom right
//   xCount = 0;
//   oCount = 0;

//   for (let j = 0; j < board.length; j += 1) {
//     if (board[j][j] === 'X') {
//       xCount += 1;
//     }
//     if (board[j][j] === 'O') {
//       oCount += 1;
//     }
//      if (xCount === 3 || oCount === 3) {
//       return true;
//     }
//   }
//     // check diagonals: top right to bottom left
//   xCount = 0;
//   oCount = 0;

//   for (let j = 0; j < board.length; j += 1) {
//     if (board[j][board.length - 1 - j] === 'X') {
//       xCount += 1;
//     }
//     if (board[j][board.length - 1 - j] === 'O') {
//       oCount += 1;
//     }
//     if (xCount === 3 || oCount === 3) {
//       return true;
//     }
//   }
// };

// //check row match
//   for (let i = 0; i < board.length; i += 1) {
//   set comes back with unique array
//     let rowSet = new Set(board[i])
//     if (rowSet.has("") === false && rowSet.size === 1){
//       return true
//     }
//   }
// // check column match
//   for (let i = 0; i <board.length; i+=1){
//     let column = []
//     for(let j = 0 ; j < board.length; j +=1){
//       let columnStart = board[j]
//       column.push(columnStart[i])
//       console.log(column)
//     }
//     let columnSet = new Set(column)
//     if (columnSet.has("") === false && columnSet.size === 1){
//       return true
//     }
//     console.log(currentPlayer)
//     console.log(columnSet)   
//   }
//check diagonal match
 
 

///////////////INITISATION///////////////
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  buildBoard(board);
};

