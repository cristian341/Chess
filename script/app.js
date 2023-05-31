const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");

const width = 8;
let playerGo = "black"
playerDisplay.textContent = "black"

const startPieces = [
    rook,knight,bishop,queen,king,bishop,knight,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,knight,bishop,queen,king,bishop,knight,rook
];

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute("draggable",true)
        square.setAttribute("square-id",i);
        const row = Math.floor((63 - i) / 8 + 1)
        if(row % 2 === 0){
            square.classList.add(i % 2 === 0 ? "whiteSquare" : "blackSquare");
        } else {
            square.classList.add(i % 2 === 0 ? "blackSquare" : "whiteSquare");
        }
        if (i <= 15){
            square.firstChild.firstChild.classList.add("black");
        } 
        if (i >= 48){
            square.firstChild.firstChild.classList.add("white");
        }
        gameBoard.append(square);
    })
}

createBoard()

const allSquars = document.querySelectorAll(".square");

allSquars.forEach(box => {
    box.addEventListener("dragstart",dragStart)
    box.addEventListener("dragover",dragOver)
    box.addEventListener("drop",dragDrop)
})

let startPositionId
let draggedElement

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute("square-id")
    draggedElement = e.target
    
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains("piece")
    const opponentGo = playerGo === "white" ? "black" : "white"
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)
    const valid = checkIfValid(e.target)
    //changePlayer()

    if(correctGo){
        if(takenByOpponent && valid){
            e.target.parentNode.append(draggedElement)
            e.target.remove();
            checkForWin();
            changePlayer();
            return
        }

        else if (taken && !takenByOpponent){
            infoDisplay.textContent = "You cannont move here"
            alert("You cannont move there")
            setTimeout(() => infoDisplay.textContent = "",2000 )
            return
        }

        else if (valid){
            e.target.append(draggedElement)
            checkForWin()
            changePlayer()
            playerDisplay.textContent = playerGo
            return
        } 
        playerDisplay.textContent = playerGo // update player display
    } else {
        alert(`It's ${playerGo}'s turn. You cannot move now`);

    }
    
    
} 

function checkIfValid(target){
    const targetId = Number(target.getAttribute("square-id")) || Number(target.parentNode.getAttribute("square-id"))
    const startId = Number(startPositionId)
    const piece = draggedElement.id

    switch(piece){
        case "pawn" : 
            const starterRow = [8,9,10,11,12,13,14,15]
            if(
                //moves 2 slaces forward
                starterRow.includes(startId) && startId + width *2  === targetId ||
                //moves 1 space forward
                startId + width === targetId ||
                //moves diagonaly to the left only if there is an opponent
                startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                //moves diagolany to the right only if there is an opponent
                startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild
                )   {
                    return true
                    } else {
                        return false
            }  
    
        case "knight":
            if(
                //moves 2 spaces forward right
                startId + width * 2 + 1 === targetId ||
                //moves 2 spaces forward left
                startId + width * 2 - 1 === targetId ||
                //moves 1 space forward left
                startId + width - 2 === targetId ||
                //moves 1 space forward right
                startId + width + 2 == targetId || 
                //moves 2 space backwards right
                startId - width * 2 + 1 === targetId ||
                //moves 2 space backwards left
                startId - width * 2 - 1 === targetId ||
                //moves 1 space backwards left
                startId - width - 2 === targetId ||
                //moves 1 space backwards right
                startId - width + 2 == targetId  
            )   {
                return true
                } else {
                    return false
            } 

        case "bishop":
            if(
                //moves forward diagonally to the right
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild || 
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3 === targetId}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4 === targetId}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5 === targetId}"]`).firstChild||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6 === targetId}"]`).firstChild||
                
                //moves forward diagonally to the left
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5 === targetId}"]`).firstChild||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6 === targetId}"]`).firstChild ||

                //moves backwards diagonally to the left
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3 === targetId}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4 === targetId}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5 === targetId}"]`).firstChild||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5 === targetId}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width * 6 + 6 === targetId}"]`).firstChild ||

                //moves forward diagonally to the left
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5 === targetId}"]`).firstChild||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6 === targetId}"]`).firstChild ||


                //moves backwards diagonally to the left
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3 === targetId}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4 === targetId}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5 === targetId}"]`).firstChild||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6 === targetId}"]`).firstChild 
            ) {
                return true
            } else {
                return false
            } 

        case "rook":
            if (
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild||
                startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild||
                startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild||
                startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild||
                startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
                //
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild||
                startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild||
                startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild||
                startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild||
                startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
                //
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild||
                startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild||
                startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild||
                startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                //
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild||
                startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild||
                startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild||
                startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild||
                startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ) {
                return true
            } else {
                return false
            } 

        case "queen":
            if (
                    //moves forward diagonally to the right
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild || 
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3 === targetId}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4 === targetId}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5 === targetId}"]`).firstChild||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6 === targetId}"]`).firstChild||
                //moves forward diagonally to the left
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5 === targetId}"]`).firstChild||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6 === targetId}"]`).firstChild ||
                //moves backwards diagonally to the left
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3 === targetId}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4 === targetId}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5 === targetId}"]`).firstChild||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5 === targetId}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width * 6 + 6 === targetId}"]`).firstChild ||
                //moves forward diagonally to the left
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5 === targetId}"]`).firstChild||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6 === targetId}"]`).firstChild ||
                //moves backwards diagonally to the left
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3 === targetId}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4 === targetId}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5 === targetId}"]`).firstChild||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${ startId + width * 2 - 2 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5 === targetId}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6 === targetId}"]`).firstChild ||
                
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild||
                startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild||
                startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild||
                startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild||
                startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
                //
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild||
                startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild||
                startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild||
                startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild||
                startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
                //
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild||
                startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild||
                startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild||
                startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                //
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild||
                startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild||
                startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild||
                startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild||
                startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ){
                return true
            } else {
                return false
            } 

        case "king":
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width -1 === targetId ||
                startId + width +1 === targetId ||
                startId - width -1 === targetId ||
                startId - width +1 === targetId 
            ){
                return true
            } else {
                return false
            } 

    }

}

function changePlayer() {
    if(playerGo === "black"){
        reverseIds()
        playerGo = "white"
        playerDisplay.textContent = 'white'

    } else if (playerGo === "white") {
        revertIds()
        playerGo = "black"
        playerDisplay.textContent = 'black'
    }
}

function reverseIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute("square-id", (width * width -1) -i))

}

function revertIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute("square-id", i))

}


function checkForWin(){
    const kings = Array.from(document.querySelectorAll('#king'))
    if (!kings.some(king => king.firstChild.classList.contains("white"))) {
        infoDisplay.innerHTML = "Black player wins!"
        const allSquares = document.querySelectorAll(".square")
        allSquares.forEach(square => square.firstChild?.setAttribute("draggable", false))
    }
    if (!kings.some(king => king.firstChild.classList.contains("black"))) {
        infoDisplay.innerHTML = "White player wins!"
        const allSquares = document.querySelectorAll(".square")
        allSquares.forEach(square => square.firstChild?.setAttribute("draggable", false))
    }
}



