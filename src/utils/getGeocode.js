"use strict"

const request = require("request")


const getGeocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic29tZXRoaW5nc29tZWJvZHkiLCJhIjoiY2s0bG54aWV5MGI4azNrbzVxdXRvemdhMSJ9.gBkhcsAK1iukyNex2GWc7g&limit=1"
    // console.log("Geocode URL:", url)
    
    request({
        url,
        json: true
    }, (error, {body}) => {
        if(error) {
            callback("Could not connect to our servers. Please make sure you have a working internet connection.", undefined)
            
        } else if(body.message) {
            
            if(body.message === "Forbidden") {
                callback("Invalid location.", undefined)
            } else {
                callback("We have encountered an issue.", undefined)
            }
            
        } else if(body.features.length === 0) {
            callback("Unable to find location.", undefined)
            
        } else {
            const features = body.features[0]
            callback(undefined, {
                location: features.place_name,
                latitude: features.geometry.coordinates[1],
                longitude: features.geometry.coordinates[0]
            })
        }
    })
}

module.exports = getGeocode
