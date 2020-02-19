

const axiosApp = axios.create({ baseURL: "http://localhost:3000/card" })

const nasaAPIHandler = new APIHandler();

const cardFigure = document.querySelector("card")

const picBg = document.querySelector("#picBg")

let cardConstructor = document.querySelector("#cardConstructor").value

const elements = []

const card = {}

document.onkeyup = e => {


  if (e.keyCode === 32) {

    cardConstructor = document.querySelector("#cardConstructor").value

    // const cardConstructorLength = cardConstructor.split(" ").length

    // let letterArray = cardConstructor.split(" ")[cardConstructorLength - 2].split("")

    // letterArray = letterArray.reduce((acc, elm) => acc + elm.charCodeAt(0), 0)

    // console.log(letterArray)





    if (cardConstructor.split(" ").length <= 2) {
      nasaAPIHandler.getBackgroundPic()
        .then(searchResult => {
          const resultArr = searchResult.data.collection.items
          const imageUrl = resultArr[10].links[0].href  // links to thumbprints
          picBg.src = imageUrl.replace("~thumb", "~medium") //change thumb for medium for large image

          // cardFigure.style = `background-image: ${imageUrl.replace("~thumb", "~medium")}`

          //update card object
          card.imagePath = imageUrl.replace("~thumb", "~medium")

        })

      nasaAPIHandler.getBackgroundDescription()
        .then(description => card.nasaDes = description)

    } else {

      nasaAPIHandler.getPlanet()
        .then(result => {
          document.querySelector("#card").innerHTML += `<div  style= 'background: url("${result.path}")center no-repeat; top:${result.posy * 100}%;left:${result.posx * 100}%; height:${result.height / 2}%; width:${result.width / 3.5}%' class='planets' </div>`

          //push element to the elemtn list
          elements.push(result)
        })
    }
  }
}

document.querySelector("#saveCard").onclick = () => {

  axiosApp.post(`/api/new-card`, { card, elements })
    .then(sent => console.log(sent))
    .catch(err => console.log("error al enviar el post ", err))

}











// nasaAPIHandler.getPlanet()