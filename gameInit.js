
const changeGameSettings=()=>{

}

const makeBoardArray=(size)=>{
  const board=[];
  for(let i=0; i<size; i++)
  {
    board.push([]);
    for(let j=0; j<size; j++)
    {
      board[i].push('');
    }
  }
  return board
}

// create the board container element and put it on the screen
const initGame = () => {
  
  header = document.createElement('h1');
  header.id='header';
  header.innerText='Tic Tac Toe!';

  boardContainer = document.createElement('div');
  outputContainer = document.createElement('div');
  queryUserContainer= document.createElement('div');
  
  const queryBoardSize=document.createElement('input');
  queryBoardSize.placeholder = 'board size ';

  const queryNumSqToWin=document.createElement('input');
  queryNumSqToWin.placeholder='number of squares to win';
  const submitButton= document.createElement('button');
  submitButton.innerText="Update";

  submitButton.addEventListener('click', ()=>{
    const queriedSize=Number(queryBoardSize.value);
    boardSize=queriedSize>=minBoardSize? queriedSize:minBoardSize;
    queryBoardSize.placeholder = boardSize;
    queryBoardSize.value=boardSize;
    
    const queriedNumToWin=Number(queryNumSqToWin.value);
    numSqToWin=queriedNumToWin<=boardSize && queriedNumToWin>1?queriedNumToWin:boardSize;
    queryNumSqToWin.placeholder=numSqToWin;
    queryNumSqToWin.value=numSqToWin;

    board=makeBoardArray(boardSize);
     buildBoard(board);
  })

  const compPlayButton= document.createElement('button');
  compPlayButton.innerText='Player VS Player';

  compPlayButton.addEventListener('click', ()=>{
    isComPlaying=!isComPlaying;
    if(isComPlaying)
    {
      compPlayButton.innerText='Player VS Computer';
      computerPlayer=currentPlayer;
      computerClicks();
    }
    else{
      compPlayButton.innerText='Player VS Player';
    } 
  } )

  queryUserContainer.appendChild(queryBoardSize);
  queryUserContainer.appendChild(queryNumSqToWin);
  queryUserContainer.appendChild(submitButton);

  document.body.appendChild(header);
  document.body.appendChild(queryUserContainer);
  document.body.appendChild(compPlayButton);
  document.body.appendChild(boardContainer);
  document.body.appendChild(outputContainer);



  // build the board - right now it's empty
  buildBoard(board);
};
initGame();