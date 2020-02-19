const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/user.model")
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Cloudinary
const uploadCloud = require('../configs/cloudinary.config')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") })
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}))

router.get("/signup", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/signup", { message: req.flash('error') })
})

router.post("/signup", [ensureLoggedOut(), uploadCloud.single('picture')], (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  const email = req.body.email
  const picture = req.file.url

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" })
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" })
      return
    }

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      password: hashPass,
      email,
      picture
    })
    
    newUser.save()
    .then(user => {
        req.login(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/profile');
      })})
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" })
      })
  })
})

router.get("/logout", ensureLoggedIn('/auth/login'), (req, res) => {
  req.logout()
  res.redirect("/")
})

module.exports = router
