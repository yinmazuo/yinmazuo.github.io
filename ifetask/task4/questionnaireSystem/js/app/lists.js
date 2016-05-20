define(["html!../fragments/lists.html", "util", "pop"], function(lists, util, pop){
  var $ = util.$,
      $create = util.$create,
      eve = util.eve,
      $classList = util.$classList,
      listsArr = [],
      count = 0, //问卷计数
      lists = lists.querySelector("#lists"),
      state = {
        unrelease: "未发布",
        releasing: "发布中",
        ended: "已结束"
      };

  var data = [{
      title: "test1",
      time: "2016/05/19",
      satet: "releasing",
      questionnaire: [
        
      ]
    }, {
      title: "test2",
      time: "2016/05/20",
      satet: "releasing",
      questionnaire: [

      ]
    }];

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
    this.listDom = util.$create("tr");
    this.title = listData.title || ("标题" + count);
    this.time = listData.time || "截至日期";
    this.checkbox = $create("input");
    this.state = state[listData.state] || state.unrelease;
  }
  List.prototype = {
    constructor: List,
    createDom: function() { 
      var that = this,
          checkbox = this.checkbox,
          edit = $create("input"),
          del = $create("input"),
          view = $create("input"),
          title = $create("td"),
          time = $create("td"),
          state = $create("td"),
          check = $create("td"),
          handle = $create("td");
      (function() {
        edit.value = "编辑";
        del.value = "删除";
        view.value = "查看";
        title.innerHTML = that.title;
        time.innerHTML = that.time;
        state.innerHTML = that.state;
        $classList.add(title, "title");
        $classList.add(time, "time");
        $classList.add(state, "state");
        $classList.add(state, "unrelease");
        $classList.add(handle, "handle");
        $classList.add(view, "view");
        $classList.add(edit, "edit");
        $classList.add(del, "delete");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "lists");
        edit.setAttribute("type", "button");
        view.setAttribute("type", "button");
        del.setAttribute("type", "button");
        handle.appendChild(edit);
        handle.appendChild(del);
        handle.appendChild(view);
        check.appendChild(checkbox);
        that.listDom.appendChild(check);
        that.listDom.appendChild(title);
        that.listDom.appendChild(time);
        that.listDom.appendChild(state);
        that.listDom.appendChild(handle);
        lists.querySelector("tbody").appendChild(that.listDom);
      })();

      eve.addListener(del, "click", function(){
        pop.init({
        title: "提示",
        content: "是否确认删除？",
        confirmFn: function(){that.del();}
        }).show();      
      });
      eve.addListener(checkbox, "click", function(){that.checked();});
    },

    del: function() {
      this.listDom.parentNode.removeChild(this.listDom);
      this.listDom = null;
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

    },

    edit: function() {

    }
      
  };


  function newList(listData) {
    ++count;
    var list = new List(listData);
    list.createDom();
  }
  function f() {
    for (var i = 0, l = data.length; i < l; i++) {
      newList(data[i]);
    }
  }
  eve.addListener(lists.querySelector(".new"), "click", f);


  return {
    append: function() {
      document.body.appendChild(lists);
    }
  }
});