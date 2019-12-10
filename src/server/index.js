const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const AYLIENTextAPI = require('aylien_textapi')

// Configure environment variables
const dotenv = require('dotenv')
dotenv.config()

const PORT = 8081
const app = express()

// Initiate the aylien SDK
const nlp = new AYLIENTextAPI({
    application_id: process.env.AYLIEN_APP_ID,
    application_key: process.env.AYLIEN_API_KEY
})

nlp.combined({
    'text': 'John is a very good football player!',
    'endpoint': ['sentiment', 'summarize', 'hashtags']
  }, function(error, response) {
    if (response === null) {
       console.log(error);
    }
    console.log(response)
  });

app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
