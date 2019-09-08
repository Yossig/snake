import Game from './game.js';

window.onload = () => {
    let canv = document.getElementById("gc");
    let ctx = canv.getContext("2d");
    let fps = 100
    let games = [];
    let generationSize = 2000;

    for (let index = 0; index < generationSize; index++) {
        games.push(new Game(ctx, 400))
    }

    let systemInterval = setInterval(() => {
        if (!games.reduce((a, b) => a || b.isRunning, false)) {
            clearInterval(gameInterval)

            // get best game score
            let alpha = games[games.map(game => {
                return game.snake.fitness
            }).indexOf(Math.max(...games.map(game => { return game.snake.fitness })))];
            console.log(alpha.snake.fitness)
            
            for (let index = 0; index < generationSize; index++) {
                games[index].restartGame(alpha.snake)
            }

            gameInterval = setInterval(() => {
                ctx.clearRect(0,0,400,400);
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