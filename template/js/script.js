const grid = document.querySelector('.grid')
const allblocks_div = document.querySelector('.allblocks')
const scoreDisplay = document.querySelector('#score')
const live = document.querySelector('#lives')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let isPaused = false
let lives = 3
let game_over = false
let game_reset = true
let game_start = false
let left = false
let right = false

let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

//create Block
class Block {
    //metric system for the blocks
    constructor(x, y) {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

//all blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//draw a blockdocument.querySelector('#reset').onclick = function(){

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
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
        if (currentPosition[0] < boardWidth - blockWidth) {
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
    if (event.key === ' ') {
        game_start = true
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

    if (game_over == false) {
        if (isPaused == false) {
            moveBall()
            moveUser()
        }
    }

    if (game_over == true) {
        document.querySelector('#pause').disabled = true
    }
}

let animationId = requestAnimationFrame(frameAnimation)

document.querySelector('#pause').onclick = function () {
    if (isPaused == false) {
        pause.innerHTML = "Continue"
    } else {
        pause.innerHTML = "Pause"
    }
    isPaused = !isPaused // isPaused = true
}

document.querySelector('#reset').onclick = function () {
    window.document.location.reload()
}

//check for collisios
function checkCollisions() {
    //check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
            )
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = 'Score: ' + score

            //check for win
            if (blocks.length === 0) {
                game_over = true
                scoreDisplay.innerHTML = 'You win. Your score: ' + score
                document.removeEventListener('keydown', moveUser)
                return
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
        xDirection = -2
        yDirection = 2
        cancelAnimationFrame(animationId)
        if (lives >= 0) {
            live.innerHTML = 'Lives: ' + lives
            // animationId = requestAnimationFrame(checkCollisions);
        }
        if (lives == 0) {
            game_over = true
            scoreDisplay.innerHTML = "Game over. Your score: " + score
            document.removeEventListener('keydown', moveUser)
            return
        }
    }

}


//change direction
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }

}