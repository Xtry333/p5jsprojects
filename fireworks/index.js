let firework = [];
let gravity;

function setup() {
    createCanvas(1600, 800);
    background(0);
    gravity = createVector(0, 0.25);
    for (let i = 0; i < 20; i++) {
        firework.push(new Firework(createVector(random(width), -50), createVector(0, random(-15, -5)), 0.1));
    }
}

function draw() {
    background(0, 50);

    for (let i = 0; i < firework.length; i++) {
        if (firework[i].pos.y > height) {
            firework[i] = new Firework(createVector(random(width), height), createVector(0, random(-23, -10)), 0.1);
        }

        firework[i].applyForce(gravity);
        firework[i].update();
        firework[i].display();
    }

    stroke(255);
    ellipse(mouseX, mouseY, 15, 15);
}