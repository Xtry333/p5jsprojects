class Ray {
    constructor(pos, angle) {
        this.pos = pos
        this.dir = p5.Vector.fromAngle(angle).normalize()
    }

    cast(wall) {
        const x1 = wall.a.x, y1 = wall.a.y
        const x2 = wall.b.x, y2 = wall.b.y
        const x3 = this.pos.x, y3 = this.pos.y
        const x4 = x3 + this.dir.x, y4 = y3 + this.dir.y
        const div = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        if (div == 0) return null
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / div
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / div
        if (t > 0 && t < 1 && u > 0) {
            const hit = createVector();
            hit.x = x1 + t * (x2 - x1);
            hit.y = y1 + t * (y2 - y1);
            return hit;
        } else {
            return null;
        }
    }

    show() {
        stroke(0)
        push()
        translate(this.pos.x, this.pos.y)
        line(0, 0, this.dir.x * 20, this.dir.y * 20)
        pop()
    }
}

class Caster {
    constructor(x, y, rays) {
        this.pos = createVector(x, y)
        this.rays = []
        for (let a = 0; a < 360; a += 360 / rays)
            this.rays.push(new Ray(this.pos, radians(a)))
    }

    update(x, y) {
        this.pos.set(x, y)
    }

    cast(walls) {
        for (let ray of this.rays) {
            //ray.show()
            let min = Infinity
            let hit = null
            for (let wall of walls) {
                let pt = ray.cast(wall)
                if (pt) {
                    let d = pt.dist(this.pos)
                    if (d < min) {
                        min = d
                        hit = pt
                    }
                }
            }

            if (hit) {
                line(this.pos.x, this.pos.y, hit.x, hit.y)
                ellipse(hit.x, hit.y, 5)
            }
        }
        ellipse(this.pos.x, this.pos.y, 15)
    }
}