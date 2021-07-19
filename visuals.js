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

// create input win num message
const winNumMessage = document.createElement('div');
winNumMessage.innerText = 'Choose Winning Number : ';
winNumMessage.className = 'winNumMessage';

// create drop down for user to select boardsize
const inputWinNum = document.createElement('input');
inputWinNum.setAttribute('id', 'winNum');
inputWinNum.setAttribute('type', 'number');
inputWinNum.setAttribute('min', '3');
inputWinNum.setAttribute('max', '10');

const buttonContainer = document.createElement('div');
const boardSizeContainer = document.createElement('div');
const winNumContainer = document.createElement('div');

boardSizeContainer.appendChild(boardSizeMessage);
boardSizeContainer.appendChild(inputBoardSize);
winNumContainer.appendChild(winNumMessage);
winNumContainer.appendChild(inputWinNum);
buttonContainer.appendChild(boardSizeContainer);
buttonContainer.appendChild(winNumContainer);
buttonContainer.appendChild(startButton);
buttonContainer.appendChild(resetButton);

document.body.appendChild(buttonContainer);
document.body.appendChild(gameInfo);
