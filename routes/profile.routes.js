const express = require("express")
const router = express.Router()
const User = require("../models/user.model")
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/',ensureLoggedIn('/auth/login'), (req, res) => {
  
    res.render('auth/profile', {
      user: req.user
    })
})

router.get('/edit', (req,res) =>{ 
  
  const userId = req.user.id
 
  User.findById(userId)
    .then(theUser => res.render('auth/profile-edit', theUser))
   .catch(err => console.log(err))
})

router.post('/edit/:id', (req, res) => {
  
    const userId = req.params.id
  
    Celebrity.findByIdAndUpdate(userId, req.body)
      .then(x => res.redirect('/profile'))//`/celebrities/details/${celebrityId}`))
      .catch(err => console.log(err))
  })
module.exports = router