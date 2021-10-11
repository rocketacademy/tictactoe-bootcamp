// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

const makeEmptyBoard = () => {

  for (let i = 0; i< boardSize; i++){
    board.push([]);
    for (let j = 0; j<  boardSize; j++) {
      board[i].push('');
    }
  }
  
}

const openingPage = ()=>{
  watchBox = document.createElement('div');
  watchBox.classList.add('watchBox');
  const openMessage = document.createElement('p');
  openMessage.classList.add('timerMessage');
  openMessage.innerText = 'Select size of grid and number in row or column for win';
  const gridField = document.createElement('input');
  gridField.type = 'number';
  gridField.min = 3;
  gridField.max = 8;
  const submitButton = document.createElement('button');
  submitButton.innerText = 'Submit';
  const winField = document.createElement('input');
  winField.type = 'number';
  winField.min = 3;
  winField.max = 8;
  
  watchBox.appendChild(openMessage);
  watchBox.appendChild(gridField);
  watchBox.appendChild(winField);
  watchBox.appendChild(submitButton);

  const submitGrid = ()=>{
    boardSize = gridField.value
    inLineWin = winField.value
    if (inLineWin > boardSize) {
      openMessage.innerText = `Number for win,${winField.value}, is bigger than grid size of ${gridField.value}`
    }else{
    watchBox.remove();
    makeEmptyBoard();
    initGame();

    }
    
    
  }
  

  if (boardSize === 0) {

    document.body.appendChild(watchBox);
    submitButton.addEventListener('click', submitGrid);

  }
}

openingPage();