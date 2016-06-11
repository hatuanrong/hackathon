/**
 * Created by Son Nui on 5/16/2016.
 */
var wallBrick = new Array();
var wallWood = new Array();

var bombArray = [];
var fireArray = [];
var giftArray = [];
var context;
window.onload = function () {
    var canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    // context.fillStyle = "#FFFFFF";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    // // gameDrawer(context);
    gameStart();
    // drawMap(context);
    //
    // initSocketClient();
    gameDrawer(context);
    setInterval(gameLoop, 17);

};
var player;
var startX, startY;
function randomStart() {
    startX = 0; startY = 0;
    do{
        startX = Math.trunc(Math.random() * 20);
        startY = Math.trunc(Math.random() * 20);
    }while  (startX < 1 || startX > 18 || startY < 1 || startY > 18 || map[startX][startY] != 0);

    // console.log(startX + " " +startY + " " +map[startY][startX]);
    startX *= 32;
    startY *= 32;
    startX -= 8;
    startY -= 8;
}
function gameStart() {
    var sound = new Sound("game");
    sound.play();
    randomStart();
    player = new Bomber(startX, startY);
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            if (map[i][j] == 1) {
                // console.log("brick");
                var brick = new Brick(i, j);
                wallBrick.push(brick);
            }else if (map[i][j] == 2) {
                // console.log("steel");
                var wood = new Wood(i, j);
                wallWood.push(wood);
            }else if (map[i][j] == 3) {
                var wood = new Wood(i, j);
                wallWood.push(wood);
            }

        }
    }
}

var gameLoop = function () {
    // console.log(giftArray.length);
    gameUpdate();
    gameDrawer(context);
};

function gameDrawer(context) {
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = 'white';
    
    for (var i = 0; i < fireArray.length; i++) {
        fireArray[i].draw(context);
    }
    for (var i = 0; i < wallBrick.length; i++) {
        wallBrick[i].draw(context);
    }
    for (var i = 0; i < giftArray.length; i++) {
        giftArray[i].draw(context);
    }
    for (var i = 0; i < wallWood.length; i++) {
        wallWood[i].draw(context);
    }
    player.draw(context);
    for (var i = 0; i < bombArray.length; i++) {
        bombArray[i].draw(context);
    }
};
function gameUpdate() {
    player.update();
    for (var i = 0; i < bombArray.length; i++) {
        bombArray[i].update();
        if (bombArray[i].checkBlowUp()) {
            player.countBoom--;
            bombArray[i].blowUp();
            bombArray.splice(i, 1);
        }
    }
    for (var i = 0; i < fireArray.length; i++) {
        fireArray[i].update();
        fireArray[i].kill();
        if (fireArray[i].checkDone()) {
            fireArray.splice(i,1);
        }
    }
}

window.onkeydown = function (e) {
    switch (e.keyCode) {
        case 65:
            player.move(3);
            break;
        case 68:
            player.move(4);
            break;
        case 87:
            player.move(1);
            break;
        case 83:
            player.move(2);
            break;
        case 32:
            player.shot();
            break;
    }
};

window.onkeyup = function (e) {
    switch (e.keyCode){
        case 65://a
            if(player.speedX < 0){
                player.speedX = 0;
            }
            break;
        case 68://d
            if(player.speedX > 0){
                player.speedX = 0;
            }
            break;
        case 83://s
            if(player.speedY > 0){
                player.speedY = 0;
            }
            break;
        case 87://w
            if(player.speedY < 0){
                player.speedY = 0;
            }
            break;
    }
};