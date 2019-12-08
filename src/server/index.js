var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

// Configure environment variables
const dotenv = require('dotenv')
dotenv.config()

const PORT = 8081

const app = express()

app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(port, () => {
    console.log(`Example app listening on port ${PORT}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
