//列挙定数
var discStat={
    empty : 0,
    black : 1,
    white : 2
}

var offset=10;
var boardStroke=5;
var cornerRound=10;

//スコアボード
var scoreSize=200;

//ゲーム内変数
var game;

var whiteNum=0;
var blackNum=0;

var primaryColor="#121212";
var secondaryColor="#1F1B24";
var boardColor="#6BA32D";
var lineColor="#646464";
var textColor="#e2e2e2";
var whiteDiskColor="#f6f5ff";

window.addEventListener("touchend", function(event){
    x=event.changedTouches[0].pageX;
    y=event.changedTouches[0].pageY;
    touched(x, y);
});

function preload(){
    font=loadFont('font/Roboto-Medium.ttf');
}

function setup(){
    createCanvas(windowWidth,windowHeight);

    game=new Othello();
    whiteNum=game.getDiskCount(discStat.white);
    blackNum=game.getDiskCount(discStat.black);
    textFont(font);
    drawGame();
}

function drawGame(){
    background(primaryColor);

    //ボード描画
    fill(secondaryColor);
    rect(offset, offset, windowWidth-offset*2, windowWidth-offset*2, cornerRound);
    fill(boardColor);
    rect(offset+boardStroke, offset+boardStroke, windowWidth-offset*2-boardStroke*2, windowWidth-offset*2-boardStroke*2, cornerRound);

    for(var i=0;i<8;i++){
        strokeWeight(3);
        stroke(secondaryColor);

        var foo=offset+boardStroke+(windowWidth-offset*2-boardStroke*2)/8*i;
        line(offset+boardStroke,foo,windowWidth-offset-boardStroke,foo);
        line(foo,offset+boardStroke,foo,windowWidth-offset-boardStroke);
    }

    //石の描画
    for(var y=0;y<8;y++){
        for(var x=0;x<8;x++){
            switch(game.board[x][y]){
                case discStat.white:
                    fill(whiteDiskColor);
                    break;
                case discStat.black:
                    fill(secondaryColor);
                    break;
                default:
                    break;
            }
            if(game.board[x][y]!=discStat.empty)
                circle(offset+boardStroke+(windowWidth-offset*2-boardStroke*2)/16+(windowWidth-offset*2-boardStroke*2)/8*x, offset+boardStroke+(windowWidth-offset*2-boardStroke*2)/16+(windowWidth-offset*2-boardStroke*2)/8*y, 100);
        }
    }

    //スコア表
    fill(secondaryColor);
    rect(offset,windowWidth,windowWidth-offset*2,scoreSize,10);
    stroke(lineColor);
    line(windowWidth/2,windowWidth + 10,windowWidth/2,windowWidth+scoreSize - 10);
    
    strokeWeight(0);
    fill(255,255,255);
    circle(offset*2+(scoreSize-50)/2,windowWidth+scoreSize/2,scoreSize-50);


    fill(textColor);
    textSize(40);
    textAlign(LEFT,TOP);
    text("White",offset*2+(scoreSize-50/2),windowWidth+offset*2);

    textSize(120);
    textAlign(LEFT,BOTTOM);
    text(whiteNum,offset*2+(scoreSize-50/2),windowWidth+scoreSize/2+(scoreSize-20)/2);

    fill(lineColor)
    textSize(70)
    text("/64",offset*2+(scoreSize-50/2)+75*2,windowWidth+scoreSize/2+(scoreSize-20)/2-15);

    //ターンじゃないほう
    fill(primaryColor);
    strokeWeight(5);
    circle(windowWidth/2+offset*2+(scoreSize-50)/2,windowWidth+scoreSize/2,scoreSize-50);

    strokeWeight(0);
    fill(textColor);
    textSize(40);
    textAlign(LEFT,TOP);
    text("Black",windowWidth/2+offset*2+(scoreSize-50/2),windowWidth+offset*2);

    textSize(120);
    textAlign(LEFT,BOTTOM);
    text(blackNum,windowWidth/2+offset*2+(scoreSize-50/2),windowWidth+scoreSize/2+(scoreSize-20)/2);

    fill(lineColor)
    textSize(70)
    text("/64",windowWidth/2+offset*2+(scoreSize-50/2)+75*2,windowWidth+scoreSize/2+(scoreSize-20)/2-15);

}

function gameInit(){
    //配列の初期化

}

function touched(x, y) {
    //置く処理


    drawGame();
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    drawGame();
}

// function draw(){
//     //background(0);
// }

class Othello{
    constructor(){
        this.init();
    }

    init(){
        this.board=new Array(8);
        for(var x=0;x<8;x++){
            this.board[x]=new Array(8);
            for(var y=0;y<8;y++){
                this.board[x][y]=discStat.empty;
            }
        }
        //初期配置をセット
        this.board[3][3]=discStat.white;
        this.board[4][4]=discStat.white;
        this.board[4][3]=discStat.black;
        this.board[3][4]=discStat.black;
    }

    getDiskCount(DiscStat){
        var count=0;
        for(var x=0;x<8;x++){
            for(var y=0;y<8;y++){
                if (this.board[x][y]==DiscStat)
                    count++;
            }
        }
        return count;
    }
}