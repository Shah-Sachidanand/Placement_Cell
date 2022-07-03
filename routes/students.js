const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students_controller');

router.get('/fetch',studentsController.fetchStudents);
router.post('/create-student',studentsController.createStudent);

module.exports = router;