const express = require('express');
const router = express.Router();


const interviewScheduleController = require('../controllers/interviewScheduling_controller');

router.get('/schedule-interview/:id',interviewScheduleController.scheduleInterview);
router.post('/adding-student/:id',interviewScheduleController.addStudent);
router.post('/updating-result/:id',interviewScheduleController.updateResult);

module.exports=router;