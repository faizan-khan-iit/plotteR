HTMLWidgets.widget({

  name: "plotter",

  type: "output",

  factory: function(el, width, height) {

    // create our sigma object and bind it to the element
    var plot1 = new plotter(el.id);

    return {
      renderValue: function(x) {

        // parse gexf data
        var plot1 = new loader(x.file_name);
        plot1.refresh();
      },
/*
      resize: function(width, height) {

        // forward resize on to sigma renderers
        for (var name in sig.renderers)
          sig.renderers[name].resize(width, height);
      },
*/
      // Make the sigma object available as a property on the widget
      // instance we're returning from factory(). This is generally a
      // good idea for extensibility--it helps users of this widget
      // interact directly with sigma, if needed.
      s: plot1
    };
  }
});
