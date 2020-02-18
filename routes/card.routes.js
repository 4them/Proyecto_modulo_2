const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model')
const Element = require('../models/elements.model')
const User = require('../models/user.model')

router.get("/new-card", (req, res, next) => {
  res.render("cards/new-card")
})


router.post('/api/new-card', (req,res,next) => {
  let listIdElem = []

  Element.insertMany(req.body.elements)
  .then(allElements => allElements.forEach(elem => listIdElem.push(elem._id)))
  .then(x => Card.create({
    userId:req.user._id,
    text: req.body.card.text,
    imgPath:req.body.card.imagePath,
    nasaDes:req.body.card.nasaDes,
    elements: listIdElem
  }))
  .then(cardId =>{ 
    const userProperty = {
      $push: {
        property: cardId._id
      }
    }
    User.findByIdAndUpdate(req.user._id,userProperty)
  .then(x => console.log(x))
  .catch(err => console.error('Error al meter mas card ids al usuario',err))
   })
  .catch(err => console.error('Algo ha petado',err))

  // Promise.all([promise1, promise2])
  //   .then(results => res.redirect('/profile'))//res.render('coasters/edit-coaster', { coaster: results[0], parks: results[1] }))
  //   .catch(err => next(new Error(err)))
})


module.exports = router
