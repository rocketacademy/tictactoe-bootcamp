// ***** GLOBAL VARIABLES *********************************
// Players
const playerNames = ['👻', '🐯'];
let currentPlayer = playerNames[0];

// Board
const board = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];
let boardContainer;
let gameInfoContainer;
let gameOn = true;

// ***** HELPER FUNCTIONS *********************************
// Change player
const changePlayer = () => {
	if (currentPlayer === playerNames[0]) {
		currentPlayer = playerNames[1];
	} else {
		currentPlayer = playerNames[0];
	}
};

// Check to see if player won
const didPlayerWin = () => {
	// win conditions
	// horizontal win
	// 0,0 == 0,1 == 0,2
	// 1,0 == 1,1 == 1,2
	// 2,0 == 2,1 == 2,2
	// vertical win
	// 0,0 == 1,0 == 2,0
	// 0,1 == 1,1 ==  2,1
	// 0,2 == 1,2 == 2,2
	// diagonal win
	// 0,0 == 1,1 == 2,2 // top-left to bottom-right
	// 0,2 == 1,1 == 2,0 // top-right to bottom-left

	let win = false;

	// Check for horizontal win
	// Go through each row and check if the squares match
	for (let i = 0; i < board.length; i += 1) {
		let row = board[i];
		// check the value of each square in the row against one another
		for (let j = 0; j < row.length; j += 1) {
			if (row[j] !== '' && row[j] === row[j + 1] && row[j] === row[j + 2]) {
				win = true;
			}
		}
	}
	// Check for vertical win
	// Go through each column to check if there's a vertical win
	// check the value of each square in the row against one another
	for (let i = 0; i < board[0].length; i += 1) {
		let topRow = board[0];
		if (
			topRow[i] !== '' &&
			topRow[i] === board[1][i] &&
			topRow[i] === board[2][i]
		) {
			win = true;
		}
	}

	// Check for diagonal win
	if (
		(board[0][0] !== '' &&
			board[0][0] === board[1][1] &&
			board[1][1] === board[2][2]) ||
		(board[0][2] !== '' &&
			board[0][2] === board[1][1] &&
			board[1][1] === board[2][0])
	) {
		win = true;
	}

	// return true / false
	return win;
};

// Draw the tic-tac-toe board
const drawBoard = () => {
	// Empty the board
	boardContainer.innerHTML = '';

	// Create 2 loops to draw the board
	// First loop to create the rows
	for (let i = 0; i < board.length; i += 1) {
		const row = board[i];
		const rowContainer = document.createElement('div');
		rowContainer.classList.add('row');

		// Second loop to create the columns within the rows
		for (let j = 0; j < row.length; j += 1) {
			const square = document.createElement('div');
			square.classList.add('square');
			square.innerText = board[i][j];

			// add event listener to the square
			square.addEventListener('click', () => {
				squareClick(i, j);
			});

			rowContainer.appendChild(square);
		}
		boardContainer.appendChild(rowContainer);
	}
	document.body.appendChild(boardContainer);
};

// Create game info container
const addGameInfo = (message) => {
	gameInfoContainer.innerHTML = ``;
	const gameInfo = document.createElement('p');
	gameInfo.innerHTML = message;
	gameInfoContainer.appendChild(gameInfo);
	document.body.appendChild(gameInfoContainer);
};

// ***** GAMEPLAY *****************************************

// What happens when user clicks on a square
const squareClick = (row, column) => {
	if (board[row][column] == '' && gameOn === true) {
		// Take the element's position, correspond to the board, set the value
		board[row][column] = currentPlayer;

		// Draw the board again
		drawBoard();
		if (didPlayerWin() === true) {
			addGameInfo(`${currentPlayer} wins`);
			gameOn = false;
			return;
		}

		// Change player turn
		changePlayer();
		addGameInfo(`${currentPlayer}, your turn`);
	}
};
// ***** GAME INITIALISATION ******************************

const initGame = () => {
	boardContainer = document.createElement('div');
	boardContainer.classList.add('board');

	gameInfoContainer = document.createElement('div');
	gameInfoContainer.classList.add('game-info-container');

	drawBoard();
	addGameInfo(`${currentPlayer} starts`);
};

initGame();
