const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model')
const Elements = require('../models/elements.model')
const User = require('../models/user.model')
const Comment = require('../models/comments.model')



router.get("/new-card", (req, res, next) => {
  res.render("cards/new-card")
})

router.post('/new-card', (req, res, next) => {

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

router.get("/:id", (req, res, next) => {

  const picId = req.params.id

  Card.findById(picId)
    .populate({ path: "userID", select: "username" })
    .populate("elements")
    .populate({
      path: 'comments',
      populate: {
        path: 'userID', select: "username"
      }
    })
    .then(picFound => {
      console.log(picFound)
      res.render("cards/detail-card", picFound)
    })

})


module.exports = router
