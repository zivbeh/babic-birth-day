var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 800;
var x = 100;
var y = 100;
var dx = 0;
var dy = 0;
var size = 30;
var run = false;
var dir;
var maxSpeed = 4;
var hueRotate = 350;
var won = false;
var song = new Audio("SONG.mp3");
var oxx = 0;
//var collide;
var mapX = 0;
var mapY = 0;
var coins = 0;
var ox = 0;
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
        run = false;
        song.pause();
        ox = 0;
        x = 100;
        y = 100;
        dx = 0;
        dy = 0;
        oxx = 0;
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
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,2,0,0,3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,3,0,0,3,0,0,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,2,0,0,3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,3,0,0,2,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,2,0,0,3,0,0,3,1,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,3,0,0,2,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,2,0,0,3,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,3,0,0,3,0,0,2,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,2,0,0,3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
}

resetMap();
map();
reset();
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
            let v = 0;
            
            if (gy % 2 == 0){
                v = ox * 4;
            } else {
                v = ox * -4;
            };
            c.fillStyle = 'red';
            c.beginPath();
            c.arc(gx * 67 + 33.5 + mapX + v, gy * 67 + 33.5 + mapY, 20/2, 0, 2 * Math.PI);
            c.fill();
            c.stroke();
            collition.push({place: i - 1, x: gx * 67 + 33.5 + mapX + v, y: gy * 67 + 33.5 + mapY});
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
document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft") {
        dx = 3;
    } else if (event.key == "ArrowUp"){
        dy = 3;
    } else if (event.key == "ArrowRight") {
        dx = -3;
    } else if (event.key == "ArrowDown"){
        dy = -3;
    }
    if (event.key == 'r')
        reset();
});
document.addEventListener('keyup', function(event) {
    if (event.key == "ArrowLeft" && dx == 3)
        dx = 0;
    else if (event.key == "ArrowRight" && dx == -3)
        dx = 0;
    else if (event.key == "ArrowUp" && dy == 3)
        dy = 0;
    else if (event.key == "ArrowDown" && dy == -3)
        dy = 0;
});

function animate() {
    if (ox == 0)
        oxx = 1;
    else if (ox == 100)
        oxx = -1;
    ox += oxx;
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (run)
        requestAnimationFrame(animate)
    
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
        if(Math.abs(disY) < m2 && Math.abs(disX) < m2 && gameMap[xy.place] == 3) {
            gameMap[xy.place] = 0;
            collition.pop(xy.place);
            coins += 1;
            textcoins.textContent = coins; //here happy birth day if collected all coins!
            if(coins === 13){
                reset();
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
            } else if (disY < 0 && -disY > Math.abs(disX)) {
                while (Math.abs(disY) < m) {
                    y += 0.1;
                    disY = xy.y - y - size / 2;
                }
                dy = 0;
            } else if (disX > 0 && disY < Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x -= 0.1;
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
            } else if (disX < 0 && -disY < Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x += 0.1;
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
            } else if (disY > 0 && disY > Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x += 0.1;
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
            }
        }  
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
    canvas.style.transition = '3s';
    canvas.style.filter = 'brightness(0)';
    over.style.display = 'block';
    setTimeout(function() {
        canvas.style.transition = '0.3s';
        canvas.style.filter = 'brightness(1)';
        reset();
    }, 2500);
}