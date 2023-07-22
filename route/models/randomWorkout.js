const mongoose = require('mongoose');

var randomWorkoutSchema = new mongoose.Schema({
  idNum: {
    type: Number
  },
  img: {
    type: String
  },
  workoutName: {
    type: String
  },
  instruction1: {
    type: String
  },
  instruction2: {
    type: String
  },
  instruction3: {
    type: String
  },
  instruction4: {
    type: String
  },
  instruction5: {
    type: String
  },
  instruction6: {
    type: String
  }
});

module.exports = mongoose.model('RandomWorkout',randomWorkoutSchema);