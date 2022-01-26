// Dependencies
const path = require("path");
const { notes } = require("../db/db.json");

const htmlController = {
  // the functions go in here as methods

  // get index.html
  getIndexHtml(req, res) {
    res.send(path.join(__dirname, "..", "public", "index.html"));
  },

  // get notes.html
  getNotesHtml(req, res) {
    res.send(path.join(__dirname, "..", "public", "notes.html"));
  }
};

module.exports = htmlController;