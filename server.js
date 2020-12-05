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
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


//let's post the info

const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, ".\\db.json");

app.post("/api/notes", function (req, res) {
    var newNotation = req.body;
    //need to find a way to have an id for a new note
    for (let i=0;i<dataBase.length;i++){

        newNotation.id = i;
    
    };
    dataBase.push(newNotation);

    //use an fs write file to write in the json

    console.log(typeof newNotation);


    fs.writeFile(outputPath, JSON.stringify(dataBase), (err) =>
        err ? console.error(err) : console.log('Success!')
    );

    res.send("Success!")
});


//now I need to delete items from the list


app.delete("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;//setting the variable for the id that was clicked upon
    console.log(chosen); //checking my work and this is showing the id of the deleted item being checked
    

    for (let k=0;k<dataBase.length;k++){
        if (chosen == dataBase[k].id){
            console.log(dataBase[k])
            dataBase.splice(k,1) //dataBase is the array
        }
        
    };
    
    fs.writeFile(outputPath, JSON.stringify(dataBase), (err) =>
        err ? res.sendStatus(404) : res.sendStatus(200)
    );
    
})









//let's listen to the port

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


