////////////////////////////////////////////////
//Helper functions
////////////////////////////////////////////////
// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = "";
  boardElement = document.createElement("div");
  boardElement.setAttribute("id", "board");
  // boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener("click", () => {
        checkWin() === false ? squareClick(i, j) : "";
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

////////////////////////////////////////////////
//Game Play Logic
////////////////////////////////////////////////
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

const checkWin = () => {
  let gameOver = false;
  // Loop through horizontals and check conditions
  for (let i = 0; i < rowNum; i += 1) {
    board[i].every((e) => e !== "" && e === board[i][0])
      ? (gameOver = true)
      : gameOver;
    // console.log(`Row ${[i]}: game over is ${gameOver}`);
  }
  // Loop through verticals and check conditions
  for (let colCounter = 0; colCounter < colNum; colCounter += 1) {
    let verticalValues = [];
    for (let i = 0; i < rowNum; i += 1) {
      verticalValues.push(board[i][colCounter]);
      // console.log(
      //   `Value pushed into array for cell ${i},${colCounter}: ${board[i][colCounter]}`
      // );
    }
    // console.log(verticalValues);
    verticalValues.every((e) => e !== "" && e === verticalValues[0])
      ? (gameOver = true)
      : gameOver;
    // console.log(`Col ${[colCounter]}: game over is ${gameOver}`);
  }

  // Loop through backward diagonal and check conditions
  let bckDiagValues = [];
  for (let i = 0; i < colNum; i += 1) {
    bckDiagValues.push(board[i][i]);
  }
  bckDiagValues.every((e) => e !== "" && e === bckDiagValues[0])
    ? (gameOver = true)
    : gameOver;

  // Loop through backward diagonal and check conditions
  let fwdDiagValues = [];
  for (let i = 0; i < colNum; i += 1) {
    fwdDiagValues.push(board[i][colNum - 1 - i]);
  }
  fwdDiagValues.every((e) => e !== "" && e === fwdDiagValues[0])
    ? (gameOver = true)
    : gameOver;

  return gameOver;
  //end curly  bracket for checkWin()
};

const squareClick = function (column, row) {
  console.log("coordinates", column, row);

  if (board[column][row] === "") {
    board[column][row] = currentPlayer;
    buildBoard(board);
    togglePlayer();
  }

  for (let i = 0; i < board[0].length; i += 1) {
    // console.log(
    //   `Row ${i + 1} contains: ${board[i][0]}, ${board[i][1]}, ${board[i][2]}`
    // );
  }

  if (checkWin() === true) {
    let textContainer = document.createElement("div");
    boardContainer.append(textContainer);
    textContainer.innerHTML = "<p>Game over.</p>";
    let replayBtn = document.createElement("button");
    boardContainer.append(replayBtn)
    replayBtn.innerText="Play again!"
    replayBtn.addEventListener("click", ()=>{
      initGame();
    })
  }
};
