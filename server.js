// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
// imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const { notes } = require("./db/db.json");

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    // return the filtered results
    return filteredResults;
};

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.noteId === id);
    return result;
};

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, ".", "db", "db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(directory, "notes.html"));
});

app.get("/api/notes", (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get("/api/notes/:id", (req, res) => {
    let currentNoteId = req.params.id;
    // Read data from 'db.json' file
    let results = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const result = findById(currentNoteId, results.notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

app.post("/api/notes", (req, res) => {
    // set id to universal unique id
    req.body.id = uuidv4();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send("The note is not properly formatted.");
    } else {
        // add note to json file and notes array in this function        
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// API DELETE request
app.delete("/api/notes/:id", (request, response) => {

    // Fetched id to delete
    let nId = request.params.id.toString();

    console.log(`\n\nDELETE note request for noteId: ${nId}`);

    // Read data from 'db.json' file
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    // filter data to get notes except the one to delete    
    const newData = notes.filter(note => note.noteId !== nId);


    // Write new data to 'db.json' file
    fs.writeFileSync('./db/db.json', JSON.stringify({ "notes": newData }));

    console.log(`\nSuccessfully deleted note with id : ${nId}`);

    // Send response
    response.json(newData);
});

// using method to make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

module.exports = { uuidv4 };