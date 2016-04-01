
window.onload = function () {	
	$("#btn").onclick = function (e) {//控制子元素在48以内
		switch (e.target.id) {
			case "random":
			random50();
			break;
			case "sort":
			runSort();
			break;
			case "leftIn":
			leftIn();
			break;
			case "leftOut":
			leftOut();
			break;
			case "rightIn":
			rightIn();
			break;
			case "rightOut":
			rightOut();
			break;
		}
	};

	function random50() {//产生随机50
		$("#wrap").innerHTML = "";//每次点击清除上一次
		for (var i = 0; i < 50; i++) {
			var height = Math.floor(Math.random() * 400 + 1) + "px";
			$("#wrap").appendChild(createDiv(height));
		}
	};
	//排序
	function runSort(){
		var div = $("#wrap").getElementsByTagName("div");
		
		var arr = [];
		//因为排序时使用shift方法，在此将类对象数组转换成纯数组，有点迟钝了==但是不想改排序函数
		for (var i = 0;i < div.length;i++) {
			arr.push(div[i]);
		}
		qSort.call(this, arr);
	};

	//左入
	function leftIn() {
		if (!newElement()) {return;}
		if ($("#wrap").firstElementChild){
			$("#wrap").insertBefore(newElement(), $("#wrap").firstElementChild);
		} else {
			$("#wrap").appendChild(newElement());
		}
	};
	//左出
	function leftOut() {
		if ($("#wrap").firstElementChild){
			$("#wrap").removeChild($("#wrap").firstElementChild);
		} else {
			alert("无可移除对象！");
		}
	};
	//右入
	function rightIn() {	
		if (!newElement()) {return;}
		$("#wrap").appendChild(newElement());
	};
	//右出
	function rightOut() {
		if ($("#wrap").lastElementChild){
			$("#wrap").removeChild($("#wrap").lastElementChild);
		} else {
			alert("无可移除对象！");
		}
	};


	//创建带有width以及随机color的div
	function createDiv(height) {
		var element = document.createElement("div");
		element.style.width = "20px";
		element.style.height = height;
		bgc(element);
		return element;
	}
	//获取输入值并生成完整的div
	function newElement() {
		if ($("#wrap").getElementsByTagName("div").length == 50) {
			alert("最多50个！");
			return ;
		}
		if ($("#newNode").value > 0 && $("#newNode").value < 401) {
			var height = $("#newNode").value + "px";
			return createDiv(height);
		} else {
			alert("请输入1~400的数字！");
			return ;
		}
	}
	//快速排序
	function qSort(list) {				
		var lesser = [],
			greater = [],
			pivot = list.shift();
		if (list.length == 0) {
			return [];
		}
		sort();
		
		function sort() {	
			var head = list.shift();		
			if (parseInt(head.style.height) < 
				parseInt(pivot.style.height)) {
				try {transform(head, pivot);} catch(ex) {}
				lesser.push(head);
			} else {
				greater.push(head);	
			}
			
			if (list.length > 0) {
				setTimeout(sort, 50);				
			} else {
				qSort(lesser).concat(pivot, qSort(greater));
			}
		}
		return [];
	}

	function transform(ele, pivot) {//移除比pivot后面比他小的，并放在pivot前
		var newEle = ele;
		$("#wrap").removeChild(ele);
		$("#wrap").insertBefore(newEle, pivot);
	}

	function bgc(ele) {	//随机生成颜色值
		var color = "";
		for (var i = 0; i < 6; i++) {
			color += "0123456789abcdef"[Math.floor(Math.random()*16)];//每次产生一个随机16进制数
		}
		color = "#" + color;
		ele.style.backgroundColor = color;
	}

	function $(selector) {//自定义选择器
		return document.querySelector(selector);
	}

};


