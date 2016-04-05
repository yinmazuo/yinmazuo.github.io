window.onload = function () {
	var checkedNodeParent, checkedNode;

	$("#wrap").onclick = function (e) {
		//判断选项卡是否已存在
		if (document.getElementsByClassName("tooltips").length > 0) {
			checkedNode = document.getElementsByClassName("tooltips")[0];
			//点击选项卡
			switch (e.target.id) {
				case "addChildNode":
				addChildNode(checkedNode.parentNode);
				break;
				case "removeNode":
				removeNode(checkedNode.parentNode);
				break;
				default:
				checkedNode.parentNode.removeChild(checkedNode);
			}
		}
		//
		if (e.target.tagName == "SPAN") {
			checkedNodeParent = e.target.parentNode;
			change(checkedNodeParent);			
		}
		if (e.target.tagName == "I") {
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
/*
*查找到后显示
*/
function show(node) {
	if (!(node.parentNode == null)) {//递归向上，使祖先节点都展开显示
		show(node.parentNode);
		if (node.tagName == "UL") {
			node.style.display = "";
		}	
	}	
}
/*
*添加
*/
function addChildNode(node) {
	var ul, li, span, name = prompt("请输入节点名：");
	if (!name) {alert("节点名不能为空！");return;}
	ul = document.createElement("ul");
	li = document.createElement("li");
	li.innerHTML = "<span>" + name + "</span><i>=</i>";
	ul.appendChild(li);

	if (node.getElementsByTagName("ul").length > 0) {//为了结构的完整性
		node.getElementsByTagName("ul")[0].appendChild(li);
	} else {
		node.appendChild(ul);
	}
	node.getElementsByTagName("ul")[0].style.display = "";
}
/*
*删除
*/
function removeNode(node) {
	if (node.parentNode.id && node.parentNode.id == "root") {
		alert("不能删除根节点！");
		return ;
	}
	node.parentNode.removeChild(node);
}
/*
*改变状态
*/
function change(node) {	
	if (node.getElementsByTagName("ul").length > 0) {
		var display = node.getElementsByTagName("ul")[0].style.display;
		if (display == "none") {
			node.getElementsByTagName("ul")[0].style.display = "";
		} else {
			node.getElementsByTagName("ul")[0].style.display = "none";
		}
	}
}

/*
*选项卡
*/
function tooltips() {
	var fragment = document.createDocumentFragment(),
		tooltips = document.createElement("div");
	tooltips.className = "tooltips";
	tooltips.innerHTML = "<div id='addChildNode'>添加</div><div id='removeNode'>删除</div><div id='cancle'>取消</div>"; 
	fragment.appendChild(tooltips); 
	return fragment;
}
/*
*选择器
*/
function $(selector) {
	return document.querySelector(selector);
}


