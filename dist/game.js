import Snake from './snake.js'

export default class Game {
    snake = new Snake();
    frameRate = 15;
    gridSize = 20;
    blockSize;
    dimensions;
    context;
    gameInterval;
    apple;
    score;

    constructor(canvasContext, dimensions) {
        this.context = canvasContext;
        this.dimensions = dimensions;
        this.blockSize = dimensions / this.gridSize

        document.addEventListener("keydown", (event) => {
            this.HandleKeyboardEvent(event);
        })

        this.restartGame();
    }

    restartGame() {
        this.score = 0;
        this.snake.init({ x: this.gridSize / 2, y: this.gridSize / 2 });
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
        this.snake.updatePosition();

        if (this.checkCollision()) {
            this.restartGame();
        }

        if (this.checkAppleEaten()) {
            this.apple = this.generateRandomPositionOnGrid();
            this.score += 10;
            this.snake.grow();
        }

        this.draw();
    }

    draw() {

        this.context.fillStyle = "lime";
        this.context.fillRect(this.snake.position.x * this.blockSize, this.snake.position.y * this.blockSize, this.blockSize - 2, this.blockSize - 2)

        this.snake.tail.forEach(joint => {
            this.context.fillRect(joint.x * this.blockSize, joint.y * this.blockSize, this.blockSize - 2, this.blockSize - 2)
        })

        this.context.fillStyle = "red";
        this.context.fillRect(this.apple.x * this.blockSize, this.apple.y * this.blockSize, this.blockSize, this.blockSize)


        this.context.fillStyle = "white";
        this.context.fillRect(0, this.dimensions, this.dimensions, 100)

        this.context.fillStyle = "black";
        this.context.font = "30px Ariel";
        this.context.fillText(`Score: ${this.score}`, 0, this.dimensions + 50)
    }

    checkCollision() {
        let pos = this.snake.position;
        let collision = pos.x < 0 || pos.x * this.blockSize > this.dimensions - this.blockSize || pos.y < 0 || pos.y * this.blockSize > this.dimensions - this.blockSize;

        this.snake.tail.forEach(joint => {
            if (this.snake.position.x === joint.x && this.snake.position.y === joint.y) {
                collision = true;
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