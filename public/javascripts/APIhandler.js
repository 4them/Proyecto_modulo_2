
// const axios = require("axios")

// const galaxyGalery = "Galaxy%20Evolution%20Explorer%20GALEX&page=1&media=image&yearStart=1998&yearEnd=2020"
const galaxyGalery = "Galaxy Evolution Explorer GALEX"
const nasa_id = "PIA04279"

class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.axiosApp = axios.create({ baseURL: this.BASE_URL })
    this.exoPlanetApp = axios.create({ baseURL: "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac&where=pl_kepflag=1" })
  }

  getBackgroundPic() {
    this.axiosApp.get(`/search?q=${galaxyGalery}`)
      .then(searchResult => {

        const resultArr = searchResult.data.collection.items

        const imageUrl = resultArr[5].links[0].href  // links to thumbprints

        return imageUrl.replace("~thumb", "~medium") //change thumb for medium for large image

      })
      .catch(err => console.log("error al mostrar los resultados de la busqueda", err))
  }

  getBackgroundDescription() {
    this.axiosApp.get(`/search?q=${galaxyGalery}`)
      .then(searchResult => {

        const resultArr = searchResult.data.collection.items

        const imageDescription = resultArr[5].data[0].description

        return imageDescription

      })
      .catch(err => console.log("error al al buscar la description", err))
  }

  getPlanet() {
    this.axiosApp.get(`/`)
      .then(exoplanets => console.log(exoplanets))
  }


}