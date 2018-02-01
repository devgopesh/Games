//DRAW CANVAS BODY
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//STARTING OF GAME
restart();
function restart(){
    var myGamePiece = new Array(), myObstacle, myScore, score = 0, mySnake;
    var d = 0, l = 0, u = 0, r = 1;
    var left = document.getElementById("left"),
        right = document.getElementById("right"),
        up = document.getElementById("up"),
        down = document.getElementById("down");
    var myGameArea = {
        start : function() {
            this.interval = setInterval(updateGameArea, 60);
            window.addEventListener('keydown', function (e) {
                myGameArea.key = e.keyCode;
            })
            window.addEventListener('keyup', function (e) {
                myGameArea.key = false;
            })
        },
        clear : function() {
            ctx.clearRect(0, 0, 450, 450);
        },
        clearinterval : function() {
            this.interval = clearInterval(this.interval);
        }
    }

    startGame();

    //BUTTON MOVEMENT
    left.addEventListener("click", function(){
        if (r === 0) {
            l = 1;
            r = u = d = 0;
        }
    });

    right.addEventListener("click", function(){
        if (l === 0) {
            r = 1;
            l = u = d = 0;
        }
    });

    up.addEventListener("click", function(){
        if (d === 0) {
            u = 1;
            l = r = d = 0;
        }
    });

    down.addEventListener("click", function(){
        if (u === 0) {
            d = 1;
            l = u = r = 0;
        }
    });

    function startGame() {
        for (var i=4; i>=0; i--) {
            myGamePiece.push({
                x : i,
                y : 0
            });
        }
        var random = Math.floor((Math.random()*44)),
            random1 = Math.floor((Math.random()*44));
        myObstacle = new component(10, 10, "blue", random*10, random1*10);
        myScore = new component("20px", "Consolas", "black", 300, 20, "text");
        myGameArea.start();
    }

    function component(width, height, color, x, y, type) {
        this.gamearea = myGameArea;
        this.type = type;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;    
        this.update = function(){
            if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }

    //CHECK COLLISON WITH SNAKE BODY
    checkCollison = function(x, y, array){
        for(var i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
                return true;
        } 
        return false;
    }

    function updateGameArea() {
        var snakex = myGamePiece[0].x;
        var snakey = myGamePiece[0].y;

        if (r === 1) {
            snakex++;
        }  
        else if (u === 1) {
            snakey--;
        }  
        else if (d === 1) {
            snakey++;
        } 
        else if (l === 1) {
            snakex--;
        } 
        
        if (myGameArea.key && myGameArea.key == 37) {
            if (r === 0) {
                l = 1;
                r = u = d = 0;
            }
        }
        if (myGameArea.key && myGameArea.key == 39) {
            if (l === 0) {
                r = 1;
                l = u = d = 0;
            }
        }
        if (myGameArea.key && myGameArea.key == 38) {
            if (d === 0) {
                u = 1;
                l = r = d = 0;
            }
        }
        if (myGameArea.key && myGameArea.key == 40) {
            if (u === 0) {
                d = 1;
                l = u = r = 0;
            }
        }

        //COLLISON WITH ITSELF
        if (checkCollison(snakex, snakey, myGamePiece)) {
            myGameArea.clear();
            k=1;
            myGameArea.clearinterval();
            var retVal = confirm("Your score is " + score + "\nDo you want to continue the game ?");
            if( retVal == true ){
                restart();
            }
        }

        //MAKING THE SNAKE APPEAR IF IT CROSSES THE WALL
        if (snakex === 45) {
        	snakex = 0;
        	snakey = myGamePiece[0].y;
        }
        else if (snakex === -1) {
        	snakex = 45;
        	snakey = myGamePiece[0].y;
        }
        else if (snakey === 45) {
        	snakex = myGamePiece[0].x;
        	snakey = 0;
        }
        else if (snakey === -1) {
        	snakex = myGamePiece[0].x;
        	snakey = 45;
        }

        //EATING OF FOOD(myObstacle=FOOD)
        if (snakex === myObstacle.x/10 && snakey === myObstacle.y/10) {
            myObstacle = new component(0, 0, "#f1f1f1", 0, 0);
            score++;
            var random = Math.floor((Math.random()*44)),
                random1 = Math.floor((Math.random()*44));
            myObstacle = new component(10, 10, "blue", random*10, random1*10);
            myGamePiece.unshift({
                x : snakex,
                y : snakey
            });
        }
        else {
            var tail = myGamePiece.pop();
            tail.x = snakex;
            tail.y = snakey;
            myGamePiece.unshift(tail);
        }
       
        myGameArea.clear();
        myObstacle.update();
        myScore.text="SCORE: " + score;
        myScore.update();
        for (var o = 0; o < myGamePiece.length; o++) {
            mySnake = new component(10, 10, "red", myGamePiece[o].x*10, myGamePiece[o].y*10);
            mySnake.update();
        }  
    }
}