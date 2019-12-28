"use strict"

const path = require("path")
const express = require("express")
const hbs = require("hbs")
const getGeocode = require("./utils/getGeocode")
const getForecast = require("./utils/getForecast")

const app = express()
const PORT = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, "../public", )
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Set up handlebar engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)


// Set up static directory
app.use(express.static(publicDir))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Mak"
    })
})


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Mak"
    })
})


app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        content: "In the textbox on the homepage, type in the name of a place, and click on search.",
        name: "Mak"
    })
})


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    getGeocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error) {
            return res.send({
                error
            })
        }
        getForecast(latitude, longitude, (error, {summary, temperature, precipProbability}={}) => {
            if(error) {
                return res.send({
                    error
                })
            }
            const summaryfull = `${summary} It is ${temperature} degrees out, with a ${(precipProbability * 100).toFixed(0) + "%"} chance of rain.`
            res.send({
                location,
                summary: summaryfull,
            })
        })
    })
})


app.get("/help/*", (req, res) => {
    res.render("help404", {
        name: "Mak",
        title: "Help Page Not Found"
    })
})


app.get("*", (req, res) => {
    res.render("404", {
        name: "Mak",
        title: "Four OH! Four"
    })
})


app.listen(PORT, () => {
    console.log(`Yo, Express is running. on port ${PORT}`)
})
