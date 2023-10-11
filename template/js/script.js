import { variables } from "./variables.js"
import { startGame, stopGame } from "./time.js"


document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        variables.left = true
    } else if (event.key == 'ArrowRight') {
        variables.right = true
    }
})

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        variables.left = false
    } else if (event.key == 'ArrowRight') {
        variables.right = false
    }
})

document.querySelector('#pause').onclick = function () {
    if (variables.isPaused == false && variables.game_over == false && variables.game_start == false) {
        variables.game_over = false
        variables.game_start = true
        startGame()
    } else if (variables.isPaused == false && variables.game_over == false && variables.game_start == true) {
        stopGame()
    } else if (variables.isPaused == true && variables.game_over == false && variables.game_start == true) {
        startGame()
    }
}

document.querySelector('#reset').onclick = function () {
    window.document.location.reload()
}
