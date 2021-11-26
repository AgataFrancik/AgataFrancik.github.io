//var canva = document.createElement('canvas');
const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');
canv.width = 1500;
canv.height = 650;
const cw = canv.width;
const ch = canv.height;
let playerX = 760;
let playerY = 630;
const playerWidth = 20;
const playerHeight = 20;

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
}
window.addEventListener("keydown", playerPosition)
function game() {
board()
player()
}
var Render;
function start(){
    Render = setInterval(game,1000/60);
}
//game();
start();