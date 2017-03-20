HTMLWidgets.widget({

  name: "plotterWidget",

  type: "output",

  factory: function(el, width, height) {

    // create our sigma object and bind it to the element
    //var sig = new sigma(el.id);

    return {
      renderValue: function(x) {
        console.log("asdada");
        el.innerHTML = "A Scatter Plot";
        //console.log(x);
        //////////////////////////////
        plotter(x, el);
        //////////////////////////////
      },

      resize: function(width, height) {
      },

      // Make the sigma object available as a property on the widget
      // instance we're returning from factory(). This is generally a
      // good idea for extensibility--it helps users of this widget
      // interact directly with sigma, if needed.
      // s: sig
    };
  }
});
