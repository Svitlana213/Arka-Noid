import { variables, position } from "./variables.js"

export const grid = document.querySelector('.grid')


//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
export function drawUser() {
    user.style.left = position.currentPosition[0] + 'px'
    user.style.bottom = position.currentPosition[1] + 'px'
}

//move user
export function moveUser() {

    if (variables.left == true) {
        if (position.currentPosition[0] > 0) {
            position.currentPosition[0] -= 10
        }
    }

    if (variables.right == true) {
        if (position.currentPosition[0] < variables.boardWidth - variables.padleWidth) {
            position.currentPosition[0] += 10
        }
    }

    if (position.currentPosition[0] >= variables.boardWidth - variables.padleWidth) {
        position.currentPosition[0] = variables.boardWidth - variables.padleWidth - 2
    }

    if (position.currentPosition[0] < 0) {
        position.currentPosition[0] = 0
    }
    
    drawUser()
}