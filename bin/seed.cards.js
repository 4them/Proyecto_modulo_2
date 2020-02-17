const mongoose = require('mongoose');
const Card = require('../models/cards.model');
const Comment = require('../models/comments.model');
const Element = require('../models/elements.model');
const User = require('../models/user.model');

const dbTitle = 'four-them';
mongoose.connect(`mongodb://localhost/${dbTitle}`);

const cards = [{

  userID: "5e4add008c67636e6e7bdea4",
  elements: [],
  imgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDlOSOdJH5gGsGvD1LQzl42qwIrQByhYuf0diqY7mB9A892858",
  text: "Congratulations Gonzalo",
  nasaDes: "this is a test card"

}, {

  userID: "5e4add008c67636e6e7bdea4",
  elements: [],
  imgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThQesO0WDWMT7QVasR2AxhUt2r34LHOQh79JCtZWrEt2HmCK3C",
  text: "Congratulations pedro",
  nasaDes: "this is a test card 2"

}, {

  userID: "5e4add008c67636e6e7bdea4",
  elements: [],
  imgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6AGsC7fSwsICJo5Dq13rHo6B-GBzXEkcTcIuuTE1hKznvnFnx",
  text: "Congratulations david",
  nasaDes: "this is a test card 3"

}, {

  userID: "5e4add008c67636e6e7bdea4",
  elements: [],
  imgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzeFr96VfbeKvpMSoMcNPM0FoSvLMn3fyTgJ3fqbS59mIoMrCq",
  text: "Congratulations Peter",
  nasaDes: "this is a test card 4"

},
]


Card.insertMany(cards)
  .then(loadedCelebrity => console.log(loadedCelebrity))
  .catch(err => console.log("Error al subir los celebrities tipo", err))