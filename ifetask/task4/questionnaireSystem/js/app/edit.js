define(["html!../fragments/edit.html", "util", "calendar", "pop"], 
  function(edit, util, calendar, pop) {
  var $ = util.$,
      $create = util.$create,
      eve = util.eve,
      $classList = util.$classList,
      num = 0,//问题计数
      edit = edit.querySelector("#edit"),
      cal = calendar.init({
        target: edit.querySelector(".dateWrap input"),
        wrap: edit.querySelector(".dateWrap"),
        startDate: "2000/01/01",
        endDate: "2020/12/31",
        isRange: false,
        range: {
          gap: [1, 20],
          callBack: function() {

          }
        },
        callBack: function(date) {
          pop.init({ 
            title: "提示",
            content: "(此问卷的截止日期为" + date + ")",
            confirmFn: function() {

            }
          }).show();
        }
      });

  //问卷数据    
  var qsData = {};

  var lists = {};

  function Question(qData) {
    this.id = qData.id;
    this.type = qData.type;
    this.question = qData.question;
    this.options = qData.options;
    this.wrap = $create("div");
  }
  Question.prototype = {
    constructor: Question,
    createQuestion: function() {
      var wrap = this.wrap,
          that = this,
          n = 0,//选项计数
          question = this.question,
          options = this.options,
          optionsFragment = document.createDocumentFragment(),//选项片段
          addOption = "";//添加选项按钮

      $classList.add(wrap, "question");

      if (this.type === "textarea") {
        optionsFragment.appendChild(this.createOption());
      } else {
        for (var i = 0, length = options.length; i < length; i++) {
          optionsFragment.appendChild(this.createOption(options[i].content));         
        }
        addOption = "<div class='addOption'>" +
          "<span class='icon-plus'></span>" +
          "</div>";
      }          

      wrap.innerHTML = "<div class='qhead'>" + 
          "<span>Q<span class='num'>" + this.id + "</span></span>" + 
          "<input type='text' name='question' value='" + question + "'>" +
        "</div>" +
        "<div class='qoption'>" +
        "</div>" + addOption + 
        "<div class='operations'>" +
          "<span class='up'>上移</span>" +
          "<span class='down'>下移</span>" +
          "<span class='clone'>复用</span>" +
          "<span class='del'>删除</span>" +
        "</div>";
      $("#edit .questionnaire").appendChild(wrap);
      wrap.querySelector(".qoption").appendChild(optionsFragment);
      this.bindEvent();
    },
    createOption: function(value) {
      var option = {};
      if (this.type === "textarea") {
        option = $create("textarea");
        option.rows = "10";
        option.cols = "80";
        return option;
      }
      option = $create("label");
      option.innerHTML = "<input type='" + this.type + "' name=Q" + this.id + ">" + 
        "<input type='text' value=" + value + ">" + 
        "<span class='optionDel'>删除</span>";
      return option;
    }, 
    bindEvent: function() {
      var wrap = this.wrap,
          that = this,
          qoption = wrap.querySelector(".qoption"),
          operations = wrap.querySelector(".operations"),
          addOption = wrap.querySelector(".addOption");
          
      if (addOption !== null) {
        var n = that.options.length;//选项计数
        if (n === 0) { n = 4;}
        eve.addListener(addOption, "click", function() { 
          ++n;      
          qoption.appendChild(that.createOption("选项" + n));
        });
      }     
      eve.addListener(qoption, "click", function(event){
        var e = event || window.event,
            target = e.target || e.srcElement;
        if (!$classList.contains(target, "optionDel")){
          return false;
        }
        target.parentNode.parentNode.removeChild(target.parentNode);
      });

      eve.addListener(operations, "click", function(event){
        var e = event || window.event,
            t = e.target || e.srcElement;
        switch (t.className) {
          case "up": that.up();
          break;
          case "down": that.down();
          break;
          case "clone": that.clone();
          break;
          default: that.del();
        }
        //序号重排
        that.sort();
      });
    },
    sort: function() {
      var numSpans = edit.querySelectorAll(".qhead .num");
      for (var i = 0, l = numSpans.length; i < l; i++) {
        numSpans[i].innerHTML = i + 1;
      }
    },
    down: function() {
      var wrap = this.wrap,
          next = wrap.nextElementSibling;
      if (next === null) {return false;}   
      //节点交换        
      wrap.parentNode.insertBefore(wrap.parentNode.removeChild(next), wrap);
    },
    up: function() {
      var wrap = this.wrap,
          prev = wrap.previousElementSibling;
      if (prev === null) {return false;}
      //节点交换   
      wrap.parentNode.insertBefore(wrap.parentNode.removeChild(wrap), prev);
    },
    clone: function() {
      var wrap = this.wrap,
          that = this,
          next = wrap.nextElementSibling;     
      var cloneQustion = wrap.cloneNode(true);
      ++num;     
      wrap.parentNode.insertBefore(cloneQustion, next);
    },
    del: function() {
      var wrap = this.wrap;
      --num;
      wrap.parentNode.removeChild(wrap);
    }
  };

  function newQuestion(qData) {
    var nq = new Question(qData);
    nq.createQuestion();
  }
  //edit页面绑定事件
  (function() {
    var add = edit.querySelector(".addWrap .add"),
        addOptions =  edit.querySelector(".addWrap .options"),
        btns = edit.querySelector(".footer .btns");
        //添加问题
        eve.addListener(add, "click", function() {
          addOptions.style.display = "block";
        });
        //选择问题类别
        eve.addListener(addOptions, "click", function(event) {         
          var e = event || window.event,
              target = e.target || e.srcElement;
          if (!$classList.contains(target, "option")) {
            return false;
          }    
          var d = {};//本问题数据存储容器
          addOptions.style.display = "none";
          d.id = ++num;
          if ($classList.contains(target, "textarea")) {
            d.type = "textarea";
            d.question = "文本题";
            d.answer = "";
            d.validAnswer = 0;
          } else {
            d.options = [{content: "选项1", count: 0}, 
                        {content: "选项2", count: 0}, 
                        {content: "选项3", count: 0}, 
                        {content: "选项4", count: 0}];
          } 
          if ($classList.contains(target, "radio")) {
            d.type = "radio";
            d.question = "单选题";
          }
          if ($classList.contains(target, "checkbox")) {
            d.type = "checkbox";
            d.question = "多选题";
          }                   
          newQuestion(d);     
        });
        //底部按钮


        eve.addListener(btns.querySelector(".save"), "click", btnsHandle);
        eve.addListener(btns.querySelector(".release"), "click", btnsHandle);

        function btnsHandle(event) {
          var e = event || window.event,
              target = e.target || e.srcElement,
              content = "";

          qsData.count = 0;
          qsData.questionnaire = traversal();
          qsData.time = edit.querySelector(".dateWrap input").value;
          qsData.title = edit.querySelector("input.title").value;

          if ($classList.contains(target, "save")) {
            //数据保存
            content = "是否确认保存？";
            qsData.state = "unrelease";
          }
          if ($classList.contains(target, "release")) {
            //数据保存
            //状态改变
            content = "是否确认发布？<br />" + 
              "（问卷截止日期为" + edit.querySelector(".dateWrap input").value +"）";
            qsData.state = "releasing";

            timeOut();
            function timeOut() {
              if (Date.now() - Date.parse(qsData.time) >= 0) {
                qsData.state = "ended";
                lists.render(qsData);
              } else {
                setTimewout(timeOut, 1000);
              }             
            }            

          }

          function store() {
            //var listsData = JSON.parse(localStorage.getItem("listsData"));
            //listsData[qsData.id] = qsData;
            //localStorage.setItem("listsData", JSON.stringify(listsData));
            lists.append();
            lists.render(qsData);            
            document.body.removeChild(edit);
          }
          pop.init({
            title: "提示",
            content: content,
            confirmFn: store
          }).show();
        }
        //数据遍历器
        function traversal() {
          var questions = edit.querySelectorAll(".question"),
              questionnaire = [];
              
          for (var i = 0, l = questions.length; i < l; i++) {
            questionnaire.push(traversalQuestion(questions[i]));
          }
          return questionnaire;

          function traversalQuestion(n) {
            var question = {},
                optionNodes = n.querySelectorAll(".qoption input[type='text']");
                if (n.querySelector(".qoption label input") !== null) {
                  question.type = n.querySelector(".qoption label input").type;
                  question.options = [];
                } else {
                  question.type = "textarea";
                  question.validAnswer = 0;
                  question.answer = "";
                }
                question.question = n.querySelector(".qhead input").value;
                question.id = n.querySelector(".qhead .num").innerHTML;
                
                
            for (var j = 0, l = optionNodes.length; j < l; j++) {
              question.options.push({content: optionNodes[j].value, count: 0});
            }

            return question;
          }          
        }

  })();

  function render(listData) {
    num = 0;
    edit.querySelector(".questionnaire").innerHTML = "";
    qsData.id = listData.id;
    edit.querySelector("input.title").value = listData.title;
    if (!isNaN(listData.time)) {
      cal.setDate(listData.time);
    }   
    for (var i = 0, l = listData.questionnaire.length; i < l; i++) {
      ++num;
      newQuestion(listData.questionnaire[i]);
    }    
  }

  return {
    getLists: function(m) {
      lists = m;
    },
    append: function() {
      document.body.appendChild(edit);
    },
    render: render
  }
});