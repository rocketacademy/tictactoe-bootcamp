//////////GLOBAL VARIABLES//////////
// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
let boardContainer;

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

// reset button
let resetButton = document.createElement('button')
messageContainer.appendChild(resetButton)
resetButton.innerText = "reset"
resetButton.addEventListener('click', ()=>{window.location.reload()})


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
  
    //check winner at every turn
  if (checkWinner(board, currentPlayer) === true) {
        messageOutput.innerText = `${currentPlayer} wins!`
        canClick = false
      } else {
        togglePlayer();    
        buildBoard(board)
      }
  }
};

//check winner
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
    if (xCount === 3 || oCount === 3) {
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
    if (xCount === 3 || oCount === 3) {
      return true;
    }
 }
  //check diagonal match
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

// //check row match
//   for (let i = 0; i < board.length; i += 1) {
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
 

///////////////INITISATION///////////////
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  // build the board - right now it's empty
  buildBoard(board);
};

initGame();