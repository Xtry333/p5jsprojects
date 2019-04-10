function setup() {
    var cnv = createCanvas(windowWidth, windowHeight)

    cnv.style('display', 'block')
    background(255)
}

function draw() {
    background(255)
    fill(0)
    ellipse(mouseX, mouseY, 15, 15)
}