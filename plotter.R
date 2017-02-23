plotter <- function(inp_data = NULL, graphType = NULL,
                    graphOptions = list()){
  if(is.null(inp_data)){
    stop("No input data provided")
  }
  
  if(is.null(graphType)){
    graphType <- "scatter"
  }
  if(length(graphOptions) < 1){
    graphOptions <- list(x="x",
                         y="y")
  }
  data_clean <- cleanData(inp_data)
  data_build <- editData(data_clean, graphType, graphOptions)
  browser()
  saveData(data_build)
  printMessage()
  return(invisible(NULL))
}

cleanData <- function(inp_data){
  inp_data
}

editData <- function(data_clean, graphType, graphOptions){
  data_clean
  ans <- data.frame(x = data_clean[[graphOptions$x]],
                    y = data_clean[[graphOptions$y]])
  if(is.null(graphOptions$xlab)){
    graphOptions$xlab <- graphOptions$x
  }
  if(is.null(graphOptions$ylab)){
    graphOptions$ylab <- graphOptions$y
  }
  labs <- list()
  labs$xlab <- graphOptions$xlab
  labs$ylab <- graphOptions$ylab
  
  ranges <- list()
  ranges$xrange <- range(ans$x, na.rm = T)
  ranges$yrange <- range(ans$y, na.rm = T)
  
  list(ans = ans,
       labs = labs,
       ranges = ranges)
}

saveData <- function(data_build){
  invisible(NULL)
}

printMessage <- function(){
  message("Plot saved to disk")
}
