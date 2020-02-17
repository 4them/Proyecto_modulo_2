document.addEventListener('DOMContentLoaded', () => {


  console.log('IronGenerator JS imported successfully!');
}, false);





const baseNASAUrl = "https://images-api.nasa.gov"
const nasaImageAPI = new APIHandler(baseNASAUrl);

document.querySelector("#testAPI").onclick = () => {

  nasaImageAPI.getPlanet()

}

