const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const excerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
});

const Exercise = model('Exercise', excerciseSchema);

module.exports = Exercise;
