/**
 * Created by Son Nui on 5/18/2016.
 */
class Bomber{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = -1;
        this.speedX = 0;
        this.speedY = 0;
        this.speed = 2;
        this.maxBoom = 1;
        this.length = 32;
        this.sprite = new Animation(this.x, this.y,"george", 48, 48, 0, 4, 17, 48, 48);
        this.direction = 0;
        this.countBoom = 0;
        this.dead = false;
    }
    checkCollision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            return true;
        }
        return false;
    }
    levelUp(kind) {
        // console.log("helo");
        if (kind == 0)
            this.speed += 2;
        if (kind == 1)
            this.maxBoom++;
        if (kind == 2)
            this.length += 32;
    }
    update() {
        var isMove = true;
        var rect1 = {x:this.x+8 + this.speedX, y:this.y+8 + this.speedY, width:32, height:32};
        for (var i = 0; i < wallBrick.length; i++) {
            var rect2 = {x:wallBrick[i].x, y:wallBrick[i].y, width:32, height:32};
            if (this.checkCollision(rect1, rect2) == true) {
                isMove = false;
                break;
            }
        }
        for (var i = 0; i < wallWood.length; i++) {
            var rect2 = {x:wallWood[i].x , y:wallWood[i].y, width:32, height:32};
            if (this.checkCollision(rect1, rect2) == true) {
                isMove = false;
                break;
            }
        }
        for (var i = 0; i < giftArray.length; i++) {
            var rect2 = {x:giftArray[i].x , y:giftArray[i].y, width:32, height:32};
            if (this.checkCollision(rect1, rect2) == true) {
                // isMove = true
                this.levelUp(giftArray[i].kind);
                giftArray.splice(i,1);
                break;
            }
        }

        if (this.dead == true) {
            this.direction = 4;
        }
        if (isMove) {
            this.x += this.speedX;
            this.y += this.speedY;
            // this.x = Math.trunc(this.x / 4) * 4;
            // this.x = Math.trunc(this.y / 4) * 4;
        }
        if (this.speedX != 0 || this.speedY != 0 || this.dead == true) {
            var sx = this.x;
            var sy = this.y;
            if (this.speedX != 0)
                sx = Math.trunc(sx / 4) * 4;
            if (this.speedY != 0)
                sy = Math.trunc(sy / 4) * 4;
            this.sprite.update(sx, sy, this.direction);
        }
    }
    draw(context) {
        this.sprite.draw(context);
    }
    move(direction){
        if (this.dead == false) {
            switch (direction){
                case 1://up
                    this.speedY = -this.speed;
                    this.speedX = 0;
                    this.direction = 2;
                    break;
                case 2://down
                    this.speedY = this.speed;
                    this.speedX = 0;
                    this.direction = 0;
                    break;
                case 3://left
                    this.speedX = -this.speed;
                    this.speedY = 0;
                    this.direction = 1;
                    break;
                case 4://right
                    this.speedX = this.speed;
                    this.speedY = 0;
                    this.direction = 3;
                    break;
            }
        }
    }
    shot() {
        if (this.dead == false && this.countBoom < this.maxBoom && this.countBoom >= 0) {
            this.countBoom++;
            var sx = Math.trunc((this.x + 10) / 32) * 32;
            var sy = Math.trunc((this.y + 10) / 32) * 32;
            if ((this.x + 10) % 32 == 0 || (this.x + 10) % 32 > 12) sx += 32;
            if ((this.y + 10) % 32 == 0 || (this.y + 10) % 32 > 12) sy += 32;
            // console.log(sx + " " + sy);
            var bomb = new Bomb(sx, sy, this.length);
            bombArray.push(bomb);
        }
    }
}