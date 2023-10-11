import { variables, position } from "./variables.js"
import { blocks, addBlocks } from "./blocks.js"
import { drawBall } from "./ball.js"
import { drawUser, moveUser } from "./user.js"
import { animationId } from "./animation.js"
import { stopGame } from "./time.js"

const scoreDisplay = document.querySelector('#score')
const live = document.querySelector('#lives')
const level = document.querySelector('#level')
const pausebtn = document.getElementById('pause')

export function checkCollisions() {
    //check for block collisions
    for (let i = 0; i < blocks[variables.currentLevel].length; i++) {
        const block = blocks[variables.currentLevel][i]
        const { bottomLeft, topLeft, topRight } = block
        if (
            position.ballCurrentPosition[1] <= topRight[1] &&
            position.ballCurrentPosition[1] + variables.ballDiameter >= bottomLeft[1] &&
            position.ballCurrentPosition[0] + variables.ballDiameter >= topLeft[0] &&
            position.ballCurrentPosition[0] <= topRight[0]
        ) {
            // Collided with the block from the top or bottom
            variables.yDirection = -variables.yDirection
            block.hit = true; // Add a property to the block object to keep track if it has been hit
        }
        if (block.hit) {
            // If the block was hit, remove it from the array and update the score
            const allBlocks = document.querySelectorAll('.block')
            allBlocks[i].classList.remove('block')
            blocks[variables.currentLevel].splice(i, 1)
            variables.score++
            scoreDisplay.innerHTML = 'Score: ' + variables.score
            // next level
            if (blocks[variables.currentLevel].length === 0) {
                stopGame()
                pause.innerHTML = "Next level"
                variables.currentLevel++
                if (variables.currentLevel + 1 > blocks.length) {
                    variables.game_over = true
                    variables.game_start = false
                    scoreDisplay.innerHTML = 'You win. Your score: ' + variables.score
                    pausebtn.hidden = true
                    return
                } else {
                    level.innerHTML = 'Level: ' + (variables.currentLevel + 1)
                    addBlocks()
                    position.currentPosition = [...variables.userStart]
                    position.ballCurrentPosition = [...variables.ballStart]
                    drawBall()
                    drawUser()
                }
                document.removeEventListener('keydown', moveUser)
                return
            }
        }
    }

    //check for wall collisions
    if (position.ballCurrentPosition[0] >= (variables.boardWidth - variables.ballDiameter) || position.ballCurrentPosition[0] <= 0) {
        variables.xDirection = -variables.xDirection // Invert ball's horizontal direction
    }
    if (position.ballCurrentPosition[1] >= (variables.boardHeight - variables.ballDiameter)) {
        position.ballCurrentPosition[1] = variables.boardHeight - variables.ballDiameter
        variables.yDirection = -variables.yDirection // Invert ball's vertical direction
    }
    //check for user collisions
    if (
        (position.ballCurrentPosition[0] + variables.ballDiameter >= position.currentPosition[0] && position.ballCurrentPosition[0] <= position.currentPosition[0] + variables.blockWidth) &&
        (position.ballCurrentPosition[1] + variables.ballDiameter >= position.currentPosition[1] && position.ballCurrentPosition[1] <= position.currentPosition[1] + variables.blockHeight)
    ) {
        position.ballCurrentPosition[1] = position.currentPosition[1] + variables.padleHeight
        variables.yDirection = -variables.yDirection // Invert ball's vertical direction
    }
    //check for game over
    if (position.ballCurrentPosition[1] <= 0) {
        clearInterval(variables.timerId)
        variables.lives--
        position.currentPosition = [...variables.userStart]
        position.ballCurrentPosition = [...variables.ballStart]
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
            pausebtn.hidden = true
            return
        }
    }
}