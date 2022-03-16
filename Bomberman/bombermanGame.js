window.onload = function(){
    Game.spr = new Image();
    Game.spr.onload = Game.init();
    Game.spr.src = 'bombe.png';
}
VAR = {
    fps: 15,
    W: 0,
    H: 0,
    scale: 4, //Scale for game elements
    lastTime: 0,
    rand: function(min, max){
        return Math.floor(Math.random()*(max-min+1))+min;
    },
    shuffle: function(arr){
        var counter = arr.length;
        var tmp, index;
        while(counter>0){
            counter--;
            index = Math.floor(Math.random()*counter);
            tmp = arr[counter];
            arr[counter]=arr[index];
            arr[index] = tmp;
        }
        return arr;
    }
}

Game = {
    init: function(){
        Game.canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        Game.layout();
        window.addEventListener('resize', Game.layout, false);
        document.body.appendChild(Game.canvas);

        Game.toDraw = {};
        Game.board = new Board();
        //Game.hero = new Hero();
        //new Enemy();
        Game.animationLoop();
    },
    layout: function(ev){
        VAR.W = window.innerWidth;
        VAR.H = window.innerHeight;
        Game.canvas.width = VAR.W;
        Game.canvas.height = VAR.H;
        Game.ctx.imageSmoothingEnabled = false;
        Game.ctx.mozImageSmoothingEnabled = false;
        Game.ctx.oImageSmoothingEnabled = false;
        Game.ctx.webkitImageSmoothingEnabled = false;
    },
    animationLoop: function(time){
        requestAnimationFrame(Game.animationLoop);
        if(time-VAR.lastTime>=1000/VAR.fps){
            VAR.lastTime = time;
            Game.ctx.clearRect(0,0,VAR.W, VAR.H);

            Game.board.draw();

            for(var o in Game.toDraw){
                Game.toDraw[o].draw();
            }
        }
    }
}