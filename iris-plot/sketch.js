
let easycam
let table
let spread = 500

function preload() {
    table = loadTable('iris-data.csv', 'csv', 'header');

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    easycam.setViewport([0, 0, windowWidth, windowHeight]);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL)
    easycam = createEasyCam()
}

function draw() {
    //orbitControl();
    translate(-250, -250)
    background(0)
    for (let row of table.rows) {
        const el = row.arr
        fill(el[4] * 255, el[5] * 255, el[6] * 255)
        stroke(127)
        strokeWeight(.1)
        push();
        translate(el[0] * spread, el[1] * spread, el[2] * spread);
        sphere(el[3] * 5 + 10);
        pop();
    }
}