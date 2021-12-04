const winningNumbers = [
  ["00", "01", "02"],
  ["10", "11", "12"],
  ["20", "21", "22"],
  ["00", "10", "20"],
  ["01", "11", "21"],
  ["02", "12", "22"],
  ["00", "11", "22"],
  ["20", "11", "02"],
];

// if any of this 0 hit 3 first, the player wins, if not, draw

const playerCheck = {
  X: [0, 0, 0, 0, 0, 0, 0, 0],
  O: [0, 0, 0, 0, 0, 0, 0, 0],
};

let roundWon = false;
let squareCount = 0;

const checkWinner = (row, column) => {
  // loop through winningNumbers
  const coordinate = `${row}${column}`;

  for (let i = 0; i < winningNumbers.length; i++) {
    if (winningNumbers[i].indexOf(coordinate) !== -1) {
      playerCheck[currentPlayer][i]++;
    }
  }

  for (let i = 0; i < playerCheck[currentPlayer].length; i++) {
    if (playerCheck[currentPlayer][i] == 3) {
      document.getElementById(
        "message"
      ).innerHTML = `Player ${currentPlayer} wins!`;
      roundWon = true;
    }
  }

  squareCount++;
  if (squareCount == 9 && roundWon == false) {
    document.getElementById("message").innerHTML = `Draw!`;
  }
};
