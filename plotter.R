plotter <- function(inp_data = NULL, graphType = NULL){
  if(is.null(inp_data)){
    stop("No input data provided")
  }
  
  data_clean <- cleanData(inp_data)
  data_build <- editData(data_clean, graphType)
  saveData(data_build)
  printMessage()
  return(invisible(NULL))
}

cleanData <- function(inp_data){
  inp_data
}

editData <- function(data_clean, graphType){
  data_clean
}

saveData <- function(data_build){
  invisible(NULL)
}

printMessage <- function(){
  message("Plot saved to disk")
}
