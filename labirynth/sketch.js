let lab = new Labirynth(30, 30);
lab.get(1, 1).value = 1;
lab.get(2, 2).value = 1;
lab.get(3, 2).value = 1;
lab.get(3, 0).value = 1;
lab.get(3, 3).value = 1;
lab.get(8, 1).value = 1;
lab.get(8, 2).value = 1;
lab.get(8, 3).value = 1;
lab.get(7, 4).value = 1;
lab.get(6, 5).value = 1;
lab.get(5, 5).value = 1;

for (let i = 0; i < 29; i++) {
    lab.get(15, 29-i).value = 1;
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);

    cnv.style('display', 'block');
    background(255);

    frameRate(30);
}

let start = lab.get(0, 0);
let target = lab.get(20, 20);
let current = start;
const openSet = [];
const visited = [];
heapq.push(openSet, {
    id: 0,
    node: start,
    moves: 0
});
let iterations = 0;

function drawGrid(lab) {
    for (let y = 0; y < lab.height; y++) {
        for (let x = 0; x < lab.width; x++) {
            const cell = lab.get(x, y)
            if (cell.value == 0) {
                fill(240);
            } else {
                fill(33);
            }
            if (visited.some(c => c.node == cell))
                fill(150, 200, 255);
            if (openSet.some(c => c.node == cell))
                fill(255, 127, 0);
            if (current.node == cell)
                fill(0, 127, 255);
            rect(5 + x * lab.wallSize, 5 + y * lab.wallSize, lab.wallSize, lab.wallSize);
        }
    }
    fill(100, 100, 155);
    //constructPath(visited).forEach(e => {
    //    rect(5 + e.node.x * lab.wallSize, 5 + e.node.y * lab.wallSize, lab.wallSize, lab.wallSize);
    //})

    // for (let i = 1; i < visited.length; i++) {
    //     line(visited[i].node.x * lab.wallSize + lab.wallSize / 2 + 5, visited[i].node.y * lab.wallSize + lab.wallSize / 2 + 5,
    //         visited[i].parent.node.x * lab.wallSize + lab.wallSize / 2 + 5, visited[i].parent.node.y * lab.wallSize + lab.wallSize / 2 + 5);
    // }

    let p = current
    while(p.parent) {
        line(p.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.node.y * lab.wallSize + lab.wallSize / 2 + 5,
            p.parent.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.parent.node.y * lab.wallSize + lab.wallSize / 2 + 5);
            p = p.parent
    }

    fill(0)
    textAlign(CENTER, CENTER)
    visited.forEach(e => {
        text(e.moves, lab.wallSize/2 + 5 + e.node.x * lab.wallSize, lab.wallSize/2 + 5 + e.node.y * lab.wallSize)
    })
}

const constructPath = (nodes) => {
    const path = [current]
    let p = current
    while(p.parent) {
        path.push(p)
        line(p.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.node.y * lab.wallSize + lab.wallSize / 2 + 5,
            p.parent.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.parent.node.y * lab.wallSize + lab.wallSize / 2 + 5);
            p = p.parent
    }
    return path
}

let a = 1

function draw() {
    background(255);
    drawGrid(lab);
    if (a) {
        //console.log(iterations++);
        current = heapq.pop(openSet);
        //while (previousCells.includes(current))
        //    current = heapq.pop(hq)
        visited.push(current);
        const prev = visited[visited.length - 2];
        fill(127);
        if (prev) {
        //     line(current.node.x * lab.wallSize + lab.wallSize / 2 + 5, current.node.y * lab.wallSize + lab.wallSize / 2 + 5,
        //         prev.x * lab.wallSize + lab.wallSize / 2 + 5, prev.y * lab.wallSize + lab.wallSize / 2 + 5);
        }

        if (current.node.equals(target)) {
            console.log(visited);
            console.log("Found target.");
            a = 0
            //noDraw();
            return current;
        }
        for (const adj of lab.getAdjacent(current.node)) {
            if (!visited.some(x => x.node == adj) && !openSet.some(x => x.node == adj)) {
                //console.log(adj);
                //hq.push({id: current.moves + current.node.dist(target), node: adj, moves: current.moves + 1});
                heapq.push(openSet, {
                    id: 1 + current.moves + UtilX.ndist([adj.x, adj.y], [target.x, target.y]),
                    node: adj,
                    moves: current.moves + 1,
                    parent: current
                });
            }
        }
        //a = 0
    }
}