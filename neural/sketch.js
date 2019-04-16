const nodes = [];

const k = [];
const l = [];
const m = [];

var sk = 4;
var sl = 4;
var sm = 2;

const size = 5;

class Node {
    constructor() {
        this.val = 1;
    }

    getOutput() {
        return this.val;
    }
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < sk; i++) {
        k[i] = {v: 0, weights: []};
        nodes.push(k[i]);
    }
    for (let i = 0; i < sl; i++) {
        l[i] = {v: 0, weights: []};
        for (let j = 0; j < sk; j++) { 
            l[i].weights.push(Math.random());
        }
        nodes.push(l[i]);
    }
    for (let i = 0; i < sm; i++) {
        m[i] = {v: 0, weights: []};
        for (let j = 0; j < sl; j++) { 
            m[i].weights.push(Math.random());
        }
        nodes.push(m[i]);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);

    k[0].v = mouseX;
    k[1].v = mouseY;

    for (let i = 0; i < l.length; i++) {
        l[i].v = 0;
        for (let j = 0; j < k.length; j++) {
            l[i].v += k[j].v * l[i].weights[j];
        }
    }

    for (let i = 0; i < m.length; i++) {
        m[i].v = 0;
        for (let j = 0; j < l.length; j++) {
            m[i].v += l[j].v * m[i].weights[j];
        }
    }

    strokeWeight(1);
    //fill(255);
    ellipse(m[0].v, m[1].v, 20, 20);

    var dR = 75;

    var offsetYk = dR * k.length / 2;
    var offsetYl = dR * l.length / 2;
    var offsetYm = dR * m.length / 2;

    var X = 300;

    translate(width / 2, height / 2);

    for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < k.length; j++) {
            strokeWeight(l[i].weights[j] * 2);
            line(0 - 500, 50 + j * dR - offsetYk, X - 500, 50 + i * dR - offsetYl);
        }
    }

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < l.length; j++) {
            strokeWeight(m[i].weights[j] * 2);
            line(X - 500, 50 + j * dR - offsetYl, X * 2 - 500, 50 + i * dR - offsetYm);
        }
    }

    let c = 0;
    textAlign(CENTER, CENTER);
    strokeWeight(1);
    //fill(255);
    for (let i = 0; i < k.length; i++) {
        ellipse(0 - 500, 50 + i * dR - offsetYk, 35, 35);
        textSize(20);
        text(c++, 0 - 500, 50 + i * dR - offsetYk);
        textSize(9);
        text(k[i].v, 0 - 500, 50 + i * dR - offsetYk + 25);
    }

    for (let i = 0; i < l.length; i++) {
        ellipse(X - 500, 50 + i * dR - offsetYl, 35, 35);
        textSize(20);
        text(c++, X - 500, 50 + i * dR - offsetYl);
        textSize(9);
        text(l[i].weights, X - 500, 50 + i * dR - offsetYl - 25);
        text(l[i].v, X - 500, 50 + i * dR - offsetYl + 25);
    }

    for (let i = 0; i < m.length; i++) {
        ellipse(X * 2 - 500, 50 + i * dR - offsetYm, 35, 35);
        textSize(20);
        text(c++, X * 2 - 500, 50 + i * dR - offsetYm);
        textSize(9);
        text(m[i].weights, X * 2 - 500, 50 + i * dR - offsetYm - 25);
        text(m[i].v, X * 2 - 500, 50 + i * dR - offsetYm + 25);
    }
}