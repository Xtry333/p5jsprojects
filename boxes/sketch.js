let time = 0;
let w = 24;
let margin = 3.5;
let xNum = 20;
let zNum = 20;
let maxD;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight - 4, WEBGL);
    cnv.style('display', 'block');
    maxD = dist(0, 0, xNum/2, zNum/2);
}

function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(56, 214, 216);
    bg(width / 2, height / 2, -500, color(56, 214, 216), color(15, 73, 74));
    ortho();
    orbitControl();
    let dir = createVector(-5, 7, -18).normalize();
    directionalLight(250, 250, 250, dir);
    push();
    rotateX(-PI/4);
    rotateY(PI/4);
    noStroke();
    smooth(2);
    specularMaterial(34, 210, 65);
    translate(0, 33, 0);

    for (let z = -zNum/2; z <= zNum/2; z++) {
        for (let x = -xNum/2; x <= xNum/2; x++) {
            push();
            translate(x * w , 0, z * w);
            let d = dist(0, 0, x, z) * 0.45;
            let func = 1;
            let dur = 9;
            if (time%(dur*4) < dur) {
                func = sin(time - d);
                func = cos(func + time);
                //let func = sin(time - d) * constrain(maxD * 1.55 - d, -10, 10) * 0.15;
            } else if (time%(dur*4) < dur * 2) {
                func = sin(time - d) * constrain(maxD * 1.55 - d, -10, 10) * 0.15;
                //let func = sin(time + x/3 + z/3);
            } else if (time%(dur*4) < dur * 3) {
                func = sin(time + x/2) * sin(time - z/2);
            } else if (time%(dur*4) < dur * 4) {
                //func = sin(time - d) * constrain(maxD * 1.55 - d, -10, 10) * 0.15;
                func = cos(x/3 + time/3);
            }
            //func = cos(func + time);
            let h = map(func, -1, 1, 75, 325);
            box(w - margin, h, w - margin);
            translate(0, -h / 2, 0);
            sphere(w-margin * 2);
            pop();
        }
    }
    pop();

    time += 0.07;
}

function bg(x, y, z, c1, c2) {
    noStroke();
    beginShape(TRIANGLES);

    fill(c2); vertex(x, y, z);
    fill(c2); vertex(-x, y, z);
    fill(c1); vertex(x, -y, z);

    fill(c1); vertex(-x, -y, z);
    fill(c2); vertex(-x, y, z);
    fill(c1); vertex(x, -y, z);

    endShape();
}