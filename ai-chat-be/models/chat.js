const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;