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
        Game.board = new Board();
        Game.layout();
        window.addEventListener('resize', Game.layout, false);
        document.body.appendChild(Game.canvas);

        Game.toDraw = {};
        Game.hero = new Hero();
        window.addEventListener("keydown",Game.onKey, false);
        window.addEventListener("keyup",Game.onKey, false);
        //new Enemy();
        Game.animationLoop();
    },
    onKey: function(ev){
        if((ev.keyCode>=37 && ev.keyCode<=40)|| ev.keyCode == 32){
            ev.preventDefault();
            if(ev.type=='keydown' && !Game['key_'+ev.keyCode])
            {
                Game['key_'+ev.keyCode] = true;
                if(ev.keyCode>=37 && ev.keyCode<=40){
                    for(var i=37;i<=40;i++){
                        if(i!=ev.keyCode){
                            Game['key_'+i]=false;
                        }
                    }
                }
                Game.hero.updateState();
            }else if(ev.type=='keyup'){
                Game['key_'+ev.keyCode]=false;
                Game.hero.updateState();
            }
        }
    },
    layout: function(ev){
        VAR.W = window.innerWidth;
        VAR.H = window.innerHeight;
        

        VAR.scale = Math.max(1 ,Math.min(
            Math.floor(VAR.W/(Game.board.fW*Game.board.b[0].length)),
            Math.floor(VAR.H/(Game.board.fH*Game.board.b.length))
        ));
        Game.canvas.width = Math.round(VAR.scale*Game.board.fW*Game.board.b[0].length);
        Game.canvas.height = Math.round(VAR.scale*Game.board.fH*Game.board.b.length);

        Game.canvas.style[Modernizr.prefixed('transform')] = 'translate('+Math.round((VAR.W-Game.canvas.width)/2)+'px,'+Math.round((VAR.H-Game.canvas.height)/2)+'px)';

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