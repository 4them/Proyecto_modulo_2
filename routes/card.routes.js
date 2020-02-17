const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model')

router.get("/new-card", (req, res, next) => {
    res.render("cards/new-card")
  })

router.post('/new-card', (req,res,next) => {
  
  Card.create({
    userId: req.user._id,
    text: req.body.text
    //imcluir api informacion
    // imgPath:,
    // nasaDes:
  })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
  })
  

module.exports = router
