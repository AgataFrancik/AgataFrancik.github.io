Bullet.max = 5;
    Bullet.all ={};
    Bullet.speed = 0.022;
    Bullet.count = 0;
    Bullet.active_conut = 0;
    Bullet.life = 35;
function Bullet(){
    if(Bullet.active_conut<Bullet.max){
        Bullet.count++;
        Bullet.active_conut++;

        this.id = Bullet.count.toString();
        Bullet.all[this.id] = this;
         this.life = 0;
         this.a = Game.ship.a;
         this.x = Game.ship.points[0].x;
         this.y = Game.ship.points[0].y;
    }

}
Bullet.draw = function(){
    //for(var b)
};