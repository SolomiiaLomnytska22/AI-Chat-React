const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chat',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['tool', 'user'] 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;