HTMLWidgets.widget({

  name: "plotter",

  type: "output",

  factory: function(el, width, height) {

    // create the plotter object and bind it to the element
    var plot1 = new plotter(el.id);

    return {
      renderValue: function(x) {
        var plot1 = new loader(x.file_name);
        plot1.refresh();
      },
/*
      resize: function(width, height) {

      },
*/
      // Make the plotter object available as a property on the widget
      // instance we're returning from factory(). This is generally a
      // good idea for extensibility--it helps users of this widget
      // interact directly with plotter, if needed.
      s: plot1
    };
  }
});
