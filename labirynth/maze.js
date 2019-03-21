class Labirynth {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = Labirynth.empty(width, height);
        this.wallSize = 25;
    };

    get(x, y) {
        return this.data[y][x];
    }

    getAdjacent(x, y) {
        if (x._class === "Cell") {
            return this.getAdjacent(x.x, x.y);
        }
        const adjacent = [];

        if (x > 0) {
            adjacent.push(this.get(x - 1, y));
        }
        if (y > 0) {
            adjacent.push(this.get(x, y - 1));
        }
        if (x < this.width - 1) {
            adjacent.push(this.get(x + 1, y));
        }
        if (y < this.height - 1) {
            adjacent.push(this.get(x, y + 1));
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
    static pathfind(lab, start, target) {
        if (target.value == 1) {
            return "Target unreachable";
        }
        const hq = [];
        const previousCells = [];
        heapq.push(hq, [0, start, 0]);
        let iterations = 0;
        while (hq.length > 0 && iterations++ < 50) {
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
    }
}

class Cell {
    constructor(x, y) {
        this._class = "Cell";
        this._x = x;
        this._y = y;
        this.value = 0;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
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