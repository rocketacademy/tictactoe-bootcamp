// ***** GLOBAL VARIABLES *********************************
let currentPlayer = 'X';
const board = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];
let boardContainer;

// ***** HELPER FUNCTIONS *********************************

// Change player
const changePlayer = () => {
	if (currentPlayer === 'X') {
		currentPlayer = 'O';
	} else {
		currentPlayer = 'X';
	}
};
// ***** GAMEPLAY *****************************************

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

// What happens when user clicks on a square
const squareClick = (row, column) => {
	if (board[row][column] == '') {
		// Take the element's position, correspond to the board, set the value
		board[row][column] = currentPlayer;
		// Draw the board again
		drawBoard();
		// Change player turn
		changePlayer();
	}
};

// ***** GAME INITIALISATION ******************************

const initGame = () => {
	boardContainer = document.createElement('div');
	boardContainer.classList.add('board');

	drawBoard();
};

initGame();
