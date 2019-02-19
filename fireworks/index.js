let firework = [];
let particles = [];
let gravity;

function arrayRemove(arr, el) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === el) {
            arr.splice(i, 1);
        }
    }
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    let body = document.getElementsByTagName('body')[0];
    body.style.margin = 0;
    background(0);
    gravity = createVector(0, 0.1);
    for (let i = 0; i < 20; i++) {
        firework.push(new Firework(createVector(random(width), -50), createVector(0, random(-15, -5)), 0.1));
    }
}

function draw() {
    background(0, 50);
    //background(0);

    for (let i = 0; i < firework.length; i++) {
        if (firework[i].pos.y > height) {
            firework[i] = new Firework(createVector(random(width), height), createVector(random(-2, 2), random(-20, -5)), 0.1);
        }

        if (dist(mouseX, mouseY, firework[i].pos.x, firework[i].pos.y) < 25) {
            firework[i].explode();
        }

        firework[i].applyForce(gravity);
        firework[i].update();
        firework[i].display();
    }

    for (let i = particles.length - 1; i >= 0; i--) {

        if (!particles[i].isDead()) {
            particles[i].applyForce(gravity);
            particles[i].update();
            particles[i].display();
        }
        if (particles[i].pos.y > height || particles[i].isDead()) {
            arrayRemove(particles, particles[i]);
        }
    }

    if (mouseIsPressed) {
        for (let i = 0; i < random(100) + 1; i++) {
            let pos = createVector(mouseX, mouseY);
            let vel = p5.Vector.random2D().mult(random(5));
            let particle = new Particle(pos, vel, random(0, 0.2));
            particle.color = color(random(190, 255), random(90, 255), 0);
            particles.push(particle);
        }
    }
    //stroke(255);
    //ellipse(mouseX, mouseY, 15, 15);
}