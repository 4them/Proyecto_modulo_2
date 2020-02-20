

const axiosApp = axios.create({ baseURL: "http://localhost:3000/card" })//https://app-4them.herokuapp.com/
const nasaAPIHandler = new APIHandler();

const cardFigure = document.querySelector("card")

const picBg = document.querySelector("#picBg")
let cardConstructor = document.querySelector("#cardConstructor").value
const elements = []
const card = {}

document.onkeyup = e => {

  if (e.keyCode === 32) {

    cardConstructor = document.querySelector("#cardConstructor").value

    function constructorNumber(constructor) {

      const cardConstructorLength = constructor.split(" ").length
      let letterArray = cardConstructor.split(" ")[cardConstructorLength - 2].split("")
      return letterArray.reduce((acc, elm) => acc + elm.charCodeAt(0) - 97, 0)

    }

    const numberLookUp = constructorNumber(cardConstructor)


    if (cardConstructor.split(" ").length <= 2) {
      nasaAPIHandler.getBackgroundPic()
        .then(searchResult => {
          const resultArr = searchResult.data.collection.items
          const imageUrl = resultArr[numberLookUp].links[0].href  // links to thumbprints
          picBg.src = imageUrl //change thumb for medium for large image

          //update card object
          card.imagePath = imageUrl

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
    .then(sent => console.log(sent))
    .catch(err => console.log("error al enviar el post ", err))

}

document.querySelector("#sendCard").onclick = () => {
  //cambiar que se pinte en el txt
  let textCard = document.querySelector("#cardConstructor").value
  card.text = textCard
  let friendEmail = document.querySelector("#friendEmail").value
  axiosApp.post(`/api/send/new-card`, { card, elements, friendEmail })
    .then(sent => console.log("this is sent", sent))
    .catch(err => console.log("error al enviar el post ", err))

}










// nasaAPIHandler.getPlanet()