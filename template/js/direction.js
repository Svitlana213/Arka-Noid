import { variables } from "./variables.js"

//change direction
function changeDirection() {
    if (variables.xDirection === -3 && variables.yDirection === -3) {
        variables.yDirection = 3
        return
    }
    if (variables.xDirection === 3 && variables.yDirection === 3) {
        variables.yDirection = -3
        return
    }
    if (variables.xDirection === 3 && variables.yDirection === -3) {
        variables.xDirection = -3
        return
    }

    if (variables.xDirection === -3 && variables.yDirection === 3) {
        variables.xDirection = 3
        return
    }
}