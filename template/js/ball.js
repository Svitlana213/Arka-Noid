import { variables } from "./variables.js"
import { checkCollisions } from "./script.js"
import { variables, position } from "./variables.js"
import { checkCollisions } from "./checkCollisions.js"
import { grid } from "./user.js"


// export let ballCurrentPosition = [...ballStart]

//draw the ball
export function drawBall() {
    ball.style.left = position.ballCurrentPosition[0] + 'px'
    ball.style.bottom = position.ballCurrentPosition[1] + 'px'
}

//add ball
const ball = document.createElement('ball')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

export function moveBall() {
    if (variables.game_start == true) {
        position.ballCurrentPosition[0] += variables.xDirection
        position.ballCurrentPosition[1] += variables.yDirection
        drawBall()
        checkCollisions()
    }
} 