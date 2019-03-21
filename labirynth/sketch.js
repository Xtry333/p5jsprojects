let lab = new Labirynth(10, 5);
lab.get(1,1).value = 1;
lab.get(2,2).value = 1;
lab.get(3,2).value = 1;
lab.get(3,0).value = 1;
lab.get(3,3).value = 1;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    
    cnv.style('display', 'block');
    background(255);

    frameRate(2);

    for (let y = 0; y < lab.height; y++) {
        for (let x = 0; x < lab.width; x++) {
            const cell = lab.get(x, y)
            if (cell.value == 0) {
                fill(240);
                rect(5 + x * lab.wallSize, 5 + y * lab.wallSize, lab.wallSize, lab.wallSize);
            } else {
                fill(33);
                rect(5 + x * lab.wallSize, 5 + y * lab.wallSize, lab.wallSize, lab.wallSize);
            }
            //if (cell.)
        }
    }
}

let start = lab.get(0,0);
let target = lab.get(9,4);
const hq = [];
const previousCells = [];
heapq.push(hq, [0, start, 0]);
let iterations = 0;

function draw() {
    //background(255); 
    console.log(iterations);
    const current = heapq.pop(hq);
    previousCells.push(current);
    console.log(current);
    fill(255,0,0);
    rect(5 + current[1].x * lab.wallSize, 5 + current[1].y * lab.wallSize, lab.wallSize, lab.wallSize);

    if (current[1].equals(target)) {
        console.log(previousCells);
        return current;
    }
    for (const adj of lab.getAdjacent(current[1])) {
        if (!previousCells.includes(adj)) {
            heapq.push(hq, [current[2] + current[1].dist(target), adj, current[2] + 1]);
        }
    }
    
}