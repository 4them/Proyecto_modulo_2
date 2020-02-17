require('dotenv').config()

//DataBase & //Debugger
require('./configs/mongoose.config')
require('./configs/debugger.config')


// App
const express = require('express')
const app = express()

// Middleware Setup
require('./configs/middleware.config')(app)
require('./configs/views.config')(app)
require('./configs/authentication.cofing')(app)
require('./configs/hbs.config')

// default value for title local
app.locals.title = '4THEM'

//register partials

const path = require('path')
const hbs = require('hbs')
console.log(__dirname)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))


// Base URLS
app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/card', require('./routes/card.routes'))
app.use('/profile', require('./routes/profile.routes'))
app.use('/test', require('./routes/testRoutes'))


module.exports = app
