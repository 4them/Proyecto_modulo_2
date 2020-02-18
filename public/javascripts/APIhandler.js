
// const axios = require("axios")

// const galaxyGalery = "Galaxy%20Evolution%20Explorer%20GALEX&page=1&media=image&yearStart=1998&yearEnd=2020"
const galaxyGalery = "Galaxy Evolution Explorer GALEX"
const nasa_id = "PIA04279"

class APIHandler {
  constructor() {
    this.BASE_URL = "https://images-api.nasa.gov";
    this.axiosApp = axios.create({ baseURL: this.BASE_URL })


    this.exoPlanet_BASE_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?"
    this.exoPlanetApp = axios.create({ baseURL: this.exoPlanet_BASE_URL })
  }

  getBackgroundPic() {
    return this.axiosApp.get(`/search?q=${galaxyGalery}`)
    // .then(searchResult => {
    //   return searchResult
    //   // const resultArr = searchResult.data.collection.items

    //   // const imageUrl = resultArr[15].links[0].href  // links to thumbprints

    //   // return imageUrl.replace("~thumb", "~medium") //change thumb for medium for large image

    // })
    // .catch(err => console.log("error al mostrar los resultados de la busqueda", err))
  }

  getBackgroundDescription() {
    return this.axiosApp.get(`/search?q=${galaxyGalery}`)
      .then(searchResult => {

        const resultArr = searchResult.data.collection.items

        const nasaDes = resultArr[15].data[0].description

        return nasaDes

      })
      .catch(err => console.log("error al al buscar la description", err))
  }

  getPlanet() {

    const planetTextures = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx78uyNwdPuMYzgM58WlpPi4KT5spJVa0j86vYoKzFhE1py5K6cQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQdU5sfD02rirB8oZAGxdcAkccPwiNZhsSlOtb3Qq7SrpjseBQc",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZ2vF4sfjEYTucMK3SCw24TztwzSTCdePShU3Oh9NjB5DK9R8x",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzwCqvRCzDTYLXbagrhQgYzwkt6qcg0W2Oni5j99-Rh-vJsq9s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZ2vF4sfjEYTucMK3SCw24TztwzSTCdePShU3Oh9NjB5DK9R8x",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRI-gWVZep0-oJ5lszpxXT6l8xkW6Y7knMt2VcRXo0JyZkCxuvo",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjAvsL2ShQyALpnCHTk9XTvhEBIfjFWXEhLCfiMfxv9YQZ5JJ5",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpNQ0mom34ls8qZY3sbH-mw69kR3KSIciKvLGjCaqzQUZhz53L",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyFZZXrUM2l4WdoO0nhpGVZvu71FbxllRrBJDvNeCosU3O6iYp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVIk4kup-HQ81dnvEImNAAJzXWqvStP_agaK2tsLkF3vCLL13q",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTKhk03IPbaoSDDO5mcfm4kxCXVcrC0Wvtl7-Ge3UW8_8_f1ki",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEHB73a8f_LBYeghFQrJOnJ4O9qhgRpdE4NTbLgADkeCm7cHsD",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZoxMB4wIea6LFzJ9IvD1ClJbWwE6Ih461fuPWD2lpbuQi3k69",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQoEKUgh1P6r6329bQdwjm38qzmWwXf-24ws40ykS_Mgcd-ORq",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLI4nYW5lkCiWQSS-4bDQmffTH6FfMCJGzD7gR9KK1-j052PAf",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEtM16RgpJA9JEg1erR1H56ccEKJ-rW8HcINFMOyq0f8bxJzyl",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRyLxuouOdlCnO2-CFOr7KSanSah0hVuMa306RToYaBl9Gn8sB",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0kMGd3_v66WENvIEc0ssuis0ffK2bTg79HYjRzuBBg5qONu-Q",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnF6A-msBwCh1BAYC5lKVwC56DFbJQ2duBz5q3O0bSBPlcG9GI",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4L3nwb_N7UZkAg63YFy5P1TjPM9es5c5KNl1Ns3ErmH3sv8A3",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDHUq6hkCyVxYiDOg8SGxJMxbOJUA-DBzthUM8qL6ojxiGg7s-",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWvXQH942qXc7leoBwVWmUyW592cclG1Tt_3Tx-VYMeF2I5n1e",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWDsxKb75_SdgL0F1SYISDiNwM75ykdL3fLFVdlIXLTwcr9g2m",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrOIM6LKA2UewY2tLZnQcc5rnvsh2l_489cSFsL3IlzSlZXLCf",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-J8FQe4luE0K6B5xeOuJEBGs7Fg1iAI4JtNKt09teddLI5hvg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyrJtRT8A3FcQOxsbLGgyZ13Z-PUx_5fYuAo7z0i58qm-E90ej",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXHh1DHf5pN_OYdZSfRnHUDRrQOJLVE-Y3HeAfyJl4_A1JI8MR",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0cASubtkC09LKRHFKO2Dt8sabZbnnQTbn_ZAsF3kZ-dzC8BcS",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSadcehMPpA0Oh8ePbGjWcbA59wQy6P3BlxL2rX-rgjCPS7UfWJ",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvq26fu9YX6pD4cJCVOl_-RdktJveQfG_6NwL_ikxlyK0iuKfr",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSg2A0DDWHBO868ndXjd4S85avkhQjWBomhzMSZKK0k7iIH1dap",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZcD6N5AQHoN1VnNkXU1T7aclDbzUJEuXQI_oJWObkD3es1nfP",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTY7AVkNk6X-lwvVMgi46vmqD63Vf95ktBnk-PQiAxx8nqg-L8k",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTyMVe1Iznh0gk-4xHcKT3Tw-zxFaUfqDUKjV-vD_OndDiT5qU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrOIM6LKA2UewY2tLZnQcc5rnvsh2l_489cSFsL3IlzSlZXLCf",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShuq19P3LPlHxuv06XgstazW5pd_XMQUTZqGqUI-SWeTDId0DK",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8ki25sf4cFp3bm7bE4qykYHNpHyUNDqmKtXGjixgFyrojz4o9"

    ]

    return this.exoPlanetApp.get(`&table=exoplanets&format=json&select=pl_name,pl_radj,pl_hostname`)
      .then(exoplanets => {

        const planet = {

          path: planetTextures[Math.round(Math.random() * planetTextures.length)],

          wikiname: exoplanets.data[10].pl_name,

          height: Math.round(exoplanets.data[10].pl_radj * 69.9) * 2,

          width: Math.round(exoplanets.data[10].pl_radj * 69.9) * 2,

          nasaDes: `the planet ${exoplanets.data[10].pl_name} is part of of the solar system of the star ${exoplanets.data[10].pl_hostname}. It's radius is of ${exoplanets.data[10].pl_radj.toFixed(2)} time the one of Jupiter for  total diameter of ${Math.round(exoplanets.data[10].pl_radj * 69.9 * 2)} Km.`,

          posx: Math.random(),

          posy: Math.random(),

        }

        return planet
      })

  }


}