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
        squareClickC1(i, j);
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
  } else {
    currentPlayer = 'X';
  }
};

const matchCheck = (p1,p2,p3) => {
  if (p1 === '') {
    return false;
  }
  if (p2 != p1){
    return false;
  }if (p3 != p1 ){
    return false
  }
  return p1 ;
  
}

function checkRowsOrCol(isCol) {
  for (let i = 0; i < board.length; i++) {
    let initialPiece = board[isCol ? 0 : i][isCol ? i : 0];

    if (initialPiece === '') {
        continue;
    }

    for (let j = 0; j < board.length; j++) {
        let currentPiece = board[isCol?j:i][isCol?i:j];

        if (currentPiece !== initialPiece) {
            break;

        } else if (j === board.length - 1) {
            return initialPiece;
        }
      
    }

    // if (i === board.length - 1) {
    //     return false;
    // }
  }
    return false;
}

function checkRowsOrColMod(isCol) {
  let inLineCounter = 0
  let lastPiece = null;
  for (let i = 0; i < board.length; i++) {
    inLineCounter =  0;
    let initialPiece = board[isCol ? 0 : i][isCol ? i : 0];

    

    for (let j = 0; j < board.length; j++) {
      
      let currentPiece = board[isCol?j:i][isCol?i:j];
      if (currentPiece === '') {
      continue;
      }
       isCol? '':console.log(currentPiece);
      if (lastPiece == null ) {
        lastPiece= currentPiece;
      }else if (currentPiece !== lastPiece) {
          lastPiece=currentPiece;
          continue;

      } else if ( currentPiece === lastPiece) {
        lastPiece=currentPiece;
        inLineCounter +=1;
        
    }
      isCol? '':console.log(inLineCounter);
      if (inLineCounter == inLineWin-1){
        return currentPiece
      }
    }

        // if (i === board.length - 1) {
        //     return false;
        // }
  }
    return false;
}

function checkDiags(topLeft) {
  let piece = board[topLeft ? 0 : board.length - 1][0] ;
  for (let d = 0; d < board.length; d++) {
    if (piece === '') {
        break;
    } 

    let currentPiece = board[topLeft ? d : board.length - d - 1][d];

    if (currentPiece !== piece) {
        break;

    } else if (d === board.length - 1) {
        return currentPiece;
    }
      

  }
  return false;
}

function checkDiagsMod(topLeft) {
  let lastPiece = null;
  let inLineCounter =0;

  let piece = board[topLeft ? 0 : board.length - 1][0] ;
  for (let d = 0; d < board.length; d++) {
    
    let currentPiece = board[topLeft ? d : board.length - d - 1][d];
    if (lastPiece==null){
      lastPiece=currentPiece
    }else if (currentPiece !== lastPiece) {
      lastPiece=currentPiece
      continue;

    } else if (d === board.length - 1) {
        return currentPiece;
    }
    if ( currentPiece === lastPiece) {
      lastPiece=currentPiece;
      inLineCounter +=1;
    }
    
    if (inLineCounter == inLineWin){
      return currentPiece
    }
      

  }
  return false;
}


const checkWin = () => {  
  

    return checkRowsOrColMod(true)||checkRowsOrColMod(false)||checkDiagsMod(true)||checkDiagsMod(false);
}
  



const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '' && canClick === true ) {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // change the player
    togglePlayer();
  }
  winner = checkWin()? checkWin() : '';
  canClick = winner!=''? false : true ; 
  if (canClick === false && messageOut === false){
    const winMessage = document.createElement('p');
    winMessage.id = 'winMessage'
    winMessage.innerText = `${winner} is the winner`
    document.body.appendChild(winMessage);
    messageOut = true;
  }
}

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const computerOneTurn = () =>{
  let randX =getRandomIndex(boardSize);
  let randY = getRandomIndex(boardSize);
  if (board[randX][randY] == ''){
    
    board[randX][randY] = "O";
    
  } else {
    computerOneTurn()
  }
  
}

const squareClickC1 = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '' && canClick === true ) {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // change the player
    //togglePlayer();
    
  }
  winner = checkWin()? checkWin() : '';
 
  canClick = winner!=''? false : true ; 
  if (canClick === false && messageOut === false){
    const winMessage = document.createElement('p');
    winMessage.id = 'winMessage'
    winMessage.innerText = `${winner} is the winner`
    document.body.appendChild(winMessage);
    messageOut = true;
  }else {
    computerOneTurn();
    buildBoard(board);
  }
}