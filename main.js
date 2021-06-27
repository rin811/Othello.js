//p5
//p5.disableFriendlyErrors = true;

//列挙定数
const discStat={
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
    pixelDensity(2);
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

    //おけるところを表示
    for(let x=0;x<8;x++){
        for(let y=0;y<8;y++){
            if(game.getCanFlipAllDirection(x,y)){
                fill(255,255,255);
                rect(offset+boardStroke+(windowWidth-(offset+boardStroke)*2)/8*x,
                offset+boardStroke+(windowWidth-(offset+boardStroke)*2)/8*y,
                (windowWidth-(offset+boardStroke)*2)/8,(windowWidth-(offset+boardStroke)*2)/8);
            }
        }
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
    //タッチ判定
    //ボード中の場合
    if(offset+boardStroke<x && y<windowWidth-(offset+boardStroke) && offset+boardStroke<y && y<windowWidth-(offset+boardStroke)){
        normalizedX=x-(offset+boardStroke);
        normalizedY=y-(offset+boardStroke);
        boardX=Math.floor(normalizedX/((windowWidth-offset*2-boardStroke*2)/8));//押された位置
        boardY=Math.floor(normalizedY/((windowWidth-offset*2-boardStroke*2)/8));
        game.putDisk(boardX, boardY);
    }

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
        this.directionX={
            LEFT : -1,
            RIGHT : 1
        }
        this.directionY={
            UP : -1,
            DOWN : 1
        }
        
        this.init();
        this.turn=discStat.black;
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

    putDisk(x, y){
        //置けるか確認
        //置く
        if(this.getCanFlipAllDirection(x,y)){
            this.board[x][y]=this.turn;
            this.turn=this.getTurnInvert();
        }
            
    }

    scanBoard(){//石がおける場所を配列で返す
        
    }

    getTurnInvert(){
        if(this.turn==discStat.black)
            return discStat.white;
        else
            return discStat.black;
    }

    getCanFlip(x,y,vecX=0,vecY=0){
        //配列の範囲内かチェック 返せないならreturn null 返せたらそこまでの距離を数値にして返す
        if(0<=x+vecX && x+vecX<=7 && 0<=y+vecY && y+vecY<=7){
            if(this.board[x+vecX][y+vecY]==this.getTurnInvert()){
                for(let i=2;0<=x+vecX*i && x+vecX*i<=7 && 0<=y+vecY*i && y+vecY*i<=7;i++){
                    if(this.board[x+vecX*i][y+vecY*i]==discStat.empty)
                        return null;
                    if(this.board[x+vecX*i][y+vecY*i]==this.turn)
                        return i;
                }
            }
        }
        return null;
    }

    getCanFlipAllDirection(x,y){
        let vecX360=[-1,1,0,0,-1,-1,1,1];
        let vecY360=[0,0,-1,1,-1,1,-1,1];
        for(let i=0;i<8;i++){
            if(this.getCanFlip(x,y,vecX360[i],vecY360[i])!=null && this.board[x][y]==discStat.empty)
                return true;
        }
        return false;
    }
}