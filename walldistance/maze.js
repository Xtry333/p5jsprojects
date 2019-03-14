


class Maze {
    static empty(width, height) {
        const maze = [];
        for (let y = 0; y < height; y++) {
            maze.push([]);
            for (let x = 0; x < width; x++) {
                maze[y][x] = 0;
            }
        }
        return maze;
    };
}

export default Maze