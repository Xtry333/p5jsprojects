const size = 5;
const ant = [];

class Point {
    //int x, y;
    Point(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Ant {
    constructor(pos, dir) {
        this.position = pos;
        this.direction = dir;
    }

    rotateLeft() {
        this.direction = this.direction - 1 >= 0 ? this.direction - 1 : 3;
    }

    rotateRight() {
        this.direction = this.direction + 1 <= 3 ? this.direction + 1 : 0;
    }

    move() {
        switch (this.direction % 4) {
            case 0: this.position.x += size; break;
            case 1: this.position.y += size; break;
            case 2: this.position.x -= size; break;
            case 3: this.position.y -= size; break;
        }
    }

    execCommand() {
        var cur = get(this.position.x, this.position.y);
        var col = [0, 0, 0, 0];
        function cmp (col) {
            var c = color(col).levels;
            return  256 * 256 * c[0] + 256 * c[1] + c[2];
        }
        switch (cmp(cur)) {
            case cmp('white'): this.rotateRight(); col = color('red'); break;
            case cmp('red'): this.rotateLeft(); col = color('brown'); break;
            case cmp('brown'): this.rotateLeft(); col = color('orange'); break;
            case cmp('orange'): this.rotateRight(); col = color('white'); break;
        }
        noStroke();
        fill(col);
        rect(this.position.x, this.position.y, size, size);
    }

    display() {
        point(this.position.x, this.position.y);
    }
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    background(255);
    for (var i = 0; i < 10; i++) {
        ant.push(new Ant(createVector(width/2, height/2), 0));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    //background(255);
    //guidelines();
}

function draw() {
    //background(255);
    for (a of ant) {
        a.move();
        a.execCommand();
    }
    //ant.display();
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