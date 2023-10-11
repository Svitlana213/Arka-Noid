export const variables = {
    blockWidth: 100,
    blockHeight: 20,
    padleWidth: 90,
    padleHeight: 20,
    ballDiameter: 20,
    boardWidth: 560,
    boardHeight: 460,

    isPaused: false,
    game_start: false,
    // game_reset: true,
    game_over: false,
    left: false,
    right: false,

    timerId: 0,
    xDirection: -3,
    yDirection: 3,
    lives: 3,
    score: 0,
    time: 0,
    interval: 0,
    currentLevel: 0,

    get userStart() {
        return [(this.boardWidth / 2) - (this.padleWidth / 2) + 5, this.boardHeight - (this.boardHeight - 10)]
    },
    get ballStart() {
        return [(this.boardWidth / 2) - (this.ballDiameter / 2) + 5, this.boardHeight - (this.boardHeight - 40)]
    }
}

export const position = {
    currentPosition: [...variables.userStart],
    ballCurrentPosition: [...variables.ballStart]
}