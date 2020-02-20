const express = require("express")
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/user.model")
const Card = require('../models/cards.model')
const Elements = require('../models/elements.model')

// Cloudinary
const uploadCloud = require('../configs/cloudinary.config')

router.get('/', ensureLoggedIn('/auth/login'), (req, res) => {
  console.log("tmabien entra aquiiii")
  const profilesToShow = []

  User.find()
    .then(allProfiles => {
      for (let i = 0; i < 5; i++) { profilesToShow.push(allProfiles[Math.round(Math.random() * allProfiles.length)]) }
      User.findById(req.user._id)
        .populate({
          path: 'property',
          populate: {
            path: 'elements'
          }
        })
        .populate({
          path: 'favorites',
          populate: {
            path: 'elements'
          }
        })
        .then(propertyCards => {
          console.log("entra hasta aqui incluso!!!! ", propertyCards)
          res.render('auth/profile', { user: req.user, cards: propertyCards.property, cardsFav: propertyCards.favorites, suggestions: profilesToShow })
        })
        .catch(err => console.log('Tienes un error al mostras las cartas en el perfil', err))
    })
})
router.get('/edit', (req, res) => {

  const userId = req.user.id

  User.findById(userId)
    .then(theUser => res.render('auth/profile-edit', theUser))
    .catch(err => console.log(err))
})

router.post('/edit/:id', uploadCloud.single('picture'), (req, res) => {

  const userId = req.params.id
  const picture = req.file.url
  const { username, email } = req.body

  User.findByIdAndUpdate(userId, { username, email, picture })
    .then(x => res.redirect('/profile'))
    .catch(err => console.log(err))
})

router.get('/:id', ensureLoggedIn('/auth/login'), (req, res) => {
  const userId = req.params.id
  const profilesToShow = []
  let userVisit = {}

  User.find()
    .then(allProfiles => {
      for (let i = 0; i < 5; i++) { profilesToShow.push(allProfiles[Math.round(Math.random() * allProfiles.length)]) }
      User.findById(userId)
        .then(user => userVisit = user)
      User.findById(userId)
        .populate({
          path: 'property',
          populate: {
            path: 'elements'
          }
        })
        .populate({
          path: 'favorites',
          populate: {
            path: 'elements'
          }
        })
        .then(propertyCards => {
          res.render('auth/profile', { user: userVisit, cards: propertyCards.property, cardsFav: propertyCards.favorites, suggestions: profilesToShow })
        })
        .catch(err => console.log('Tienes un error al mostras las cartas en el perfil', err))
    })
})
module.exports = router