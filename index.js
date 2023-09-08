let interval
let direction
let board 
let boardPos 
let boardTop
board = document.getElementById('game-board-1')
boardTop = board.style.getPropertyValue("top")

if(!interval){
    interval = setInterval(gameLogic, 250)
    
    console.log(board)
    
}


function moveDown(element){
    console.log(boardTop)
    let elemStyle = window.getComputedStyle(element)
    let topValue = elemStyle.getPropertyValue("top").replace("px", "")
   
    element.style.top = (Number(topValue) + 10) + "px"
}

function moveUp(element){
    let elementStyle = window.getComputedStyle(element)
    let topValue = elementStyle.getPropertyValue("top").replace("px","")

    element.style.top = (Number(topValue) - 10) + "px"
}

function moveRight(element){
    let elementStyle = window.getComputedStyle(element)
    let leftValue = elementStyle.getPropertyValue("left").replace("px","")

    element.style.left = (Number(leftValue) + 10) + "px"
}

function moveLeft(element){
    let elementStyle = window.getComputedStyle(element)
    let leftValue = elementStyle.getPropertyValue("left").replace("px","")

    element.style.left = (Number(leftValue) - 10) + "px"
}

function moveDirections() {
    if (direction === "down"){
        let snakeHead = document.getElementById("snake-segment-1")
        moveDown(snakeHead)
    }else if(direction === "up"){
        let snakeHead = document.getElementById("snake-segment-1")
        moveUp(snakeHead)
    }else if(direction === "right"){
        let snakeHead = document.getElementById("snake-segment-1")
        moveRight(snakeHead)
    }else if(direction === "left"){
        let snakeHead = document.getElementById("snake-segment-1")
        moveLeft(snakeHead)
    }else{
        return
    }
}


function gameLogic () {
    document.addEventListener('keydown', (event)=>{
        
        if (event.key === "ArrowDown" && direction !== 'down'){
            direction = "down"
            
        }else if (event.key === "ArrowUp" && direction !== "up"){
            direction = "up"
            
        }else if (event.key === "ArrowLeft" && direction !== "left"){
            direction = "left"
            
        }else if (event.key === "ArrowRight" && direction !== "right"){
            direction = "right"
            
        }

    })

    moveDirections()
}

