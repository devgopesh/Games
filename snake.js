var myGamePiece, myObstacle, myScore, myGamePieceA, score = 0, k=1, j=1, i=1, l=1;

var left = document.getElementById("left"),
    right = document.getElementById("right"),
    up = document.getElementById("up"),
    down = document.getElementById("down");

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

startGame();

left.addEventListener("click", function(){
    if(myGamePiece.x < 450 ){
       myGamePiece.speedX = -1; 
       myGamePiece.speedY = 0;
    }
});

right.addEventListener("click", function(){
    if(myGamePiece.x > 0){
       myGamePiece.speedX = 1; 
       myGamePiece.speedY = 0;
    }
});

up.addEventListener("click", function(){
    if(myGamePiece.y < 240){
       myGamePiece.speedY = -1; 
       myGamePiece.speedX = 0;
    }
});

down.addEventListener("click", function(){
    if(myGamePiece.y > 0){
       myGamePiece.speedY = 1; 
       myGamePiece.speedX = 0;
    }
});

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    //myGamePiece.push(new component(30, 30, "red", 10, 120));
    myGamePieceA = new component();
    myObstacle  = new component(30, 30, "green", 300, 120); 
    myScore = new component("20px", "Consolas", "black", 300, 20, "text");
    myGameArea.start();
}

function component(width, height, color, x, y, type) {
    this.gamearea = myGameArea;
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 1;
    this.speedY = 0; 
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        myObstacle = new component(0, 0, "#f1f1f1", 0, 0);
        score++;
        var random = Math.floor(Math.random()*myGameArea.canvas.width),
            random1 = Math.floor(Math.random()*myGameArea.canvas.height);
        if (random > myGameArea.canvas.width - 30) 
            random-=30;
        if (random1 > myGameArea.canvas.height - 30) 
            random1-=30;
        myObstacle = new component(30, 30, "blue", random, random1);
        //myGamePiece.push(new component(30, 30, "red", myGamePiece[0].x-30, 120));
    }
    if(myGamePiece.x + 30 > myGameArea.canvas.width){
        k = 0;
        myGamePieceA = new component(30, 30, "red", myGamePiece.x-myGameArea.canvas.width, myGamePiece.y);
        if(myGamePiece.x === 480){
            myGamePiece = myGamePieceA;
            myGamePiece.speedY = 0;
            k = 1;
        }
    }
    if(myGamePiece.x < 0){
        j = 0;
        myGamePieceA = new component(30, 30, "red", myGameArea.canvas.width+myGamePiece.x, myGamePiece.y);
        if(myGamePiece.x === -30){
            myGamePiece = myGamePieceA;
            myGamePiece.speedX = -1;
            myGamePiece.speedY = 0;
            j = 1;
        }   
    }
    if(myGamePiece.y < 0){
        i = 0;
        myGamePieceA = new component(30, 30, "red", myGamePiece.x, myGameArea.canvas.height+myGamePiece.y);
        if(myGamePiece.y === -30){
            myGamePiece = myGamePieceA;
            myGamePiece.speedY = -1;
            myGamePiece.speedX = 0;
            i = 1;
        }
    }
    if(myGamePiece.y + 30 > myGameArea.canvas.height){
        l = 0;
        myGamePieceA = new component(30, 30, "red", myGamePiece.x, myGamePiece.y-myGameArea.canvas.height);
        if(myGamePiece.y === 270){
            myGamePiece = myGamePieceA;
            myGamePiece.speedY = 1;
            myGamePiece.speedX = 0;
            l = 1;
        }
    }
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1;myGamePiece.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; myGamePiece.speedY = 0;}
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; myGamePiece.speedX = 0;}
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; myGamePiece.speedX = 0;}
    myGameArea.clear();
    myObstacle.update();
    myScore.text="SCORE: " + score;
    myScore.update();
    myGamePiece.x += myGamePiece.speedX;
    myGamePiece.y += myGamePiece.speedY;  
    if (k === 0) {
        myGamePieceA.x+=1;
        myGamePieceA.update();
    }  
    else if (j === 0) {
        myGamePieceA.x-=1;
        myGamePieceA.update();
    }  
    else if (i === 0) {
        myGamePieceA.y-=1;
        myGamePieceA.update();
    } 
    else if (l === 0) {
        myGamePieceA.y+=1;
        myGamePieceA.update();
    } 
    /*for (var o =0;o  < myGamePiece.length; o++) {
        
        myGamePiece[o].update();
    } */ 
    myGamePiece.update();
}
