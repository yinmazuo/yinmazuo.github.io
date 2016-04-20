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