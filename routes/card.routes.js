const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model')

router.get("/new-card", (req, res, next) => {
  res.render("cards/new-card")
})


router.post('/api/new-card', (req,res,next) => {
  
  const userID = req.user._id
  // Card.create({
  //   userId: req.user._id,
  //   text: req.body.text
  //   //imcluir api informacion
  //   // imgPath:,
  //   // nasaDes:
  // })
  //   .then(() => res.redirect('/'))
  //   .catch(err => next(err))
})


module.exports = router
