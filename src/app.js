const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000

// Path setup
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup Handlerbar engines and path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to save
app.use(express.static(publicDirectory))


app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Hasan Mortuza'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About me', 
        name: 'Hasan Mortuza'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        helpText: 'This is Help Page', 
        title: 'Help Page',
        name: 'Hasan Mortuza'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {

        return res.send({
            error : 'You must provide an address'
        })
    }

    geoCode(req.query.address ,(error, {latitude, longitude, location} = {}) => {

        if (error) {
           return res.send({
               error
           })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({

                forecast: forecastData,
                location: location,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
      return res.send({
            error: 'You must provide a search term'
        }) 
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        name: 'Hasan Mortuza',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        name: 'Hasan Mortuza',
        errorMessage: 'Page not found.'
    })

})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

