//var canva = document.createElement('canvas');
const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');
canv.width = 1500;
canv.height = 650;
const cw = canv.width;
const ch = canv.height;

var player = {
    playerX: 760,
    playerY: 630,
    playerWidth: 20,
    playerHeight: 20,
}


var enemy = {
    enemySize: 0,
    enemyX: 0,
    enemyY: 610,
    OneBlockSize: 20,
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
    enemy.enemySize = Math.floor(Math.random()*5+1) * enemy.OneBlockSize;
    return enemy.enemySize;
}
function enemyFunc()
{
    //enemyS = renderEnemy();
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy.enemyX, enemy.enemyY, enemy.enemySize , enemy.OneBlockSize);
}
function enemyMoveRight()
{
    enemy.enemyX += 5;
}
window.addEventListener("keydown", playerPosition)
function game() {
board()
playerFunc()
win()
}
function enemyController(){
    enemyFunc()
    enemyMoveRight()
}
var Render;
var RenderEnemy;
function start(){
    Render = setInterval(game,1000/60);
    RenderEnemy = setInterval(enemyController, 1000/60)
}
renderEnemy();
start();