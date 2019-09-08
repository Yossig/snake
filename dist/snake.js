import Brain from './brain.js'

export default class Snake {

    init(position, alphaSnake) {
        if (alphaSnake)
            this._brain = new Brain(alphaSnake.brain);
        else
            this._brain = new Brain();

        this._direction = {
            xv: 1,
            yv: 0
        }

        this._position = {
            x: position.x,
            y: position.y
        }

        this._tail = [];

        this.length = 3;
        this._score = 0;
        this._lifetime = 0;
        this._ttl = 400;
    }

    moveUp() {
        if (this._direction.yv !== 1)
            this._direction = { xv: 0, yv: -1 }
    }
    moveDown() {
        if (this._direction.yv !== -1)
            this._direction = { xv: 0, yv: 1 }
    }
    moveLeft() {
        if (this._direction.xv !== 1)
            this._direction = { xv: -1, yv: 0 }
    }
    moveRight() {
        if (this._direction.xv !== -1)
            this._direction = { xv: 1, yv: 0 }
    }

    get brain() {
        return this._brain;
    }

    get position() {
        return this._position;
    }

    get score() {
        return this._score;
    }

    set score(score) {
        this._score += score;
    }

    get fitness() {
        //return this.length * this._lifetime * this._lifetime
        return this._lifetime;
    }

    get ttl() {
        return this._ttl;
    }

    makeDecision(input) {
        let output = this._brain.makeDecision(input)
        this._lifetime++;
        this._ttl--;

        switch (output) {
            case 0: {
                this.moveUp();
            }
                break;
            case 1: {
                this.moveDown();
            }
                break;
            case 2: {
                this.moveLeft();
            }
                break;
            case 3: {
                this.moveRight();
            }
                break;
        }
    }

    updatePosition() {
        this._tail.push({ x: this._position.x, y: this._position.y })
        this._position.x += this._direction.xv;
        this._position.y += this._direction.yv;

        while (this._tail.length > this.length) {
            this._tail.shift();
        }
    }

    get tail() {
        return this._tail;
    }

    grow() {
        this.length += 2;
    }
}