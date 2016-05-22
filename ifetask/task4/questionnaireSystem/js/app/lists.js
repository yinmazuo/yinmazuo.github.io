define(["html!../fragments/lists.html", "util", "pop"], 
  function(lists, util, pop, editHTML){
  var $ = util.$,
      $create = util.$create,
      eve = util.eve,
      $classList = util.$classList,
      listsArr = [],
      count = 0, //问卷计数
      c = 0,
      lists = lists.querySelector("#lists"),
      state = {
        unrelease: "未发布",
        releasing: "发布中",
        ended: "已结束"
      };    

  var listsData = {};
  var edit = {},
      view = {},
      viewData = {};

  // 多选删除
  (function(){
    var mulDelete = lists.querySelector("div.all input.delete");//删除多个
    
    eve.addListener(lists.querySelector("input.selectAll"), "click", function(event) { 
      var e = event || window.event,
        target = e.target || e.srcElement;
      var checkLists = lists.querySelectorAll("input[name='lists']");
      if (!target.checked) {        
        for (var i = 0, length = checkLists.length; i < length; i++) {
          if (checkLists[i].checked) {
            checkLists[i].checked = false;
          }         
        }       
        $classList.remove(mulDelete, "checked");
        mulDelete.setAttribute("disabled", "disabled");        
        target.checked = false;
      } else {    
        for (var i = 0, length = checkLists.length; i < length; i++) {
          if (!checkLists[i].checked) {
            checkLists[i].checked = true;
          }
        }    
        target.checked = true;
        if (!$classList.contains(mulDelete, "checked")) {
          $classList.add(mulDelete, "checked");
        }               
        mulDelete.removeAttribute("disabled");
      }     
    });  

    eve.addListener(mulDelete, "click", function() {
      var checkLists = lists.querySelectorAll("input[name='lists']");
      pop.init({
        title: "提示",
        content: "是否确认删除？",
        confirmFn: function() {
          for (var i = 0, length = checkLists.length; i < length; i++) {
            if (checkLists[i].checked) {
              var p = checkLists[i].parentNode.parentNode;
              p.parentNode.removeChild(p);
            }
          }
          mulDelete.setAttribute("disabled", "disabled");
          $classList.remove(mulDelete, "checked");
          
          if (lists.querySelector("input.selectAll").checked) {
            lists.querySelector("input.selectAll").checked = false;
          } 
        }
      }).show();             
    });
  })();


  function List(listData) {
    this.id = count;
    this.listDom = util.$create("tr");
    this.title = listData.title;
    this.time = listData.time;
    this.checkbox = $create("input");
    this.state = listData.state;
  }
  List.prototype = {
    constructor: List,
    createDom: function() { 
      $classList.add(this.listDom, "list");
      this.listDom.innerHTML =
        "<td><input type='checkbox' name='lists'></td>" +
        "<td class='title'>" + this.title + "</td>" +
        "<td class='time'>" + this.time + "</td>" +
        "<td class='state unrelease'>" + state[this.state] + "</td>" +
        "<td class='handle'>" +
          "<input class='edit' type='button' value='编辑'>" +
          "<input class='del' type='button' value='删除'>" +
          "<input class='view' type='button' value='查看'>" +
        "</td>";
      $("#lists").querySelector("tbody").appendChild(this.listDom);
      this.bindEvents();               
    },
    bindEvents: function() {
      var that = this,
          listDom = this.listDom,
          checkbox = listDom.querySelector("input[type='checkbox']"),
          edit = listDom.querySelector(".edit"),
          del = listDom.querySelector(".del"),
          view = listDom.querySelector(".view"),
          title = listDom.querySelector(".title"),
          time = listDom.querySelector(".time"),
          state = listDom.querySelector(".state"),
          check = listDom.querySelector(".check"),
          handle = listDom.querySelector(".handle");
      eve.addListener(del, "click", function(){
        pop.init({
        title: "提示",
        content: "是否确认删除？",
        confirmFn: function(){that.del();}
        }).show();      
      });
      eve.addListener(checkbox, "click", function(){that.checked();});
      eve.addListener(edit, "click", function(){that.edit()});
      eve.addListener(view, "click", function(event){that.view(event)});
    },
    del: function() {
      this.listDom.parentNode.removeChild(this.listDom);
      listsData[this.id] = null;
      --c;
      if (c === 0) {
        noneLists();
        document.body.removeChild(lists);
      }
    },

    checked: function() {
      if (!this.checkbox.checked) {
        this.checkbox.checked = false;
      } else {
        this.checkbox.checked = true;
      }
      var c = 0;
      var mulDelete = lists.querySelector("div.all input.delete");
      var checkLists = lists.querySelectorAll("input[name='lists']");
      for (var i = 0, length = checkLists.length; i < length; i++) {
        if (checkLists[i].checked) {
          ++c;
        }
      }
      if (c > 0) {
        mulDelete.removeAttribute("disabled");
        if (!$classList.contains(mulDelete, "checked")) {
          $classList.add(mulDelete, "checked");
        }        
      }
      if (c === 0){
        mulDelete.setAttribute("disabled", "disabled");
        if ($classList.contains(mulDelete, "checked")) {
          $classList.remove(mulDelete, "checked");
        }        
      }
      if (c > 0 && c === checkLists.length) {
        if (!lists.querySelector("input.selectAll").checked) {
          lists.querySelector("input.selectAll").checked = true; 
        }        
      }
      if (c < checkLists.length) {
        lists.querySelector("input.selectAll").checked = false;
      }
    },

    view: function() {
      var s = this.listDom.querySelector(".state")
      if ($classList.contains(s, "ended")) {
        viewData.append();
        //viewData.render(listsData[this.id]);
      } else if ($classList.contains(s, "releasing")) {
        view.append();
        view.render(listsData[this.id]); 
      } else {
        return false;
      }          
      document.body.removeChild(lists);
    },

    edit: function() {
      localStorage.setItem("listsData", JSON.stringify(listsData));
      edit.append();
      edit.render(listsData[this.id]);      
      document.body.removeChild(lists);
    }
      
  };

  function noneLists() {
    var createFirstList = $create("div");
    createFirstList.className = "createFirstList";
    createFirstList.innerHTML = "<span class='icon-plus'></span>新建问卷";
    eve.addListener(createFirstList, "click", function() {
      document.body.appendChild(lists);
      document.body.removeChild(createFirstList);
      newList();
    });
    document.body.appendChild(createFirstList);
  }

  function newList() {  
    ++c;
    ++count;
    var listData = listsData[count] = {};
    listData.id = count;
    listData.title = "标题" + count;
    listData.time = "截止日期";
    listData.state = "unrelease";
    listData.questionnaire = [];
    listData.count = 0;

    var list = new List(listData);
    list.createDom();
  }
  
  eve.addListener(lists.querySelector(".new"), "click", newList);

  function render(qsData) {
    listsData = JSON.parse(localStorage.getItem("listsData"));
    var listNodes = lists.querySelectorAll(".list"),
        index = qsData.id - 1;  

    listsData[qsData.id] = qsData;
    for (var k in listsData) {
      if (listsData[k] === null && k < qsData.id) {
        --index;
      }
    }
    listNodes[index].querySelector(".title").innerHTML = qsData.title;
    listNodes[index].querySelector(".time").innerHTML = qsData.time;

    listNodes[index].querySelector(".state").className = "state " + qsData.state;

    listNodes[index].querySelector(".state").innerHTML = state[qsData.state];
  }


  return {
    getViewData: function(m) {
      viewData = m;
    },
    getView: function(m) {
      view = m;
    },
    getEdit: function(m) {
      edit = m;
    },
    append: function() {
      document.body.appendChild(lists);
    },
    noneLists: noneLists,
    render: render
  }
});