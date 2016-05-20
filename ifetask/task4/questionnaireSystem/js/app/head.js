define(["html!../fragments/head.html", "util"], function(head, util){
  
  return {
    append: function() {
      document.body.appendChild(head);
    }
  }
});