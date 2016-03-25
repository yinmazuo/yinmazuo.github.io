
window.onload = function () {
	var wrap = document.getElementById("wrap"),
		init = document.getElementById("random"),
		sort = document.getElementById("sort"),
		listArr = [], rand = [], arr;


	init.onclick = function () {
		wrap.innerHTML = "";//每次点击清除上一次
		listArr = [];
		random(400);
		initElements(400);
	};

	sort.onclick = function (){
		if (listArr.length == 400) {//只有数组未排序，点击才有效
			qSort(listArr);
		}
	};


	function initElements(num) {//产生给定数量的条柱
		var height = rand;
		for (var i = 0; i < num; i++) {
			var element = document.createElement("div");
			element.style.height = height[i] + "px";
			bgc(element);
			wrap.appendChild(element);
			listArr.push(element);
		}	
	}

	function random(num) {//产生1~400的随机数，作为条柱的height
		for (var i = 0; i < num; i++) {	
			rand.push(Math.floor(Math.random() * 400 + 1));
		}
	}

	
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
				try {transform(head, pivot);} catch(ex) {}//排序中再随机会引发错误，但是可控的意料之中的
				lesser.push(head);
			} else {
				greater.push(head);	
			}
			
			if (list.length > 0) {
				setTimeout(sort, 5);				
			} else {//每次排序完开始递归排子数组（以下处理，自觉很乱，可是有效！还会改进）
				return qSort(lesser).concat(pivot, qSort(greater));
			}
		}
		return [];
	}

	function transform(ele, pivot) {//移除比pivot后面比他小的，并放在pivot前
		var newEle = ele;
		wrap.removeChild(ele);
		wrap.insertBefore(newEle, pivot);
	}

	function bgc(ele) {	//随机生成颜色值
		var color = "";
		for (var i = 0; i < 6; i++) {
			color += "0123456789abcdef"[Math.floor(Math.random()*16)];
		}
		color = "#" + color;
		ele.style.backgroundColor = color;
	}

};


