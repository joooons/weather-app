const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()




// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use( express.static(publicDirectoryPath) );


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Joon'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Joon'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Joon',
        helpText: 'Help is on the way.'
    });
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address!"
        })
    }
    geocode( req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({ error })
        }
        forecast( latitude, longitude, (error, {forecast, temperature, feelslike} = {} ) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })


        })



    })



})




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    } 
    console.log(req.query);
    res.send({
        products: []
    })
})




app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Joon',
        errorMessage: 'Help article not found'
    })
})

// This needs to come last
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Joon',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})
