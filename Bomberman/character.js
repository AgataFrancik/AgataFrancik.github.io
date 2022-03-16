Character.count = 0;
function Character(inheritance){
    Character.count++;
    this.id = 'ch_'+Character.count;

    if(!inheritance){
    Game.toDraw[this.id] = this;
    }

    this.fW = 21;
    this.fH = 24;
    //this.start_x = 0;
    //this.start_y = 0;

    //this.frames = [1,0,2,0];
    this.current_frame = 0;

    this.f_max_delay = 2;
    this.change_f_delay = 0;
}
Character.prototype.draw = function(){
    if(this.states[this.state].flip){
        Game.ctx.save();
        Game.ctx.scale(-1,1);
    }
    Game.ctx.drawImage(
        Game.spr,
        this.states[this.state].sx+this.states[this.state].f[this.current_frame]*this.fW,
        this.states[this.state].sy,
        this.fW,
        this.fH,
        this.states[this.state].flip ? -this.fW*VAR.scale:0,
        0,
        this.fW*VAR.scale,
        this.fH*VAR.scale
    );
    if(this.states[this.state].flip){
        Game.ctx.restore();
        
    }
    if(this.change_f_delay<this.f_max_delay){
        this.change_f_delay++;
    } else{
        this.change_f_delay=0;
    this.current_frame = this.current_frame+1 >= this.states[this.state].f.length ? 0 : this.current_frame+1;
    }
}
function Hero(){
    Character.call(this);
    this.state = 'right_go';
    this.states = {
        'down':{sx:0, sy: 0, f:[0]},
        'down_go':{sx:0, sy: 0, f:[0,1,0,2]},
        'left':{sx:63, sy: 0, f:[0]},
        'left_go':{sx:63, sy: 0, f:[0,1,0,2]},
        'up':{sx:0, sy: 24, f:[0]},
        'up_go':{sx:0, sy: 24, f:[0,1,0,2]},
        'right':{sx:63, sy: 0, f:[0]},
        'right_go':{sx:63, sy: 0, f:[0,1,0,2], flip: true},
        'ko': {sx:0, sy: 48, f:[0,1,0,1,0,1,2,3,4]}
    }
}
Hero.prototype = new Character(true);
Hero.prototype.constructor = Hero;

function Enemy(){
    Character.call(this);
    this.state = 'right_go';
    this.states = {
        'down':{sx:0, sy: 72, f:[0]},
        'down_go':{sx:0, sy: 72, f:[0,1,0,2]},
        'left':{sx:63, sy: 24, f:[0]},
        'left_go':{sx:63, sy: 24, f:[0,1,0,2]},
        'up':{sx:63, sy: 72, f:[0]},
        'up_go':{sx:63, sy: 72, f:[0,1,0,2]},
        'right':{sx:63, sy: 24, f:[0]},
        'right_go':{sx:63, sy: 24, f:[0,1,0,2], flip: true},
        'ko': {sx:0, sy: 96, f:[0,1,2,3,4,5]}
    }
}
Enemy.prototype = new Character(true);
Enemy.prototype.constructor = Enemy;