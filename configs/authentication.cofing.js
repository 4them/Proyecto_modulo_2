const mongoose     = require('mongoose')
const session    = require("express-session")
const MongoStore = require('connect-mongo')(session)
const flash      = require("connect-flash")

module.exports = app => {
  app.use(session({
    secret: 'irongenerator',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore( { mongooseConnection: mongoose.connection })
  }))
  app.use(flash())
  require('../passport')(app)
}