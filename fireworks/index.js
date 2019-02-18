let firework = [];
let particles = [];
let gravity;
let sparkles = 5;

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

    for (let i = 0; i < firework.length; i++) {
        if (firework[i].pos.y > height) {
            firework[i] = new Firework(createVector(random(width), height), createVector(random(-2, 2), random(-20, -5)), 0.1);
        }

        firework[i].applyForce(gravity);
        firework[i].update();
        firework[i].display();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].pos.y > height) {
            //particles = particles.filter();
        }
        particles[i].applyForce(gravity);
        particles[i].update();
        particles[i].display();
    }

    if (mouseIsPressed) {
        for (let i = 0; i < sparkles; i++) {
            let pos = createVector(mouseX, mouseY);
            let vel = p5.Vector.random2D().mult(random(8));
            let particle = new Particle(pos, vel, random(0, 0.1));
            particle.color = color(random(190, 255), random(90, 255), 0);
            particles.push(particle);
        }
    }
    //stroke(255);
    //ellipse(mouseX, mouseY, 15, 15);
}