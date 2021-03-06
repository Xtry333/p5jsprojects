class Body {
    constructor(position, velocity, friction) {
        this.pos = createVector(position.x, position.y); // Current position
        this.pPos = createVector(this.pos.x, this.pos.y);          // Position in previous frame
        this.vel = createVector(velocity.x, velocity.y); // Current velocity
        this.acc = createVector(0, 0);                   // Current acceleration
        this.friction = friction / 10;                   // Object friction
    }



    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.mult(1 - this.friction);
        this.pPos.x = this.pos.x;
        this.pPos.y = this.pos.y;
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
}

class Particle extends Body {
    constructor(position, velocity, friction) {
        super(position, velocity, friction);
        this.lifespan = random(220, 255);
        this.color = color(255, 255, 255);
        this.sparkleTime = 10;
        this.sparkle = int(random(this.sparkleTime));
    }

    isDead() {
        return this.lifespan <= 0;
    }

    update() {
        super.update();
        if (this.lifespan > 0) {
            let amt = 50.0 / (this.lifespan + 50.0);
            this.lifespan -= amt  * random(10, 50);
        } else {
            this.lifespan = 0;
        }
    }

    display() {
        this.color.setAlpha(this.lifespan);
        stroke(this.color);
        strokeWeight(4);
        //if (this.sparkle >= this.sparkleTime) {
            point(this.pos.x, this.pos.y);
        //    this.sparkle = 0;
        //} else {
        //    this.sparkle++;
        //}
    }
}

class Firework extends Body {
    constructor(position, velocity, friction) {
        super(position, velocity, friction);
        this.particles = [];
        this.exploded = false;
        this.color = color(random(50, 255), random(50, 255), random(50, 255));
        this.velLimit = random(-1, 4);
        this.power = random(1, 4) + this.velLimit / 4;
        this.particlesAmount = random(50, 200);
    }

    update() {
        super.update();
        if (this.vel.y >= -this.velLimit) {
            this.explode();
        }
        for (let i = 0; i < this.particles.length; i++) {
            if (!this.particles[i].isDead()) {
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
            }
        }
    }

    display() {
        if (!this.exploded) {
            stroke(this.color);
            strokeWeight(2);
            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.vel.heading() + HALF_PI);
            line(0, 0 - 2, 0, 0 + 2);
            pop();

            // TODO Trail
            

        }
        for (let i = 0; i < this.particles.length; i++) {
            if (!this.particles[i].isDead()) {
                this.particles[i].display();
            }
        }
    }

    explode() {
        if (!this.exploded) {
            this.exploded = true;
            for (let i = 0; i < this.particlesAmount; i++) {
                let p = new Particle(this.pos, p5.Vector.random2D().mult(this.power), 0.6 * (random(this.power)/10));
                p.applyForce(this.vel);
                let rg = 40;
                let r = red(this.color) + random(-rg, rg);
                let g = green(this.color) + random(-rg, rg);
                let b = blue(this.color) + random(-rg, rg);
                p.color = color(r, g, b);
                this.particles.push(p);
            }
            fill(this.color);
            stroke(this.color);
            ellipse(this.pos.x, this.pos.y, 30, 30);
        }
    }
}