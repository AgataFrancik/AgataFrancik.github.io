//var canva = document.createElement('canvas');
const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');
canv.width = 1500;
canv.height = 650;
const cw = canv.width;
const ch = canv.height;
let playerX = 760;
let playerY = 630;

let enemyX = 0;
let enemyY = 610;

const playerWidth = 20;
const playerHeight = 20;

var OneBlockSize = 20;
var enemySize = 0;

function board(){
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, cw, ch);
}
function player()
{
    ctx.fillStyle = 'white';
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}
function playerPosition(e){
    console.log(e.keyCode);
    if(e.keyCode == 87)
    {
        playerY -= 10;
    }
    if(e.keyCode == 83)
    {
        playerY += 10;
    }
    if(e.keyCode == 65)
    {
        playerX -= 10;
    }
    if(e.keyCode == 68)
    {
        playerX += 10;
    }
    if(playerY >= ch - playerHeight)
    {
        playerY = ch - playerHeight;
    }
    if(playerY < 0)
    {
        playerY = 0;
    }
    if(playerX >= cw - playerWidth)
    {
        playerX = cw - playerWidth;
    }
    if(playerX < 0)
    {
        playerX = 0;
    }
}
function win()
{
    if(playerY <= 0)
    {
        alert(`You win!`);
        clearInterval(Render);
    }
}
function renderEnemy()
{
    enemySize = Math.floor(Math.random()*5+1) * OneBlockSize;
    return enemySize;
}
function enemy()
{
    //enemyS = renderEnemy();
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyX, enemyY, enemySize , OneBlockSize);
}
function enemyMoveRight()
{
    enemyX += 5;
}
window.addEventListener("keydown", playerPosition)
function game() {
board()
player()
win()
}
function enemyController(){
    enemy()
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