var tableUtil = function() {
	/**
	 * 初始化
	 * @param  {Object} options 配置参数
	 * @return {Object}         
	 */
	var init = function(options) {
		var table = new SortableTable(options);
		table.createTable();
		table.setData();
		return table;
	}; 

	function SortableTable(options) {
		this.headData = options.data.head;
		this.bodyData = options.data.body;
		this.sortable = options.data.sortable || options.data.head;
		this.wrap = options.wrap || $("body");
		this.sortFn = options.sortFn || defaultSort;
		this.table = $create("table");
		this.tbody = $create("tbody");
		this.status = [];
	}
	SortableTable.prototype = {
		constructor: SortableTable,
		createTable: function() {
			var that = this,
				headData = this.headData,
				bodyData = this.bodyData,
				sortable = this.sortable,
				length = headData.length,
				table = this.table,
				tbody = this.tbody;	
			table.className = "sortableTable";	
			//表头创建及数据填充
			(function() {				
				table.appendChild(createHead());//表头插入表格中
				//创建表头副本，择机显示在窗口上
				(function() {
					var fixedHead = createHead();		
					fixedHead.style.position = "fixed";
					fixedHead.style.top = "0px";					
					fixedHead.style.display = "none";
					$("body").appendChild(fixedHead);
					eve.addListener(window, "resize", showHead);//监听窗口大小改变
					eve.addListener(window, "scroll", showHead);//监听页面滚动
					function showHead() {
						var clientTop = table.getBoundingClientRect().top,//获取表格距离视口的高
							clientLeft = table.getBoundingClientRect().left;//获取表格距离视口的宽
						if (clientTop < 0) {
							fixedHead.style.left = clientLeft + "px";
							fixedHead.style.display = "";
						} else {
							fixedHead.style.display = "none";
						}	
					}				
				})();			

				function createHead() {
					var tr = $create("tr"),
						thead = $create("thead");
					thead.className = "sortableThead";
					for (var i = 0; i < length; i++) {		
						var th = $create("th");
						th.dataset.index = i;
						th.innerHTML = headData[i];
						//判断是否可排序
						if (isSort(headData[i])) {					
							that.status.push(false);//初始化未排序状态
							var icon = $create("span");
							icon.className = "icon-sort";
							th.className = "isSort";
							th.appendChild(icon);
							eve.addListener(th, "click", sort);
						}
						tr.appendChild(th);
					}
					thead.appendChild(tr);
					return thead;
				}
				function sort(event) {
					var e = event || window.event,
						target = e.target || e.srcElement,
						index;
					if (target.className === "icon-sort") {target = target.parentNode;}
					index = target.dataset.index;	
					if (!that.status[index]) {
						bodyData.reverse();//保证排序稳定性
						that.sortFn(bodyData, index);
						that.status[index] = true;
					} else {
						that.sortFn(bodyData, index);
						bodyData.reverse();
						that.status[index] = false;
					}
					that.setData();
				}
				//判断是否可排序
				function isSort(head) {
					for (var i = 0; i < length; i++) {
						if (sortable.indexOf(head) === -1) {
							return false;
						}
					}
					return true;
				}
			})();
			//创建表格主体，为填充数据
			(function(){
				for (var j = 0, rowCount = bodyData.length; j < rowCount; j++) {
					var tr = $create("tr");
					for (var i = 0; i < length; i++) {
						var td = $create("td");
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}		
				table.appendChild(tbody);
			})();
			this.wrap.appendChild(table);
		},
		//填充数据
		setData: function() {
			var trs = this.tbody.querySelectorAll("tr"); 
			for (var j = 0, rowCount = this.bodyData.length; j < rowCount; j++) {
				var tds = trs[j].querySelectorAll("td");
				for (var i = 0, length = this.headData.length; i < length; i++) {
					tds[i].innerHTML = this.bodyData[j][i];
				}
			}
		}

	};
	/**
	 * 默认排序方法
	 * @param  {Array} list 
	 * @return {Array}      
	 */
	function defaultSort(list, index) {
		for (var length = list.length, i = length; i > 1; i--) {
			for (var j = 0; j < i - 1; j++) {
				if (list[j][index] > list[j+1][index]) {
					var m = list[j];
					list[j] = list[j+1];
					list[j+1] = m;
				}
			}
		}
		return list;
	}
	return {
		init: init
	}
}();


var table1 = tableUtil.init({
	data: {
		head: ["Name", "Chinese", "Math", "English", "Physics", "Chemistry"],
		body: [
			  ["AAA", 20, 50, 40, 30, 60],
			  ["BBB", 50, 40, 30, 60, 70],
			  ["CCC", 40, 80, 60, 70, 50],
			  ["DDD", 70, 60, 50, 80, 90],
			  ["EEE", 20, 50, 40, 30, 60],
			  ["FFF", 50, 40, 30, 60, 70],
			  ["GGG", 40, 80, 60, 70, 50],
			  ["HHH", 70, 60, 50, 80, 90],
			  ["III", 20, 50, 40, 30, 60],
			  ["JJJ", 50, 40, 30, 60, 70],
			  ["KKK", 40, 80, 60, 70, 50],
			  ["LLL", 70, 45, 45, 80, 90],
			  ["MMM", 10, 60, 54, 67, 62],
			  ["NNN", 80, 67, 67, 71, 73],
			  ["OOO", 60, 90, 78, 72, 46],
			  ["PPP", 40, 60, 85, 40, 94],
			  ["QQQ", 20, 78, 75, 60, 86],
			  ["RRR", 12, 76, 43, 87, 74],
			  ["SSS", 23, 43, 87, 89, 62],
			  ["TTT", 45, 78, 09, 85, 86],
			  ["UUU", 67, 09, 78, 82, 52],
			  ["VVV", 70, 70, 74, 80, 96]
		],
		sortable: ["Chinese", "Math", "English", "Physics", "Chemistry"]
	},
});
/*
config: {
	wrap: $("body"),//默认添加在body中
	data: {
		head: ["Name", "Chinese", "Math", "English", "Physics", "Chemistry"],
		body: [
			  ["AAA", 20, 50, 40, 30, 60],
			  ["BBB", 50, 40, 30, 60, 70],
			  ["CCC", 40, 80, 60, 70, 50],
			  ["DDD", 70, 60, 50, 80, 90],
		],
		sortable: ["Chinese", "Math", "English", "Physics", "Chemistry"]
	},
	//排序方法
	sortFn: function(list, index) {
		for (var length = list.length, i = length; i > 1; i--) {
			for (var j = 0; j < i - 1; j++) {
				if (list[j][index] > list[j+1][index]) {
					var m = list[j];
					list[j] = list[j+1];
					list[j+1] = m;
				}
			}
		}
		return list;
	}
}
*/