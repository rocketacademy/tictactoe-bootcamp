// keep data about the game in a 2-D array
// const board = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = "X";

const boardContentsMap = {
  "-1": "O",
  0: "",
  1: "X",
  // javascript doesn't like having negative integers as object keys
  // so remember to use parseInt leter on in the code
  // at least for the "-1"
};
