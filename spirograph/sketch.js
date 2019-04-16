var iter = 0;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    background(0);
    guidelines();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(255);
    //guidelines();
}

var l = 150;
var l2 = 50;
var rad2 = 100;

function draw() {
    //background(255);
    stroke(250,200,0);
    if (iter >= 360) {
        //background(255);
        //iter = 0;
        l = 130;
        rad2 = 75;
        stroke(255,255,0)
        if (iter >= 360 * 2) {
            l = 80;
            rad2 = 50;
            l2 = 35;
            stroke(255);
            if (iter >= 360 * 3) {
                return;
            }
        }
    }
    //for (var i = 0; i < 360; i++) {
    push();
    translate(width / 2, height / 2);
    rotate(radians(iter));
    //stroke(0);
    //line(0, 0, 150, 0);
    push();
    translate(l, 0);
    rotate(radians(-iter * 4));
    //line(-80, 0, 80, 0);
    noFill();
    //ellipse(0, 0, 160, 160);
    //noStroke();
    //fill(random(255));
    //ellipse(-50, 0, 5, 5);
    push();
    translate(-rad2, 0);
    rotate(radians(-iter * 4));
    rotate(radians(iter * 8));
    line(-l2, 0, l2, 0);
    pop();
    push();
    translate(rad2, 0);
    rotate(radians(-iter * 4));
    rotate(radians(iter * 8));
    line(-l2, 0, l2, 0);
    pop();
    pop();
    pop();
    //}
    iter += .5;

}

function guidelines() {
    // #region Guidelines
    stroke(0);
    line(5, 15, width - 5, 15);
    line(5, 10, 5, 20);
    line(width - 5, 10, width - 5, 20);

    line(15, 5, 15, height - 5);
    line(10, 5, 20, 5);
    line(10, height - 5, 20, height - 5);
    noStroke();
    fill(0);
    textAlign(CENTER);
    text(width, width / 2, 30);
    textAlign(LEFT);
    text(height, 30, height / 2);
    // #endregion 
}