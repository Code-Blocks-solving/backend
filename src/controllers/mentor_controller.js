const MentorModel = require('../models/mentor_model');
const createController = require('./base_controller');

const mentorController = createController(MentorModel);

module.exports = mentorController;