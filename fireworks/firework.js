class Body {
    constructor(position, velocity, friction) {
        this.pos = createVector(position.x, position.y);
        this.vel = createVector(velocity.x, velocity.y);
        this.acc = createVector(0, 0);
        this.friction = friction / 10;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.mult(1 - this.friction);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
}

class Particle extends Body {
    constructor(position, velocity, friction) {
        super(position, velocity, friction);
        this.lifespan = 255;
        this.color = color(255, 255, 255);
    }

    update() {
        super.update();
        this.lifespan -= 7.0;
    }

    display() {
        //colorMode(HSB);
        this.color.setAlpha(this.lifespan);
        stroke(this.color);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }
}

class Firework extends Body {
    constructor(position, velocity, friction) {
        super(position, velocity, friction);
        this.particles = [];
        this.exploded = false;
        this.color = color(random(50, 255), random(50, 255), random(50, 255));
        this.velLimit = random(-2, 8);
        this.power = random(2, 4) + this.velLimit / 4;
    }

    update() {
        super.update();
        if (this.vel.y >= -this.velLimit) {
            this.explode();
        }
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
        }
    }

    display() {
        //colorMode(RGB);
        if (!this.exploded) {
            stroke(this.color);
            strokeWeight(2);
            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.vel.heading() + HALF_PI);
            //line(this.pos.x, this.pos.y - 2, this.pos.x, this.pos.y + 2);
            line(0, 0 - 2, 0, 0 + 2);
            pop();
        }
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].display();
        }
    }

    explode() {
        if (!this.exploded) {
            this.exploded = true;
            for (let i = 0; i < 50; i++) {
                let p = new Particle(this.pos, p5.Vector.random2D().mult(this.power), 0.5 * random(2));
                p.applyForce(this.vel);
                p.color = this.color;
                this.particles.push(p);
            }
            ellipse(this.pos.x, this.pos.y, 30, 30);
        }
    }
}