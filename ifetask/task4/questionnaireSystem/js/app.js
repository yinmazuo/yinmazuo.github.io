require(["head", "lists", "edit", "view", "viewData"],function(head, lists, edit, view, viewData){
  head.append();
  lists.getEdit(edit);
  lists.getView(view);
  lists.getViewData(viewData);
  edit.getLists(lists);
  view.getLists(lists);
  viewData.getLists(lists);

  lists.noneLists();
  //lists.append(); 
  //edit.append();
  //view.append();
  //viewData.append();
  
  // (function() {

  //   //模拟用数据
  //   var mockData = {
  //       1: {
  //         id: 1, 
  //         count: 0, 
  //         title: "标题1",
  //         state: "unrelease",
  //         time: "2016/05/22", 
  //         questionnaire: [
  //           {
  //             id: 1,
  //             type: "radio",
  //             question: "问题1",
  //             options: [{content: "选项1", count: 0},
  //                       {content: "选项2", count: 0},
  //                       {content: "选项3", count: 0},
  //                       {content: "选项4", count: 0}]
  //           },
  //           {
  //             id: 2,
  //             type: "checkbox",
  //             question: "问题2",
  //             options: [{content: "选项1", count: 0},
  //                       {content: "选项2", count: 0},
  //                       {content: "选项3", count: 0},
  //                       {content: "选项4", count: 0}]
  //           },
  //           {
  //             id: 3,
  //             type: "radio",
  //             question: "问题3",
  //             answer: "",
  //             validAnswer: 0
  //           }
  //         ]          
  //       },
  //       2: {
  //         id: 2, 
  //         count: 0, 
  //         title: "标题2",
  //         state: "releasing",
  //         time: "2016/05/27", 
  //         questionnaire: [
  //           {
  //             id: 1,
  //             type: "radio",
  //             question: "问题1",
  //             options: [{content: "选项1", count: 0},
  //                       {content: "选项2", count: 0},
  //                       {content: "选项3", count: 0},
  //                       {content: "选项4", count: 0}]
  //           },
  //           {
  //             id: 2,
  //             type: "checkbox",
  //             question: "问题2",
  //             options: [{content: "选项1", count: 0},
  //                       {content: "选项2", count: 0},
  //                       {content: "选项3", count: 0},
  //                       {content: "选项4", count: 0}]
  //           },
  //           {
  //             id: 3,
  //             type: "radio",
  //             question: "问题3",
  //             answer: "",
  //             validAnswer: 0
  //           }
  //         ]         
  //       },
  //       3: {
  //         id: 3, 
  //         count: 267, 
  //         title: "测试用标题",
  //         state: "ended",
  //         time: "2016/05/01", 
  //         questionnaire: [
  //           {
  //             id: 1,
  //             type: "radio",
  //             question: "问题1",
  //             options: [{content: "选项1", count: 111},
  //                       {content: "选项2", count: 23},
  //                       {content: "选项3", count: 79},
  //                       {content: "选项4", count: 54}]
  //           },
  //           {
  //             id: 2,
  //             type: "checkbox",
  //             question: "问题2",
  //             options: [{content: "选项1", count: 234},
  //                       {content: "选项2", count: 122},
  //                       {content: "选项3", count: 79},
  //                       {content: "选项4", count: 57}]
  //           },
  //           {
  //             id: 3,
  //             type: "radio",
  //             question: "问题3",
  //             answer: "",
  //             validAnswer: 212
  //           }
  //         ]         
  //       }
  //     };
  //   for (var k in mockData) {
  //     lists.render(mockData[k], true);
  //   }
  // })();
});