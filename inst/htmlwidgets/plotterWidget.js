HTMLWidgets.widget({

  name: "plotterWidget",

  type: "output",

  factory: function(el, width, height) {

    return {
      renderValue: function(x) {
        console.log("asdada");
        el.innerHTML = "A Scatter Plot";
        console.log(x);
        //////////////////////////////
        loader(x, el);
        //////////////////////////////
      },

      resize: function(width, height) {
      },

    };
  }
});
