/*
*事件工具
*/
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
/*
*包含提示文本及模式匹配的对象
*/
var testTxt = {
	name : {
		pattern: /^.{4,16}$/,//匹配模式——4-16位所有字符
		init: "必填，长度为4~16个字符",//填写规则
		right: "格式正确",//填写正确提示文本
		wrong: "名称不能为空",//填写错误提示文本
		status: false//当前输入框填写状态，默认填写错误
	},
	password : {
		pattern: /^[a-zA-Z]\w{5,17}$/,
		init: "以字母开头，长度为6~18个字符",
		right: "密码可用",
		wrong: "密码不可用",
		status: false
	},
	confirmPsw : {
		pattern: / /,
		init: "再次输入密码",
		right: "密码输入一致",
		wrong: "密码输入不一致",
		status: false
	},
	email : {
		pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		init: "输入电子邮箱地址",
		right: "邮箱格式正确",
		wrong: "邮箱格式错误",
		status: false
	},
	mobile : {
		pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
		init: "输入手机号码",
		right: "手机格式正确",
		wrong: "手机格式不正确",
		status: false
	},
};

/*
*提交按钮添加点击事件
*/
function submitHandle(e) {
	var inputs = $("#form").getElementsByTagName("input"),
		status = false;
	for (var i = 0, length = inputs.length;i < length-1;i++) {
		test(inputs[i]);	
		if (testTxt[inputs[i].id].status === false) {	
			if (status === false) {status = true;}	
			e.preventDefault();			
		}
	}
	if (status) {
		window.alert("输入信息有误！");
		return ;
	}
	window.alert("提交成功！");
}
/*
*填写检测
*/
function test(target) {
	var tooltipText = "",
		color = "",
		pattern = testTxt[target.id].pattern;

	if ((target.id === "confirmPsw") && ($("#password").value !== "")) {
		pattern = new RegExp($("#password").value);	
	}
	if (pattern.test(target.value)) {
		tooltipText = testTxt[target.id].right;
		color = "#0f0";
		testTxt[target.id].status = true;
	} else {
		tooltipText = testTxt[target.id].wrong;
		color = "#f00";
		testTxt[target.id].status = false;
	}           
	addTooltip(target, tooltipText, color);
	target.style.borderColor = color;
}
/*
*创建提示文本区域
*/
function addTooltip(target, tooltipText, color) {
	var span;
	if (target.parentNode.getElementsByTagName("span").length > 0) {
		span = target.parentNode.getElementsByTagName("span")[0];
	} else {
		span = document.createElement("span");
	}	
	span.innerHTML = tooltipText;
	span.style.color = color;
	target.parentNode.appendChild(span);
}
/*
*添加事件及初始化
*/
function init() {
	var inputs = $("#form").getElementsByTagName("input"),
		fn = function (input) {
			eve.addListener(input, "focus", function (e) {
				var tooltipText = testTxt[e.target.id].init;
				addTooltip(e.target, tooltipText, "#aaa");
			});
			eve.addListener(input, "blur", function (e) {
				test(e.target);
			});
		};
	for (var i = 0, length = inputs.length;i < length-1;i++) {
		fn(inputs[i]);
	}
	eve.addListener($("#submit"), "click", submitHandle);
}

init();