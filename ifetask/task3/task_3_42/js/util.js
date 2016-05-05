var eve = (function (){
	var myeve = {
		addListener: null,
		removeListener: null
	};

	if (window.addEventListener) {
		myeve.addListener = function (element, type, handler) {
			element.addEventListener(type, handler, false);
		};
		myeve.removeListener = function (element, type, handler) {
			element.removeEventListener(type, handler, false);
		};
	} else if (document.attachEvent) {
		myeve.addListener = function (element, type, handler) {
			element.attachEvent("on" + type, handler);
		};
		myeve.removeListener = function (element, type, handler) {
			element.detachEvent("on" + type, handler);
		};
	} else {
		myeve.addListener = function (element, type, handler) {
			element["on" + type] = handler;
		};
		myeve.removeListener = function (element, type, handler) {
			if (handler instanceof Function) {element["on" + type] = null;}			
		};		
	}	
	return myeve;	
})();
/*
*选择器
*/
function $(selector) {
	return document.querySelector(selector);
}

function $create(element) {
	return document.createElement(element);
}

var $classList = (function(element, name) {
	function add(element, name) {
		if (element.className.length > 0) {
			element.className += " ";
		}
		element.className += name;
	}
	function remove(element, name) {
		var c = element.className.split(/\s+/);
		for (var i = 0, len = c.length; i < len; i++) {
			if (c[i] == name) {
				c.splice(i, 1);
				break;
			}
		}
		element.className = c.join(" ");
	}
	function contains(element, name) {
		if (element.className.indexOf(name) !== -1) {
			return true;
		}
		return false;
	}
	
	return {
		add: add,
		remove: remove,
		contains: contains
	}
})();