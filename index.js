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
let gameOver = false
let gameOverButton
let gameOverDescription
let gameScore

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
    interval = setInterval(gameLogic, 300)
   
}

function gameRestart (){
    location.reload()
}

function gameOverScreen (){
    if (gameOver && !gameOverButton){
        createGameOverButton()
        createGameOverDescription()
        createGameOverScore()
    }
}


function createGameOverButton() {

    gameOverButton = document.createElement("button")
    gameOverButton.style.position = "absolute"
    gameOverButton.style.cursor = "pointer"
    gameOverButton.textContent = "Restart"
    gameOverButton.style.left = boardWidth/2
    gameOverButton.style.top = boardHight/2 + rem
    gameOverButton.style.padding = 0.5 * rem

    document.body.appendChild(gameOverButton)
}


function createGameOverDescription() {

    gameOverDescription = document.createElement("h1")
    gameOverDescription.style.position = "absolute"
    gameOverDescription.textContent = "U DIEDD"
    gameOverDescription.style.color = "black"
    gameOverDescription.style.fontSize = 6*rem
    gameOverDescription.style.left = boardWidth/2 - 10*rem
    gameOverDescription.style.top = boardHight/2 - 150
    gameOverButton.onclick = () =>  gameRestart()

    document.body.appendChild(gameOverDescription)
}


function createGameOverScore() {

    gameScore = document.createElement("h1")
    gameScore.style.position = "absolute"
    gameScore.textContent = `Your score is ${score}`
    gameScore.fontSize = 2*rem
    gameScore.style.left = boardWidth/2 - 4*rem
    gameScore.style.top = boardHight/2 + 40

    document.body.appendChild(gameScore)
}


function foodColisionDetection (snakeSegment){
    let snakeLeftPos = window.getComputedStyle(snakeSegment).left.replace("px", "")
    snakeLeftPos = Number(snakeLeftPos)
    let snakeRightPos = snakeLeftPos + 32
    
    let snakeTopPos = window.getComputedStyle(  snakeSegment).top.replace("px", "")
    snakeTopPos = Number(snakeTopPos)
    let snakeBottomPos = snakeTopPos + 32

    let foodLeftPos = window.getComputedStyle(foodItem).left.replace("px", "")
    foodLeftPos = Number(foodLeftPos)
    let foodRightPos = foodLeftPos + 16

    let foodTopPos = window.getComputedStyle(foodItem).top.replace("px", "")
    foodTopPos = Number(foodTopPos)
    let foodBottomPos = foodTopPos + 16
    
    if (!(snakeRightPos < foodLeftPos || snakeLeftPos > foodRightPos || snakeBottomPos < foodTopPos || snakeTopPos > foodBottomPos)){
        foodExistance=false
        foodManagment()
        return true
    }
}


function checkIfFoodColideWithSnake(){
    for (segment in snakeSegments){
        
        if (foodColisionDetection(snakeSegments[segment])){
            break
        }
        
    }
}


function foodManagment () {
    if (foodItem ) {
        moveFood() 
    }else {
        createFoodElement()  
    }
}


function moveFood() {
    foodItem.style.top =  (Math.random() * (boardBorderDown - boardBorderUp - 90) + boardBorderUp + 90) + 'px'
    foodItem.style.left =  (Math.random() * (boardBorderRight - boardBorderLeft - 90) + boardBorderLeft + 90) + 'px'
    
    foodExistance = true
    checkIfFoodColideWithSnake()
}


function createFoodElement() {
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
    checkIfFoodColideWithSnake()   
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
    } else {
        snakeSegments.unshift(elementToMove)
        gameOver = true
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
    } else {
        snakeSegments.unshift(elementToMove)
        gameOver = true
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
    } else {
        snakeSegments.unshift(elementToMove)
        gameOver = true
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
    } else {
        snakeSegments.unshift(elementToMove)
        gameOver = true
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
    if (gameOver){
        console.log("Game Over")
        gameOverScreen()
        return
    }

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
        foodManagment()
        
    }
    moveDirections()
    // createFoodElement()
    if (foodColisionDetection(snakeSegments[0])){
        newSnakeElement()
        checkIfFoodColideWithSnake()
    }
}



