var calendar = function() {
	function Calendar(config) {
		this.isRange = config.isRange;
		this.range = [];
		this.rangeGap = config.range.gap || [1, 10];
		this.rangeCallBack = config.range.callBack;
		this.target = config.target;
		this.wrap = config.wrap;
		this.callBack = config.callBack;
		this.startDate = new Date(config.startDate);
		this.endDate = new Date(config.endDate);		
		this.year = -1;
		this.month = -1;
		this.date = -1;
		this.frame = $create("div");
		this.fhead = $create("div");
		this.fbody = $create("div");
	}	
	Calendar.prototype = {
		createCalFrame: function() {
			var that = this,
				frame = this.frame,
				fhead = this.fhead,
				fbody = this.fbody,
				startDate = this.startDate,
				endDate = this.endDate,
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
					months = ["Jan", "Feby", "Mar", "Apr", "May", "June", "July", "Aug",
							"Sep", "Oct", "Nov", "Dec"];
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
			if (that.isRange) {
				var rangeBtn = $create("div");
				rangeBtn.className = "rangeBtn";
				rangeBtn.innerHTML = "<button class='confirm'>Confirm</button>" + 
										"<button class='cancle'>Cancle</button>";
				frame.appendChild(rangeBtn);
			}
			this.wrap.appendChild(frame);
		},
		refreshCal: function() {
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
					}									
				}
				lis[j].innerHTML = dateArr[j].getDate();
				if (dateArr[j].getMonth() !== this.month) {
					if (j < firstDay) {
						if (this.year === new Date (this.startDate).getFullYear() && this.month === 0) {//日期下限
							$classList.remove(lis[j], "day");
							lis[j].innerHTML = "";
						} else {
							$classList.add(lis[j], "prevMonth");
						}						
					} else {
						if (this.year === new Date (this.endDate).getFullYear()  && this.month === 11) {//日期上限
							$classList.remove(lis[j], "day");							
							lis[j].innerHTML = "";
						} else {
							$classList.add(lis[j], "nextMonth");
						}
					}					
				}				
			}
		},
		addEvent: function() {
			var that = this,
				frame = this.frame,
				fhead = this.fhead,
				fbody = this.fbody,
				startDate = this.startDate,
				endDate = this.endDate;
			eve.addListener(that.wrap.querySelector(".icon"), "click", function(){
				if (frame.style.visibility == "hidden") {
					frame.style.visibility = "visible";
				} else {
					frame.style.visibility = "hidden";
				}
			});
			eve.addListener(that.target, "focus", function(){
				frame.style.visibility = "visible";
			});
			eve.addListener(that.target, "keyup", function(){
				var e = event || window.event,
					target = e.target || e.srcElement,
					pattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
				if (pattern.test(target.value)) {
					that.setDate(target.value);
				}
			});
			eve.addListener(fhead.querySelector(".selectDate"), "change", handler);
			eve.addListener(fhead.querySelector(".prev"), "click", handler);
			eve.addListener(fhead.querySelector(".next"), "click", handler);			
			function handler(event) {
				var e = event || window.event,
					target = e.target || e.srcElement;
				switch (target.className) {
					case "js-month":
						that.month = target.selectedIndex;											
						break;
					case "js-year":
						that.year = target.selectedIndex + startDate.getFullYear();
						break;
					case "prev btn":
						that.switchMonth("prev");
						break;
					case "next btn":
						that.switchMonth("next");
						break;
					default:
						break;
				}	
				that.refreshCal();//刷新日期数据
				that.changeDate();				
			}	
			//下部按钮事件
			if (frame.querySelector(".rangeBtn") !== null) {
				eve.addListener(frame.querySelector(".rangeBtn"), "click", rangeHandler);
				function rangeHandler(event) {
					var e = event || window.event,
					target = e.target || e.srcElement;
					if (target.className === "confirm") {
						if (that.range.length < 2) {
							alert("请选择时间段！");
							return false;
						}
						that.output("From " + that.range[0] + " To " + that.range[1]);
						frame.style.visibility = "hidden";
					}
					that.range.splice(0, 2);
					var lis = fbody.querySelectorAll(".day");
					for (var i = 0, length = lis.length; i < length; i++) {
						if ($classList.contains(lis[i], "selected")) {
							$classList.remove(lis[i], "selected");
						}
						if ($classList.contains(lis[i], "inRange")) {
							$classList.remove(lis[i], "inRange");
						}
					}	
					
				}
			}	
		},
		switchMonth: function(d) {	
			if (d === "prev") {
				if (this.year === this.startDate.getFullYear() && this.month === 0){
					return false;
				}
				--this.month 
			}
			if (d === "next") {
				if ((this.year === this.endDate.getFullYear() && this.month === 11)) {
					return false;
				}
				++this.month;
			}
			if (this.month < 0) {
				this.month = 11;
				--this.year;
			}
			if (this.month > 11) {
				this.month = 0;
				++this.year;
			}
			this.fhead.querySelector(".js-month").selectedIndex = this.month;
			this.fhead.querySelector(".js-year").selectedIndex = this.year - this.startDate.getFullYear();
		},
		selectDate: function() {
			var that = this,
				frame = this.frame,
				fhead = this.fhead,
				fbody = this.fbody;
			eve.addListener(fbody.querySelector(".days"), "click", handler);
			function handler(event) {
				var e = event || window.event,
					target = e.target || e.srcElement;
				if ($classList.contains(target, "days") || //消除边框的错误点击事件
						$classList.contains(target, "none")) {return false;}
				that.isRange?rangeDateHandler() : oneDateHandler();
				function oneDateHandler() {
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
							that.switchMonth("prev");
							that.refreshCal();
							that.changeDate();
						} 
						if ($classList.contains(target, "nextMonth")) {					
							that.switchMonth("next");
							that.refreshCal();
							that.changeDate();
						}					
						that.output(that.getDate());	
						frame.style.visibility = "hidden";//每次选择日期后隐藏日历							
					}
				}
				function rangeDateHandler() {					
					var range =that.range;				
					if (!$classList.contains(target, "day")) {return false;}
					that.date = parseInt(target.innerHTML);
					var m = that.month;	
					if ($classList.contains(target, "prevMonth")) {
						--m;
					}
					if($classList.contains(target, "nextMonth")) {
						++m;
					}	
					var currDate = that.getDate({month: m});	
					switch (range.length) {
						case 1:
						if (!isInGap(0)) {return false;}//是否在允许间隔内
						goSwitch();
						if (range[0] > currDate) {//日期在前的为数组第一个元素
							range.unshift(currDate);
						} else {
							range.push(currDate);
						}
						break;
						case 2:	
						goSwitch();
						var lis = fbody.querySelectorAll(".day");
						for (var i = 0, length = lis.length; i < length; i++) {
							if ($classList.contains(lis[i], "selected")) {
								$classList.remove(lis[i], "selected");
							}
							if ($classList.contains(lis[i], "inRange")) {
								$classList.remove(lis[i], "inRange");
							}
						}						
						range.splice(0, 2, currDate);//清除已选
						break;
						default:
						goSwitch(); 
						range.push(currDate);						
					}	
					that.markDate();														
					function isInGap(x) {
						var interval = Math.abs(new Date(currDate).getTime() - 
							new Date(range[x]).getTime()) / (1000 * 60 * 60 * 24);
						if (interval < that.rangeGap[0] || interval > that.rangeGap[1]) {
							alert("时间间隔应大于" + that.rangeGap[0] + "天,小于" + that.rangeGap[1] + "天.");
							return false;
						}
						return true;
					}
					function goSwitch() {
						if ($classList.contains(target, "prevMonth")) {						
							that.switchMonth("prev");
							that.refreshCal();
						} 
						if ($classList.contains(target, "nextMonth")) {					
							that.switchMonth("next");
							that.refreshCal();
						}
					}	
				}						
			}			
		},
		markDate: function() {
				var that = this,
					range = that.range,
					lis = this.fbody.querySelectorAll(".day");
				for (var i = 0, length = lis.length; i < length; i++) {
					if ($classList.contains(lis[i], "inRange")) {
						$classList.remove(lis[i], "inRange");
					}
					var m = that.month, d = parseInt(lis[i].innerHTML), currDate;
					if ($classList.contains(lis[i], "prevMonth")) {
						--m;
					}
					if($classList.contains(lis[i], "nextMonth")) {
						++m;
					}
					currDate = that.getDate({month: m, date: d});											
					if (currDate > range[0] && range[1] !== undefined && currDate < range[1]) {
						$classList.add(lis[i], "inRange");
					}
					if ((currDate === range[0] || currDate === range[1]) && 
						!$classList.contains(lis[i], "selected")) {
						$classList.add(lis[i], "selected");
					}					
				}
			},	
		changeDate: function() {
			var that = this,
				frame = this.frame,
				fhead = this.fhead,
				fbody = this.fbody;
			if (this.isRange) {
				that.markDate();
			} else {
				var lis = fbody.querySelector(".days").querySelectorAll(".currMonth");
				for (var i = 0, length = lis.length; i < length; i++) {
					if (parseInt(lis[i].innerHTML) === this.date) {
						$classList.add(lis[i], "selected");
					}
				}			
				//选择月份最后一天并切换月份时，进行修正
				if ($(".calendar .days").querySelectorAll(".selected").length === 0) {
					var currMonth = $(".calendar .days").querySelectorAll(".currMonth");
					$classList.add(currMonth[currMonth.length - 1], "selected");
					this.date = currMonth.length;
				}
			}			
		},
		setDate: function(date) {
			var pattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
			var newDate = new Date(date);
			if (isNaN(newDate.getTime())) {
				return false;
			}
			var	year = newDate.getFullYear(),
				startDate = this.startDate,
				endDate = this.endDate;
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
			this.refreshCal();
		},
		output: function(info) {
			this.target.value = info;
			this.callBack(info);
		},
		getDate: function(date) {
			if (date === undefined) {date = {};}
			var y = date.year || this.year,
				m = date.month || this.month,
				d = date.date || this.date;
			if (m < 10) {
				m = "0" + (m + 1);
			} else {
				m = m + 1;
			}
			if (d < 10) {
				d = "0" + d;
			}
			var currDate = y + "/" + m + "/" + d;
			return currDate;
		},
		init: function() {
			this.createCalFrame();
			this.refreshCal();
			this.addEvent();
			this.selectDate();
		}
	};

	function init(config) {
		var c = new Calendar(config);
		c.init();
		return {
			setDate: c.setDate,
			getDate: c.getDate
		}
	}
	return init;
}();

var c = calendar({
		target: $(".dateIn"),
	 	wrap: $(".wrap"),
	 	startDate: "2000/01/01",
	 	endDate: "2020/12/31",
	 	isRange: true,
	 	range: {
	 		gap: [1, 20],
	 		callBack: function() {

	 		}
	 	},
	 	callBack: function(date) {
	 		alert(date);
	 	}
 	});