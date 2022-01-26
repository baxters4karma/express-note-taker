// Dependencies
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Sets up the use of routes
app.use(require('./routes'));

const { notes } = require("./db/db.json");

// Using method to make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});