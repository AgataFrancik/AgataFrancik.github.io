Character.count = 0;
function Character(inheritance){
    Character.count++;
    this.id = 'ch_'+Character.count;

    if(!inheritance){
    Game.toDraw[this.id] = this;
    }

    this.fW = 21;
    this.fH = 24;

    this.speed = 2;

    this.modX = -2;
    this.modY = -8;
    //this.start_x = 0;
    //this.start_y = 0;

    //this.frames = [1,0,2,0];
    this.current_frame = 0;

    this.f_max_delay = 2;
    this.change_f_delay = 0;
}
Character.prototype.draw = function(){
    if(this.state.slice(-2)=='go')
    {
        if(this.state=='down_go'){
        this.y += this.speed;
    } else if(this.state=='right_go'){
        this.x += this.speed;
    }else if(this.state=='left_go'){
        this.x -= this.speed;
    } else if(this.state=='up_go'){
        this.y -= this.speed;
    }
    this.rowAndColumn();
}
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
        this.states[this.state].flip ? (-this.fW-this.modX-this.x)*VAR.scale: (this.x +this.modX)*VAR.scale,
        (this.y + this.modY)*VAR.scale,
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
Character.prototype.rowAndColumn = function(){
    this.row = Math.round(this.y/Game.board.fH);
    this.column = Math.round(this.x/Game.board.fW);
    if(this.state.slice(-2)=='go'){
        if(this.state =='left_go'|| this.state =='right_go'){
            this.next_row = this.row;
            this.next_column = this.state == 'left_go'?Math.floor(this.x/Game.board.fW):Math.ceil(this.x/Game.board.fW);
        } else {
            this.next_column = this.column;
            this.next_row = this.state == 'up_go'?Math.floor(this.y/Game.board.fH):Math.ceil(this.y/Game.board.fH);
        }
        if(!(this.row==this.next_row && this.column==this.next_column) && Game.board.b[this.next_row][this.next_column].type!='empty'){
            this.state = this.state.slice(0,-3);
            this.current_frame = 0;
            if(this.row != this.next_row){
                this.y = this.row*Game.board.fH;
            }else{
                this.x = this.column*Game.board.fW;
            }
        }else{
            if(this.row!= this.next_row){
                this.x = this.column*Game.board.fW;
            }else if(this.column!=this.next_column){
                this.y = this.row*Game.board.fH;
            }
        }
    }else{
        this.next_row = this.row;
        this.next_column = this.column;
    }
}
function Hero(){
    Character.call(this);
    this.state = 'down';
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
    };
    this.x = Game.board.fW;
    this.y = Game.board.fH;
}
Hero.prototype = new Character(true);
Hero.prototype.constructor = Hero;

Hero.prototype.updateState = function(){
    this.tmp_state = this.state;
    if(Game.key_37){
        this.tmp_state = 'left_go';
    } else if(Game.key_38){
        this.tmp_state = 'up_go';
    } else if(Game.key_39){
        this.tmp_state = 'right_go';
    } else if(Game.key_40){
        this.tmp_state = 'down_go';
    } else if(this.state.slice(-2)=='go'){
        this.tmp_state = this.state.slice(0, this.state.indexOf('_go'));
    }
    if(this.state != this.tmp_state){
        this.current_frame = 0;
        this.state = this.tmp_state;
    }
}
Enemy.all ={};
function Enemy(x,y){
    Character.call(this);
    this.state = 'down';
    Enemy.all[this.id]=this;
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
    this.x = x;
    this.y = y;
    this.rowAndColumn();
    this.setDirection();
}
Enemy.prototype = new Character(true);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.parent = Character.prototype;

Enemy.prototype.setDirection = function(){
    this.canGo = this.canGo || [];
    this.canGo.length = 0;
    for(var i=this.column-1;i<=this.column+1;i++){
        for(var j=this.row-1;j<=this.row+1;j++){
            if(!(i==this.column&&j==this.row)){
                if(i==this.column || j==this.row){
                    if(Game.board.b[j][i].type == 'empty'){
                        this.canGo.push({x: i,y:j});
                    }
                }
            }
        }
    }
    if(this.canGo.length>0){
        this.tmp_pos = this.canGo[VAR.rand(0, this.canGo.length-1)];
        if(this.column<this.tmp_pos.x){
            this.state = 'right_go';
        }else if(this.column>this.tmp_pos.x){
            this.state = 'left_go';
        }else if(this.row < this.tmp_pos.y){
            this.state = 'down_go';
        }else if(this.row > this.tmp_pos.y){
            this.state = 'up_go';
        }
    }else if(this.state.slice(-2)=='go'){
        this.state=this.state.slice(0,-3);
    }
}
Enemy.prototype.rowAndColumn = function(){
    this.prev_state = this.state;
    this.parent.rowAndColumn.call(this);
    if(this.state!=this.prev_state && this.state.slice(-2)!="go"&& this.prev_state.slice(-2)=='go'){
        this.setDirection();
    }
}