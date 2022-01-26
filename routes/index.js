// Dependencies
const router = require('express').Router();

// Import API and HTML routes
const apiRoutes = require('./api-routes');
const htmlRoutes = require('./html-routes');

// Add prefix of '/api' to api routes
router.use('/api', apiRoutes);

router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;