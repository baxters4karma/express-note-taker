// Dependencies
const router = require('express').Router();
const {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote
} = require('../controllers/note-controller');

// Set up GET all and POST at /api/notes
router
  .route('/notes')
  .get(getAllNotes)
  .post(createNote);

// Set up GET one, and DELETE at /api/notes/:id
router
  .route('/notes/:id')
  .get(getNoteById)
  .delete(deleteNote);

// Exports
module.exports = router;