const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const excerciseSchema = new Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    required: true,
    trim: true,
  },
  reps: {
    type: Number,
    required: true,
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  
});

const Exercise = model('Exercise', excerciseSchema);

module.exports = Exercise;
