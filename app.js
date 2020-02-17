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

app.use('/test', require('./routes/testRoutes'))
app.use('/', require('./routes/index.route'))
app.use('/auth', require('./routes/auth.route'))

module.exports = app
