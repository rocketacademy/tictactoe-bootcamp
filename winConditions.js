// check for win conditions
// if value of board elements in a row/column/diagonal are equal to each other, win.
// code for same row: board[i][j] == board[i][j+1] && board[i][j] == board[i][j+2], loop i < 3
// code for same column: board[j][i] == board[j+1][i] board[j][i] == board[j+2][i]
// code for diagonal win: board[0][0] == board[1][1] && board [0][0] == board[2][2]
const winConditions = () => {
  // 3 in a row.
  for (let i = 0; i < 3; i += 1) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== '') {
      return true;
    }
  }
  // 3 in a column
  for (let i = 0; i < 3; i += 1) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== '') {
      return true;
    }
  }
  // 3 in a diagonal
  if (board[1][1] === board[0][0] && board[1][1] === board[2][2] && board[1][1] !== '') {
    return true;
  }
  if (board[1][1] === board[0][2] && board[1][1] === board[2][0] && board[1][1] !== '') {
    return true;
  }
  return false;
};
