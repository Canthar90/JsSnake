let interval
let direction
let board 
let boardPos 
let boardTop
let boardLeft
let snakeHead = document.getElementById("snake-segment-1")
let snakeSegments = [snakeHead]
let score = 0
let foodExistance = false
let foodItem

const boardHight = 900
const boardWidth = 1200

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)

board = document.getElementById('game-board-1')
boardTop = window.getComputedStyle(board).getPropertyValue("top").replace("px", "")
boardLeft = window.getComputedStyle(board).getPropertyValue("left").replace("px", "")

const boardBorderDown = boardHight - Number(boardTop)
const boardBorderUp = Number(boardTop)
const boardBorderRight = boardWidth - Number(boardLeft)
const boardBorderLeft = Number(boardLeft)



if(!interval){
    interval = setInterval(gameLogic, 450)
   
}

function foodColisionDetection (){
    let snakeHeadLeftPos = window.getComputedStyle(snakeSegments[0]).left.replace("px", "")
    snakeHeadLeftPos = Number(snakeHeadLeftPos)
    let snakeHeadRightPos = snakeHeadLeftPos + 32
    
    let snakeHeadTopPos = window.getComputedStyle(snakeSegments[0]).top.replace("px", "")
    snakeHeadTopPos = Number(snakeHeadTopPos)
    let snakeHeadBottomPos = snakeHeadTopPos + 32

    let foodLeftPos = window.getComputedStyle(foodItem).left.replace("px", "")
    foodLeftPos = Number(foodLeftPos)
    let foodRightPos = foodLeftPos + 16

    let foodTopPos = window.getComputedStyle(foodItem).top.replace("px", "")
    foodTopPos = Number(foodTopPos)
    let foodBottomPos = foodTopPos + 16
    
    if (!(snakeHeadRightPos < foodLeftPos || snakeHeadLeftPos > foodRightPos || snakeHeadBottomPos < foodTopPos || snakeHeadTopPos > foodBottomPos)){
        createFoodElement()
        newSnakeElement()
    }
}


function createFoodElement () {
    if (foodItem) {
        foodItem.style.top =  (Math.random() * (boardBorderDown - boardBorderUp - 90) + boardBorderUp + 90) + 'px'
        foodItem.style.left =  (Math.random() * (boardBorderRight - boardBorderLeft - 90) + boardBorderLeft + 90) + 'px'
    }else {
        foodItem = document.createElement("div")
        foodItem.id = `food`
        foodItem.style.backgroundColor = "red"
        foodItem.style.width = rem
        foodItem.style.height = rem
        foodItem.style.position = "absolute"
        
        foodItem.style.top =  (Math.random() * (boardBorderDown - boardBorderUp) + boardBorderUp) + 'px'
        foodItem.style.left =  (Math.random() * (boardBorderRight - boardBorderLeft) + boardBorderLeft) + 'px'
        
        board.appendChild(foodItem)
        document.body.appendChild(foodItem)
        
        foodExistance = true
    }

    
}


function newSnakeElement() {
    score ++
    
    let newElement = snakeSegments[0].cloneNode(true)
    newElement.id = `snake-element-${score}`
    
    snakeSegments.push(newElement)
  
    snakeSegments[0].after(newElement)
}


function moveDown(element){
    
    let elemStyle = window.getComputedStyle(element)
    let topValue = elemStyle.getPropertyValue("top").replace("px", "")
    
    let leftCorrectionValue = elemStyle.getPropertyValue("left")
    
    let bottomValue = Number(topValue) + 2 * Number(rem)
    let elementToMove = snakeSegments.pop()
    
    if (bottomValue < boardHight - Number(boardTop)) {
        elementToMove.style.top = (Number(topValue) + 2*Number(rem)) + "px"
        elementToMove.style.left = leftCorrectionValue
        snakeSegments.unshift(elementToMove)
    }
}


function moveUp(element){
    let elementStyle = window.getComputedStyle(element)
    let topValue = elementStyle.getPropertyValue("top").replace("px","")

    let leftCorrectionValue = elementStyle.getPropertyValue("left")

    let elementToMove = snakeSegments.pop()

    if(Number(topValue) >= Number(boardTop)){
        elementToMove.style.top = (Number(topValue) - 2*Number(rem)) + "px"
        elementToMove.style.left = leftCorrectionValue
        snakeSegments.unshift(elementToMove)
    }
}


function moveRight(element){
    let elementStyle = window.getComputedStyle(element)
    let leftValue = elementStyle.getPropertyValue("left").replace("px","")

    let topCorrectionValue = elementStyle.getPropertyValue("top")

    let rightValue = Number(leftValue) + 2 * Number(rem)
    let elementToMove = snakeSegments.pop()
    
    if (rightValue <= boardWidth - Number(boardLeft)){
        elementToMove.style.left = (Number(leftValue) + 2*Number(rem)) + "px"
        elementToMove.style.top = topCorrectionValue
        snakeSegments.unshift(elementToMove)
    }
}


function moveLeft(element){
    let elementStyle = window.getComputedStyle(element)
    let leftValue = elementStyle.getPropertyValue("left").replace("px","")

    let topCorrectionValue = elementStyle.getPropertyValue("top")

    let elementToMove = snakeSegments.pop()

    if (Number(leftValue) >= Number(boardLeft)){
        elementToMove.style.left = (Number(leftValue) - 2*Number(rem)) + "px"
        elementToMove.style.top = topCorrectionValue
        snakeSegments.unshift(elementToMove)
    }
}


function moveDirections() {
    let snakeFirtsSegment = snakeSegments[0]
    
    if (direction === "down"){
        
        moveDown(snakeFirtsSegment)
    }else if(direction === "up"){
    
        moveUp(snakeFirtsSegment)
    }else if(direction === "right"){
     
        moveRight(snakeFirtsSegment)
    }else if(direction === "left"){
     
        moveLeft(snakeFirtsSegment)
    }else{
        return
    }
}


function gameLogic () {
    document.addEventListener('keydown', (event)=>{
        
        if (event.key === "ArrowDown" && direction !== 'down' && direction !== "up"){
            direction = "down"
            
        }else if (event.key === "ArrowUp" && direction !== "up" && direction !== "down"){
            direction = "up"
            
        }else if (event.key === "ArrowLeft" && direction !== "left" && direction !== "right"){
            direction = "left"
            
        }else if (event.key === "ArrowRight" && direction !== "right" && direction !== "left"){
            direction = "right"
            
        }

    })

    if (!foodExistance) {
        createFoodElement()
        
    }
    moveDirections()
    // createFoodElement()
    foodColisionDetection()
}

// newSnakeElement()
// newSnakeElement()

