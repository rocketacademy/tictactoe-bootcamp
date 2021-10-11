////////////////////////////////////////////////
//Game Initialisation
////////////////////////////////////////////////
//start off with asking user for board size
(() => {
  boardContainer = document.createElement("div");
  document.body.appendChild(boardContainer);

  const sizeSelectLabel = document.createElement("label");
  boardContainer.append(sizeSelectLabel);
  sizeSelectLabel.innerHTML =
    "<strong>  Please key in a board size for your TicTacToe game: </strong>";
  const boardSizeInput = document.createElement("input");
  boardContainer.append(boardSizeInput);
  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  boardContainer.append(submitBtn);
  const errorMsg = document.createElement("p");
  boardContainer.append(errorMsg);

  submitBtn.addEventListener(
    "click",
    (submitted = () => {
      sizeSelected = boardSizeInput.value;
      isNaN(sizeSelected) || sizeSelected < 3
        ? (errorMsg.innerText = "Please enter a valid number")
        : initGame();
    })
  );
})();

// create the board container element and put it on the screen
const initGame = () => {
  //clear screen
  boardContainer.innerHTML = "";
  board = [];

  for (let i = 0; i < sizeSelected; i += 1) {
    board.push([]);
    for (let j = 0; j < sizeSelected; j += 1) {
      board[i].push("");
    }
  }
  console.log(board);

  rowNum = board.length;
  colNum = board[0].length;

  // build the board - right now it's empty
  buildBoard(board);
};
