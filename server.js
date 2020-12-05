var express = require("express");
var path = require("path");
var app = express();


var PORT = process.env.PORT || 3080;

var fs = require("fs");

var path = require("path");

var dataBase = require("./db/db.json");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


//let's get the local server working first

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));

});
app.get("/api/notes", function (rec, res) {
    res.json(dataBase);

})
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


//let's post the info

app.post("/api/notes", function (req, res) {
    var newNotation = req.body;
    //need to find a way to have an id for a new note
    for (let i=0;i<dataBase.length;i++){

        newNotation.id = i;
    
    
    };
    dataBase.push(newNotation);

    //use an fs write file to write in the json

    const OUTPUT_DIR = path.resolve(__dirname, "db");
    const outputPath = path.join(OUTPUT_DIR, ".\\db.json");




    console.log(typeof newNotation);


    fs.writeFile(outputPath, JSON.stringify(dataBase), (err) =>
        err ? console.error(err) : console.log('Success!')
    );

    res.send("Success!")
});


//now I need to delete items from the list


app.delete("/notes/:title", function (req, res) {
    var chosen = req.body;
    
    console.log(chosen);




    fs.writeFile(outputPath, JSON.stringify(dataBase), (err) =>
        err ? console.error(err) : console.log('Success!')
    );


})









//let's listen to the port

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


