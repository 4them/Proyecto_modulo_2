

const axiosApp = axios.create({ baseURL: "http://localhost:3000/card" })//https://app-4them.herokuapp.com/
const nasaAPIHandler = new APIHandler();

const cardFigure = document.querySelector("card")

const picBg = document.querySelector("#picBg")
let cardConstructor = document.querySelector("#cardConstructor").value
let elements = []
let card = {}

document.onkeyup = e => {

  if (e.keyCode === 32) {

    cardConstructor = document.querySelector("#cardConstructor").value

    const numberLookUp = constructorNumber(cardConstructor)


    if (cardConstructor.split(" ").length <= 2) {
      nasaAPIHandler.getBackgroundPic()
        .then(searchResult => {
          const resultArr = searchResult.data.collection.items
          const imageUrl = resultArr[numberLookUp].links[0].href  // links to thumbprints
          picBg.src = imageUrl //change thumb for medium for large image

          //update card object
          card.imagePath = imageUrl

          console.log(imageUrl)
        })

      nasaAPIHandler.getBackgroundDescription(numberLookUp)
        .then(description => card.nasaDes = description)

    } else {
      nasaAPIHandler.getPlanet(numberLookUp)
        .then(result => {
          document.querySelector("#card").innerHTML += `<div  style= 'background: url("${result.path}")center no-repeat; top:${result.posy}%;left:${result.posx}%; height:${result.height}%; width:${result.width}%' class='planets' </div>`

          //push element to the elemtn list
          elements.push(result)
        })
    }

  }
}






document.querySelector("#saveCard").onclick = () => {
  //cambiar que se pinte en el txt
  let textCard = document.querySelector("#cardConstructor").value
  card.text = textCard
  axiosApp.post(`/api/new-card`, { card, elements })
    .then(message => {
      resetScreen()
      console.log(message)
      document.querySelector(".message-to-user").innerText = message.data.msg
    })

  // .catch(err => console.log("error al enviar el post ", err))

}

document.querySelector("#sendCard").onclick = () => {
  //cambiar que se pinte en el txt
  let textCard = document.querySelector("#cardConstructor").value
  card.text = textCard
  let friendEmail = document.querySelector("#friendEmail").value
  axiosApp.post(`/api/send/new-card`, { card, elements, friendEmail })
    .then(message => {
      resetScreen()
      console.log(message)
      document.querySelector(".message-to-user").innerText = message.data.msg
    })
    .catch(err => console.log("error al enviar el post ", err))

}


function resetScreen() {
  elements = []
  card = {}
  document.querySelectorAll(".planets").forEach(elm => elm.remove())
  document.querySelector("#picBg").src = "https://img.freepik.com/free-photo/smooth-gradient-background_77528-21.jpg?size=626&ext=jpg"
  document.querySelector("#cardConstructor").value = ""
  document.querySelector("#friendEmail").value = ""

}


function constructorNumber(constructor) {
  const cardConstructorLength = constructor.split(" ").length
  let letterArray = cardConstructor.split(" ")[cardConstructorLength - 2].split("")
  return letterArray.reduce((acc, elm) => acc + elm.charCodeAt(0) - 97, 0)
}

