const grid = document.querySelector('.grid')
const allblocks_div = document.querySelector('.allblocks')
const scoreDisplay = document.querySelector('#score')
const live = document.querySelector('#lives')
const timeStart = document.querySelector('#timer')
const level = document.querySelector('#level')

const blockWidth = 100
const blockHeight = 20
const padleWidth = 90
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 460

let isPaused = false
let game_start = false
let game_reset = true
let game_over = false
let left = false
let right = false
// let startTimer = true

let timerId
let xDirection = -3
let yDirection = 3
let lives = 3
let score = 0
let time = 0
let interval
let currentLevel = 0
let maxLevel = 2

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [265, 40]
let ballCurrentPosition = ballStart

class Block {
    constructor(x, y) {
        this.bottomLeft = [x * (blockWidth + 9) + 9, y * (blockHeight + 7) + 210]
        this.bottomRight = [x * (blockWidth + 9) + 9 + blockWidth, y * (blockHeight + 7) + 210]
        this.topLeft = [x * (blockWidth + 9) + 9, y * blockHeight + 210 + (blockHeight + 7)]
        this.topRight = [x * (blockWidth + 9) + 9 + blockWidth, y * (blockHeight + 7) + 210 + blockHeight]

    }
}

const blocks = [
    [
        new Block(1, 8)
    ],
    [
        new Block(1, 8),
        new Block(1, 7),

        new Block(2, 8),
        new Block(2, 7),
        new Block(2, 6),

        new Block(3, 8),
        new Block(3, 7),
    ],
    [
        new Block(0, 8),
        new Block(0, 7),
        new Block(0, 6),
        new Block(0, 5),

        new Block(2, 8),
        new Block(2, 7),
        new Block(2, 6),

        new Block(3, 8),
        new Block(3, 6),

        new Block(4, 8),
        new Block(4, 7),

    ]
]

//draw a block
function addBlocks() {
    for (let i = 0; i < blocks[currentLevel].length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[currentLevel][i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[currentLevel][i].bottomLeft[1] + 'px'
        allblocks_div.appendChild(block)
    }
}
addBlocks()


//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move user
function moveUser() {
    if (left == true) {
        if (currentPosition[0] > 0) {
            currentPosition[0] -= 10
        }
    }
    if (right == true) {
        if (currentPosition[0] < boardWidth - padleWidth - 1) {
            currentPosition[0] += 10
        }
    }
    drawUser()
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        left = true
    } else if (event.key == 'ArrowRight') {
        right = true
    }
    if (event.key === ' ' && game_start === false) {
        game_start = true
        game_over = false
        startTime()
    }
})

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        left = false
    } else if (event.key == 'ArrowRight') {
        right = false
    }
})

//add ball
const ball = document.createElement('ball')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

function moveBall() {
    if (game_start == true) {
        ballCurrentPosition[0] += xDirection
        ballCurrentPosition[1] += yDirection
        drawBall()
        checkCollisions()
    }
}

function frameAnimation() {
    requestAnimationFrame(frameAnimation)

    if (game_start == true) {
        if (game_over == false) {
            if (isPaused == false) {
                moveBall()
                moveUser()
                // hideButton()
            }
        }
    }
    if (game_over == true) {
        document.querySelector('#pause').disabled = true
    }
}

let animationId = requestAnimationFrame(frameAnimation)

document.querySelector('#pause').onclick = function () {
    isPaused = !isPaused // isPaused = true змінюємо значення змінної
    if (isPaused == true) {
        pause.innerHTML = "Continue"
        stopTime()
        console.log(isPaused)

    } else if (isPaused == false) {
        pause.innerHTML = "Pause"
        startTime()
        console.log(isPaused)
    }
}

document.querySelector('#reset').onclick = function () {
    window.document.location.reload()
}

function startTime() {
    interval = setInterval(updateTime, 1000)
    console.log("startTime")
    console.log(interval)
}

function updateTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeStart.innerHTML = 'Time: ' + `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    time++
}

function stopTime() {
    clearInterval(interval)
    console.log("stop")
    console.log(interval)
}

// function showButton(){
//     const nextLevel = document.querySelector('#next_level')
//     nextLevel.classList.remove("hidden")
// }

// function hideButton(){
//     const nextLevel = document.querySelector('#next_level')
//     nextLevel.classList.add("hidden")
// }

// function newLevel(){
//     let isLevelDone = true
//     for (let i = 0; i < blocks.length; i++){
//         isLevelDone = isLevelDone
//     }
//     if (isLevelDone){
//         if(currentLevel >= maxLevel){
//             game_over = true
//             return
//         }
//     }
//     currentLevel++ 
//     // hideButton()
// }

//check for collisios
function checkCollisions() {
    //check for block collisions
    for (let i = 0; i < blocks[currentLevel].length; i++) {
        const block = blocks[currentLevel][i];
        const { bottomLeft, bottomRight, topLeft, topRight } = block;
        const ballCenterX = ballCurrentPosition[0] + ballDiameter / 2;
        const ballCenterY = ballCurrentPosition[1] + ballDiameter / 2;

        if (
            ballCenterX >= bottomLeft[0] &&
            ballCenterX <= bottomRight[0] &&
            ballCurrentPosition[1] <= bottomLeft[1] &&
            ballCurrentPosition[1] + ballDiameter >= topLeft[1]
        ) {
            // Collided with the block from the top or bottom
            yDirection *= -1;
            block.hit = true; // Add a property to the block object to keep track if it has been hit
        }

        if (
            ballCenterY >= topLeft[1] &&
            ballCenterY <= bottomLeft[1] &&
            ballCurrentPosition[0] + ballDiameter >= topLeft[0] &&
            ballCurrentPosition[0] <= topRight[0]
        ) {
            // Collided with the block from the left or right
            xDirection *= -1;
            block.hit = true; // Add a property to the block object to keep track if it has been hit
        }

        if (block.hit) {
            // If the block was hit, remove it from the array and update the score
            const allBlocks = document.querySelectorAll('.block');
            allBlocks[i].classList.remove('block');
            blocks[currentLevel].splice(i, 1);
            score++;
            scoreDisplay.innerHTML = 'Score: ' + score;

            // next level
            if (blocks[currentLevel].length === 0) {
                game_over = true
                game_start = false
                // scoreDisplay.innerHTML = 'You win. Your score: ' + score;
                currentLevel++
                addBlocks()
                // showButton()
                document.removeEventListener('keydown', moveUser);
                stopTime();
                return;
            }
        }
    }

    //check for wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[1] >= (boardHeight - ballDiameter) || ballCurrentPosition[0] <= 0) {
        changeDirection()
    }

    //check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) && (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    //check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        lives--
        xDirection = -3
        yDirection = 3
        cancelAnimationFrame(animationId)
        if (lives >= 0) {
            live.innerHTML = 'Lives: ' + lives
        }
        if (lives == 0) {
            game_over = true
            scoreDisplay.innerHTML = "Game over. Your score: " + score
            document.removeEventListener('keydown', moveUser)
            stopTime()
            // showButton()
            return
        }
    }

}
//change direction
function changeDirection() {
    if (xDirection === 3 && yDirection === 3) {
        yDirection = -3
        return
    }
    if (xDirection === 3 && yDirection === -3) {
        xDirection = -3
        return
    }
    if (xDirection === -3 && yDirection === -3) {
        yDirection = 3
        return
    }
    if (xDirection === -3 && yDirection === 3) {
        xDirection = 3
        return
    }

}