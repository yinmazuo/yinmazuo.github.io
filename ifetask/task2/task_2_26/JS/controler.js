
var contorler = function() {
	var numArr = [1, 2, 3, 4];
	eve.addListener($(".newSpaceship"), "click", newHandler);
	function newHandler() {		
		if (numArr.length > 0) {
			var num = numArr.shift();
		} else {
			console.log("only 4 spaceships!");return false;
		}	
		if (mediator.interface(num, mediator.subscriber) !== false){
			createSinglePanel(num);
		} else {
			numArr.unshift(num);
		}		
	}
	function createSinglePanel(num) {
		var btns = [],
			div = $create("div"),
			span = $create("span");
		span.innerHTML = num + "号飞船：";
		div.className = "singlePanel";
		div.appendChild(span);

		for (var i = 0; i < 3; i++) {
			btns.push($create("button"));
		}
		btns[0].innerHTML = "开始飞行";
		btns[0].id = "start";	
		btns[1].innerHTML = "结束飞行";
		btns[1].id = "stop";		
		btns[2].innerHTML = "销毁";
		btns[2].id = "destory";

		for (var j = 0; j < 3; j++) {
			eve.addListener(btns[j], "click", send);
			div.appendChild(btns[j]);
		}
		function send(e) {
			var message = {
				id: num,
				commond: e.target.id
			};	
			if (mediator.interface(message, mediator.publish) === false) {return false;}
			if (e.target.id === "destory") {
				console.log(num);
				numArr.unshift(num);
				$("#spaceshipControlPanel").removeChild(e.target.parentNode);			
			}
			
			
		}
		$("#spaceshipControlPanel").insertBefore(div, $("#spaceshipControlPanel").lastElementChild);
	}

}();


