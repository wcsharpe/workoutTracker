const mongoose = require('mongoose');

var randomWorkoutSchema = new mongoose.Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
  comment: {
    type: String
  },
  urgency: {
    type: String
  }
});

module.exports = mongoose.model('RandomWorkout',randomWorkoutSchema);