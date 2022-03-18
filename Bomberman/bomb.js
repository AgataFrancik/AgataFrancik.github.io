Bomb.count = 0;
Bomb.max_count =2;
function Bomb(column, row){
    if(Bomb.count<Bomb.max_count && Game.board.b[row][column].type!='bomb'){
        Bomb.count++;
        this.type = 'bomb';
        this.sx = Board.elements.floor.sx;
        this.sy = Board.elements.floor.sy;
        //
        this.bomb_sx = 126;
        this.bomb_sy = 16;
        this.f = [0,0,1,1,2,2];

        this.current_f = 0;
        this.column = column;
        this.row = row;
        Game.board.b[this.row][this.column] = this;
    }
}
Bomb.prototype.draw = function(){
    Game.ctx.drawImage(
        Game.spr,
        this.bomb_sx+this.f[this.current_f]*Game.board.fW,
        this.bomb_sy,
        Game.board.fW,
        Game.board.fH,
        this.column*Game.board.fW*VAR.scale,
        this.row*Game.board.fH*VAR.scale,
        Game.board.fW*VAR.scale,
        Game.board.fH*VAR.scale
    );
    this.current_f = this.current_f+1<this.f.length ? this.current_f+1 : 0;

}