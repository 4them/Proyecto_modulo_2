const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model')
const Elements = require('../models/elements.model')
const User = require('../models/user.model')
const Comment = require('../models/comments.model')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mailer = require('../configs/nodemailer.config')

const Element = require('../models/elements.model')

router.get("/new-card", ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render("cards/new-card")
})

router.post('/api/new-card', (req, res, next) => {
  let listIdElem = []

  Element.insertMany(req.body.elements)
    .then(allElements => allElements.forEach(elem => listIdElem.push(elem._id)))
    .then(x => Card.create({
      userID: req.user._id,
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
        .then(x => x)
        .catch(err => console.error('Error al meter mas card ids al usuario', err))
    })
    .catch(err => console.error('Algo ha petado', err))
})

router.post('/send/:id', (req, res, next) => {
  mailer.sendMail({
    from: '"Ironhacker Email 👻" <myawesome@project.com>',
    to: req.body.friendEmail,
    subject: `${req.user.username} is sending you a new universe specially for you `,
    text: `${req.body.message}, to check you personaul universe check out this link http://http://localhost:3000/card/${req.params.id}`,
    html: `<b>${req.body.message}, to check you personaul universe check out this link http://http://localhost:3000/card/${req.params.id}</b>`
  })
  res.redirect(`/card/${req.params.id}`)

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
        .then(x => x)
        .catch(err => console.error('Error al meter mas comments el en el card', err))
    })

  res.redirect(`/card/${req.params.id}`)

})

<<<<<<< HEAD
router.post("/fav/:id", (req, res, next) => {

  if (req.user.favorites.includes(req.params.id)) {
    // User.findByIdAndRemove(req.user._id , {favorites:req.params.id})
    // .then(x => console.log(x))
    // .catch(err => console.error('Error al borrar el fav', err))
    res.redirect(`/card/${req.params.id}`)
    return
  }
=======
router.post("/fav/:id" , (req, res, next) =>{
  
  let userFav = {}
>>>>>>> 8c181a1de3832950a647c9f26503175083ab2a48
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
<<<<<<< HEAD
  User.findByIdAndUpdate(req.user._id, userFav)
    .then(x => x)
    .catch(err => console.error('Error al meter los favs', err))

=======
  User.findByIdAndUpdate(req.user._id , userFav)
  .then(x => console.log(x))
  .catch(err => console.error('Error al meter los favs', err))
>>>>>>> 8c181a1de3832950a647c9f26503175083ab2a48
  res.redirect(`/card/${req.params.id}`)

})

router.post("/delete/:id", (req, res, next) => {

<<<<<<< HEAD
  if (req.user.property.includes(req.params.id)) {
    res.redirect(`/card/${req.params.id}`)
    return
  }
=======
>>>>>>> 8c181a1de3832950a647c9f26503175083ab2a48
  const cardID = req.params.id

  Card.findByIdAndDelete(cardID)
    .then(() => res.redirect('/profile'))
    .catch(err => console.log("Error borrando la card en la BBDD: ", err))

})

//send and create
router.post('/api/send/new-card', (req, res, next) => {
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

      // send email

      mailer.sendMail({
        from: '"Ironhacker Email 👻" <myawesome@project.com>',
        to: req.body.friendEmail,
        subject: `${req.user.username} is sending you a new universe specially for you `,
        text: `${req.body.card.text}, to check you personaul universe check out this link http://http://localhost:3000/card/${cardId._id}`,
        html: `<b>${req.body.card.text}, to check you personaul universe check out this link http://http://localhost:3000/card/${cardId._id}</b>`
      })
      console.log(`este es el correo de tu amigo ${req.body.friendEmail}, este es tu usuario ${req.user.username}, este es el texto de la carta ${req.body.card.text}, y este es el link http://http://localhost:3000/card/${cardId._id}`)

      User.findByIdAndUpdate(req.user._id, userProperty)
        .then(x => x)
        .catch(err => console.error('Error al meter mas card ids al usuario', err))
    })
    .then(whatisthis => whatisthis)


    .catch(err => console.error('Algo ha petado', err))
})




module.exports = router


