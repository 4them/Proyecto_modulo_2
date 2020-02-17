document.addEventListener('DOMContentLoaded', () => {


  console.log('IronGenerator JS imported successfully!');
}, false);





// const baseNASAUrl = "https://images-api.nasa.gov"
const nasaAPIHandler = new APIHandler();

document.querySelector("#testAPI").onclick = () => {

  nasaAPIHandler.getPlanet()

}

