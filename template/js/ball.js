import { variables } from "./variables.js"
import { checkCollisions } from "./script.js"

export const grid = document.querySelector('.grid')


// export let ballCurrentPosition = [...ballStart]

//draw the ball
export function drawBall() {
    ball.style.left = variables.ballCurrentPosition[0] + 'px'
    ball.style.bottom = variables.ballCurrentPosition[1] + 'px'
}

//add ball
const ball = document.createElement('ball')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

export function moveBall() {
    if (variables.game_start == true) {
        variables.ballCurrentPosition[0] += variables.xDirection
        variables.ballCurrentPosition[1] += variables.yDirection
        drawBall()
        checkCollisions()
    }
} 