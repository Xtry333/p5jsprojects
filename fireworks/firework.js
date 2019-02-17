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
    }

    update() {
        super.update();
        this.lifespan -= 7.0;
    }

    display() {
        stroke(this.lifespan);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }
}

class Firework extends Body {
    constructor(position, velocity, friction) {
        super(position, velocity, friction);
        this.particles = [];
        this.exploded = false;
    }

    update() {
        super.update();
        if (this.vel.y >= 0) {
            this.explode();
        }
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
        }
    }

    display() {
        if (!this.exploded) {
            stroke(255);
            strokeWeight(2);
            line(this.pos.x, this.pos.y - 2, this.pos.x, this.pos.y + 2);
        }
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].display();
        }
    }

    explode() {
        if (!this.exploded) {
            this.exploded = true;
            for (let i = 0; i < 50; i++) {
                this.particles.push(new Particle(this.pos, p5.Vector.random2D().mult(5), 0.5 * random(2)));
            }
            ellipse(this.pos.x, this.pos.y, 30, 30);
        }
    }
}