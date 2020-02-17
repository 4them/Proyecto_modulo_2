const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  picture: String,
  email: String,
  favorites:  [{ 
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports =  mongoose.model('User', userSchema)
