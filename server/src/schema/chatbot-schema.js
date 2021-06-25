const mongoose = require('mongoose');

const Chatbot = new mongoose.Schema({
  activate: {
    type: Number,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('chatbot', Chatbot);
