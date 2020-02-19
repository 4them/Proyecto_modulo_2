const express = require("express")
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/user.model")

// Cloudinary
const uploadCloud = require('../configs/cloudinary.config')

router.get('/', ensureLoggedIn('/auth/login'), (req, res) => {

  res.render('auth/profile', {
    user: req.user
  })
})

router.get('/edit', (req, res) => {

  const userId = req.user.id

  User.findById(userId)
    .then(theUser => res.render('auth/profile-edit', theUser))
    .catch(err => console.log(err))
})

router.post('/edit/:id', uploadCloud.single('picture'), (req, res) => {

  console.log(req.file)
  const userId = req.params.id
  const picture = req.file.url
  const { username, email } = req.body

  User.findByIdAndUpdate(userId, { username, email, picture })
    .then(x => res.redirect('/profile'))//`/celebrities/details/${celebrityId}`))
    .catch(err => console.log(err))
})
module.exports = router