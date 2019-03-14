
const test = Maze.empty(5, 5);
console.log(test);

const comparer = (x, y) =>  x[0] < y[0];

const hq = []
heapq.push(hq, [4, 'a'])
heapq.push(hq, [1, 'b'])
heapq.push(hq, [3, 'c'])
heapq.push(hq, [0, 'd'])
heapq.push(hq, [0, 'n'])
heapq.push(hq, [4, 'f'])
heapq.push(hq, [4, 'd'])
heapq.push(hq, [8, 'l'])

console.log(hq);
console.log(heapq.pop(hq));
console.log(heapq.pop(hq));
console.log(hq);


const WALL_SIZE = 20;

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