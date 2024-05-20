const StudentModel = require('../models/student_model');
const createController = require('./base_controller');

const studentController = createController(StudentModel);

module.exports = studentController;