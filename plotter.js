 var plotter = function(json_data){
	plot_data = {}; // To store data
	var plot_data_f = function(json_data){
		plot_data[["data"]] = json_data[["ans"]];
		plot_data[["labs"]] = json_data[["labs"]];
		plot_data[["ranges"]] = json_data[["ranges"]];
		len = json_data[["ans"]][["x"]].length;
			
	 	var data_scatter = [];
	 	for(var i=0; i<len; i++){
	 		data_scatter.push([ plot_data[["data"]][["x"]][[i]], plot_data[["data"]][["y"]][[i]] ]);
	 	}
	 	
	 	// plot data
	 	// Create SVG element
	 	var w = 500 // Width 
	 	var h = 500 // Height
		var svg = d3.select("body")
		            .append("svg")
		            .attr("width", w)
		            .attr("height", h);

		svg.selectAll("circle")
			.data(data_scatter)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
			    return d[0];
			})
			.attr("cy", function(d) {
			    return d[1];
			})
			.attr("r", 3);
	}

	plot_data_f(json_data);
}

var loader = function(file_name){
	var json_data;
	// Load data from file
	d3.json(file_name, function(error, data) {
		if (error) {
			console.log(error);  //Log the error.
	    } else {
	        console.log(data);   //Log the data.
	    }
		json_data = data;
		plotter(json_data);
	});
}
