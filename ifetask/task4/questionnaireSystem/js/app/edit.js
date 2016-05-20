define(["html!../fragments/edit.html", "util", "calendar", "pop"], function(edit, util, calendar, pop) {
  var $ = util.$,
      $create = util.$create,
      eve = util.eve,
      $classList = util.$classList,
      num = 0,
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
  var qsData = {
        title: "test1",
        time: "2016/05/19",
        state: "releasing",
        questionnaire: [{
          question: "test1",
          type: "radio",
          options: [{content: "option1", count: 0}, 
                    {content: "option2", count: 0}, 
                    {content: "option3", count: 0}, 
                    {content: "option4", count: 0}]
          },{

        }]
      };
  function Question(qData) {
    this.num = num;
    this.type = qData.type;
    this.question = qData.question || "";
    this.options = qData.options || [];
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
          optionsFragment = "",//选项片段
          addOption = "";//添加选项按钮

      $classList.add(wrap, "question");
      //默认值设定
      (function() {
        if (question.length === 0) {
          switch (that.type) {
            case "radio": question = "单选题";
            break;
            case "checkbox": question = "多选题";
            break;
            case "textarea": question = "文本题";
            break;
          }
        }      
        if (options.length === 0 && that.type !== "textarea") {
          options = [{content: "选项1", count: 0}, 
                    {content: "选项2", count: 0}, 
                    {content: "选项3", count: 0}, 
                    {content: "选项4", count: 0}];
        }
      })();

      if (this.type === "textarea") {
        optionsFragment = this.createOption();
      } else {
        for (var i = 0, length = options.length; i < length; i++) {
          optionsFragment += this.createOption(options[i].content);         
        }
        addOption = "<div class='addOption'>" +
          "<span class='icon-plus'></span>" +
          "<div>";
      }          

      wrap.innerHTML = "<div class='qhead'>" + 
          "<span>Q" + this.num + "</span>" + 
          "<input type='text' name='question' value='" + question + "'>" +
        "</div>" +
        "<div class='qoption'>" + optionsFragment +
        "</div>" + addOption + 
        "<div class='operations'>" +
          "<span class='up'>上移</span>" +
          "<span class='down'>下移</span>" +
          "<span class='clone'>复用</span>" +
          "<span class='del'>删除</span>" +
        "</div>";
      $("#edit .questionnaire").appendChild(wrap);
      this.bindEvent();
    },
    createOption: function(value) {
      var option = "";
      if (this.type === "textarea") {
        option = "<textarea rows='10' cols='80'></textarea>"
        return option;
      }
      option = "<label><input type='" + this.type + "' name=Q" + this.num + ">" + 
        "<input type='text' value=" + value + ">" + 
        "<span class='optionDel'>删除</span></label>";
      return option;
    }, 
    bindEvent: function() {
      var wrap = this.wrap,
          that = this,
          qoption = wrap.querySelector(".qoption"),
          operations = wrap.querySelector(".operations"),
          addOption = wrap.querySelector(".addOption"),

          n = that.options.length;//选项计数
          if (n === 0) { n = 4;}

      eve.addListener(addOption, "click", function() { 
        ++n;      
        qoption.innerHTML += that.createOption("选项" + n);
        optionEvent();
      });
      optionEvent();
      function optionEvent() {
        var optionInputs = wrap.querySelectorAll(".qoption input[type='text']"),//选项输入框
            optionDels = wrap.querySelectorAll(".qoption .optionDel");//选项删除
        for (var i = 0, l = optionInputs.length; i < l; i++) {
          eve.addListener(optionInputs[i], "focus", handle);
          eve.addListener(optionInputs[i], "blur", handle);
          eve.addListener(optionDels[i], "click", handle);
        }
        function handle(event) {
          var e = event || window.event,
              target = e.target || e.srcElement;
          if (target.tagName === "SPAN") {
            target.parentNode.parentNode.removeChild(target.parentNode);
          } else {
            if (e.type === "focus") {
              
            } else {
              
            }
          }
        }
      }
    },
    down: function() {

    },
    up: function() {

    },
    clone: function() {

    },
    del: function() {


    }
  };

  function newQuestion(qData) {
    ++num;
    var nq = new Question(qData);
    nq.createQuestion();
  }

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
          addOptions.style.display = "none";
          var e = event || window.event,
              target = e.target || e.srcElement,
              d = {};

          if ($classList.contains(target, "radio")) {
            d.type = "radio";
          }
          if ($classList.contains(target, "checkbox")) {
            d.type = "checkbox";
          }
          if ($classList.contains(target, "textarea")) {
            d.type = "textarea";
          }
          newQuestion(d);
        });
        //底部按钮
        eve.addListener(btns, "click", function() {
          var e = event || window.event,
              target = e.target || e.srcElement,
              content = "";
          if ($classList.contains(target, "save")) {
            //数据保存
            content = "保存";
          }
          if ($classList.contains(target, "release")) {
            //数据保存
            //状态改变
            content = "发布";
          }
          pop.init({
            title: "提示",
            content: "是否确认" + content + "？",
            confirmFn: function() {
              //回调
            }
          }).show();
        });
  })();


  return {
    append: function() {
      document.body.appendChild(edit);
    }
  }
});