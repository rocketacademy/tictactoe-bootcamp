
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
  if (board[column][row] === ''&& canClick) {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    if(playerHasWon()===true)
    {
      outputContainer.innerText=`${currentPlayer}: Wins!`
      canClick=false;
    }

    // change the player
    togglePlayer();
  }
};
//count consequitive checks, no just all in the row
const checkRows=()=>{
  //checkrows
  for(let i = 0; i< board.length; i++)
  {
    let rowSum=0;
    let refRow= board[i];
    for(let j=0; j<board.length; j++)
    {
      let refSquare= refRow[j];
      if(refSquare===currentPlayer)
      { 
        rowSum+=1;
      }
      else
      {
        rowSum=0;
      }
      if(rowSum===numSqToWin)
      {
        console.log('rows true');
        return true;
      }
    }
    
  }
  return false
}
const checkColumns=()=>{
  //check column
  for(let i = 0; i< board.length; i++)
  {
    let colSum=0;
    for(let j=0; j<board.length; j++)
    {
      let refSquare= board[j][i];   
      if(refSquare===currentPlayer)
      { 
        colSum+=1;
      }
      else{
        colSum=0;
      }
      if(colSum===numSqToWin)
      {
        return true;
      }
    } 
  }
  return false;
}
const checkDiagonal=()=>{ 
  //check +ve diagonals
  let diagonalSum=0;
  for(let i=0; i<board.length; i++)
  {
    let refSquare= board[i][i];
      if(refSquare===currentPlayer)
      { 
        diagonalSum+=1;
      }
      else{
        diagonalSum=0;
      }
      if(diagonalSum===numSqToWin)
        {
          return true;
        }
  }

  return false;
}
const checkNegDiagonal=()=>{
  //check -ve diagonals
  let colCounter=0;
  let negDiagonalSum=0;
  for(let i=board.length-1; i>=0; i--)
  {
    let refSquare=board[i][colCounter];
     if(refSquare===currentPlayer)
      { 
        negDiagonalSum+=1;
      }
      else{
        negDiagonalSum=0;
      }
       if(negDiagonalSum===numSqToWin)
       { 
          return true;
        }

       colCounter++;
  }
 
  return false;
}
const playerHasWon=()=>
{
  if(checkRows()||checkColumns()||checkDiagonal()||checkNegDiagonal())
  {
    return true;
  } 
  return false
}


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