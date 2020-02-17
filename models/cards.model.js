const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cardSchema = new Schema({
  user: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  card: [{
      path: String,
      wikiname: String,
      height: Number,
      width: Number,
      posX: Number,
      posY: Number
  }],
  text: String

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Card', cardSchema);;
