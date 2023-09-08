let interval
let direction
let board 
let boardPos 
let boardTop
let boardLeft
let snakeHead = document.getElementById("snake-segment-1")

const boardHight = 900
const boardWidth = 1200

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)

board = document.getElementById('game-board-1')
boardTop = window.getComputedStyle(board).getPropertyValue("top").replace("px", "")
boardLeft = window.getComputedStyle(board).getPropertyValue("left").replace("px", "")



if(!interval){
    interval = setInterval(gameLogic, 200)
   
}


function moveDown(element){
    
    let elemStyle = window.getComputedStyle(element)
    let topValue = elemStyle.getPropertyValue("top").replace("px", "")
    
    let bottomValue = Number(topValue) + 2 * Number(rem)
    
    if (bottomValue <= boardHight) {
        element.style.top = (Number(topValue) + 10) + "px"
    }
   
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
        
        moveDown(snakeHead)
    }else if(direction === "up"){
    
        moveUp(snakeHead)
    }else if(direction === "right"){
     
        moveRight(snakeHead)
    }else if(direction === "left"){
     
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

