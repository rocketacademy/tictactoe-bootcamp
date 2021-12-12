// init game elements and containers
const initGame = () => {
  // build input container
  inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  document.body.appendChild(inputContainer);
  buildInput();
  // build board container
  boardContainer = document.createElement('div');
  boardContainer.classList.add('board-container');
  document.body.appendChild(boardContainer);
  buildBoard(board); // DOING
  // build output container
  outputContainer = document.createElement('div');
  outputContainer.classList.add('output-container');
  document.body.appendChild(outputContainer);
  buildOutput();
  // buildNumberedBoard(board);
};
initGame();
// determineWinConditions(board);
