HTMLWidgets.widget({

  name: "plotterWidget",

  type: "output",

  factory: function(el, width, height) {
/*
    // create the plotter object and bind it to the element
    var plot1 = new plotterWidget(el.id);
    var id = getElementById(el);
*/
    return {
      renderValue: function(x, el) {
        // What to do here???
        loader(x.file_name, el);
      },

      resize: function(width, height) {

      },

      // Make the plotter object available as a property on the widget
      // instance we're returning from factory(). This is generally a
      // good idea for extensibility--it helps users of this widget
      // interact directly with plotter, if needed.
      s: plot1
    };
  }
});
