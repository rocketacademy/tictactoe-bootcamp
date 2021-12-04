const board = [];
let boardContainer;
let boardElement;

document.getElementById("boardLengthInput").addEventListener("keyup", () => {
    let boardLengthInput = document.getElementById("boardLengthInput").value;
    let noOfSquaresInput = document.getElementById("noOfSquaresInput").value;
  if(boardLengthInput.length !== 0 && noOfSquaresInput.length !== 0 && noOfSquaresInput <= boardLengthInput) {
    document.getElementById("start").disabled = false;
  } else {
    document.getElementById("start").disabled = true;
  };
});

document.getElementById("noOfSquaresInput").addEventListener("keyup", () => {
    let boardLengthInput = document.getElementById("boardLengthInput").value;
    let noOfSquaresInput = document.getElementById("noOfSquaresInput").value;
  if(boardLengthInput.length !== 0 && noOfSquaresInput.length !== 0 && noOfSquaresInput <= boardLengthInput) {
    document.getElementById("start").disabled = false;
  } else {
    document.getElementById("start").disabled = true;
  };
});

document.getElementById("start").addEventListener("click", () => {
  document.getElementById("userInput").style.display = "none";
  buildBoard(document.getElementById("boardLengthInput").value);
  document.getElementById("ticTacToe").style.display = "";
});

const buildBoard = (boardLength) => {
  // start with an empty container
  boardContainer.innerHTML = "";
  boardElement = document.createElement("div");
  boardElement.classList.add("board");

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < boardLength; i += 1) {
    // separate var for one row / row element
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    // set each square
    // j is the column number
    for (let j = 0; j < boardLength; j += 1) {
      // one square element
      const square = document.createElement("div");
      square.classList.add("square");

      // set the text of the square according to the array
      square.innerHTML = "";

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener("click", () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }

  document.getElementById("ticTacToe").innerHTML = boardContainer;
};