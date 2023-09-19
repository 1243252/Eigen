// selects the first HTML element with the class name "play-board" and assigns it to the 
// "playBoard" variable. The selected element is typically an element that represents the game board
// in the web application
const playBoard = document.querySelector(".play-board");

//same shit here. selects the first HTML element with the class-name "score" and "high-score" and
//assigns it to the two variables
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

//selects ALL HTML elements that have the class name "controls" and the descendant <i>-elements
//selected elements are stored in a NodeList
const controls = document.querySelectorAll(".controls i");

//variable tracks if game is over (true or false)
let gameOver = false;

// this two variables represent the x- and y-coordinate of the food item in the game
let foodX, foodY;

//this 2 variables determine the snake´s starting position on the game board
let snakeX = 10, snakeY = 10;

//represent the current movement direction of the snake along x and y axis
// Initially the snake is not moving (=0)
let velocityX = 0, velocityY =0;

//the array stores the elements of the snake body
//as the snake eats food, this array will be filled
let snakeBody = [];

// stores ID which is returned by setInterval
//often used to control game loops and update game logic at regular intervals
let setIntervalId;

// score starts at 0 and will change with the number of food eaten
let score = 0;

// get high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High-Score: ${highScore}`;

//function for updating the food position randomly with random a random between 1 and 30 as food position
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// handles the game Over 
const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

//change velocity value based on key press
// "e" represents the keyboard event key press
// "===" means "strict equality"; it compares two values for equality and the same data type
// "&&" is a logical AND operator and is used for multiple conditions
//"&&" ensures that all conditions must be true so that the overall condition can be true
const changeDirection = e =>{
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

//Change Direction on each key click
controls.forEach(button => button.addEventListener("click", () => changeDirection({key: button.dataset.key})));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY}  / ${foodX}"></div>`;

    //When snake eat food
    if(snakeX === foodX && snakeY === foodY){
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); //Add food to snake body array
        score++;
        highScore = score >= highScore ? score : highScore; //if score > high score => high score = score

        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    //Update Snake Head
    snakeX += velocityX;
    snakeY += velocityY;

    //Shifting forward values of elements in snake body by one
    for(let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    //Check snake body is out of wall or no
    // "||" is a logical OR operator
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        return gameOver = true;
    }

    //Add div for each part of snake body
    for(let i = 0; i < snakeBody.length; i++){ //this is a loop that iterates through the elements of the "snakebody"-array

        //with each iteration, an HTML div-element with the class "head" will append to the html-string
        //"style"-attribute sets the CSS "grid-area" property for positioning the snake´s body segment
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;


        //CHeck snake head hit body or no
        //it compares the coordinates of the X-/Y-coordinates of the head with thoes of the segments
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);

