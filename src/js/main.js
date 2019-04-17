/* STYLES */
import "../scss/main.scss";
/* ------ */

/* SCRIPTS */
import addAutoResize from "./resize.js";
import Cosmic from "./objects.js"; 
import System from "./system.js"; 
/* ------- */

/* IMAGES */
let importAll = (c) => {
  let images = {};
  c.keys().forEach((item) => {
		images[ item.replace("./", "") ] = c(item);
	});
  return images;
}

let images = importAll( require.context('./../img', false) );
/* ------ */

window.addEventListener("load", () => {
	let canvas = document.querySelector(".solar-system-canvas"),
			ctx = canvas.getContext("2d");

	ctx.clearAll = () => {
		ctx.clearRect(-15000, -12000, 24000, 18000);
	};

	/* AXIS MOVING */
	canvas.camera = {
		xShift: 0,
		yShift: 0,
		zShift: 1,
		moving: false
	};

	ctx.moveCamera = () => {
		ctx.setTransform(	canvas.camera.zShift, 0, 0, canvas.camera.zShift, 
										 	canvas.camera.xShift, canvas.camera.yShift );
	};

	window.addEventListener("mousewheel", (evt) => {
		if (evt.deltaY < 0) {
			canvas.camera.zShift += 0.1;
		}

		if (evt.deltaY > 0) {
			canvas.camera.zShift -= 0.1;
		}

		if (canvas.camera.zShift > 1) canvas.camera.zShift = 1;
		if (canvas.camera.zShift < 0.3) canvas.camera.zShift = 0.2;

		ctx.moveCamera();
	});

	canvas.addEventListener("mousedown", () => {
		canvas.camera.moving = true;
	});

	window.addEventListener("mousemove", (evt) => {
		if (!canvas.camera.moving) return null;

		canvas.camera.xShift += evt.movementX;
		canvas.camera.yShift += evt.movementY;

		ctx.clearAll();
		ctx.moveCamera();
	});

	window.addEventListener("mouseup", () => {
		canvas.camera.moving = false;
	});
	/* ----------- */

	// add center by X and by Y to canvas props		
	[canvas.cx, canvas.cy] = [canvas.width / 2, canvas.height / 2];

	addAutoResize(canvas, function() {
		[this.cx, this.cy] = [this.width / 2, this.height / 2];
	});

	/* CREATING OF SYSTEM */

	let sun = new Cosmic.Static({
		name: "The Sun",
		img: images["sun.png"],
		size: 495.5,
		x: canvas.cx,
		y: canvas.cy
	});

	/* PLANETS AND SATELLITES */
	let mercury = new Cosmic.Rotating({
		name: "Mercury",
		img: images["mercury.png"],
		size: 122.5,
		distanceFromCenter: 289.95,
		orbitRotateTime: 88,
		startingAngle: 315
	});

	let venus = new Cosmic.Rotating({
		name: "Venus",
		img: images["venus.png"],
		size: 290.1,
		distanceFromCenter: 541,
		orbitRotateTime: 225,
		startingAngle: 270
	});

	let moon = new Cosmic.Rotating({
		name: "Moon",
		img: images["moon.png"],
		size: 62.5,
		distanceFromCenter: 19.22,
		orbitRotateTime: 27
	});

	let earth = new Cosmic.Rotating({
		name: "Earth",
		img: images["earth.png"],
		size: 318.75,
		distanceFromCenter: 948,
		orbitRotateTime: 365,
		startingAngle: 190,
		satellites: [moon]
	});

	let phobos = new Cosmic.Rotating({
		name: "Phobos",
		img: images["phobos.png"],
		size: 29,
		distanceFromCenter: 150,
		orbitRotateTime: 0.316,
		startingAngle: 100
	});

	let deimos = new Cosmic.Rotating({
		name: "Deimos",
		img: images["deimos.png"],
		size: 15,
		distanceFromCenter: 380,
		orbitRotateTime: 1.26,
		startingAngle: 65
	});

	let mars = new Cosmic.Rotating({
		name: "Mars",
		img: images["mars.png"],
		size: 169.5,
		distanceFromCenter: 1939.5,
		orbitRotateTime: 687,
		startingAngle: 130,
		satellites: [phobos, deimos]
	});

	let jupiter = new Cosmic.Rotating({
		name: "Jupiter",
		img: images["jupiter.png"],
		size: 337.5, // 320x + 100px
		distanceFromCenter: 4567, // + 400px
		orbitRotateTime: 11.9 * 365,
		startingAngle: 345,
		satellites: []
	});
	/* ---------------------- */

	let solarSystem = new System({
		drawingContext: ctx,
		planets: [mercury, venus, earth, mars, jupiter],
		center: sun
	});
	
	solarSystem.lifeLoop();

	window.setSpeedBoost = (val) => {
		solarSystem.speedBoost = val;

		return val;
	};
	
	/* --------------- */
});