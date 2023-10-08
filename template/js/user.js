import { variables } from "./variables.js"
import { grid } from "./ball.js"

// export let currentPosition = [...userStart]

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
export function drawUser() {
    user.style.left = variables.currentPosition[0] + 'px'
    user.style.bottom = variables.currentPosition[1] + 'px'
}

//move user
export function moveUser() {
    if (variables.left == true) {
        if (variables.currentPosition[0] > 0) {
            variables.currentPosition[0] -= 10
        }
    }
    if (variables.right == true) {
        if (variables.currentPosition[0] < variables.boardWidth - variables.padleWidth) {
            variables.currentPosition[0] += 10
        }
    }
    drawUser()
}