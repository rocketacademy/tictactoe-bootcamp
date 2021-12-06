// create the board container element and put it on the screen
const startGame = () => {
  boardContainer = document.createElement("div");
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  // generateEmptyBoard(boardSize);
  buildBoard(board);
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 1) {
    currentPlayer = -1;
    console.log(`switched player to ${currentPlayer}`);
  } else {
    currentPlayer = 1;
  }
};

const squareClick = (column, row) => {
  // console.log("coordinates", column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === 0) {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    checkWin(board);

    // change the player
    togglePlayer();
  }
};

// generateEmptyBoard(boardSize);
// startGame();
initGame();
