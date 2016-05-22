define(["html!../fragments/view.html", "util"], function(view, util) {
  var $ = util.$,
      $create = util.$create,
      eve = util.eve,
      $classList = util.$classList,
      lists = {},
      view = view.querySelector("#view");
  
  function createQuestion(qData) {
    var wrap = $create("div"),
        optionsFragment = "";
    $classList.add(wrap, "question");

    if (qData.type === "textarea") {
      optionsFragment = "<textarea rows='10' cols='80'></textarea>";
    } else {
      for (var i = 0, l = qData.options.length; i < l; i++) {
        optionsFragment += createOption(qData.options[i].content);
      }
    }   

    wrap.innerHTML = "<span class='num'>Q" + qData.id + qData.question + "</span>" + 
      "<div class='options'>" + optionsFragment + 
      "</div>";
    view.querySelector(".questions").appendChild(wrap);

    function createOption(oData) {
      var option = "";
      option = "<label><input type='" + qData.type + "'' name='" + qData.id + "'>" + 
          "<span class='value'>" + oData + "</span></label>";
      return option;
    }
  }

  function render(listData) {
    view.querySelector(".questions").innerHTML = "";
    view.querySelector(".title h2").innerHTML = listData.title;
    view.querySelector(".title h3 span").innerHTML = listData.time;
    for (var i = 0, l = listData.questionnaire.length; i < l; i++) {
      createQuestion(listData.questionnaire[i]);
    }
  }

  eve.addListener(view.querySelector(".btn .save"), "click", function() {
    lists.append();
    document.body.removeChild(view);
  });

  return {
    getLists: function(m) {
      lists = m;
    },
    append: function() {
      document.body.appendChild(view);
    },
    render: render
  }
});