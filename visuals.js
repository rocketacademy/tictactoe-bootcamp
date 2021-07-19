// create reset button
const resetButton = document.createElement('button');
resetButton.innerText = 'Reset';
resetButton.classList.add('button', 'reset');

// create reset button
const startButton = document.createElement('button');
startButton.innerText = 'Start';
startButton.classList.add('button', 'start');

// create game info board
const gameInfo = document.createElement('div');
gameInfo.innerText = 'Pls select board size!';
gameInfo.className = 'gameInfo';

// create input board size message
const boardSizeMessage = document.createElement('div');
boardSizeMessage.innerText = 'Board Size: ';
boardSizeMessage.className = 'boardSizeMessage';

// create drop down for user to select boardsize
const inputBoardSize = document.createElement('input');
inputBoardSize.setAttribute('id', 'boardSize');
inputBoardSize.setAttribute('type', 'number');
inputBoardSize.setAttribute('min', '3');
inputBoardSize.setAttribute('max', '10');

const buttonContainer = document.createElement('div');
const boardSizeContainer = document.createElement('div');

boardSizeContainer.appendChild(boardSizeMessage);
boardSizeContainer.appendChild(inputBoardSize);
buttonContainer.appendChild(boardSizeContainer);
buttonContainer.appendChild(startButton);
buttonContainer.appendChild(resetButton);

document.body.appendChild(buttonContainer);
document.body.appendChild(gameInfo);
