Bomb.count = 0;
Bomb.max_count =2;
Bomb.elements ={
    'bomb': {sx: 126, sy: 16, f:[0,0,1,1,2,2]},
    'center': {sx: 126, sy: 64, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0]},
    'up_bum': {sx: 126, sy: 96, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0]},
    'down_bum': {sx: 126, sy: 96, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0]},
    'left_bum': {sx: 126, sy: 48, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0]},
    'right_bum': {sx: 126, sy: 48, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0]},
    'up_bum_end': {sx: 126, sy: 80, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0]},
    'down_bum_end': {sx: 126, sy: 80, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0], flip: true},
    'right_bum_end': {sx: 126, sy: 32, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0], flip:true},
    'left_bum_end': {sx: 126, sy: 32, f:[0,0,1,1,2,2,3,3,2,2,1,1,0,0]},
}
function Bomb(column, row, bum_type){
    if((Bomb.count<Bomb.max_count && Game.board.b[row][column].sub_type!='bomb' && !bum_type) || (bum_type && Game.board.b[row][column].sub_type=='board' && (!Game.board.b[row][column].bum_type))){
        if(!bum_type){
            Bomb.count++;
        }
        this.bum_type = bum_type;
        this.type = bum_type ? 'empty ': 'solid';
        this.sub_type = 'bomb';
        this.data = !bum_type ? Bomb.elements.bomb : Bomb.elements[bum_type];
        this.sx = Board.elements.floor.sx;
        this.sy = Board.elements.floor.sy;
        //
        //this.bomb_sx = 126;
        //this.bomb_sy = 16;
        //this.f = [0,0,1,1,2,2];

        this.current_f = 0;
        this.column = column;
        this.row = row;

        this.timer = bum_type ? this.data.f.length : 30;
        this.range = 2;
        Game.board.b[this.row][this.column] = this;

    }
}
Bomb.prototype.draw = function(){
    if(this.timer>0){
        this.target_x = this.column*Game.board.fW*VAR.scale;
        this.target_y = this.row*Game.board.fH*VAR.scale;

        if(this.data.flip){
            Game.ctx.save();
            if(this.bum_type=='down_bum_end'){
                Game.ctx.scale(1,-1);
                this.target_y=this.target_y*-1-(Game.board.fH*VAR.scale);
            }else {
                Game.ctx.scale(-1,1);
                this.target_x=this.target_x*-1-(Game.board.fW*VAR.scale);
            }
        }

    Game.ctx.drawImage(
        Game.spr,
        this.data.sx+this.data.f[this.current_f]*Game.board.fW,
        this.data.sy,
        Game.board.fW,
        Game.board.fH,
        this.target_x,
        this.target_y,
        Game.board.fW*VAR.scale,
        Game.board.fH*VAR.scale
    );
    if(this.data.flip){
        Game.ctx.restore();
    }
    this.current_f = this.current_f+1<this.data.f.length ? this.current_f+1 : 0;
    this.timer--;
    }else if(this.type == 'solid'){
        Bomb.count--;
        this.type='empty';
        this.current_f = 0;
        this.data = Bomb.elements.center;
        this.bum_type = 'center';
        this.timer = this.data.f.length;

        this.bums = [];
        for(var i=0; i<4;i++){
            this.axis = i%2 ? 'tmp_colum' : 'tmp_row';
            this.grow = i%3 ? true: false;

            this.tmp_colum = this.column;
            this.tmp_row = this.row;

            if(this.axis == 'tmp_colum' && this.grow){
                this.tmp_bum_type = 'right_bum';
            } else if(this.axis == 'tmp_colum' && !this.grow){
                this.tmp_bum_type = 'left_bum';
            } else if(this.axis == 'tmp_row' && this.grow){
                this.tmp_bum_type = 'down_bum';
            } else if(this.axis == 'tmp_row' && !this.grow){
                this.tmp_bum_type = 'up_bum';
            }
            for(var j=0; j<this.range;j++){
                this[this.axis] = this[this.axis]+(this.grow?1:-1);
                if(Game.board.b[this.tmp_row][this.tmp_colum].type != 'solid'){
                    if(Game.board.b[this.tmp_row][this.tmp_colum].ko_obj){
                        new window[Game.board.b[this.tmp_row][this.tmp_colum].ko_obj](this.tmp_colum, this.tmp_row);
                        break;
                    }else{
                    new Bomb(this.tmp_colum, this.tmp_row, this.tmp_bum_type+(j==this.range-1 ? '_end':''));
                    }
                }else if(Game.board.b[this.tmp_row][this.tmp_colum].sub_type =='bomb'&& !Game.board.b[this.tmp_row][this.tmp_colum].bum_type){
                    Game.board.b[this.tmp_row][this.tmp_colum].timer = 0;
                }
                else{
                    break;
                }
            }
        }
    }else{
        Game.board.b[this.row][this.column] = Board.elements.floor;
    }
}