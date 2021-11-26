        const canv = document.querySelector('canvas');
        const ctx = canv.getContext('2d');
        const reset = document.getElementById('reset');
        const startGame = document.getElementById('StartButton');
        canv.width = 1500;
        canv.height = 650;

        const cw = canv.width;
        const ch = canv.height;
        const ballSize = 20;
        let ballX = cw/2 - ballSize/2;
        let ballY = ch/2 - ballSize/2;

        const paddleHight = 100;
        const paddleWidth = 20;

        const playerX = 70;
        const AIX = 1430;

        let playerY = 200;
        let AIY = 200;

        const lineWidth = 6;
        const lineHeight = 16;

        let ballSpeedX = -1;
        let ballSpeedY = 1;

        var sndHit = new Audio("hit.mp3");
        var sndLose = new Audio("lose.mp3");
        var sndWin = new Audio("win.mp3");
        sndWin.autoplay = false;
        sndLose.autoplay = false;
        sndHit.autoplay = false;

        let startTime = 0.0;
        

        let points=0;
        let pointName= "Points: " + points;
        document.getElementById("points").innerHTML = pointName;

        function player()
        {
            ctx.fillStyle = 'gray';
            ctx.fillRect(playerX, playerY, paddleWidth, paddleHight);
        }

        function AI()
        {
            ctx.fillStyle = 'gray';
            ctx.fillRect(AIX, AIY, paddleWidth, paddleHight);
        }

      function ball()
        {
            ctx.fillStyle = 'white';
            ctx.fillRect(ballX, ballY, ballSize, ballSize);
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if(ballY <= 0 || ballY + ballSize >= ch)
            {
                ballSpeedY *= -1;
                SpeedUp();
            }
            

        }
        function count()
        {
	        const endTimeName = new Date().getTime();
            var min =0;
            
            let gameTimeName = Math.round((endTimeName - startTime)/1000);
            if(gameTimeName >60)
            {
                min++;
                gameTimeName= gameTimeName-60;
            }
	        document.getElementById("time").innerHTML = "Time: " + min + ":" + gameTimeName;
	        setTimeout("count()",1000);
        }

        function table()
        {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, cw, ch);
            for(let i = 20; i < ch ; i += 30)
            {
                ctx.fillStyle = "gray";
                ctx.fillRect(cw/2 - 3, i, lineWidth, lineHeight)
            }
            //document.getElementById("time").innerHTML = timeName;

        }

        topCanvas = canv.offsetTop;

        function SpeedUp()
        {
            if(Math.abs(ballSpeedX) < 10 )
            {
                ballSpeedX *= 1.01;
            }
            if(Math.abs(ballSpeedY) < 10 )
            {
                ballSpeedY *= 1.01;
            }
        }

        function playerPosition(e)
        {
            playerY = e.clientY - topCanvas - paddleHight/2;
            if(playerY >= ch - paddleHight)
            {
                playerY = ch - paddleHight;
            }
            if(playerY <=0)
            {
                playerY = 0;
            }
            //AIY = playerY;
        }

        function aiPosition()
        {
            var middlePaddel = AIY + paddleHight/2;
            var middleBall = ballY + ballSize/2;
            if (ballX > 500)
            {
                if (middlePaddel - middleBall > 200)
                {
                    AIY -= 15; 
                }
                else if (middlePaddel - middleBall > 50)
                {
                    AIY -= 5;
                }
                else if (middlePaddel - middleBall < -200)
                {
                    AIY += 15;
                }
                else if (middlePaddel - middleBall < -50)
                {
                    AIY += 5;
                }
            }
            else if(ballX <= 500 && ballX >150)
            {
                if (middlePaddel - middleBall > 100)
                {
                    AIY -= 3; 
                }
                else  if (middlePaddel - middleBall > -100)
                {
                    AIY += 3; 
                }
            }
        }

        function collision()
        {
            if((ballY + ballSize/2 >= playerY) && (ballY <= playerY + paddleHight )&&( ballX <= playerX + paddleWidth))
            {
                ballSpeedY *= -1;
                ballSpeedX *= -1.2;
                sndHit.play();
                points++;
                pointName= "Points: " + points;
                document.getElementById("points").innerHTML = pointName;

            }
            if((ballY + ballSize/2 >= AIY) && (ballY <= AIY + paddleHight )&&( ballX + ballSize >= AIX))
            {
                ballSpeedY *= -1;
                ballSpeedX *= -1.2;
                sndHit.play();
            }
        }

        function win()
        {
            if(ballX + ballSize >= cw-1)
            {
                const endTime = new Date().getTime();
                const gameTime = Math.round((endTime - startTime)/1000);
                alert(`Player win. Time: ${gameTime} sec. \n Points: ${points}`);
                sndWin.play();
                clearInterval(Render);
            }
            else if(ballX <= 0)
            {
                const endTime = new Date().getTime();
                const gameTime = Math.round((endTime - startTime)/1000);
                alert(`Ai win. Time: ${gameTime} sec. \n Points: ${points}`);
                sndLose.play();
                clearInterval(Render);
            }

        }
        function resetGame()
        {
            points = 0;
            pointName= "Points: " + points;
            document.getElementById("points").innerHTML = pointName;
            ballSpeedX = -1;
            ballSpeedY = 1;
            ballX = cw/2 - ballSize/2;
            ballY = ch/2 - ballSize/2;
            playerY = 200;
            AIY = 200;
            startTime = new Date().getTime();
        }

        canv.addEventListener("mousemove", playerPosition)
        reset.addEventListener("click", resetGame)
        startGame.addEventListener("click", start)
        function game() {
        table()
        ball()
        player()
        AI()
        aiPosition()
        collision()
        win()
        }
        var Render;
        function start(){
            
            startTime = new Date().getTime();
            count();
            Render = setInterval(game,1000/60);
            startGame.removeEventListener("click", start);
        }
        game();
        //start();
        document.getElementById("time").innerHTML = "Time: 0:0";

