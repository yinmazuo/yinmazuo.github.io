var mediator = function() {
	var spaceshipArr = [];
	var subscriber = function(num) {
		var newSpaceship = new SpaceshipSystem(num);
		newSpaceship.new();
		spaceshipArr.push(newSpaceship);
	};
	var unsubscriber = function(num) {

	};

	var publish = function(message) {
		var length = spaceshipArr.length;
		if (length === 0) {return false;}
		for (var i = 0; i < length; i++) {
			spaceshipArr[i].receive(message);
		}
	};
	var interface = function(info, handler) {
		if (Math.random() * 10 > 7) {
			console.log("failed!");
			return false;
		} else {
			handler(info);
		}
	};

	return {
		interface: interface,
		subscriber: subscriber,
		unsubscriber: unsubscriber,
		publish: publish
	}
}();