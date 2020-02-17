const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  cardID: {
    type: Schema.Types.ObjectId,
    ref: 'Card'
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cardText: String,
  likes: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment;
