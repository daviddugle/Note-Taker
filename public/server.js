var express = require("express");
var path = require("path");
var app = express();

var PORT = process.env.PORT || 3080;



// var fs = require("fs");

var path = require("path");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//let's get the local server working first

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
  });
  
  




  //let's listen to the port
  
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
  
  