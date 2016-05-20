define(["util"], function(util){
  var $ = util.$,
    $create = util.$create,
    eve = util.eve,
    $classList = util.$classList;

  function Pop(config) {
    var config = config || {};
    this.title = config.title;
    this.content =  config.content;
    this.confirmFn =  config.confirmFn;
    this.cancleFn =  config.cancleFn;
    this.wrap = $create("div");
  }

  Pop.prototype = {
    constructor: Pop,
    init: function() {
      var title = $create("h2"),
        content = $create("p"),
        inner = $create("div"),
        confirm = $create("button"),
        cancle = $create("button");  
        btns = $create("div");
      inner.className = "inner";
      this.wrap.className = "wrap";
      this.wrap.id = "pop";
      title.innerHTML = this.title || "弹出框",
      content.innerHTML = this.content || "是否确定？",
      confirm.innerHTML = "Confirm";
      cancle.innerHTML = "Cancle";
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
  var init = function(config) {
    var p = new Pop(config);
    return {
      show: p.show.bind(p),
      close: p.close.bind(p)
    }
  };
  return {
    init: init
  }
});