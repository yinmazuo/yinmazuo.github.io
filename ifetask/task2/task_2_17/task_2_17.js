/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  chartData = aqiSourceData[pageState.nowSelectCity];
  switch (pageState.nowGraTime) {
    case "day":
    chartData = aqiSourceData[pageState.nowSelectCity];
    break;
    case "week":
    chartData = weekAverage(chartData);
    break;
    case "month":
    chartData = monthAverage(chartData);
    break;   
  }
  var wrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  wrap.innerHTML = "";
  //遍历对象添加柱形
  for (var time in chartData) {
    var div = createDiv(time, chartData[time], pageState.nowGraTime);
    wrap.appendChild(div);
  }
}
/**
 * 处理成需要的周数据
 */
function weekAverage(data) {
  var wData = {}, week = 1;
  for (var day in data) {   
    if (wData[week + "周"] == null) {
      wData[week + "周"] = [];
    }
    wData[week + "周"].push(data[day]);
    if (new Date(day).getDay() == 0) {
      ++week;
    }
  }
  return average(wData);
}
/**
 * 处理成需要的月数据
 */
function monthAverage(data) {
  var mData = {};
  //将原始数据以月为单位生成新对象
  for (var day in data) {
    var month = day.slice(5, 7);
    if (mData[month + "月"] == null) {
      mData[month + "月"] = [];
    }
    mData[month + "月"].push(data[day]);
  }
  return average(mData);
}
/**
 * 求平均值
 */
 function average(data) {
  //遍历对象，将其属性值分别求平均，再生成新对象
    for (var key in data) {
      data[key] = Math.floor(data[key].reduce(function(prev, cur, index, array){
        return prev + cur;
      })/data[key].length);
    }
    return data;
 }

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化 
  if (pageState.nowGraTime != value) {
  // 设置对应数据
    pageState.nowGraTime = value;  
  // 调用图表渲染函数
    renderChart.apply(this);
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value) {
  // 确定是否选项发生了变化 
  if (pageState.nowSelectCity != value) {
  // 设置对应数据
    pageState.nowSelectCity = value;
  // 调用图表渲染函数
    renderChart.apply(this);
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var formGraTime = document.getElementById("form-gra-time");
  var firstInput = formGraTime.getElementsByTagName("input")[0];

  firstInput.checked = "checked";
  pageState.nowGraTime = firstInput.value;

  formGraTime.onclick = function (e) {
    if (e.target.tagName == "INPUT") { 
      graTimeChange(e.target.value);
    }
  };
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var options,
      citySelect = document.getElementById("city-select");
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for (var city in aqiSourceData) {
    options += "<option>" + city + "</option>";
  }
  citySelect.innerHTML = options;
  citySelect.selectedIndex = 0;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onclick = function (e) {
    citySelectChange(e.target.value);
  };
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = aqiSourceData["北京"];
  for (var day in chartData) {
    var div = createDiv(day, chartData[day], "day");
    document.getElementsByClassName("aqi-chart-wrap")[0].appendChild(div);
  }
}

/**
 * 创建柱形
 */
function createDiv(date, height, className){
  var bgc = randomColor(),  
      div = document.createElement("div");

  div.style.height = height + "px";
  div.style.backgroundColor = bgc;
  div.className = className;

  var tooltip = document.createElement("div");

  div.onmouseover = function () {
    tooltip.innerHTML = "<p>Date:" + date + "<br />AQI:" + height + "</p>";
    tooltip.style.backgroundColor = bgc;
    tooltip.className = "tooltip";
    div.appendChild(tooltip);
  };

  div.onmouseout = function () {
    div.removeChild(tooltip);
  };
  return div;
}

/**
 * 随机生成颜色值
 */
function randomColor() { 
  var color = "";
  for (var i = 0; i < 6; i++) {
    color += "0123456789abcdef"[Math.floor(Math.random()*16)];//每次产生一个随机16进制数
  }
  color = "#" + color;
  return color;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

window.onload = function (){
  init();
}