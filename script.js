var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 800;
var x = 350;
var y = 370;
var dx = 0;
var dy = 0;
var size = 30;
var run = false;
var dir;
var maxSpeed = 4;
var hueRotate = 350;
var won = false;
var song = new Audio("SONG.mp3");
//var collide;
var mapX = 0;
var mapY = 0;
var coins = 0;
var textcoins = document.getElementById('Coins');
textcoins.textContent = coins;

function player() {
    c.fillStyle = 'orange';
    c.fillRect(x, y, size-5, size-5)
}
function reset() {
    var reset = document.getElementById('reset');
    const text = reset.textContent;
    if (text === 'Play!'){
        run = true;
        animate();
        reset.textContent = 'Reset';
    } else {
        var over = document.getElementById('Over');
        over.style.display = 'none';
        canvas.style.transition = '0.1s';
        canvas.style.backgroundColor = 'rgb(213, 236, 255)';
        run = false;
        x = 350;
        y = 370;
        dx = 0;
        dy = 0;
        size = 30;
        dir = null;
        hueRotate = 350;
        won = false;
        l = false;
        r = false;
        u = false;
        d = false;
        mapX = 0;
        mapY = 0;
        c.clearRect(0, 0, canvas.width, canvas.height)
        resetMap();
        map();
        player();
        coins = 0;
        textcoins.textContent = coins;
        reset.textContent = 'Play!';
    }
}
function resetMap(){
    gameMap = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,2,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,
        1,0,0,2,0,0,0,1,0,0,0,0,0,3,1,0,0,0,0,0,1,
        1,0,2,3,1,2,1,1,1,1,0,1,0,1,0,0,0,0,0,0,1,
        1,0,1,0,0,0,1,2,0,0,0,1,0,1,0,0,0,0,0,0,1,
        1,0,0,0,2,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,1,
        1,0,1,0,1,1,1,1,1,1,3,1,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,
        1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
        1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
}
resetMap();
map();
player();
var collition;
function map() {
    let gx = 0;
    let gy = 0;
    collition = [];
    for (let i = 1; i < gameMap.length + 1; i++) {
        if (gameMap[i - 1] == 3){
            c.fillStyle = 'yellow';
            c.beginPath();
            c.arc(gx * 67 + mapX+ 33.5, gy * 67 + 33.5 + mapY, 20/2, 0, 2 * Math.PI);
            c.fill();
            c.stroke();
            collition.push({place: i - 1, x: gx * 67 + 33.5 + mapX , y: gy * 67 + 33.5 + mapY});
        }
        if (gameMap[i - 1] == 2){
            c.fillStyle = 'red';
            c.beginPath();
            c.arc(gx * 67 + 33.5 + mapX, gy * 67 + 33.5 + mapY, 20/2, 0, 2 * Math.PI);
            c.fill();
            c.stroke();
            collition.push({place: i - 1, x: gx * 67 + 33.5 + mapX, y: gy * 67 + 33.5 + mapY});
        }
        if (gameMap[i - 1] == 1){
            c.fillStyle = 'rgb(96 114 139)';
            c.fillRect(gx * 67 + mapX, gy * 67 + mapY, 68, 68)
            collition.push({place: i - 1, x: gx * 67.3 + 33.5 + mapX, y: gy * 67.3 + 33.5 + mapY});
        }
        if (i % (gameMap.length / 13) == 0 && i != 0) {
            gx = 0;
            gy++;
        } else {
            gx++;
        }
    }
}

