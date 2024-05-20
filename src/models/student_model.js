const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
  },
  isStudent: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Students', studentSchema);