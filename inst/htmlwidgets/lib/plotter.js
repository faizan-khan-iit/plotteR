 // Plot the loaded json data
 var plotter = function(loaded_data, meta_data, element){
	plot_data = {}; // To store data

	var plot_data_f = function(loaded_data, meta_data, element){
		plot_data[["data"]] = loaded_data;
		plot_data[["labs"]] = meta_data[["labs"]];
		plot_data[["ranges"]] = meta_data[["ranges"]];
		len = loaded_data[["ans"]][["x"]].length;
		
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
		var svg = d3.select(element)
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

	plot_data_f(loaded_data, meta_data, element);
}

// Load data and pass to plotter
var loader = function(meta_data, element){
	var file_name = meta_data.path;
	console.log(file_name);
	var loaded_data;
	// Load data from file
	d3.tsv(file_name, function(error, data) {
		if (error) {
			console.log(error);  //Log the error.
	    } else {
	        console.log(data);   //Log the data.
	    }
		loaded_data = data;
 		plotter(loaded_data, meta_data, element);
	});
}
