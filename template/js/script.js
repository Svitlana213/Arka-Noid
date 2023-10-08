import { variables, ballStart, userStart } from "./variables.js"
import { blocks, addBlocks } from "./blocks.js"
import { startTime, stopTime } from "./time.js"
import { drawBall, moveBall, } from "./ball.js"
import { drawUser, moveUser } from "./user.js"



const scoreDisplay = document.querySelector('#score')
const live = document.querySelector('#lives')
const level = document.querySelector('#level')

export const userStart = [(variables.boardWidth / 2) - (variables.padleWidth / 2) + 5, variables.boardHeight - (variables.boardHeight - 10)]
export const ballStart = [(variables.boardWidth / 2) - (variables.ballDiameter / 2) + 5, variables.boardHeight - (variables.boardHeight - 40)]

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        variables.left = true
    } else if (event.key == 'ArrowRight') {
        variables.right = true
    }
    if (event.key === ' ' && variables.game_start === false) {
        variables.game_start = true
        variables.game_over = false
        startTime()
        document.querySelector('#pause').disabled = false
    }
})

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        variables.left = false
    } else if (event.key == 'ArrowRight') {
        variables.right = false
    }
})
function frameAnimation() {
    requestAnimationFrame(frameAnimation)
    if (variables.game_start == true) {
        if (variables.game_over == false) {
            if (variables.isPaused == false) {
                moveBall()
                moveUser()
            }
        }
    }
    if (variables.game_over == true) {
        document.querySelector('#pause').disabled = true
    }
}

let animationId = requestAnimationFrame(frameAnimation)

document.querySelector('#pause').onclick = function () {
    variables.isPaused = !variables.isPaused // isPaused = true змінюємо значення змінної
    if (variables.isPaused == true) {
        pause.innerHTML = "Continue"
        stopTime()
        console.log(isPaused)

    } else if (variables.isPaused == false) {
        pause.innerHTML = "Pause"
        startTime()
        console.log(isPaused)
    }
}

document.querySelector('#reset').onclick = function () {
    window.document.location.reload()
}

//check for collisios
export function checkCollisions() {
    //check for block collisions
    for (let i = 0; i < blocks[variables.currentLevel].length; i++) {
        const block = blocks[variables.currentLevel][i];
        const { bottomLeft, topLeft, topRight } = block;

        if (
            variables.ballCurrentPosition[1] <= topRight[1] &&
            variables.ballCurrentPosition[1] + variables.ballDiameter >= bottomLeft[1] &&
            variables.ballCurrentPosition[0] + variables.ballDiameter >= topLeft[0] &&
            variables.ballCurrentPosition[0] <= topRight[0]
        ) {
            // Collided with the block from the left or right
            variables.xDirection = -variables.xDirection;
            variables.yDirection = -variables.yDirection;
            block.hit = true; // Add a property to the block object to keep track if it has been hit
        }

        if (block.hit) {
            // If the block was hit, remove it from the array and update the score
            const allBlocks = document.querySelectorAll('.block');
            allBlocks[i].classList.remove('block');
            blocks[variables.currentLevel].splice(i, 1);
            variables.score++
            scoreDisplay.innerHTML = 'Score: ' + variables.score

            // next level
            if (blocks[variables.currentLevel].length === 0) {
                variables.game_over = true
                variables.game_start = false
                variables.currentLevel++
                if (variables.currentLevel + 1 > blocks.length) {
                    variables.game_over = true
                    scoreDisplay.innerHTML = 'You win. Your score: ' + variables.score;
                    stopTime()
                    return
                } else {
                    level.innerHTML = 'Level: ' + (variables.currentLevel + 1)
                    addBlocks()
                    variables.currentPosition = [...userStart]
                    variables.ballCurrentPosition = [...ballStart]
                    drawBall()
                    drawUser()
                }
                document.removeEventListener('keydown', moveUser);
                stopTime();
                return;
            }
        }
    }

    //check for wall collisions
    if (variables.ballCurrentPosition[0] >= (variables.boardWidth - variables.ballDiameter) || variables.ballCurrentPosition[0] <= 0) {
        variables.xDirection = -variables.xDirection; // Invert ball's horizontal direction
    }
    if (variables.ballCurrentPosition[1] >= (variables.boardHeight - variables.ballDiameter)) {
        variables.ballCurrentPosition[1] = variables.boardHeight - variables.ballDiameter
        variables.yDirection = -variables.yDirection; // Invert ball's vertical direction
    }

    //check for user collisions
    if (
        (variables.ballCurrentPosition[0] + variables.ballDiameter >= variables.currentPosition[0] && variables.ballCurrentPosition[0] <= variables.currentPosition[0] + variables.blockWidth) &&
        (variables.ballCurrentPosition[1] + variables.ballDiameter >= variables.currentPosition[1] && variables.ballCurrentPosition[1] <= variables.currentPosition[1] + variables.blockHeight)
    ) {
        variables.ballCurrentPosition[1] = variables.currentPosition[1] + variables.padleHeight
        variables.yDirection = -variables.yDirection; // Invert ball's vertical direction
    }

    //check for game over
    if (variables.ballCurrentPosition[1] <= 0) {
        clearInterval(variables.timerId)
        variables.lives--
        variables.currentPosition = [...userStart]
        variables.ballCurrentPosition = [...ballStart]
        variables.xDirection = -3
        variables.yDirection = 3
        cancelAnimationFrame(animationId)

        if (variables.lives >= 0) {
            live.innerHTML = 'Lives: ' + variables.lives
        }
        if (variables.lives == 0) {
            variables.game_over = true
            scoreDisplay.innerHTML = "Game over. Your score: " + variables.score
            document.removeEventListener('keydown', moveUser)
            stopTime()
            return
        }
    }

}
//change direction
function changeDirection() {
    if (xDirection === -3 && yDirection === -3) {
        yDirection = 3
        return
    }
    if (xDirection === 3 && yDirection === 3) {
        yDirection = -3
        return
    }
    if (xDirection === 3 && yDirection === -3) {
        xDirection = -3
        return
    }
    if (xDirection === -3 && yDirection === 3) {
        xDirection = 3
        return
    }

}