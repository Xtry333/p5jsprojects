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


let lab = new Labirynth(30, 30)

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    
    cnv.style('display', 'block');
    background(255);
}

function draw() {
    background(255);

    fill(230);
    for (let y = 0; y < lab.height; y++) {
        for (let x = 0; x < lab.width; x++) {
            if (lab.get(x, y).value == 0) {
                rect(5 + x * lab.wallSize, 5 + y * lab.wallSize, lab.wallSize, lab.wallSize);
                //fill(127);
                //rect(5 + x * lab.wallSize+1, 5 + y * lab.wallSize+1, lab.wallSize-2, lab.wallSize-2);
            }
        }
    }
}