let pointer;
const points = [];
let prev = null;
let totalCount = 0;
let params = {};

const defaultParams = {
    elements: 3,
    margin: 10,
    randomStart: false,
    allowRepeats: true,
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    init({elements: 3, allowRepeats: true, randomStart: false});
}

function draw() {
    stroke(0, 67);
    strokeWeight(1);
    for (let i = 0; i < 500; i++) {
        let next = random(points);
        if (params.allowRepeats || next !== prev) {
            pointer.lerp(next, 0.5);
            totalCount++;
            point(pointer.x, pointer.y);
        }
        prev = next;
    }
}

function init(p) {
    Object.assign(params, defaultParams);
    if (p) Object.assign(params, p);
    background(255);
    stroke(0);
    strokeWeight(4);
    totalCount = 0;
    points.splice(0);
    for (let i = 0; i < params.elements; i++) {
        const size = min(width / 2, height / 2) - (params.margin || 10);
        let v;
        if (params.randomStart) {
            v = createVector(random(width), random(height));
        } else {
            v = p5.Vector.fromAngle(i * TWO_PI / params.elements - HALF_PI).mult(size).add(width / 2, height / 2);
        }
        point(v.x, v.y);
        points.push(v);
    }
    pointer = createVector(random(width), random(height));
}