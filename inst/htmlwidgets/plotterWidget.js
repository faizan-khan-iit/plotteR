HTMLWidgets.widget({

  name: "plotterWidget",

  type: "output",

  factory: function(el, width, height) {

    // create our sigma object and bind it to the element
    //var sig = new sigma(el.id);

    return {
      renderValue: function(x) {
        console.log("asdada");
        // parse gexf data
        /*
        var parser = new DOMParser();
        var data = parser.parseFromString(x.data, "application/xml");

        // apply settings
        for (var name in x.settings)
          sig.settings(name, x.settings[name]);

        // update the sigma object
        sigma.parsers.gexf(
          data,          // parsed gexf data
          sig,           // sigma object
          function() {
            // need to call refresh to reflect new settings and data
            sig.refresh();
          }
        );
        */
        //console.log(data);
        //id = getElementbyId(el);
        el.innerHTML = "SASA";
        console.log(x);
        //////////////////////////////
        plot_data = {}; // To store data

        var plot_data_f = function(json_data){
          plot_data[["data"]] = json_data[["ans"]];
          plot_data[["labs"]] = json_data[["labs"]];
          plot_data[["ranges"]] = json_data[["ranges"]];
          len = json_data[["ans"]][["x"]].length;
          
          // Change data format for scatter plot  
          var data_scatter = [];
          for(var i=0; i<len; i++){
            data_scatter.push([ plot_data[["data"]][["x"]][[i]], plot_data[["data"]][["y"]][[i]] ]);
          }
          
          // Plot data

          // Create SVG element
          var w = 500 // Width 
          var h = 500 // Height
          
          // Scales
          var padding = 35;
          var xScale = d3.scale.linear()
                           .domain([ plot_data[["ranges"]][["xrange"]][[0]],
                           plot_data[["ranges"]][["xrange"]][[1]] ])
                           .range([padding, w - padding]);

              var yScale = d3.scale.linear()
                           .domain([ plot_data[["ranges"]][["yrange"]][[0]],
                           plot_data[["ranges"]][["yrange"]][[1]] ])
                           .range([h - padding, padding]);

              // Axes
              // Define X axis
              var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(6);

              // Define Y axis
          var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(6);

              // Plot
          var svg = d3.select(el)
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h);

          svg.selectAll("circle")
            .data(data_scatter)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", 3);
          
          svg.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + (h - padding) + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(" + padding + ", 0)")
              .call(yAxis);
        }

        plot_data_f(x);
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
