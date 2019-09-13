import Snake from './snake.js'

export default class Game {
    snake = new Snake();
    gridSize = 40;
    blockSize;
    dimensions;
    context;
    gameInterval;
    apple;
    score;
    isRunning;

    constructor(canvasContext, dimensions) {
        this.context = canvasContext;
        this.dimensions = dimensions;
        this.blockSize = dimensions / this.gridSize

        document.addEventListener("keydown", (event) => {
            this.HandleKeyboardEvent(event);
        })

        this.restartGame();
    }

    restartGame(alphaBrain) {
        this.isRunning = true;
        this.score = 0;
        this.snake.init({ x: this.gridSize / 2, y: this.gridSize / 2 }, alphaBrain);
        this.apple = this.generateRandomPositionOnGrid()
    }

    HandleKeyboardEvent(event) {
        switch (event.keyCode) {
            case 37: {
                this.snake.moveLeft();
            }
                break;
            case 38: {
                this.snake.moveUp();
            }
                break;
            case 39: {
                this.snake.moveRight();
            }
                break;
            case 40: {
                this.snake.moveDown();
            }
                break;
        }
    }

    update() {
        if (this.isRunning) {
            this.snake.makeDecision([
                this.gridSize/this.snake.position.x,
                this.gridSize/2/Math.min(this.snake.position.x, this.snake.position.y),
                this.gridSize/this.snake.position.y,
                this.gridSize/2/Math.min(this.snake.position.y, this.gridSize - this.snake.position.x),
                this.gridSize/(this.gridSize - this.snake.position.x),
                this.gridSize/2/Math.min(this.gridSize - this.snake.position.x, this.gridSize - this.snake.position.y),
                this.gridSize/(this.gridSize - this.snake.position.y),
                this.gridSize/2/Math.min(this.snake.position.x, this.gridSize - this.snake.position.y),
                (this.apple.y === this.snake.position.y && this.apple.x <= this.snake.position.x) *this.gridSize,
                (Math.abs(this.apple.y - this.apple.x) === Math.abs(this.snake.position.y - this.snake.position.x) && this.apple.y < this.snake.position.y && this.apple.x < this.snake.position.x) * this.gridSize/2,
                (this.apple.x === this.snake.position.x && this.apple.y <= this.snake.position.y) * this.gridSize,
                (Math.abs(this.apple.y + this.apple.x) === Math.abs(this.snake.position.y + this.snake.position.x) && this.apple.y < this.snake.position.y && this.apple.x > this.snake.position.x) * this.gridSize/2,
                (this.apple.y === this.snake.position.y && this.apple.x >= this.snake.position.x) * this.gridSize,
                (Math.abs(this.apple.y - this.apple.x) === Math.abs(this.snake.position.y - this.snake.position.x) && this.apple.y > this.snake.position.y && this.apple.x > this.snake.position.x) * this.gridSize/2,
                (this.apple.x === this.snake.position.x && this.apple.y >= this.snake.position.y) * this.gridSize,
                (Math.abs(this.apple.y + this.apple.x) === Math.abs(this.snake.position.y + this.snake.position.x) && this.apple.y > this.snake.position.y && this.apple.x < this.snake.position.x) * this.gridSize/2,
                this.snake.tail.reduce((result, val) => result || (val.y === this.snake.position.y && val.x <= this.snake.position.x), false) * this.gridSize,
                this.snake.tail.reduce((result, val) => result || (Math.abs(val.y - val.x) === Math.abs(this.snake.position.y - this.snake.position.x) && val.y < this.snake.position.y && val.x < this.snake.position.x), false) * this.gridSize/2,
                this.snake.tail.reduce((result, val) => result || (val.x === this.snake.position.x && val.y <= this.snake.position.y), false) * this.gridSize,
                this.snake.tail.reduce((result, val) => result || (Math.abs(val.y + val.x) === Math.abs(this.snake.position.y - this.snake.position.x) && val.y < this.snake.position.y && val.x > this.snake.position.x), false) * this.gridSize/2,
                this.snake.tail.reduce((result, val) => result || (val.y === this.snake.position.y && val.x >= this.snake.position.x), false) * this.gridSize,
                this.snake.tail.reduce((result, val) => result || (Math.abs(val.y - val.x) === Math.abs(this.snake.position.y - this.snake.position.x) && val.y > this.snake.position.y && val.x > this.snake.position.x), false) * this.gridSize/2,
                this.snake.tail.reduce((result, val) => result || (val.x === this.snake.position.x && val.y >= this.snake.position.y), false) * this.gridSize,
                this.snake.tail.reduce((result, val) => result || (Math.abs(val.y + val.x) === Math.abs(this.snake.position.y - this.snake.position.x) && val.y > this.snake.position.y && val.x < this.snake.position.x), false) * this.gridSize/2,

            ])
            this.snake.updatePosition();

            if (this.checkAppleEaten()) {
                this.snake.grow();
                this.score += 10;
                this.apple = this.generateRandomPositionOnGrid();
            }
            if (!this.checkCollision() && this.snake.ttl >= 0) {
                //this.restartGame();
                this.draw();
            } else {
                this.isRunning = false;
            }
        }
    }

    draw() {

        this.context.fillStyle = "lime";
        this.context.fillRect(this.snake.position.x * this.blockSize, this.snake.position.y * this.blockSize, this.blockSize - 2, this.blockSize - 2)

        this.snake.tail.forEach(joint => {
            this.context.fillRect(joint.x * this.blockSize, joint.y * this.blockSize, this.blockSize - 2, this.blockSize - 2)
        })

        this.context.fillStyle = "red";
        this.context.fillRect(this.apple.x * this.blockSize, this.apple.y * this.blockSize, this.blockSize, this.blockSize)
    }

    checkCollision() {
        let pos = this.snake.position;
        let collision = pos.x < 0 || pos.x * this.blockSize > this.dimensions - this.blockSize || pos.y < 0 || pos.y * this.blockSize > this.dimensions - this.blockSize;

        this.snake.tail.forEach(joint => {
            if (this.snake.position.x === joint.x && this.snake.position.y === joint.y) {
                collision = true;
                console.log("snake killed himself", this.snake.length)
            }
        })

        return collision
    }

    checkAppleEaten() {
        return this.apple.x === this.snake.position.x && this.apple.y === this.snake.position.y
    }

    generateRandomPositionOnGrid() {
        let pos = { x: Math.floor(Math.random() * this.gridSize), y: Math.floor(Math.random() * this.gridSize) }
        while (this.isGeneratedOnSnake(pos)) {
            console.log('generated on snake, regenerating')
            pos = { x: Math.floor(Math.random() * this.gridSize), y: Math.floor(Math.random() * this.gridSize) }
        }

        return pos;
    }

    isGeneratedOnSnake(pos) {
        let isGeneratedOnSnake = false;
        this.snake.tail.forEach(joint => {
            if (joint.x === pos.x && joint.y === pos.y) {
                isGeneratedOnSnake = true;
            }
        })

        return isGeneratedOnSnake;
    }


}