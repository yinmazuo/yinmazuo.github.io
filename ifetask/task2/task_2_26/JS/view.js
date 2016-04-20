
var view = function () {
	var uni = $("#universe");

	if (uni.getContext === null) {return false;}
	
	var context = uni.getContext("2d");
	uni.width = 800;
	uni.height = 600;

	context.translate(uni.width / 2, uni.height / 2);
	var background = function() {
		context.fillStyle = "#000";
		context.rect(-uni.width / 2, -uni.height / 2, uni.width, uni.height);
		context.fill();

		context.beginPath();
		context.arc(0, 0, 50, 0, Math.PI * 2, false);
		context.closePath();
		context.fillStyle = "#00f";
		context.fill();

		context.closePath();
		context.save();
	};	


	var Spaceship = function () {
		this.draw = function(num, deg, energy) {
			var r = 10,
				l = 20,
				p = Math.PI,
				x = 0,
				y = - 80 - (num - 1) * 40,
				d = deg * p / 180,
				info = num + "号-" + energy + "%";
				
			context.save();
			context.fillStyle = "#00f";
			context.beginPath();
			context.rotate(d);

			context.moveTo(x - l, y + r)
			context.arcTo(x - 1000, y, x - l, y - r, r);			
			context.lineTo(x + l, y - r);
			context.arcTo(x + 1000, y, x + l, y + r, r);													
			context.lineTo(x - l, y + r);

			context.fill();
	
			context.fillStyle = "#fff";
			context.font = "12px Times Roman";
			context.textAlign = "center";
			context.textBaseline = "middle";		
			context.fillText(info, x, y);

			context.restore();
			context.closePath();
			
			/*var r = 10,
				l = 20,
				p = Math.PI,
				j = - 80 - (num - 1) * 40,
				d = deg * p / 180,

				sl = l * Math.sin(d),
				cl = l * Math.cos(d),		
				x = - j * Math.sin(d),
				y = j * Math.cos(d),

				e = Math.atan(r / l),

				el = Math.sqrt(r * r + l * l),
				info = num + "号-" + energy + "%";
			context.save();
			context.fillStyle = "#00f";
			context.beginPath();

			context.moveTo(x - cl, y - sl);
			context.arc(x - cl, y - sl, r, p/2 + d, - p/2 + d, false);
			
			context.moveTo(x + cl, y + sl);
			context.arc(x + cl, y + sl, r, - p/2 + d, p/2 + d, false);
			
			context.moveTo(x - el * Math.cos(d + e), y - el * Math.sin(d + e));
			context.lineTo(x + el * Math.sin(p / 2 - d + e), y + el * Math.cos(p / 2 - d + e));
			context.lineTo(x + el * Math.sin(p / 2 - d - e), y + el * Math.cos(p / 2 - d - e));										
			context.lineTo(x - el * Math.cos(d - e), y - el * Math.sin(d - e));
			context.lineTo(x - el * Math.cos(d + e), y - el * Math.sin(d + e)); 

			context.fill();		
			context.restore();
			context.closePath();*/
		};

	};


	var refresh = function() {
		context.clearRect(-uni.width / 2, -uni.height / 2, uni.width, uni.height);
		background();
	};

	background();

	return {
		Spaceship: Spaceship,
		refresh: refresh
	}

}();