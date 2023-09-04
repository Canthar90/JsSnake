let interval
let direction


if(!interval){
    interval = setInterval(gameLogic, 300)
}


function moveDown(){}

function moveUp(){}

function moveRight(){}

function moveLeft(){}

function moveDirections() {
    if (direction === "down"){
        moveDown()
    }else if(direction === "up"){
        moveUp()
    }else if(direction === "right"){
        moveRight()
    }else if(direction === "left"){
        moveLeft()
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

