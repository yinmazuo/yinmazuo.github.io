
var calendar= function() {
	function Calendar(config) {
		this.target = config.target;
		this.startDate = config.startDate;
		this.endDate = config.endDate;
		this.wrap = config.wrap;
		this.callBack = config.callBack;
		this.year = -1;
		this.month = -1;
		this.date = -1;
	}
	Calendar.prototype = {
		createCanlendarFrame: function() {		
			var that = this,
				frame = $create("div"),
				fhead = $create("div"),
				fbody = $create("div"),
				startDate = new Date(this.startDate),
				endDate = new Date(this.endDate),
				currDate = new Date(Date.now());
			this.year = currDate.getFullYear();
			this.month = currDate.getMonth();
			this.date = currDate.getDate();				
			frame.className = "calendar";
			fhead.className = "calendarHead";
			fbody.className = "calendarBody";	
			//生成日历头	
			(function() {
				var start = startDate.getFullYear(),
					end = endDate.getFullYear(),
					years = [],
					months = ["January", "February", "March", "April", "May", "June", "July", "August",
							"September", "October", "November", "December"];
				var s = start;
				while (end >= s) {
					years.push(s);
					++s;
				}
				fhead.innerHTML = "<span class='prev btn'></span><div class='selectDate'>" + 
									"<select class='js-month'>" + createFragment(months, "option") + "</select>" + 
									"<select class='js-year'>" + createFragment(years, "option") + "</select>" + 
									"</div><span class='next btn'></span>";
				fhead.querySelector(".js-month").selectedIndex = that.month;
				fhead.querySelector(".js-year").selectedIndex = (that.year - start);
				frame.appendChild(fhead);				
			})();
			//生成星期
			(function() {
				var daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					days = new Array(42);
				fbody.innerHTML = "<ul class='daysOfWeek'>" + createFragment(daysOfWeek, "li") + "</ul>" + 
								"<ul class='days'>" + createFragment(days, "li") + "</ul>";
				frame.appendChild(fbody);	
			})();
			//HTML片段生成器
			function createFragment(arr, ele) {
				var fragment = "";
				for (var i = 0, count = arr.length; i < count; i++) {
					if (arr[i] === undefined) {arr[i] = "";}
					fragment += "<" + ele + ">" + arr[i] + "</" + ele + ">";
				}
				return fragment;
			}
			this.wrap.appendChild(frame);

			//注册监听事件
			eve.addListener($(".icon"), "click", function(){
				if (frame.style.visibility == "hidden") {
					frame.style.visibility = "visible";
				} else {
					frame.style.visibility = "hidden";
				}
			});
			eve.addListener($(".dateIn"), "focus", function(){
				frame.style.visibility = "visible";
			});
			eve.addListener(that.target, "keyup", function(){
				var e = event || window.event,
					target = e.target || e.srcElement,
					pattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
				if (pattern.test(target.value)) {
					that._setDate(target.value);
				}
			});
			eve.addListener(fhead.querySelector(".selectDate"), "change", handler);
			eve.addListener(fhead.querySelector(".prev"), "click", handler);
			eve.addListener(fhead.querySelector(".next"), "click", handler);
			eve.addListener(fbody.querySelector(".days"), "click", handler);
			function handler(event) {
				var e = event || window.event,
					target = e.target || e.srcElement;
				if ($classList.contains(target, "days") || 
					$classList.contains(target, "none")) {return false;}
				var lis = fbody.querySelector(".days").querySelectorAll(".currMonth");
				for (var i = 0, length = lis.length; i < length; i++) {
					if ($classList.contains(lis[i], "selected")) {
						$classList.remove(lis[i], "selected");
					}
				}
				if ($classList.contains(target, "day")) {
					that.date = parseInt(target.innerHTML);
					$classList.add(target, "selected");
					if ($classList.contains(target, "prevMonth")) {						
						btnHandler("prev");
						that.changeDate();
					} 
					if ($classList.contains(target, "nextMonth")) {					
						btnHandler("next");
						that.changeDate();
					}					
					that._target();								
					return false;
				}
				switch (target.className) {
					case "js-month":
						that.month = target.selectedIndex;											
						break;
					case "js-year":
						that.year = target.selectedIndex + startDate.getFullYear();
						break;
					case "prev btn":
						btnHandler("prev");
						break;
					case "next btn":
						btnHandler("next");
						break;
					default:
						break;
				}	
				that.changeDate();
				that._target();					
			}		
			function btnHandler(d) {	
				if (d === "prev") {
					if (that.year === startDate.getFullYear() && that.month === 0){
						return false;
					}
					--that.month 
				}
				if (d === "next") {
					if ((that.year === endDate.getFullYear() && that.month === 11)) {
						return false;
					}
					++that.month;
				}
				if (that.month < 0) {
					that.month = 11;
					--that.year;
				}
				if (that.month > 11) {
					that.month = 0;
					++that.year;
				}
				fhead.querySelector(".js-month").selectedIndex = that.month;
				fhead.querySelector(".js-year").selectedIndex = that.year - startDate.getFullYear();
			}				
		},
		//日期数据更新
		changeDate: function() {
			var	firstDay = new Date(this.year + "/" + (this.month + 1) + "/" + "01").getDay(),
				dateArr = [];
			for (var i = 1 - firstDay, count = 42 - firstDay; i <= count; i++) {
				var newDate = new Date(this.year + "/" + (this.month + 1) + "/");
				dateArr.push(new Date(newDate.setDate(i)));
			}
			
			var lis = $(".calendar .days").querySelectorAll("li");
			for (var j = 0, length = lis.length; j < length; j++) {
				lis[j].className = "";
				$classList.add(lis[j], "day");		
				if (dateArr[j].getFullYear() === this.year) {
					if (dateArr[j].getMonth() === this.month) {
						$classList.add(lis[j], "currMonth");					
						if (dateArr[j].getDate() === this.date) {
							$classList.add(lis[j], "selected");
						}
					}									
				}
				lis[j].innerHTML = dateArr[j].getDate();
				if (dateArr[j].getMonth() !== this.month) {
					if (j < firstDay) {
						if (this.year === new Date (this.startDate).getFullYear()) {
							$classList.add(lis[j], "none");
							lis[j].innerHTML = "";
							lis[j].style.cursor = "initial";
						} else {
							$classList.add(lis[j], "prevMonth");
						}						
					} else {
						if (this.year === new Date (this.endDate).getFullYear()) {
							$classList.add(lis[j], "none");							
							lis[j].innerHTML = "";
							lis[j].style.cursor = "initial";
						} else {
							$classList.add(lis[j], "nextMonth");
						}
					}					
				}				
			}
			//选择月份最后一天并切换月份时，进行修正
			if ($(".calendar .days").querySelectorAll(".selected").length === 0) {
				var currMonth = $(".calendar .days").querySelectorAll(".currMonth");
				$classList.add(currMonth[currMonth.length - 1], "selected");
				this.date = currMonth.length;
			}
		},
		//设定输入框日期
		_target: function() {
			this.target.value = this._getDate();
			this.callBack();
		},
		//设定日期
		_setDate: function(date) {
			var pattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
			var newDate = new Date(date);
			if (isNaN(newDate.getTime())) {
				return false;
			}
			var	year = newDate.getFullYear(),
				startDate = new Date(this.startDate),
				endDate = new Date(this.endDate);
			if (!pattern.test(date)) {
				alert("请输入正确的日期格式");
				return false;
			}
			if(year < startDate.getFullYear() || 
				year > endDate.getFullYear()) {
				alert("设置的日期超出范围！");
				return false;
			}
			this.year = year;
			$(".calendarHead").querySelector(".js-year").selectedIndex = year - startDate.getFullYear();
			$(".calendarHead").querySelector(".js-month").selectedIndex = this.month = newDate.getMonth();
			this.date = newDate.getDate();
			this.changeDate();
		},
		//获取日期
		_getDate: function() {
			var date = this.year + "/" + (this.month + 1) + "/" + this.date;
			return date;
		}
	};
	return {
		init: function(config) {
			var newCalendar = new Calendar(config);
			newCalendar.createCanlendarFrame();
			newCalendar.changeDate();
			return {
				setDate: newCalendar._setDate.bind(newCalendar),
				getDate: newCalendar._getDate.bind(newCalendar)
			}
		}
	}
}();


var calendar1 = calendar.init({
	target: $(".dateIn"),
 	wrap: $(".wrap"),
 	startDate: "2000/01/01",
 	endDate: "2020/12/31",
 	callBack: function() {
 		console.log("回调方法！");
 	}
 });

/*配置格式
 config: {
 	target: $(".dateIn"),
 	wrap: $("body"),
 	startDate: "2000/01/01",
 	endDate: "2020/12/31",
 }
*/