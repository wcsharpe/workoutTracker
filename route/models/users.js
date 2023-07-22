const mongoose = require('mongoose');

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
  workouts: [
    {
      tracker_date: Date,
      tracker_duration: Number,
      tracker_intensity: String,
      tracker_cal: Number
    }
  ]
});

module.exports = mongoose.model('Users',usersSchema);