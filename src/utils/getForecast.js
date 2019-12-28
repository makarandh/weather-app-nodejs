"use strict"

const request = require("request")


const getForecast = (latitude, longitude, callback) => {
    const uriarg = latitude.toString() + "," + longitude.toString()
    const url = "https://api.darksky.net/forecast/05ef0e262c97146b2f9364ed4ed72da1/" + uriarg + "?units=si"
    // console.log("Forecast URL:", url)
    
    request({
        url,
        json: true
    }, (error, {body}) => {
        
        if(error) {
            callback("Could not connect to our servers. Please make sure you have a working internet connection.", undefined)
            
        } else if(body.error) {
            callback("Unable to find location.", undefined)
            
        } else {
            const data = body
            callback(undefined,
                {
                    summary: data.daily.data[0].summary,
                    temperature: data.currently.temperature,
                    precipProbability: data.currently.precipProbability
                }
            )
        }
    })
}


module.exports = getForecast
