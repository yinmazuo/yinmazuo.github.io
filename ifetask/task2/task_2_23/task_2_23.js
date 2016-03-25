window.onload = function () {
	var root = document.getElementsByClassName("one")[0],
		btn = document.getElementById("btn"),
		searchKey = document.getElementsByClassName("search")[0],
		showQueue = [], head, timer;

	function preOrder(node) {	//前序遍历
		if (!(node == null)) {	
			showQueue.push(node);             //showQueue是要显示的节点的队列			
			arguments.callee(node.firstElementChild);		
			arguments.callee(node.nextElementSibling);	
		}
	}

	function postOrder(node) {	//后序遍历
		if (!(node == null)) {				
			arguments.callee(node.firstElementChild);	
			showQueue.push(node);		
			arguments.callee(node.nextElementSibling);								
		}
	}

	btn.onclick = function (e){	 		
		if (showQueue.length > 0) { //如果队列非空即正在遍历
			head.style.backgroundColor = "#fff";//清除残留色
			showQueue = []; //清空队列
			clearTimeout(timer); //清除定时器
		}

		/*eval(e.target.id + "Order(root);");*/
		switch (e.target.id) {  //判断点击的按钮是哪个
			case "pre" : 
			preOrder(root);										
			break;
			case "post" : 					
			postOrder(root);										
			break;
			case "search" : 					
			search();										
			break;
		}
		show(); //showQueue中待显示节点入队完毕并开始显示

		function show() {
			head = showQueue.shift(); //出队

			if (head && head.childNodes[0] != searchKey) {
				head.style.backgroundColor = "#ff0000";//显示色
				timer = setTimeout(function(){
					head.style.backgroundColor = "#fff";//节点的红色变为白色
					show(); //递归调用show，使要显示的节点不停出队显示，直至为空
				}, 500);
			} else {
				showQueue = []; //清空队列
				clearTimeout(timer); //清除定时器
			}
		}

		function search() {
			if (showQueue.length  == 0) {
				preOrder(root);
			}	
		}	
	};

};
