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

let computerMode = false

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
  if (currentPlayer === 'X'){
    currentPlayer = 'O';
    if (computerMode === true){
      setTimeout(computer, 500) 
    }
  } 
  else {
    currentPlayer = 'X';
  }
};

// const checkWin = (board) => {

//   // check every position
//   // there is a conditional for all 15 win conditions
//   if ((board[0][0]!== '') && (board[0][0]=== board[0][1]) && (board[0][1] === board[0][2])) {
//     // XXX 1st row
//   console.log('XXX 1st row')
//   return true
//   } 

//   if (board[1][0]!== '' && board[1][0]=== board[1][1] && board[1][1] === board[1][2]) {
//     // XXX 2nd row
//   console.log('XXX 2md row')
//   return true
//   }

//   if (board[2][0]!== '' && board[2][0]=== board[2][1] && board[2][1] === board[2][2]) {
//     // XXX 3rd row
//   return true
//   } 
  

//   if ( board[0][0]!== '' && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
//     // X 1st column
//     // X
//     // X
//   return true
//   }

//   if ( board[0][1]!== '' && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
//     // X 2nd column
//     // X
//     // X
//   return true
//   }

//   if ( board[0][2]!== '' && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
//     // X 3rd column
//     // X
//     // X
//   return true
//   }

//   if ( board[0][0]!== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
//     // 1st diagonal 
//   return true
//   }
//   if ( board[0][2]!== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
//     // 2nd diagonal 
//   return true
//   }
  
//   return false
// };

const checkWin = (board, currentPlayer) => { 

//check row match
  for (let i = 0; i < board.length; i += 1) {
    let rowSet = new Set(board[i])
    if (rowSet.has("") === false && rowSet.size === 1){
      return true
    }
  }
  
// check column match
  for (let i = 0; i <board.length; i+=1){
    let column = []
    for(let j = 0 ; j < board.length; j +=1){
      let columnStart = board[j]
      column.push(columnStart[i])
      console.log(column)
    }
    let columnSet = new Set(column)
    if (columnSet.has("") === false && columnSet.size === 1){
      return true
    }
    console.log(currentPlayer)
    console.log(columnSet)   
  }
  //check diagonal match
  let firstDiagonal = []
  let secondDiagonal = []
  for (let i = 0; i < board.length; i +=1){
    
    firstDiagonal.push(board[i][i]) //first diagonal
    secondDiagonal.push(board[i][Math.abs(i-(board.length-1))]) //second diagonal
  }
  let firstDiagonalSet = new Set(firstDiagonal)
  let secondDiagonalSet = new Set(secondDiagonal)
  console.log(secondDiagonal)

  if (firstDiagonalSet.has("") === false && firstDiagonalSet.size === 1){
    return true
  }
  if (secondDiagonalSet.has("") === false && secondDiagonalSet.size === 1){
    return true
  }
  return false   

  }
   

const squareClick = function (row, column) {
  console.log('coordinates', row, column);
  if (board[row][column] === '') {
    board[row][column] = currentPlayer;
    // buildBoard(board)
    if (checkWin(board, currentPlayer) === true) {
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

const computer = (board) =>{
  console.log(currentPlayer)
  let allSquares = document.getElementsByClassName("square")
  let allSquaresArray = Array.from(document.getElementsByClassName("square"))
  let emptySquares =[]
  for (let i = 0; i < allSquaresArray.length; i +=1){
    if (allSquaresArray[i].innerText === ""){
      emptySquares.push(i) // just push index of empty square
    }
  }
  console.log(emptySquares)
  console.log(allSquaresArray)

  let randomChoice = Math.floor(Math.random() * emptySquares.length)
  let selectedSquareIndex = emptySquares[randomChoice]
  // console.log(selectedSquareIndex)
  let selectedSquare = allSquares[selectedSquareIndex] // pick from html array
  selectedSquare.click()
  squareClick
  // console.log(currentPlayer)
  console.log(selectedSquareIndex)

};

const computerModeMsg = () => {
  messageOutput.innerText = `Computer mode activated. \nPlayer, choose your square.`
  setTimeout(()=>{
    messageOutput.innerText = ``
  }, 1000)

  computerMode = true
}  

let computerButton = document.createElement('button')
messageContainer.append(computerButton)
computerButton.innerText = "computer play"
computerButton.addEventListener('click', ()=> computerModeMsg())



initGame()
console.log(document.getElementsByClassName("square"))