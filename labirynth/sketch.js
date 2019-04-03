let lab = new Labirynth(30, 30);
lab.get(1,1).value = 1;
lab.get(2,2).value = 1;
lab.get(3,2).value = 1;
lab.get(3,0).value = 1;
lab.get(3,3).value = 1;
lab.get(8,1).value = 1;
lab.get(8,2).value = 1;
lab.get(8,3).value = 1;
lab.get(7,4).value = 1;
lab.get(6,5).value = 1;
lab.get(5,5).value = 1;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    
    cnv.style('display', 'block');
    background(255);

    frameRate(30);

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

let start = lab.get(9,9);
let target = lab.get(20,20);
const openSet = [];
const closedSet = [];
const hq = [];
const previousCells = [];
const nextSet = []
heapq.push(hq, {id: 0, node: start, moves: 0});
let iterations = 0;

function draw() {
    //background(255); 
    //console.log(iterations++);
    const current = heapq.pop(hq);
    //nextSet.
    //const current = hq.shift();
    //nextSet.shift()
    previousCells.push(current.node);
    //console.log(current);
    fill(255,0,0);
    rect(5 + current.node.x * lab.wallSize, 5 + current.node.y * lab.wallSize, lab.wallSize, lab.wallSize);
    const prev = previousCells[previousCells.length - 2];
    fill(127);
    if (prev) {
        line(current.node.x * lab.wallSize + lab.wallSize/2 + 5, current.node.y * lab.wallSize + lab.wallSize/2 + 5,
             prev.x * lab.wallSize + lab.wallSize/2 + 5, prev.y * lab.wallSize + lab.wallSize/2 + 5);
    }
    if (current.node.equals(target)) {
        console.log(previousCells);
        console.log("Found. Crashing loop.");
        noDraw();
        return current;
    }

    for (const adj of lab.getAdjacent(current.node)) {
        if (!previousCells.includes(adj) && ! hq.includes(x => x.node == adj) && !nextSet.includes(adj)) {
            //console.log(adj);
            //hq.push({id: current.moves + current.node.dist(target), node: adj, moves: current.moves + 1});
            nextSet.push(adj)
            heapq.push(hq, {id: current.moves + current.node.dist(target), node: adj, moves: current.moves + 1});
        }
    }
    
}