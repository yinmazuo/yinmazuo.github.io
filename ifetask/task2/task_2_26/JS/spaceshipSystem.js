
var SpaceshipSystem = function(num) {
	this.poi = -1;
	this.deg = 0;
	this.speed = 0;
	this.newSpaceship = new view.Spaceship();
	this.energySystem = function() {
		var that = this;
		var timer = setInterval(consume, 1000);
		function consume() {
			var energy = that.aniQueue[that.poi][2];
			if (energy < 100) {
				that.aniQueue[that.poi][2] += 2;
			}
			if (energy === 0 || energy < 0) {
				energy === 0;
				that.stop();
			}
			that.aniQueue[that.poi][2] -= 5;
		}
	};
	this.engineSystem = function() {
		var	deg = 0,
			energy = 100,
			arr = [];
		arr.push(num);
		arr.push(deg);
		arr.push(energy);	
		this.dataArr.push(this.deg);
		this.poi = this.aniQueue.push(arr) - 1;	
		if (this.deg === 0) {
			this.ani();	
		}				
	};
	this.receive = function(message) {
		if (message["id"] !== num) {return false;}
		switch (message["commond"]) {
			case "start": this.start(); break;
			case "stop": this.stop(); break;
			case "destory": this.destory(); break;
			default: return false;
		}
	};
	this.new = function() {
		this.engineSystem();
	}
	this.start = function() {
		var d = 80 + (num - 1) * 40;
		this.speed = 160;
		this.aniQueue[this.poi][1] = Math.asin(this.speed / 2 / d);
		this.energySystem();
	};
	this.stop = function() {
		this.aniQueue[this.poi][1] = 0;
	};
	this.destory = function() {
		this.stop();
		this.aniQueue.splice(this.poi, 1);
		this.dataArr.splice(this.poi, 1);
		this.speed = 0;
	};
};

SpaceshipSystem.prototype = {
	constructor: SpaceshipSystem,
	dataArr: [],
	aniQueue: [],
	ani: function() {
			if (this.dataArr.length > 1) {return false;}
			var that = this;
			function draw() {
				view.refresh();
				if (that.aniQueue.length === 0) {return false;}
				var q = that.aniQueue;
				for (var i = 0; i < q.length; i++) {			
					that.dataArr[i] += q[i][1];
					if (that.dataArr[i] > 360) {that.dataArr[i] -= 360;}
					that.newSpaceship.draw(q[i][0], that.dataArr[i], q[i][2]);
				}	
				requestAnimationFrame(draw);
			}
			requestAnimationFrame(draw);
		}
};