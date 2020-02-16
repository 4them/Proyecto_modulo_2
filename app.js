require('dotenv').config()

//DataBase & //Debugger
require('./configs/mongoose.config')
require('./configs/debugger.config')

// App
const express      = require('express')
const app = express()

// Middleware Setup
require('./configs/middleware.config')(app)
require('./configs/views.config')(app)
require('./configs/authentication.cofing')(app)

//hbs 
require('./configs/hbs.config')

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator'

// Base URLS
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

module.exports = app