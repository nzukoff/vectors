class Particle {
    constructor(x, y, m) {
        this.pos = createVector(x,y)
        this.vel = createVector(0,0)
        this.acc = createVector(0,0)
        this.mass = m
        this.h = 0
        this.prevPos = this.pos.copy();
    }

    update() {
        this.vel.add(this.acc)
        // this.vel.limit(5)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    attracted(target) {
        let force = p5.Vector.sub(target, this.pos)
        this.applyForce(force)
    }

    // attracted(target) {
    //     let force = p5.Vector.sub(target, this.pos)
    //     let fsquared = force.magSq()
    //     let G = 6.67408
    //     let strength = G/fsquared
    //     force.setMag(strength)
    //     // force.setMag(0,5)
    //     // this.acc.add(dir)
    //     // this.acc.setMag(0.5)
    //     this.acc = force
    //     // this.applyForce(force)
    // }

    applyForce(force) {
        // let fCopy = force.copy()
        // let f = p5.Vector.div(fCopy,2)
        // console.log(this.mass)
        // this.acc.setMag(1)
        this.acc.add(force)
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
          }
          if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
          }
          if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
          }
          if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
          }
    }

    follow(vectors) {
        let a = floor(this.pos.x/scl)
        let b = floor(this.pos.y/scl)
        let index = a + b * cols
        let force = vectors[index]
        this.applyForce(force)
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    show(videoOn) {
        let px = floor(this.pos.x / vScale)
        let py = floor(this.pos.y / vScale)
        let col = video.get(px, py)
        if (videoOn) {
            colorMode(RGB)
            // noStroke()
            // fill(col[0], col[1], col[2], 100)
            stroke(col[0], col[1], col[2], 100)
            strokeWeight(1)
            line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
            this.updatePrev()
            // ellipse(this.pos.x, this.pos.y, this.mass*2)
        } else {
            colorMode(HSB, 255)
            // noStroke(1)
            // fill(this.h, 255, 255, 150)
            // ellipse(this.pos.x, this.pos.y, this.mass*2)
            // this.h += 1;
            // if (this.h > 255) {
            //     this.h = 0
            // }
            stroke(this.h, 255, 255, 25)
            this.h = this.h + 1
            if (this.h > 255) {
              this.h = 0;
            }
            strokeWeight(1)
            line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
            this.updatePrev()
            // console.log(this.h)
        }


    }
}
