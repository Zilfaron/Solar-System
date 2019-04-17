class System {
	constructor({ drawingContext, planets, center, speedBoost = 1 }) {
		this.ctx = drawingContext;

		this.planets = planets;
		this.center = center;

		this._speedBoost = speedBoost;

		this.anim = null;

		// increase orbit radius of planets for moving its start to border of center
		this.planets.forEach( (planet) => {
			planet.orbitRadius += this.center.size / 2;
		} );
	}

	set speedBoost(val) {
		if (val < 0 || val > 86400 || typeof val !== "number") return null;

		this._speedBoost = val;
	}

	update() {
		if (this.center.update) {
			this.center.update(this._speedBoost);
		}

		this.planets.forEach( (planet) => {
			planet.update(this._speedBoost);
			planet.satellites.forEach( (satellite) => {
				satellite.update(this._speedBoost);
			} );
		} );
	}

	draw() {
		this.ctx.clearAll();

		this.center.draw(this.ctx);

		this.planets.forEach( (planet) => {
			planet.draw(this.ctx, this.center.x, this.center.y);
		} );
	}

	lifeLoop() {
		this.update();
		this.draw();

		this.anim = requestAnimationFrame( this.lifeLoop.bind(this) );
	}

	freeze() {
		cancelAnimationFrame(this.anim);
	}
}

export default System;