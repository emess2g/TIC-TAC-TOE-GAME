const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const cellEle = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winingElement = document.getElementById('winMessage');
const winningMessageElement = document.querySelector('[data-wining-message-text]')
let circleTurn ;

startGame();

function startGame(){
    circleTurn = false;
    cellEle.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true} )
    });
    setBoardHoverClass();
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
      endGame(false)
    }else if(isDraw()){
        endGame();
    }else{
        swapTurns();
        setBoardHoverClass()
    }

}

function endGame(draw){
    if(draw){
        winningMessageElement.innerText = 'Draw!'
    }else{
        winningMessageElement.innerText = `${circleTurn ?  "0's": "X's" } Wins!`;
    }
    winingElement.classList.add('show');
}

function isDraw(){
    return [...cellEle].every(cell => {
      return  cell.classList.contains(X_CLASS ) || cellEle.classList.contains(CIRCLE_CLASS)}
)}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }

}

function checkWin(currentClass){
    return WINING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellEle[index].classList.contains(currentClass)
        })
    })
}