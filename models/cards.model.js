const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cardSchema = new Schema({
    userID: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    elements: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Element'
    }],
    imgPath: String,
    text: String,
    nasaDes: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Card', cardSchema);;
