import Game from './game.js';

window.onload = () => {
    let canv = document.getElementById("gc");
    let ctx = canv.getContext("2d");
    let fps = 100
    let games = [];
    let generationSize = 2000;
    let generationCounter = 0;

    for (let index = 0; index < generationSize; index++) {
        games.push(new Game(ctx, 400))
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 400, 500, 100)
    ctx.fillStyle = "black"
    ctx.font = "30px Arial"
    ctx.fillText(`Generation: ${generationCounter},Max Length: ${0}`, 0, 450)

    let systemInterval = setInterval(() => {
        if (!games.reduce((a, b) => a || b.isRunning, false)) {
            generationCounter++;
            clearInterval(gameInterval)


            // get best snake fitness
            let alpha = games[games.map(game => {
                return game.snake.fitness
            }).indexOf(Math.max(...games.map(game => { return game.snake.fitness })))];

            ctx.fillStyle = "white";
            ctx.fillRect(0, 400, 500, 100)
            ctx.fillStyle = "black"
            ctx.font = "30px Arial"
            ctx.fillText(`Generation: ${generationCounter},Max Length: ${alpha.snake.length}`, 0, 450)

            for (let index = 0; index < generationSize; index++) {
                games[index].restartGame(alpha.snake)
            }



            gameInterval = setInterval(() => {
                ctx.clearRect(0, 0, 400, 400);
                ctx.fillStyle = "black"
                ctx.fillRect(0, 0, 400, 400);

                games.forEach(game => {
                    game.update();
                })

            }, 1000 / fps)
        }
    }, 10)

    let gameInterval = setInterval(() => {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, 400, 400);

        games.forEach(game => {
            game.update();
        })

    }, 1000 / fps)




}