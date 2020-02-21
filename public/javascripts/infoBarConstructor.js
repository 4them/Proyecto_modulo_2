
const shownInfo = document.querySelector(".element-info-text")
const infoBox = document.querySelector(".element-info")



document.querySelector(".background-image").onclick = () => {

  console.log(document.querySelector(".background-image").id)


  shownInfo.innerText = document.querySelector(".background-image").id

  hideShowInfo()
}

document.querySelectorAll(".planets").forEach(elm => {

  elm.onclick = () => {

    shownInfo.innerText = elm.id


    hideShowInfo()


  }

})


function hideShowInfo() {
  if (infoBox.classList.contains("hide")) {

    infoBox.classList.remove("hide")
    infoBox.classList.add("show")
  } else {

    infoBox.classList.remove("show")
    infoBox.classList.add("hide")
  }

}