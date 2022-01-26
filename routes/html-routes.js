// Dependencies
const router = require('express').Router();
const {
  getIndexHtml,
  getNotesHtml
} = require('../controllers/html-controller');

// Set up GET for root /
router
  .route('/')
  .get(getIndexHtml);

// Set up GET /notes
router
  .route('/notes')
  .get(getNotesHtml);

// Set up GET default for any get request not defined
router
  .route('*')
  .get(getIndexHtml);

// Exports
module.exports = router;