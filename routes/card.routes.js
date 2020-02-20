const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model')
const Elements = require('../models/elements.model')
const User = require('../models/user.model')
const Comment = require('../models/comments.model')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const Element = require('../models/elements.model')

router.get("/new-card", ensureLoggedIn('/auth/login') ,(req, res, next) => {
  res.render("cards/new-card")
})

router.post('/api/new-card', (req, res, next) => {
  let listIdElem = []
 
  Element.insertMany(req.body.elements)
    .then(allElements => allElements.forEach(elem => listIdElem.push(elem._id)))
    .then(x => Card.create({
      userId: req.user._id,
      text: req.body.card.text,
      imgPath: req.body.card.imagePath,
      nasaDes: req.body.card.nasaDes,
      elements: listIdElem
    }))
    .then(cardId => {
      const userProperty = {
        $push: {
          property: cardId._id
        }
      }
      User.findByIdAndUpdate(req.user._id, userProperty)
        .then(x => console.log(x))
        .catch(err => console.error('Error al meter mas card ids al usuario', err))
    })
    .catch(err => console.error('Algo ha petado', err))
})

router.get("/:id",(req, res, next) => {

    let checkUser = false

    req.user.property.forEach(elm =>  {
      if ( elm.toString() === req.params.id){
        checkUser = true
      }else{
        checkUser = false
      }
    })
  

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
      res.render("cards/detail-card", {picFound,checkUser})
    })

})

router.post("/:id", (req, res, next) => {

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

router.post("/fav/:id" , (req, res, next) =>{
  
  let userFav = {}
  const cardID = req.params.id
  if (req.user.favorites.includes(req.params.id)){
    userFav = {
      $pull: {
        favorites: cardID
      }
    }
  }else{
    userFav = {
      $push: {
        favorites: cardID
      }
    }
  }
  User.findByIdAndUpdate(req.user._id , userFav)
  .then(x => console.log(x))
  .catch(err => console.error('Error al meter los favs', err))
  res.redirect(`/card/${req.params.id}`)

})

router.post("/delete/:id" , (req, res , next) => {

  const cardID = req.params.id

  Card.findByIdAndDelete(cardID)
  .then(() => res.redirect('/profile'))
  .catch(err => console.log("Error borrando la card en la BBDD: ", err))

})



module.exports = router


