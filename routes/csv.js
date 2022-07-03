const express = require('express');
const router = express.Router();

const csvController = require('../controllers/csv_controller');

router.get('/download',csvController.downloadCSV);

module.exports = router;