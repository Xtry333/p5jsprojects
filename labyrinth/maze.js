class Labyrinth {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = Labyrinth.empty(width, height, 1);
        this.wallSize = 25;
        this.pathTarget = null;
    };

    get(x, y) {
        return this.data[y][x];
    }

    getAdjacent(x, y, allowDiagonals) {
        if (!x) return []
        if (x._class === "Cell") {
            return this.getAdjacent(x.x, x.y, allowDiagonals);
        }
        const adjacent = [];

        if (x > 0) {
            adjacent.push(this.get(x - 1, y));
        }
        if (x < this.width - 1) {
            adjacent.push(this.get(x + 1, y));
        }
        if (y < this.height - 1) {
            adjacent.push(this.get(x, y + 1));
        }
        if (y > 0) {
            adjacent.push(this.get(x, y - 1));
        }
        if (allowDiagonals) {
            if (x > 0 && y > 0 && (this.get(x - 1, y).value == 0 || this.get(x, y - 1).value == 0)) {
                let p = this.get(x - 1, y - 1)
                adjacent.push(p)
            }
            if (x < this.width - 1 && y < this.height - 1 && (this.get(x + 1, y).value == 0 || this.get(x, y + 1).value == 0)) {
                let p = this.get(x + 1, y + 1)
                adjacent.push(p)
            }
            if (x > 0 && y < this.height - 1 && (this.get(x - 1, y).value == 0 || this.get(x, y + 1).value == 0)) {
                let p = this.get(x - 1, y + 1)
                adjacent.push(p)
            }
            if (x < this.width - 1 && y > 0 && (this.get(x + 1, y).value == 0 || this.get(x, y - 1).value == 0)) {
                let p = this.get(x + 1, y - 1)
                adjacent.push(p)
            }
        }

        return adjacent;
    }

    getNeighbors(x, y) {
        if (!x) return []
        if (x._class === "Cell") {
            return this.getNeighbors(x.x, x.y);
        }
        const adjacent = [];

        if (x > 1) {
            adjacent.push(this.get(x - 2, y));
        }
        if (x < this.width - 2) {
            adjacent.push(this.get(x + 2, y));
        }
        if (y < this.height - 2) {
            adjacent.push(this.get(x, y + 2));
        }
        if (y > 1) {
            adjacent.push(this.get(x, y - 2));
        }
        return adjacent;
    }

    static empty(width, height, val) {
        if (!val) val = 0;
        const maze = [];
        for (let y = 0; y < height; y++) {
            maze.push([]);
            for (let x = 0; x < width; x++) {
                let c = new Cell(x, y)
                c.value = val
                maze[y][x] = c
            }
        }
        return maze;
    };
}

const Direction = {}
Direction.Right = 1
Direction.Down = 2
Direction.Left = 4
Direction.Up = 8

class AStar {
    static constructPath(current) {
        const path = [current]
        let p = current
        if (!p) return []
        while (p.parent) {
            p = p.parent
            path.push(p)
        }
        return path
    }

    constructor(lab, start, target) {
        this.lab = lab
        this.start = start
        this.target = target
        this.openSet = []
        this.visited = []
        this.current = null
    }

    async pathfind(skipWhen, allowDiagonals) {
        const lab = this.lab
        const start = this.start
        const target = this.target
        const openSet = this.openSet
        const visited = this.visited
        let skip = 0
        heapq.push(openSet, {
            id: 0,
            node: start,
            cost: 0
        })
        //console.log(iterations++);
        while (openSet.length > 0) {
            this.current = heapq.pop(openSet)
            visited.push(this.current);

            if (this.current.node.equals(target)) {
                console.log("Found target.");
                return AStar.constructPath(this.current);
            }

            if (this.current.node.isWall()) {
                console.log("Cannot find target.");
                return [];
            }

            let adjacent = lab.getAdjacent(this.current.node, null, allowDiagonals).filter(x => x.value == 0)
            for (const adj of adjacent) { // for each neighbor

                if (!visited.some(x => x.node.equals(adj)) /* && !openSet.some(x => x.node.equals(adj))*/) {
                    let moveCost = UtilX.ndist([this.current.node.x, this.current.node.y], [adj.x, adj.y])
                    let nodeInfo = {
                        id: this.current.cost + UtilX.ndist([adj.x, adj.y], [target.x, target.y]),
                        node: adj,
                        cost: this.current.cost + moveCost + adj.cost,
                        parent: this.current
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
            if (skipWhen && skip++ >= skipWhen) {
                skip = 0
                await UtilX.sleep(5)
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
        return this.value === 1
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