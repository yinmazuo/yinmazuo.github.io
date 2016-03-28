window.onload = function () {
	var checkedNodeParent, checkedNode;

	$("#root").onclick = function (e) {
		//判断选项卡是否已存在
		if (this.getElementsByClassName("tooltips").length > 0) {
			checkedNode = checkedNodeParent.getElementsByClassName("tooltips")[0];
			//点击选项卡
			switch (e.target.id) {
				case "addChildNode":
				addChildNode(checkedNodeParent);
				break;
				case "removeNode":
				removeNode(checkedNodeParent);
				break;
				case "fold":
				fold(checkedNodeParent);
				break;
				case "spread":
				spread(checkedNodeParent);
				break;
				default: ;
			}
			//选项卡消失
			checkedNodeParent.removeChild(checkedNode);
		}
		//判断并显示选项卡
		if (e.target.tagName == "SPAN") {
			checkedNodeParent = e.target.parentNode;		
			e.target.parentNode.appendChild(tooltips());
		}
 	};

 	//搜索
 	$("#searchBtn").onclick = function () {
 		search = $("#search").value;
 		if (search == "") {alert("搜索关键字不能为空！");}
 		preOrder($("#root"));	
 	};


};

var nodeArr = [];
//先序遍历
function preOrder(node) {
	if (!(node == null)) {
		if (node.style.color = "#ff0000") {
			node.style.color = "#000";
			node.style.backgroundColor = "#fff";
		}
		if (node.innerHTML == search) {
			node.style.color = "#ff0000";
			node.style.backgroundColor = "#bbb";
			show(node);
		}
		preOrder(node.firstElementChild);
		preOrder(node.nextElementSibling);
	}
}
//查找到后显示
function show(node) {
	if (!(node.parentNode == null)) {//递归向上，使祖先节点都展开显示
		show(node.parentNode);
		if (node.tagName == "UL") {
			node.style.display = "";
		}	
	}	
}
//添加
function addChildNode(node) {
	var ul, li, span, name = prompt("请输入节点名：");
	if (name == "") {alert("节点名不能为空！");}
	ul = document.createElement("ul");
	li = document.createElement("li");
	span = document.createElement("span");
	span.innerHTML = name;
	li.appendChild(span);
	ul.appendChild(li);

	if (node.getElementsByTagName("ul").length > 0) {//为了结构的完整性
		node.getElementsByTagName("ul")[0].appendChild(li);
	} else {
		node.appendChild(ul);
	}
}
//删除
function removeNode(node) {
	if (node.parentNode.id && node.parentNode.id == "root") {
		alert("不能删除根节点！");
		return ;
	}
	node.parentNode.removeChild(node);
}

function change(node, status) {
	if (node.getElementsByTagName("ul").length > 0) {
		node.getElementsByTagName("ul")[0].style.display = status;
	}
}
//折叠
function fold(node) {
	change(node, "none");
}
//展开
function spread(node) {
	change(node, "");
}
//选项卡
function tooltips() {
	var tooltips = $("#tool > .tooltips").cloneNode(true);//从辅助节点那里深度克隆出选项卡的完整节点
	return tooltips;
}
//选择器
function $(selector) {
	return document.querySelector(selector);
}


