define(["html!../fragments/viewData.html", "util", "../lib/echarts.min"], function(viewData, util, echarts) {
  var $ = util.$,
      $create = util.$create,
      eve = util.eve,
      $classList = util.$classList,
      lists = {},
      viewData = viewData.querySelector("#viewData");
  eve.addListener(viewData.querySelector(".btn .back"), "click", function() {
    lists.append();
    document.body.removeChild(viewData);
  });

  function createChart(qData, count) {
    var wrap = $create("div");
    $classList.add(wrap, "qChart");
    $("#viewData .charts").appendChild(wrap);
    var option = {};

    switch (qData.type) {
      case "radio":
        wrap.style.height = "400px";
        radioOption();
      break;
      case "checkbox":
        wrap.style.height = qData.options.length * 60 + "px";
        chechboxOption();
      break;
      case "textarea":
        wrap.style.height = "100px";
        textareaOption();        
      break;
    }

    echarts.init(wrap).setOption(option);

    function radioOption() {
        var data = [],
            name = [];
        qData.options.forEach(function(item){
          data.push({name: item.content, value: item.count});
          name.push(item.content);
        });
        option = {
          title: {
              text: "Q" + qData.id + "." + qData.question,
              x: "center"
          },
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              x: 'left',
              data: name
          },
          series : [
            {
                name: '数据占比',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
          ]
        };
    }
    function chechboxOption() {
      var data = [],
          name = [];
        qData.options.forEach(function(item) {
          data.push((item.count/count).toFixed(4) * 100);
          name.push(item.content);
        });
        option = {
          title: {
              text: "Q" + qData.id + "." + qData.question,
              x: "center"
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              x: "left",
              data: ["数据占比"]
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {},
          yAxis: {
              data: name
          },
          series: [
              {
                name: '数据占比',
                type: 'bar',
                data: data
              }
          ]
      };
    }
    function textareaOption() {
        option = {
          title: {
              text: "Q" + qData.id + "." + qData.question,
              x: "center"
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              x: "left",
              data: ["有效回答占比"]
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {},
          yAxis: {
              data: ["有效回答"]
          },
          series: [
              {
                name: '有效回答占比',
                type: 'bar',
                data: [(qData.validAnswer/count).toFixed(4) * 100]
              }
          ]
      };
    }
  }
  function render(listData) {
    viewData.querySelector(".head h2").innerHTML = listData.title;
    for (var i = 0, l = listData.questionnaire.length; i < l; i++) {
      createChart(listData.questionnaire[i], listData.count);
    }
  }

  return {
    getLists: function(m) {
      lists = m;
    },
    append: function() {
      document.body.appendChild(viewData);
      // render({
      //   title: "test1",
      //   count: 276,
      //   id: 1,
      //   questionnaire: [
      //     {
      //       id: 1,
      //       question: "问题1",
      //       type: "checkbox",
      //       options: [{content: "选项1哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈", count: 123}, 
      //                 {content: "选项2哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈", count: 156}, 
      //                 {content: "选项3哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈", count: 79}, 
      //                 {content: "选项4哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈", count: 253}],
      //     },
      //     {
      //       id: 2,
      //       question: "问题2哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈",
      //       type: "radio",
      //       options: [{content: "选项1哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈", count: 100}, 
      //                 {content: "选项2哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈", count: 156}, 
      //                 {content: "选项3哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈", count: 79}, 
      //                 {content: "选项4哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈", count: 253}],
      //     },
      //     {
      //       id: 3,
      //       question: "问题3哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈",
      //       type: "textarea",
      //       answer: "",
      //       validAnswer: 234
      //     }
      //   ]
      // });
    },
    render: render
  }
});