WALL_SIZE = 20;

const walls = [];

class Labirynth {
    constructor(width, height) {
        this.maze = [];
        for (let y = 0; y < height; y++) {
            this.maze[y] = [];
            for (let x = 0; x < width; x++) {
                this.maze[y][x] = 1;
            }
        }
    }
}

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