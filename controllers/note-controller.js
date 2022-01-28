const { v4: uuidv4 } = require("uuid");
const { appendFile, readFileSync, writeFileSync, writeFile } = require("fs");
const path = require('path');
const { notes } = require("../db/db.json");
const noteController = {
  // the functions go in here as methods

  // Find single note by its ID
  findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id);
    return result;
  },

  // Get all notes
  getAllNotes(req, res) {
    res.sendFile(path.join(__dirname, "..", "db", "db.json"));
  },

  // Get one note by id
  getNoteById({ params }, res) {
    // Call findById function and assign result to 'result'
    let result = noteController.findById(params.id, notes);

    // Confirm note found otherwise return error
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  },

  // Create note
  createNote({ body }, res) {
    console.log(body);
    let { title, text } = body;
    if (!title || !text) {
      res.json("Error in posting note");
    };

    // Creating new note object and assigning unique ID
    let newNote = {
      title,
      text,
      id: uuidv4()
    };

    notes.push(newNote);

    // Write updated notes data back to file
    writeFile(
      path.join(__dirname, "..", "db", "db.json"),
      JSON.stringify({ notes: notes }, null, 2),
      (err) => err ? console.log(err) : console.log('New note has been added to JSON file')
    );
    let response = {
      status: "success",
      body: newNote
    };
    res.json(response);
  },

  // Delete note
  deleteNote({ params }, res) {
    let currentNoteId = params.id;

    // Retrieve existing notes from file   
    let updatedNotesData = notes.filter(note => note.id !== currentNoteId);

    // Write updated notes data back to file
    writeFile(
      path.join(__dirname, "..", "db", "db.json"),
      JSON.stringify({ notes: updatedNotesData }, null, 2),
      (err) => err ? console.log(err) : console.log(`Note with ${currentNoteId} ID has been deleted from JSON file`)
    );
    res.json('Note deleted');
  }
};

module.exports = noteController;