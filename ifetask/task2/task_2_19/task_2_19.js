
window.onload = function () {
	var listArr = [],
	 	rand = [],
	  	arr;


	$("#random").onclick = function () {//产生随机400
		$("#wrap").innerHTML = "";//每次点击清除上一次
		listArr = [];
		random(400);
		initElements(400);
	};

	$("#sort").onclick = function (){//排序
		if (listArr.length == 0) {
			var newArr = $("#wrap").getElementsByClassName("new");
			console.log(newArr);
			qSort(newArr);
		}
		if (listArr.length == 400) {//只有数组未排序，点击才有效
			qSort(listArr);
		}
	};



	$("#leftIn").onclick = function () {//左入
		if (!newElement()) {return;}
		if ($("#wrap").firstElementChild){
			$("#wrap").insertBefore(newElement(), $("#wrap").firstElementChild);
		} else {
			$("#wrap").appendChild(newElement());
		}
	};

	$("#leftOut").onclick = function () {//左出
		if ($("#wrap").firstElementChild){
			$("#wrap").removeChild($("#wrap").firstElementChild);
		} else {
			alert("无可移除对象！");
		}
	};

	$("#rightIn").onclick = function () {//右入	
		if (!newElement()) {return;}
		$("#wrap").appendChild(newElement());
	};

	$("#rightOut").onclick = function () {//右出
		if ($("#wrap").lastElementChild){
			$("#wrap").removeChild($("#wrap").lastElementChild);
		} else {
			alert("无可移除对象！");
		}
	};

	$("#btn").onclick = function (e) {//控制子元素在50以内
		if (!(e.target.id == "random" || e.target.id == "sort")) {
			$("#wrap").innerHTML = "";
			listArr = [];
		}	

		if ($("#wrap").getElementsByClassName("new").length > 48) {
			alert("最多48个！");
			return ;
		}
	};



	function newElement() {
		var element = document.createElement("div");
		element.style.width = "20px";
		element.className = "new";
		if ($("#newNode").value > 0 && $("#newNode").value < 401) {
			element.style.height = $("#newNode").value + "px";
		} else {
			alert("请输入1~400的数字！");
			return ;
		}

		element.style.marginLeft = "4px";
		bgc(element);
		return element
	}





	function initElements(num) {//产生给定数量的条柱
		var height = rand;
		for (var i = 0; i < num; i++) {
			var element = document.createElement("div");
			element.style.height = height[i] + "px";
			bgc(element);
			$("#wrap").appendChild(element);
			listArr.push(element);
		}	
	}

	function random(num) {//产生1~400的随机数，作为条柱的height
		for (var i = 0; i < num; i++) {	
			rand.push(Math.floor(Math.random() * 400 + 1));
		}
	}

	
	function qSort(list) {//快速排序
				
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
				try {transform(head, pivot);} catch(ex) {}//排序中再随机会引发错误，但是可控的意料之中的
				lesser.push(head);
			} else {
				greater.push(head);	
			}
			
			if (list.length > 0) {
				setTimeout(sort, 1);				
			} else {//每次排序完开始递归排子数组（以下处理，自觉很乱，可是有效！还会改进）
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


