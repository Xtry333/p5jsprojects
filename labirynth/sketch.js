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
const closedSet = [];
const openSet = [];
const visited = [];
const nextSet = []
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
            if (visited.includes(cell))
                fill(150, 200, 255);
            if (openSet.some(c => c.node == cell))
                fill(255, 127, 0);
            if (current.node == cell)
                fill(0, 127, 255);
            rect(5 + x * lab.wallSize, 5 + y * lab.wallSize, lab.wallSize, lab.wallSize);
        }
    }
}
let a = 1

function draw() {
    background(255);
    drawGrid(lab);

    fill(0)
    if (current.node) {
        line(current.node.x * lab.wallSize + lab.wallSize / 2 + 5, current.node.y * lab.wallSize + lab.wallSize / 2 + 5, mouseX, mouseY);
        //text((UtilX.ndist([mouseX, mouseY], [target.x * lab.wallSize + lab.wallSize / 2 + 5, target.y * lab.wallSize + lab.wallSize / 2 + 5])/20).toFixed(), mouseX, mouseY)
        text((dist(mouseX, mouseY, target.x * lab.wallSize + lab.wallSize / 2 + 5, target.y * lab.wallSize + lab.wallSize / 2 + 5)/20).toFixed(), mouseX, mouseY)
    }
    if (a) {
        //console.log(iterations++);
        current = heapq.pop(openSet);
        //while (previousCells.includes(current))
        //    current = heapq.pop(hq)
        visited.push(current.node);
        const prev = visited[visited.length - 2];
        fill(127);
        if (prev) {
            line(current.node.x * lab.wallSize + lab.wallSize / 2 + 5, current.node.y * lab.wallSize + lab.wallSize / 2 + 5,
                prev.x * lab.wallSize + lab.wallSize / 2 + 5, prev.y * lab.wallSize + lab.wallSize / 2 + 5);
        }


        if (current.node.equals(target)) {
            console.log(visited);
            console.log("Found target.");
            a = 0
            //noDraw();
            return current;
        }
        for (const adj of lab.getAdjacent(current.node)) {
            if (!visited.includes(adj) && !openSet.some(x => x.node == adj)) {
                //console.log(adj);
                //hq.push({id: current.moves + current.node.dist(target), node: adj, moves: current.moves + 1});
                heapq.push(openSet, {
                    id: 1.0 * current.moves + UtilX.ndist([adj.x, adj.y], [target.x, target.y]),
                    node: adj,
                    moves: current.moves + 1
                });
            }
        }
        //a = 0
    }
}