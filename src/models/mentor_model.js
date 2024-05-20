const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
  },
  isMentor: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Students', mentorSchema);