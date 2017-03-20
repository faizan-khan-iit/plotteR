#' Saves plot data to disk 
#' @param inp_data data to be plotted
#' @param graphType type of graph to be plotted
#' @param graphOptions options for the selected graph
#' @return nothing, data is stored to disk
#' @import htmlwidgets
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

#' Saves plot data to disk
#' @import htmlwidgets
#' @export
saveData <- function(data_build){
  # tsv.name <- sprintf("data_plot.tsv")
  # tsv.path <- file.path("./inst", tsv.name)
  # write.table(data_build$ans, tsv.path,
  #             quote = FALSE, row.names = FALSE, 
  #             sep = "\t")
  # data_build$ans <- NULL
  # Create htmlwidget
  # Note: Pass the data_build object in the plotter function
  # or pass only the saved file name?
  x <- data_build
  htmlwidgets::createWidget(name = "plotterWidget",
                            x,
                            width = 400,
                            height = 400,
                            package = 'plotteR')
}

printMessage <- function(){
  message("Plot saved to disk, opening window")
}
