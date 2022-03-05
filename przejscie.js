//var canva = document.createElement('canvas');
const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');
canv.width = 1500;
canv.height = 650;
const cw = canv.width;
const ch = canv.height;
var fps = 60;
var allEnemies = []
var create = true
var player = {
    playerX: 760,
    playerY: 630,
    playerWidth: 20,
    playerHeight: 20,
}


function game( time ) {
    requestAnimationFrame(game)  
    
    if (time - LastTime>=1000/fps)  {
        LastTime = time;
        board()
        if(create){
        allEnemies.push({
            enemySize: 0,
            enemyX: 0,
            enemyY: 610,
            OneBlockSize: 20
        })
        renderEnemy()   
    }
    //if(allEnemies.length>1)
      //  {
       //     if(allEnemies[allEnemies.length-1].enemyX+allEnemies[allEnemies.length-1].enemySize - allEnemies[allEnemies.length-2].enemyX <= -50) { 
        //        create = true
         //   }
         //   else{
          //      create = false
           // }
       // }
       // else
     if(allEnemies[allEnemies.length-1].enemyX>=120){
            create = true
        }
        else{
            create = false
        }
    for(var i=0; i<allEnemies.length;i++){
        var enemy = allEnemies[i];
        enemyFunc(enemy)
        //enemyMoveRight()
    }
        playerFunc()
        win()
    }
}


function board(){
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, cw, ch);
}
function playerFunc()
{
    ctx.fillStyle = 'white';
    ctx.fillRect(player.playerX, player.playerY, player.playerWidth, player.playerHeight);
}
function playerPosition(e){
    console.log(e.keyCode);
    if(e.keyCode == 87)
    {
        player.playerY -= 10;
    }
    if(e.keyCode == 83)
    {
        player.playerY += 10;
    }
    if(e.keyCode == 65)
    {
        player.playerX -= 10;
    }
    if(e.keyCode == 68)
    {
        player.playerX += 10;
    }
    if(player.playerY >= ch - player.playerHeight)
    {
        player.playerY = ch - playerHeight;
    }
    if(player.playerY < 0)
    {
        player.playerY = 0;
    }
    if(player.playerX >= cw - player.playerWidth)
    {
        player.playerX = cw - playerWidth;
    }
    if(player.playerX < 0)
    {
        player.playerX = 0;
    }
}
function win()
{
    if(player.playerY <= 0)
    {
        alert(`You win!`);
        clearInterval(Render);
    }
    //if(enemyX)
}
function renderEnemy()
{
    allEnemies[allEnemies.length-1].enemySize = Math.floor(Math.random()*5+1) * allEnemies[allEnemies.length-1].OneBlockSize;
    return allEnemies[allEnemies.length-1].enemySize;
}
function enemyFunc(enemy)
{
    ctx.fillStyle = 'red';
    enemy.enemyX += 1.5;
    ctx.fillRect(enemy.enemyX, enemy.enemyY, enemy.enemySize , enemy.OneBlockSize);
}
//function enemyMoveRight()
//{
 //   allEnemies[allEnemies.length-1].enemyX += 1;
//}


window.addEventListener("keydown", playerPosition)

LastTime = 0;
game()
renderEnemy()
//enemyController()


function enemyController(){
    requestAnimationFrame(enemyController)
    enemyFunc()
    enemyMoveRight()
}
//var Render;
//var RenderEnemy;
//function start(){
  //  Render = setInterval(game,1000/60);
   // RenderEnemy = setInterval(enemyController, 1000/60)
//}
//renderEnemy();
//start();