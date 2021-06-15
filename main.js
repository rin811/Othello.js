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
var whiteNum=63;
var blackNum=10;

var primaryColor="#121212";
var secondaryColor="#1F1B24";
var boardColor="#6BA32D";
var lineColor="#646464";
var textColor="#e2e2e2";

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
    
    drawGame();
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    drawGame();
}

// function draw(){
//     //background(0);
// }