let center
let mouseVector
let particle
let particles = []
let video
let vScale = 16
let scl = 10
let inc = 0.1
let cols
let rows
let zoff = 0
let canvas
let flowfield
let angleSlider
let angleP
let videoOn = false
let modeButton
let magSlider
let magP

function setup() {
	canvas = createCanvas(600, 400);
	canvas.position(60,10)
	pixelDensity(1)
	video = createCapture(VIDEO)
	video.position(700, 350)
	video.size(width/vScale, height/vScale)
	cols = floor(width/scl)
	rows = floor(height/scl)
	flowfield = new Array(cols * rows)
	angleSlider = createSlider(0,6,3)
	angleSlider.position(700, 300)
	angleP = createP("Craziness:")
	angleP.style("font-family", "Helvetica")
	angleP.position(700, 250)
	for (let i = 0; i < 20; i++) {
		particles.push(new Particle(random(width), random(height), floor(random(1,40))))
	}
	center = createVector(width/2,height/2)
	modeButton = createButton("Switch Mode")
	modeButton.style("font-family", "Helvetica")
	modeButton.position(700, 30)
	modeButton.mousePressed(switchMode)
	magSlider = createSlider(0.1, 5, 1, 0.1)
	magSlider.position(700, 200)
	mapP = createP("Force Strength:")
	mapP.style("font-family", "Helvetica")
	mapP.position(700, 150)
	background(255)
}

function switchMode() {
	videoOn = !videoOn
}

function draw() {
	// console.log(videoOn)
	// background(255)
	video.loadPixels()
	// mouseVector = createVector(mouseX, mouseY)
	// strokeWeight(2)
	// noFill()
	// mouseVector.sub(center)
	// line(0,0,mouseVector.x,mouseVector.y)
	let yoff = 0
	for (let y = 0; y < rows; y++) {
		let xoff = 0
		for (let x = 0; x < cols; x++) {
			let index = x + y * cols
			let angle = noise(xoff, yoff, zoff) * TWO_PI * angleSlider.value()
			let v = p5.Vector.fromAngle(angle)
			v.setMag(magSlider.value())
			flowfield[index] = v
			xoff += inc
			// stroke(0)
			// push()
			// translate(x*scl, y*scl)
			// rotate(v.heading())
			// line(0, 0, scl, 0)
			// pop()
		}
		yoff += inc
		zoff += 0.001
	}


	for (let i = 0; i < particles.length; i++) {
		// particles[i].attracted(mouseVector)
		// particles[i].vel.limit(10)
		particles[i].follow(flowfield)
		particles[i].update()
	 	particles[i].edges()
		particles[i].show(videoOn)
		console.log(particles[i].mass)

	}



}
