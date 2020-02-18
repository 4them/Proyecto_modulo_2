

const axiosApp = axios.create({ baseURL: "http://localhost:3000/card" })//https://app-4them.herokuapp.com/

const nasaAPIHandler = new APIHandler();

const picBg = document.querySelector("#picBg")

let cardConstructor = document.querySelector("#cardConstructor").value

const elements = []

const card = {}

document.onkeyup = e => {


  if (e.keyCode === 32) {

    cardConstructor = document.querySelector("#cardConstructor").value



    console.log(cardConstructor.split(" "))

    if (cardConstructor.split(" ").length <= 2) {

      nasaAPIHandler.getBackgroundPic()
        .then(searchResult => {
          const resultArr = searchResult.data.collection.items
          const imageUrl = resultArr[34].links[0].href  // links to thumbprints
          picBg.src = imageUrl.replace("~thumb", "~medium") //change thumb for medium for large image

          //update card object
          card.imagePath = imageUrl.replace("~thumb", "~medium")

        })

      nasaAPIHandler.getBackgroundDescription()
        .then(description => card.nasaDes = description)

    } else {

      nasaAPIHandler.getPlanet()
        .then(result => {
          document.querySelector("#card").innerHTML += `<img style= 'top:${result.posy * 100}%;left:${result.posx * 100}%; height:${result.height}px; width:${result.width}px' class='planets' src=${result.path} alt=${result.wikiname}></img>`

          //push element to the elemtn list
          elements.push(result)
        })

      console.log(elements)
      console.log(card)
    }
  }
}

document.querySelector("#saveCard").onclick = () => {

  axiosApp.post(`/api/new-card`, { card, elements })
    .then(sent => console.log(sent))
    .catch(err => console.log("error al enviar el post ", err))

}











// nasaAPIHandler.getPlanet()