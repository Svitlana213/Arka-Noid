import { variables } from "./variables.js"
import { moveBall } from "./ball.js"
import { moveUser } from "./user.js"

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
export let animationId = requestAnimationFrame(frameAnimation)