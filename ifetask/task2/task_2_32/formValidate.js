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
function create(ele) {
	return document.createElement(ele);
}

function FormConf(name, label, type, pattern, rules, success, fail) {
	this.name = name;//表单名
	this.label = label;//表单标签
	this.type = type;//表单类型
	this.pattern = pattern;
	this.rules = rules;//填写规则
	this.success = success;//填写正确提示文本
	this.fail = fail;//填写错误提示文本
	this.validator = validator;
}

function validator(input) {
	var that = this;
	eve.addListener(input, "focus", focusHandler);
	eve.addListener(input, "blur", blurHandler);
	function focusHandler(e) {
		e.target.style.borderColor = "#00f";
		tooltip(e.target, that.rules, "#00f");
	}
	function blurHandler(e) {
		if (e.target.value === "") {
			e.target.style.borderColor = "#f00";
			tooltip(e.target, "不能为空！", "#f00");
			e.target.dataset.status = false;
			return ;
		}
		if (that.pattern.test(e.target.value)) {
			e.target.style.borderColor = "#0f0";
			tooltip(e.target, that.success, "#0f0");
			e.target.dataset.status = true;
		} else {
			e.target.style.borderColor = "#f00";
			tooltip(e.target, that.fail, "#f00");
			e.target.dataset.status = false;
		}			
	}
}
function tooltip(input, text, color) {
	var span;
	if (input.parentNode.getElementsByTagName("span").length > 0) {
		span = input.parentNode.getElementsByTagName("span")[0];
		span.innerHTML = text;
		span.style.color = color;		
	} else {
		span = create("span");
		span.innerHTML = text;
		span.style.color = color;
		input.parentNode.appendChild(span);
	}	
}

function conf() {
	var username = new FormConf(
		"username",
		"名称", 
		"text", 
		/^.{4,16}$/, 
		"必填，长度为4~16个字符", 
		"格式正确", 
		"格式错误"),
	password = new FormConf(
		"password",
		"密码",//表单标签
		"password",//表单类型
		/^[a-zA-Z]\w{5,17}$/,
		"以字母开头，长度为6~18个字符",
		"密码可用",
		"密码不可用"),
	confirmPsw = new FormConf(
		"confirmPsw",
		"确认密码",//表单标签
		"password",//表单类型
		/ /,
		"再次输入密码",
		"密码输入一致",
		"密码输入不一致"),
	email = new FormConf(
		"email",
		"邮箱",//表单标签
		"email",//表单类型
		/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		"输入电子邮箱地址",
		"邮箱格式正确",
		"邮箱格式错误"),
	mobile = new FormConf(
		"mobile",
		"手机",//表单标签
		"text",//表单类型
		/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
		"输入手机号码",
		"手机格式正确",
		"手机格式不正确");


	var confObj = {
		"username": username,
		"password": password,
		"confirmPsw": confirmPsw,
		"email": email,
		"mobile": mobile
	};
	return confObj;
}

function createForm(obj) {	
	var wrap = create("div"),
		label = create("label"),
		input = create("input");
	label.for = obj.name;
	label.innerHTML = obj.label + ":&nbsp;";
	input.id = obj.name;
	input.dataset.status = false;
	input.className = "input";
	input.type = obj.type;
	obj.validator(input);
	wrap.appendChild(label);
	wrap.appendChild(input);
	return wrap;
}

function submit() {
	var submit = create("input");
	submit.className = "submit";
	submit.type = "submit";
	eve.addListener(submit, "click", submitHandler);
	function submitHandler(e) {
		var inputs = submit.parentNode.getElementsByClassName("input"),
			status = true;
		for (var i = 0, length = inputs.length; i < length; i++) {
			inputs[i].focus();
			inputs[i].blur();
			if (inputs[i].dataset.status === "false") {status = false;}//属性需要引号
		}

		if (status === false) {
			e.preventDefault();
			window.alert("输入有误！");
		} else {
			window.alert("提交成功！");
		}
	}
	return submit;
}

function initForm(wrap, url) {
	var h2 = create("h2");
	h2.innerHTML = "注册信息";
	wrap.appendChild(h2);
	var link = create("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	$("head").appendChild(link);
	var confObj = conf();
	for (var key in confObj) {		
		wrap.appendChild(createForm(confObj[key]));
	}
	wrap.appendChild(submit());	
}


