export default class Snake {

    init(position) {
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

    get position() {
        return this._position;
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
        this.length+=2;
    }
}