let lab = new Labyrinth(57, 37)
// lab.get(1, 1).value = 1;
// lab.get(2, 2).value = 1;
// lab.get(3, 2).value = 1;
// lab.get(3, 0).value = 1;
// lab.get(3, 3).value = 1;
// lab.get(8, 1).value = 1;
// lab.get(8, 2).value = 1;
// lab.get(8, 3).value = 1;
// lab.get(7, 4).value = 1;
// lab.get(6, 5).value = 1;
// lab.get(5, 5).value = 1;

// for (let i = 0; i < 29; i++) {
//     lab.get(15, 29 - i).value = 1;
// }

for (let y = 0; y < lab.height; y++) {
    for (let x = 0; x < lab.width; x++) {
        //lab.get(x, y).cost = Math.random() * 10;
        //lab.get(x, y).cost = Math.random() * UtilX.ndist([x, y], [lab.width / 2, lab.height / 2]);
        //lab.get(x, y).value = Math.random() * UtilX.ndist([x, y], [lab.width / 2, lab.height / 2]) < 3;
    }
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);

    cnv.style('display', 'block');
    background(255);

    //frameRate(30);
}

let start = lab.get(0, 0)
let target = lab.get(15, 15)
let pathfinder = new AStar(lab, start, target)

const showTheWay = (v) => {
    start = lab.get(UtilX.random(lab.width - 1), UtilX.random(lab.height - 1))
    while (start.isWall())
        start = lab.get(UtilX.random(lab.width - 1), UtilX.random(lab.height - 1))
    target = lab.get(UtilX.random(lab.width - 1), UtilX.random(lab.height - 1))
    while (target.isWall())
        target = lab.get(UtilX.random(lab.width - 1), UtilX.random(lab.height - 1))
    pathfinder = new AStar(lab, start, target)
    pathfinder.pathfind(v)
}

function drawGrid(lab) {
    for (let y = 0; y < lab.height; y++) {
        for (let x = 0; x < lab.width; x++) {
            const cell = lab.get(x, y)
            strokeWeight(1)
            stroke(0)
            if (cell.value == 0) { // if cell just empty
                fill(200 + map(cell.cost, 0, 10, 50, 0));
            } else { // if cell is a wall
                fill(33);
            }
            if (pathfinder.visited.some(c => c.node.equals(cell))) // if it has been visited
                fill(150, 200, 255);
            if (pathfinder.openSet.some(c => c.node.equals(cell))) // if it is still to be examined, open set
                fill(255, 127, 0);
            if (pathfinder.current && pathfinder.current.node == cell) // if it is the current cell
                fill(0, 127, 255);
            if (start == cell) // if it is starting node
                fill(0, 255, 153);
            if (target == cell) // if it is target node
                fill(153, 0, 0);
            rect(5 + x * lab.wallSize, 5 + y * lab.wallSize, lab.wallSize, lab.wallSize);
        }
    }

    // noStroke()
    // fill(0)
    // textAlign(CENTER, CENTER)
    // visited.concat(openSet).forEach(e => {
    //     text(e.cost.toFixed(), lab.wallSize / 2 + 5 + e.node.x * lab.wallSize, lab.wallSize / 2 + 5 + e.node.y * lab.wallSize)
    // })

    if (pathfinder) {
        strokeWeight(3)
        stroke(0, 127, 255)
        noFill()
        beginShape()
        for (let p of AStar.constructPath(pathfinder.current))
            vertex(p.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.node.y * lab.wallSize + lab.wallSize / 2 + 5)
        endShape()
        strokeWeight(1)
        for (let p of pathfinder.openSet) {
            beginShape()
            while (p.parent) {
                vertex(p.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.node.y * lab.wallSize + lab.wallSize / 2 + 5)
                p = p.parent
            }
            endShape()
        }
    }
    // let p = current
    // while (p.parent) {
    //     line(p.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.node.y * lab.wallSize + lab.wallSize / 2 + 5,
    //         p.parent.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.parent.node.y * lab.wallSize + lab.wallSize / 2 + 5);
    //     p = p.parent
    // }

}
const queue = []
let cell = lab.get(Math.floor(Math.random() * lab.width), Math.floor(Math.random() * lab.height))
let prev = cell
cell.value = 0
queue.push(cell)

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

let counter = 0
function draw() {
    background(255)
    drawGrid(lab)

    if (counter++ > 60) {
        showTheWay(5)
        counter = 0
    }

    prev = cell
    cell = randomElement(lab.getAdjacent(cell).filter(x => x.value == 1)) || randomElement(queue)
    if (lab.getAdjacent(cell).filter(x => x.value == 0).length == 1) {
        queue.push(cell)
        cell.value = 0
    } else {
        cell = randomElement(queue)
        //UtilX.removeElement(queue, cell)
    }

    UtilX.removeIf(queue, (c) => lab.getAdjacent(c).filter(x => x.value == 1).length == 0)
    // let d = Math.floor(Math.random() * lab.getAdjacent(cell).length)

    // cell = queue[Math.floor(Math.random() * queue.length)]

    // if (lab.getAdjacent(cell).filter(c => c.value == 1).length > 2) {
    //     let cells = lab.getAdjacent(cell).filter(c => c.value == 1)
    //     d = Math.floor(Math.random() * cells.length)
    //     cell = cells[d]
    //     cell = cells[d]
    //     cell.value = 0
    //     queue.push(cell)
    // }


    // if (a)
    //     for (let i = 0; i < skip; i++) {
    //         //console.log(iterations++);
    //         current = heapq.pop(openSet)
    //         //current = openSet.shift()
    //         visited.push(current);

    //         if (current.node.equals(target)) {
    //             console.log("Found target.");
    //             a = 0
    //             return current;
    //         }

    //         if (current.node.isWall()) {
    //             console.log("Cannot find target.");
    //             a = 0
    //             return current;
    //         }

    //         let adjacent = lab.getAdjacent(current.node, null, false)
    //         for (const adj of adjacent) { // for each neighbor

    //             if (!visited.some(x => x.node.equals(adj)) /* && !openSet.some(x => x.node.equals(adj))*/ ) {
    //                 let moveCost = UtilX.ndist([current.node.x, current.node.y], [adj.x, adj.y])
    //                 let nodeInfo = {
    //                     id: current.cost + UtilX.ndist([adj.x, adj.y], [target.x, target.y]),
    //                     node: adj,
    //                     cost: current.cost + moveCost + adj.cost,
    //                     parent: current
    //                 }

    //                 let other = openSet.find(x => x.node.equals(adj))
    //                 if (other) {
    //                     if (other.cost > nodeInfo.cost) {
    //                         openSet.splice(openSet.indexOf(other), 1)
    //                     } else {
    //                         continue
    //                     }
    //                 }

    //                 heapq.push(openSet, nodeInfo);
    //             }
    //         }
    //         //a = 0
    //     }
}