var hap = document.getElementById('hap');
let l = false;
let r = false;
let u = false;
let d = false;
document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft") {
        dx = 3;
    } else if (event.key == "ArrowUp"){
        dy = 3;
    } else if (event.key == "ArrowRight") {
        dx = -3;
    }
    else if (event.key == "ArrowDown"){
        dy = -3;
    }
    if (event.key == 'r')
        reset();
    if (event.key == 's')
        song.pause();
});
document.addEventListener('keyup', function(event) {
    if (event.key == "ArrowLeft" && dx == 3) {
        dx = 0;
    }
    else if (event.key == "ArrowRight" && dx == -3) {
        dx = 0;
    }
    if (event.key == "ArrowUp" && dy == 3) {
        dy = 0;
    }
    else if (event.key == "ArrowDown" && dx == -3) {
        dy = 0;
    }
});
let a;
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (run)
        requestAnimationFrame(animate)
    //dy -= 0.2;
    if (dir == 'l') {
        dx = 3;
        dy 
    }
    a = false;
    for (let i = 0; i < collition.length; i++) {
        let m = 33.5 + size / 2;
        let m2 = 10 + size / 2;
        const xy = collition[i];
        let disX = xy.x - x - size / 2;
        let disY = xy.y - y - size / 2;
        if(Math.abs(disY) < m2 && Math.abs(disX) < m2 && gameMap[xy.place] == 2) {
            GameOver();
            run = false;
        }
        if(Math.abs(disY) < m2 && Math.abs(disX) < m2 && gameMap[xy.place] == 3 || won == true) {
            gameMap[xy.place] = 0;
            collition.pop(xy.place);
            coins += 1;
            textcoins.textContent = coins; //here happy birth day if collected all coins!
            if(coins === 1){
                song.play();
                hap.style.transition = '3s';
                var body = $('body');
                const width = body.width();
                hap.style.marginLeft = `${width / 2 - 208}px`;
                canvas.style.transition = '2s';
                canvas.style.display = 'none';
                hap.style.display = 'block';
                won = true;
                coins = 0;
                textcoins.textContent = coins;
                hap.animate([
                    // keyframes
                    { filter: 'hue-rotate(350deg)' }, 
                    { filter: 'hue-rotate(0deg)' }
                  ], { 
                    // timing options
                    duration: 5000,
                    iterations: Infinity
                });
            }
        }
        if(Math.abs(disY) < m && Math.abs(disX) < m && gameMap[xy.place] == 1) {
            if (disY > 0 && disY > Math.abs(disX)) {
                while (Math.abs(disY) < m) {
                    y -= 0.2
                    disY = xy.y - y - size / 2;
                }
                dy = 0;
                // if (collide == 'l' || collide == 'dl')
                //     collide = 'dl';
                // else if (collide == 'r'|| collide == 'dr')
                //     collide = 'dr';
                // else 
                //     collide = 'd';
            } else if (disY < 0 && -disY > Math.abs(disX)) {
                while (Math.abs(disY) < m) {
                    y += 0.1;
                    disY = xy.y - y - size / 2;
                }
                dy = 0;
                //collide = 'u';
            } else if (disX > 0 && disY < Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x -= 0.1;
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
                //collide = 'r';
            } else if (disX < 0 && -disY < Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x += 0.1;
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
                //collide = 'l';
            } else if (disY > 0 && disY > Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x += 0.1;
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
                //collide = 'l';
            }
        }
        if(Math.abs(disY) < m + 1 && Math.abs(disX) < m + 1)
            a = true;
    }
    map();
    player();
    if ((x < 400 && dx > 0) || (x > 600 && dx < 0))
        mapX += dx;
    else
        x -= dx;
    if ((y < 200 && dy > 0) || (y > 600 && dy < 0))
        mapY += dy;
    else
        y -= dy;
    
}
function GameOver() {
    var over = document.getElementById('Over');
    var body = $('body');
    const width = body.width();
    over.style.marginLeft = `${width / 2 - 202}px`;
    canvas.style.backgroundColor = 'black';
    canvas.style.transition = '2s';
    over.style.display = 'block';
    setTimeout(function() {
        canvas.style.transition = '0.1s';
        canvas.style.backgroundColor = 'rgb(213, 236, 255)';
        reset();
    }, 2000);
    // c.clearRect(0, 0, canvas.width, canvas.height)
}