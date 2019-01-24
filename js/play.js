

var myGamePiece;
var myGamePiece2;
var myScore;


function startGame() {
    myGameArea.start();
    myGamePiece = new component(10, 10, "black", 660, 175);
    myGamePiece2 = new component(10, 10, "grey", 610, 175);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myMessage = new component();

}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1340;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}


function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.026;
    this.gravitySpeed = 0;
    this.bounce = 1;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }

    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }


    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

var myObstacles = [];
var myObstacles2 = [];

function updateGameArea() {
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i]) || myGamePiece2.crashWith(myObstacles[i]) ||
            myGamePiece.crashWith(myGamePiece2) || myGamePiece2.crashWith(myGamePiece)) {
            myGameArea.stop();
            document.getElementById("hide").style.display = "block";
        }

    }
    for (j = 0; j < myObstacles2.length; j += 1) {
        if (myGamePiece.crashWith(myGamePiece2) || myGamePiece2.crashWith(myGamePiece) ||
            myGamePiece.crashWith(myObstacles2[j]) || myGamePiece2.crashWith(myObstacles2[j])) {
            myGameArea.stop();
            document.getElementById("hide2").style.display = "block";
        }

    }

    myGameArea.frameNo += 1;
    myGameArea.clear();
    if (myGameArea.frameNo == 1 || everyinterval(60)) {
        dis1 = 1460;
        dis2 = -130;
        maxHeight = 40;
        minHeiight = 10;
        height = Math.floor(Math.random() * (maxHeight - minHeiight)) + minHeiight;
        myObstacles.push(new component(10, height, "red", dis1, 0));
        myObstacles2.push(new component(10, height, "red", dis2, height));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    for (j = 0; j < myObstacles2.length; j += 1) {
        myObstacles2[j].x += 1;
        myObstacles2[j].newPos();
        myObstacles2[j].update();
    }

    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.update();
    myGamePiece.newPos();
    myGamePiece2.update();
    myGamePiece2.newPos();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    myGamePiece2.speedX = 0;
    myGamePiece2.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 1; }
    myGamePiece.x += 0.08;
    if (myGameArea.keys && myGameArea.keys[65]) { myGamePiece2.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[68]) { myGamePiece2.speedX = 1; }
    myGamePiece2.x += 0.08;


}


function moveleft() {
    myGamePiece.speedX -= 1;
    myGamePiece2.speedX -= 1;
}

function moveright() {
    myGamePiece.speedX += 1;
    myGamePiece2.speed += 1;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    myGamePiece2.speedX = 0;
    myGamePiece2.speedY = 0;
}
