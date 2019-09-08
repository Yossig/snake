import Game from './game.js';

window.onload = () => {
    let canv = document.getElementById("gc");
    let ctx = canv.getContext("2d");
    let fps = 15

    let game = new Game(ctx, 400);

    let gameInterval = setInterval(() => {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, 400, 400);

        game.update();
    }, 1000 / fps)
}