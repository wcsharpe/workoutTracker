const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Contact',contactSchema);