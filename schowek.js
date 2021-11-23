<script>
    const canv = document.querySelector('canvas');
    const ctx = canv.getContext('2d');
    canv.width = 1000;
    canv.height = 500;

    const cw = canv.width;
    const ch = canv.height;
    const ballSize = 20;
    let ballX = cw/2 - ballSize/2;
    let ballY = ch/2 - ballSize/2;

    const paddleHight = 100;
    const paddleWidth = 20;

    const playerX = 70;
    const AIX = 910;

    let playerY = 200;
    let AIY = 200;

    const lineWidth = 6;
    const lineHeight = 16;

    let ballSpeedX = -1;
    let ballSpeedY = 1;

    var sndHit = new Audio("hit.mp3");
    sndHit.autoplay = false;

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
        if(ballX <= 0 || ballX + ballSize >= cw)
        {
            ballSpeedX *= -1;
            SpeedUp();
        }

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
    }

    topCanvas = canv.offsetTop;

    function SpeedUp()
    {
        if(Math.abs(ballSpeedX) < 14 )
        {
            ballSpeedX *= 1.1;
        }
        if(Math.abs(ballSpeedY) < 14 )
        {
            ballSpeedY *= 1.1;
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

    const aiPosition = (e) =>
    {
        console.log(e.keyCode);
        if(e.keyCode == 87)
        {
            AIY -=10;
        }
        else if(e.keyCode == 83)
        {
            AIY +=10;
        }
        if(AIY >= ch - paddleHight)
        {
            AIY = ch - paddleHight;
        }
        if(AIY <=0)
        {
            AIY = 0;
        }
    }

    function collision()
    {
        if((ballY + ballSize/2 >= playerY) && (ballY <= playerY + paddleHight )&&( ballX <= playerX + paddleWidth))
        {
            ballSpeedY *= -1;
            ballSpeedX *= -1.2;
            sndHit.play();
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
        if(ballX + ballSize >= cw)
        {
            alert("Player win");
            clearInterval(Render);
        }
        else if(ballX <= 0)
        {
            alert("Ai win");
            clearInterval(Render);
        }
    }

    canv.addEventListener("mousemove", playerPosition)
    window.addEventListener("keydown", aiPosition)

    function game() {
    table()
    ball()
    player()
    AI()
    collision()
    win()
    }
    var Render;
    function start(){
        Render = setInterval(game,1000/60);
    }
    
    start();

</script>