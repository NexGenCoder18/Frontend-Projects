let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("music/food.mp3");
let gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
let backgroundMusic = new Audio("music/music.mp3");
let score = 0;
let speed = 15;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 7 }];
let gridSize = 25; // Define grid size for consistency
food = { x: 17, y: 11 };

// game functions
function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;
  gameEngine();
}

function isCollide(snake) {
  // if you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  
  // if you bump into the wall
  if (
    snake[0].x >= gridSize || // Right wall
    snake[0].x < 0 || // Left wall
    snake[0].y >= gridSize || // Bottom wall
    snake[0].y < 0 // Top wall
  ) {
    return true;
  }
}

function gameEngine() {
  // Part 1: Updating the snake array
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    backgroundMusic.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over.");
    snakeArr = [{ x: 13, y: 15 }];
    backgroundMusic.play(); // Corrected typo from musicSound
    score = 0;
  }
  
  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 0;
    let b = gridSize - 1; // Use gridSize for boundaries
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  
  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  
  // Part 2: Display the snake and food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y + 1; // Adjust for 1-based grid index
    snakeElement.style.gridColumnStart = e.x + 1;
    
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("body");
    }
    
    board.appendChild(snakeElement);
  });
  
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y + 1; // Adjust for 1-based grid index
  foodElement.style.gridColumnStart = food.x + 1;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// main logic starts
window.requestAnimationFrame(main);
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  backgroundMusic.play();
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
      
      case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
        break;
        
        case "ArrowLeft":
          inputDir.x = -1;
          inputDir.y = 0;
          break;
          
          case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    default:
      break;
  }
});
