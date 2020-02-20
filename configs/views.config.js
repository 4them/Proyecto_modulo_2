const favicon = require('serve-favicon')
const path = require('path')
const express = require('express')

module.exports = app => {
  app.use(require('node-sass-middleware')({
    src: path.join(__dirname, '..', 'public'),
    dest: path.join(__dirname, '..', 'public'),
    sourceMap: true
  }))
  app.set('views', path.join(__dirname, '..', 'views'))
  app.set('view engine', 'hbs')
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use(favicon(path.join(__dirname, '..', 'public', 'images', 'favicon.ico')))
}

