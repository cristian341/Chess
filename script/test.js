function dragDrop(e) {
    e.stopPropagation()
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains("piece")
    const opponentGo = playerGo === "white" ? "black" : "white"
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)
    const valid = checkIfValid(e.target)
    changePlayer()

    if(correctGo){
        if(takenByOpponent && valid){
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            return
        }

        if (taken && !takenByOpponent){
            infoDisplay.textContent = "You cannont move here"
            setTimeout(() => infoDisplay.textContent = "",2000 )
            return
        }

        if (valid){
            e.target.append(draggedElement)
            return
        }
    }
    
    playerDisplay.textContent = playerGo // update player display
}
