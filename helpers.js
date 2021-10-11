const createBoard = (boardSize) => {
    console.log(boardSize);
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push("");
        }
        board.push(row);
    }
    return board;
};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
    // start with an empty container
    boardContainer.innerHTML = "";
    boardElement = document.createElement("div");
    boardElement.classList.add("board");

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
                squareClick(i, j);
            });
        }

        // add a single row to the board
        boardContainer.appendChild(rowElement);
    }
};

// switch the global values from one player to the next
const togglePlayer = () => {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
};

const squareClick = (column, row) => {
    console.log("coordinates", column, row);

    if (!win) {
        // see if the clicked square has been clicked on before
        if (board[column][row] === "") {
            // alter the data array, set it to the current player
            board[column][row] = currentPlayer;

            // refresh the creen with a new board
            // according to the array that was just changed
            buildBoard(board);
            win = checkForWinner(column, row); //naming convention for row and columns are mixed
            if (win) {
                //end the game
                outputElement.innerHTML = `${currentPlayer} wins!`;
            }
            // change the player
            togglePlayer();
        }
    }
};

const sameElements = (array) => {
    let previousElement = null;
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== "") {
            if (array[i] !== previousElement) {
                previousElement = array[i];
                count = 0;
            }
            count += 1;
            if (count >= boardSize) {
                return true;
            }
        }
    }
    return false;
};

const checkForWinner = () => {
    let win = false;
    //checks all rows for winning condition
    board.forEach((row, index) => {
        const rowWin = sameElements(row);
        if (rowWin) {
            console.log("rowwin");
            win = true;
        }
    });

    //checks all columns for winning condition
    board.forEach((row, i) => {
        const columnElements = [];
        row.forEach((elements, j) => {
            columnElements.push(board[j][i]);
        });
        const columnWin = sameElements(columnElements);
        if (columnWin) {
            console.log("columnWin");
            win = true;
        }
    });

    // check diagonally
    const diagonal1 = [];
    const diagonal2 = [];
    board.forEach((row, i) => {
        const tempRow = [...row];
        diagonal1.push(row[i]);
        diagonal2.push(tempRow.reverse()[i]);
    });

    const diagonal1Win = sameElements(diagonal1);
    const diagonal2Win = sameElements(diagonal2);

    if (diagonal1Win || diagonal2Win) {
        win = true;
    }


    return win;
};

const createInputForm = () => {
    boardSizeInput = document.createElement("input");
    boardSizeInput.placeholder = "Board Size";

    submitButton = document.createElement("button");
    submitButton.innerHTML = "submit";
    submitButton.addEventListener("click", () => {
        boardSizeInput.remove();
        submitButton.remove();
        boardSize = boardSizeInput.value;
        createBoard(boardSize);

        // build the board - right now it's empty
        buildBoard(board);
    });

    document.body.appendChild(boardSizeInput);
    document.body.appendChild(submitButton);
};
