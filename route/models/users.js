const mongoose = require('mongoose');

var workoutSchema = new mongoose.Schema ({
  tracker_date: Date,
  tracker_workout_type: String,
  tracker_duration: Number,
  tracker_intensity: String,
  tracker_cal: Number
});

var usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  workouts: [workoutSchema],
});

module.exports = mongoose.model('Users',usersSchema);