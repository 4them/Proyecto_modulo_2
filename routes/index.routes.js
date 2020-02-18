const express = require('express')
const router = express.Router()
const Card = require("../models/cards.model")
const User = require("../models/user.model")



/* GET home page */
router.get('/', (req, res, next) => {

  Card.find().populate("userID")
    .then(allCards => {

      res.render('index', { cards: allCards })

      console.log(allcards)
    })
    .catch(err => console.log("error loading the cards", err))

})

module.exports = router
