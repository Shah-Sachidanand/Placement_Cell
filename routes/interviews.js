const express = require('express');
const router = express.Router();


const interviewController = require('../controllers/interviews_controller');

router.post('/create-interview',interviewController.createInterview);
router.get('/fetch-interview',interviewController.fetchInterview);

module.exports=router;