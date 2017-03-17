#' Saves plot data to disk 
#' @param inp_data data to be plotted
#' @param graphType type of graph to be plotted
#' @param graphOptions options for the selected graph
#' @return nothing, data is stored to disk
#' @export
plotter <- function(inp_data = NULL, graphType = NULL,
                    graphOptions = list()){
  if(is.null(inp_data)){
    stop("No input data provided")
  }
  
  # Defalut graph type is scatter plot
  if(is.null(graphType)){
    graphType <- "scatter"
  }
  # Default columns to select are x & y
  if(length(graphOptions) < 1){
    graphOptions <- list(x="x",
                         y="y")
  }

  # Restructure data if required
  # Note: Does nothing yet
  data_clean <- cleanData(inp_data)
  # Get detailed info on data
  data_build <- editData(data_clean, graphType, graphOptions)
  saveData(data_build)
  printMessage()
  return(invisible(NULL))
}

cleanData <- function(inp_data){
  inp_data
}

editData <- function(data_clean, graphType, graphOptions){
  data_clean
  # Select only columns we need to save
  ans <- data.frame(x = data_clean[[graphOptions$x]],
                    y = data_clean[[graphOptions$y]])
  # Axis labels
  if(is.null(graphOptions$xlab)){
    graphOptions$xlab <- graphOptions$x
  }
  if(is.null(graphOptions$ylab)){
    graphOptions$ylab <- graphOptions$y
  }
  
  labs <- list()
  labs$xlab <- graphOptions$xlab
  labs$ylab <- graphOptions$ylab
  
  # Axis ranges
  ranges <- list()
  ranges$xrange <- range(ans$x, na.rm = T)
  ranges$yrange <- range(ans$y, na.rm = T)
  
  list(ans = ans,
       labs = labs,
       ranges = ranges)
}

saveData <- function(data_build){
  json <- RJSONIO::toJSON(data_build)
  file_name <- "./inst/new_demo_file.json"
  cat(json, file = file_name)
  # Create htmlwidget
  # Note: Pass the data_build object in the plotter function
  # or pass only the saved file name???
  htmlwidgets::createWidget("plotter", x=list(file_name = file_name),
                            width = 400, height = 400)
  invisible(NULL)
}

printMessage <- function(){
  message("Plot saved to disk")
}
