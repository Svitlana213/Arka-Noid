import { variables } from "./variables.js"

const timeStart = document.querySelector('#timer')

export function startTime() {
    variables.interval = setInterval(updateTime, 1000)
}

function updateTime() {
    const minutes = Math.floor(variables.time / 60)
    const seconds = variables.time % 60
    timeStart.innerHTML = 'Time: ' + `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    variables.time++
}

export function stopTime() {
    clearInterval(variables.interval)
}

export function startGame() {
    pause.innerHTML = "Pause"
    variables.isPaused = false
    startTime()
}

export function stopGame() {
    pause.innerHTML = "Continue"
    variables.isPaused = true
    stopTime()
}