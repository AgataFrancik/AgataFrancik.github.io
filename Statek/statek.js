window.onload = function(){
    Game.init();
}

VAR = {
    fps: 60,
    W: 0,
    H: 0,
    lastTime: 0,
    rand: function(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    }

}
Game = {
    init: function(){
        Game.canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        document.body.appendChild(Game.canvas);
    }
}