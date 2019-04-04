let lab = new Labirynth(57, 37);
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
    lab.get(15, 29 - i).value = 1;
}

for (let y = 0; y < lab.height; y++) {
    for (let x = 0; x < lab.width; x++) {
        //lab.get(x, y).cost = Math.random() * 10;
        lab.get(x, y).cost = Math.random() * UtilX.mandist([x, y], [lab.width/2, lab.height/2]);
        lab.get(x, y).value = Math.random() * UtilX.ndist([x, y], [lab.width/2, lab.height/2]) < 5;
    }
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);

    cnv.style('display', 'block');
    background(255);

    //frameRate(30);
}

let start = lab.get(0, 0)
let target = lab.get(56, 36)
let current = {
    id: 0,
    node: start,
    cost: 0
}
const openSet = []
const visited = []
heapq.push(openSet, {
    id: 0,
    node: start,
    cost: 0
})
let iterations = 0;

function drawGrid(lab) {
    for (let y = 0; y < lab.height; y++) {
        for (let x = 0; x < lab.width; x++) {
            const cell = lab.get(x, y)
            let drawn = 0
            strokeWeight(1)
            stroke(0)
            if (cell.value == 0) { // if cell just empty
                fill(200 + map(cell.cost, 0, 10, 50, 0));
            } else { // if cell is a wall
                fill(33);
                //drawn = 1
                //ellipse(x * lab.wallSize + lab.wallSize/2 + 5, y * lab.wallSize + lab.wallSize/2 + 5, lab.wallSize, lab.wallSize)
            }
            // if (visited.some(c => c.node.equals(cell))) // if it has been visited
            //     fill(150, 200, 255);
            if (openSet.some(c => c.node.equals(cell))) // if it is still to be examined, open set
                fill(255, 127, 0);
            if (current.node == cell) // if it is the cell we are looking at
                fill(0, 127, 255);
            if (!drawn)
                rect(5 + x * lab.wallSize, 5 + y * lab.wallSize, lab.wallSize, lab.wallSize);
        }
    }

    // noStroke()
    // fill(0)
    // textAlign(CENTER, CENTER)
    // visited.concat(openSet).forEach(e => {
    //     text(e.cost.toFixed(), lab.wallSize / 2 + 5 + e.node.x * lab.wallSize, lab.wallSize / 2 + 5 + e.node.y * lab.wallSize)
    // })

    strokeWeight(3)
    stroke(0, 127, 255)
    noFill()
    beginShape()
    for (let p of constructPath(current))
        vertex(p.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.node.y * lab.wallSize + lab.wallSize / 2 + 5)
    endShape()
    // let p = current
    // while (p.parent) {
    //     line(p.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.node.y * lab.wallSize + lab.wallSize / 2 + 5,
    //         p.parent.node.x * lab.wallSize + lab.wallSize / 2 + 5, p.parent.node.y * lab.wallSize + lab.wallSize / 2 + 5);
    //     p = p.parent
    // }

}

const constructPath = (current) => {
    const path = [current]
    let p = current
    while (p.parent) {
        p = p.parent
        path.push(p)
    }
    return path
}

let a = 1
let skip = 10

function draw() {
    background(255);
    drawGrid(lab)
    if (a)
        for (let i = 0; i < skip; i++) {
            //console.log(iterations++);
            current = heapq.pop(openSet)
            //current = openSet.shift()
            visited.push(current);

            if (current.node.equals(target)) {
                console.log("Found target.");
                a = 0
                return current;
            }

            if (current.node.isWall()) {
                console.log("Cannot find target.");
                a = 0
                return current;
            }

            let adjacent = lab.getAdjacent(current.node, null, false)
            for (const adj of adjacent) { // for each neighbor

                if (!visited.some(x => x.node.equals(adj)) /* && !openSet.some(x => x.node.equals(adj))*/ ) {
                    let moveCost = UtilX.ndist([current.node.x, current.node.y], [adj.x, adj.y])
                    let nodeInfo = {
                        id: current.cost + UtilX.ndist([adj.x, adj.y], [target.x, target.y]),
                        node: adj,
                        cost: current.cost + moveCost + adj.cost,
                        parent: current
                    }

                    let other = openSet.find(x => x.node.equals(adj))
                    if (other) {
                        if (other.cost > nodeInfo.cost) {
                            openSet.splice(openSet.indexOf(other), 1)
                        } else {
                            continue
                        }
                    }

                    heapq.push(openSet, nodeInfo);
                }
            }
            //a = 0
        }
}