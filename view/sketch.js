let viewX = 0
let viewY = 0
let pos = null
let viewOffset = null

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight)

    cnv.style('display', 'block')
    background(255)
    pos = createVector(0, 0)
}

function draw() {
    background(255)
    fill(0)

    viewOffset = createVector(0, 0)
    if (keyIsDown(65)) {
        viewOffset.x = -1
    }
    if (keyIsDown(68)) {
        viewOffset.x = 1
    }
    if (keyIsDown(87)) {
        viewOffset.y = -1
    }
    if (keyIsDown(83)) {
        viewOffset.y = 1
    }
    pos.add(viewOffset.normalize())

    rect(Math.round(pos.x), Math.round(pos.y), 50, 50)
    ellipse(mouseX, mouseY, 15, 15)
}

// function keyPressed() {
//     if (key == 'a') {
//         viewOffset.x--
//     } else if (key == 'd') {
//         viewOffset.x++
//     }
// }