 // Plot the loaded json data
 var plotter = function(json_data, element){
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
		var svg = d3.select("body")
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
	plot_data_f(json_data);
}

// Load data and pass to plotter
var loader = function(file_name, element){
	/*
	var json_data;
	// Load data from file
	d3.json(file_name, function(error, data) {
		if (error) {
			console.log(error);  //Log the error.
	    } else {
	        console.log(data);   //Log the data.
	    }
		json_data = data;
		plotter(json_data, element);
	});
 	*/
 	var data_json = file_name;
 	plotter(data_json, element);
}
