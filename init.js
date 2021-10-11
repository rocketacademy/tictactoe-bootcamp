// create the board container element and put it on the screen
const initGame = () => {
    boardContainer = document.createElement("div");
    document.body.appendChild(boardContainer);

    outputElement = document.createElement("div")
    document.body.appendChild(outputElement)

    createInputForm()


};

initGame()