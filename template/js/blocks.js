import { variables } from "./variables.js"

const allblocks_div = document.querySelector('.allblocks')

class Block {
    constructor(x, y) {
        this.bottomLeft = [x * (variables.blockWidth + 9) + 9, y * (variables.blockHeight + 7) + 210]
        this.bottomRight = [x * (variables.blockWidth + 9) + 9 + variables.blockWidth, y * (variables.blockHeight + 7) + 210]
        this.topLeft = [x * (variables.blockWidth + 9) + 9, y * variables.blockHeight + 210 + (variables.blockHeight + 7)]
        this.topRight = [x * (variables.blockWidth + 9) + 9 + variables.blockWidth, y * (variables.blockHeight + 7) + 210 + variables.blockHeight]
    }
}
export const blocks = [
    [
        new Block(1, 8)
    ],
    [
        new Block(1, 8),
        new Block(1, 7),
        new Block(2, 8),
        new Block(2, 7),
        new Block(2, 6),
        new Block(3, 8),
        new Block(3, 7),
    ],
    [
        new Block(0, 8),
        new Block(0, 7),
        new Block(0, 6),
        new Block(0, 5),
        new Block(1, 8),
        new Block(1, 7),
        new Block(1, 6),
        new Block(3, 8),
        new Block(3, 6),
        new Block(4, 8),
        new Block(4, 7),
    ]
]
//draw a block
export function addBlocks() {
    for (let i = 0; i < blocks[variables.currentLevel].length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[variables.currentLevel][i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[variables.currentLevel][i].bottomLeft[1] + 'px'
        allblocks_div.appendChild(block)
    }
}
addBlocks()