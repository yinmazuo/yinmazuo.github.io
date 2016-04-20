function Mask(param) {
	var param = param || {};
	this.title = param.title;
	this.content =  param.content;
	this.confirmFn =  param.confirmFn;
	this.cancleFn =  param.cancleFn;
	this.wrap = $create("div");
}

Mask.prototype = {
	constructor: Mask,
	init: function() {
		var title = $create("h2"),
			content = $create("p"),
			inner = $create("div"),
			confirm = $create("button"),
			cancle = $create("button");	 
			btns = $create("div");
		inner.className = "inner";
		this.wrap.className = "wrap";
		title.innerHTML = this.title || "弹出框",
		content.innerHTML = this.content || "是否确定？",
		confirm.innerHTML = "confirm";
		cancle.innerHTML = "cancle";
		var that = this;
		eve.addListener(inner, "click", innerHandler);
		function innerHandler(e) {
			e.stopPropagation();
			if (e.target === confirm) {
				if (that.confirmFn !== undefined) {
					that.confirmFn();
				}
				that.close();
			} 
			if (e.target === cancle) {
				if (that.cancleFn !== undefined) {
					that.cancleFn();
				}
				that.close();
			}
		}
		eve.addListener(this.wrap, "click", function(){that.close();});
		btns.appendChild(confirm);
		btns.appendChild(cancle);
		inner.appendChild(title);
		inner.appendChild(content);
		inner.appendChild(btns);
		this.wrap.appendChild(inner);		
	},
	show: function() {
		this.init();
		$("body").appendChild(this.wrap);
	},
	close: function() {
		$("body").removeChild(this.wrap);
	}
}

eve.addListener($("#start"), "click", function() {
	var s = new Mask();
	s.show();
});


