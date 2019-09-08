import Game from './game.js';

window.onload = () => {
    let canv = document.getElementById("gc");
    let ctx = canv.getContext("2d");
    let fps = 15
    let games = [];
    let generationSize = 1;

    for (let index = 0; index < generationSize; index++) {
        games.push(new Game(ctx, 400))
    }

    let systemInterval = setInterval(() => {
        if (!games.reduce((a, b) => a || b.isRunning, false)) {
            clearInterval(gameInterval)

            // get best game score
            let alpha = games[games.map(game => {
                return game.score
            }).indexOf(Math.max(...games.map(game => { return game.score })))];
            console.log(alpha.score)
            games = [];
            for (let index = 0; index < generationSize; index++) {
                games.push(new Game(ctx, 400, alpha.snake))
            }

            gameInterval = setInterval(() => {
                ctx.fillStyle = "black"
                ctx.fillRect(0, 0, 400, 400);

                games.forEach(game => {
                    game.update();
                })

                // generate generation with best snake barin

            }, 1000 / fps)
        }
    }, 10)

    let gameInterval = setInterval(() => {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, 400, 400);

        games.forEach(game => {
            game.update();
        })
        //cehck if all snakes died.
        // get best snake
        // generate generation with best snake barin

    }, 1000 / fps)




}