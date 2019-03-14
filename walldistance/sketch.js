
const WALL_SIZE = 15;
const walls = [];

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    
    cnv.style('display', 'block');
    background(255);
    walls.push({x: 40, y:50});
}

function draw() {
    background(255);

    fill(0);
    for (const wall of walls) {
        rect(wall.x, wall.y, WALL_SIZE, WALL_SIZE);
    }
}