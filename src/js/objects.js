/* HELPERS */	
	Date.prototype.getYearDay = function() {	
		return ( this - new Date( new Date().getFullYear(), 0, 0 ) ) / (24 * 60 * 60 * 1000);	
	};
	
	let toRadians = (degrees) => {	
		return degrees * Math.PI / 180;	
	};
/* ------- */	

class Static {
	constructor({ name, img, size, x, y }) {
		this.name = name;
		this.size = size;

		this.img = new Image();
		this.img.src = img;

		this.x = x;
		this.y = y;
	}

	draw(ctx) {
		ctx.beginPath();

		ctx.drawImage(this.img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);

		ctx.closePath();
	}
}

class Rotating {
	constructor({ name, img, size, distanceFromCenter, orbitRotateTime, startingAngle = 0, satellites = [] }) {
		this.name = name;
		this.size = size;

		this.img = new Image();
		this.img.src = img;

		this.startingAngle = startingAngle;
		this.maxAngle = 360 + this.startingAngle;

		this.orbitRadius = distanceFromCenter + this.size / 2;
		this.orbitRotationAngle = this.startingAngle + 360 * ( new Date().getYearDay() / orbitRotateTime ) % 360;
		this.orbitRotateTime = orbitRotateTime;

		this.satellites = satellites;

		// increase orbit radius of satellites for moving its start to border of planet
	  this.satellites.forEach( (satellite) => {
			satellite.orbitRadius += this.size / 2;
		} );
	}

	update(boost) {
		if (this.orbitRotationAngle >= this.maxAngle) {
			this.orbitRotationAngle = this.startingAngle;
		}

		this.orbitRotationAngle += ( 360 / (this.orbitRotateTime / boost) ) / 60;
	}

	draw(ctx, x, y) {
		let drawX = x + ( Math.cos( toRadians(this.orbitRotationAngle) ) * this.orbitRadius ),
				drawY = y + ( Math.sin( toRadians(this.orbitRotationAngle) ) * this.orbitRadius );

		ctx.beginPath();

		ctx.strokeStyle = "rgba(172, 172, 172, 1)";
		ctx.arc(x, y, this.orbitRadius, 
						toRadians(this.startingAngle), toRadians(this.orbitRotationAngle), true);
		ctx.stroke();

		ctx.strokeStyle = "rgba(172, 172, 172, 0.45)";
		ctx.arc(x, y, this.orbitRadius, 
						toRadians(this.orbitRotationAngle), toRadians(this.startingAngle), true);
		ctx.stroke();

		ctx.drawImage(this.img, 
									drawX - this.size / 2, drawY - this.size / 2, 
									this.size, this.size);

		ctx.closePath();

		this.satellites.forEach( (satellite) => {
			satellite.draw(ctx, drawX, drawY);
		} );
	}
}

let Cosmic = {
	Static, Rotating
};

export default Cosmic;