const express = require('express');
const router = express.Router();

const githubController = require('../controllers/githubjob_controller');

router.get('/',githubController.fetchGithub);

module.exports = router;