const mongoose = require('mongoose')
const Schema = mongoose.Schema

const elementSchema = new Schema({
    path: String,
    wikiname: String,
    height: Number,
    width: Number,
    posX: Number,
    posY: Number,
    nasaDes: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Element', elementSchema)