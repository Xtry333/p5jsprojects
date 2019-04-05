class Labirynth {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = Labirynth.empty(width, height);
        this.wallSize = 25;
        this.pathTarget = null;
    };

    get(x, y) {
        return this.data[y][x];
    }

    getAdjacent(x, y, allowDiagonals) {
        if (x._class === "Cell") {
            return this.getAdjacent(x.x, x.y, allowDiagonals);
        }
        const adjacent = [];

        if (x > 0) {
            adjacent.push(this.get(x - 1, y));
            adjacent[adjacent.length - 1].diag = false
        }
        if (x < this.width - 1) {
            adjacent.push(this.get(x + 1, y));
            adjacent[adjacent.length - 1].diag = false
        }
        if (y < this.height - 1) {
            adjacent.push(this.get(x, y + 1));
            adjacent[adjacent.length - 1].diag = false
        }
        if (y > 0) {
            adjacent.push(this.get(x, y - 1));
            adjacent[adjacent.length - 1].diag = false
        }
        if (allowDiagonals) {
            if (x > 0 && y > 0 && (this.get(x - 1, y).value == 0 || this.get(x, y - 1).value == 0)) {
                let p = this.get(x - 1, y - 1)
                p.diag = true
                adjacent.push(p)
            }
            if (x < this.width - 1 && y < this.height - 1 && (this.get(x + 1, y).value == 0 || this.get(x, y + 1).value == 0)) {
                let p = this.get(x + 1, y + 1)
                p.diag = true
                adjacent.push(p)
            }
            if (x > 0 && y < this.height - 1 && (this.get(x - 1, y).value == 0 || this.get(x, y + 1).value == 0)) {
                let p = this.get(x - 1, y + 1)
                p.diag = true
                adjacent.push(p)
            }
            if (x < this.width - 1 && y > 0 && (this.get(x + 1, y).value == 0 || this.get(x, y - 1).value == 0)) {
                let p = this.get(x + 1, y - 1)
                p.diag = true
                adjacent.push(p)
            }
        }

        return adjacent.filter(x => x.value == 0);
    }

    static empty(width, height, val) {
        if (!val) val = 0;
        const maze = [];
        for (let y = 0; y < height; y++) {
            maze.push([]);
            for (let x = 0; x < width; x++) {
                maze[y][x] = new Cell(x, y);
            }
        }
        return maze;
    };
}

class AStar {
    static constructPath(current) {
        const path = [current]
        let p = current
        while (p.parent) {
            p = p.parent
            path.push(p)
        }
        return path
    }

    static pathfind(lab, start, target) {
        const openSet = []
        const visited = []
        heapq.push(openSet, {
            id: 0,
            node: start,
            cost: 0
        })
        //console.log(iterations++);
        while (openSet.length > 0) {
            current = heapq.pop(openSet)
            //current = openSet.shift()
            visited.push(current);

            if (current.node.equals(target)) {
                console.log("Found target.");
                return AStar.constructPath(current);
            }

            if (current.node.isWall()) {
                console.log("Cannot find target.");
                return [];
            }

            let adjacent = lab.getAdjacent(current.node, null, true)
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
        }
        console.log("Cannot find target.");
        return [];
    }
}

class Cell {
    constructor(x, y) {
        this._class = "Cell";
        this._x = x;
        this._y = y;
        this.value = 0;
        this.wall = false
        this.cost = 0;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    isWall() {
        return this.wall
    }

    equals(target) {
        return this.x == target.x && this.y == target.y;
    }

    dist(target) {
        const dx = this.x - target.x;
        const dy = this.y - target.y;
        return target._class === "Cell" && Math.sqrt(dx * dx + dy * dy);
    }
}