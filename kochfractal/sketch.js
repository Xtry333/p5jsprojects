const segments = []

const ruler = {}

let magnitude = 5

function setup() {
    //noSmooth()
    createCanvas(windowWidth, windowHeight)

    ruler.a = createVector(0, 0)
    ruler.b = createVector(0, 0)
    ruler.enabled = false

    let len = 832
    let start = createVector(width / 2 - len / 2, height / 2 - len / 3.45)
    let end = start

    for (let i = 0; i < 360; i += 120) {
        start = end.copy()
        dir = p5.Vector.fromAngle(radians(i)).setMag(len)
        end = p5.Vector.add(start, dir)

        segments.push(new Segment(start, end))
    }

}

function draw() {
    background(255)
    //translate(-width/2, -height/2)
    if (ruler.enabled) {
        ruler.a.set(mouseX, mouseY)
        if (mouseIsPressed) {
            ruler.b.set(mouseX, mouseY)
        }
        ruler.dist = ruler.a.dist(ruler.b).toFixed(1)

        strokeWeight(2)
        stroke(0)
        line(ruler.a.x, ruler.a.y, ruler.b.x, ruler.b.y)
        noStroke()
        text(ruler.dist, 20, 20)
    }

    if (segments.length < 3 * 4 ** magnitude) {
        let line = segments.shift()
        if (!line.offscreen()) {
            let sg = line.split()
            for (let s of sg) segments.push(s)
        }
    }
    beginShape()
    stroke(100, 149, 237)
    fill(135, 206, 255)
    strokeWeight(1)
    //vertex(segments[0].a.x, segments[0].a.y)
    for (let segment of segments) {
        //segment.show()
        vertex(segment.a.x, segment.a.y)
    }
    endShape()
}

class Segment {
    constructor(a, b) {
        this.a = a.copy()
        this.b = b.copy()
    }

    split() {
        const seg = []
        let start = this.a
        let end = this.b
        let p0 = start
        let p1 = p5.Vector.sub(start, end).div(-3).add(start)
        let h = p5.Vector.sub(p0, p1).heading() + radians(120)
        let d = p0.dist(p1)
        let p2 = p5.Vector.add(p1, p5.Vector.fromAngle(h).setMag(d))
        let p3 = p5.Vector.sub(start, end).div(3).add(end)
        let p4 = end
        seg.push(new Segment(p0, p1))
        seg.push(new Segment(p1, p2))
        seg.push(new Segment(p2, p3))
        seg.push(new Segment(p3, p4))
        return seg
    }

    offscreen() {
        let marginLeft = 0
        let marginRight = width
        let marginTop = 0
        let marginDown = height
        return !((this.a.x > marginLeft && this.b.x > marginLeft && this.a.x < marginRight && this.b.x < marginRight) &&
            (this.a.y > marginTop && this.b.y > marginTop && this.a.y < marginDown && this.b.y < marginDown))
    }

    show() {
        strokeWeight(2)
        stroke(135, 206, 250)
        line(this.a.x, this.a.y, this.b.x, this.b.y)
    }
}

