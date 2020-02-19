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
      res.render("cards/detail-card", picFound)
    })

})


router.post("/:id", (req, res, next) => {

  console.log(req.body)
  console.log(req.params.id)

  const comment = {
    cardID: req.params.id,
    userID: req.user._id,
    commentText: req.body.comment
  }

  Comment.create(comment)
    .then(commentCreated => {
      const commentIdToInsert = {
        $push: {
          comments: commentCreated._id
        }
      }
      Card.findByIdAndUpdate(req.params.id, commentIdToInsert)
        .then(x => console.log(x))
        .catch(err => console.error('Error al meter mas comments el en el card', err))
    })

  res.redirect(`/card/${req.params.id}`)

})


module.exports = router


