let walls = []
let rays = []
let caster
let xoff = 0
let yoff = 100
let margin = 10

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    walls.push(new Wall(margin, margin, margin, height - margin))
    walls.push(new Wall(width - margin, margin, width - margin, height - margin))
    walls.push(new Wall(margin, margin, width - margin, margin))
    walls.push(new Wall(margin, height - margin, width - margin, height - margin))
    walls.push(new Wall(400, 100, 400, height - 100))
    walls.push(new Wall(100, 100, 100, height - 100))
    walls.push(new Wall(400, 100, 400, height - 100))
    walls.push(new Wall(400, height / 2, width - 100, height / 2))
    walls.push(new Wall(100, 100, 400, 100))
    caster = new Caster(width / 2, height / 2, 36 * 2)
}

function draw() {
    background(255)
    for (let wall of walls) {
        wall.show()
    }
    //caster.update(mouseX, mouseY)
    caster.update(noise(xoff) * width, noise(yoff) * height)
    caster.cast(walls)

    xoff += 0.005;
    yoff += 0.005;
}