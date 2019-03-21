class Labirynth {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = Labirynth.empty(width, height);
        this.wallSize = 20;
    };

    get(x, y) {
        return this.data[y][x];
    }

    getAdjacent(x, y) {
        const adjacent = [];
        if (x > 0) {
            adjacent.push(this.get(x - 1, y));
        }
        if (y > 0) {
            adjacent.push(this.get(x, y - 1));
        }
        if (x < width - 1) {
            adjacent.push(this.get(x + 1, y));
        }
        if (y < height - 1) {
            adjacent.push(this.get(x, y + 1));
        }
        return adjacent;
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

class Cell {
    constructor(x, y) {
        this._class = "Cell";
        this._x = x;
        this._y = y;
        this.value = 0;
    }
    get x() {
        return _x;
    }
    get y() {
        return _y;
    }
}