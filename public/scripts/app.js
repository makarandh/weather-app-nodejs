"use strict"


const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.getElementById("message-1")
const messageTwo = document.getElementById("message-2")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchLocation = search.value
    const url2fetch = "/weather?address=" + searchLocation
    messageTwo.innerText = `Fetching weather for ${searchLocation}...`
    messageOne.innerText = ""
    fetch(url2fetch).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageTwo.innerText = data.error
            } else {
                search.value = ""
                messageOne.innerText =  data.location
                messageTwo.innerText = data.summary
            }
            
        }).catch((e) => {
            console.log("Caught exception:", e)
        })
    })
})
