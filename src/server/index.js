const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const AYLIENTextAPI = require('aylien_textapi')
const bodyParser = require('body-parser')
const cors = require('cors')


// Configure environment variables
const dotenv = require('dotenv')
dotenv.config()

const PORT = 8081
const app = express()

/* Middleware*/
//Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure cors middleware
app.use(cors())

// Initiate the aylien SDK
const nlp = new AYLIENTextAPI({
    application_id: process.env.AYLIEN_APP_ID,
    application_key: process.env.AYLIEN_API_KEY
})


app.use(express.static('dist'))

// Serve the home page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

/**
 * Endpoint to process general text
*/
app.post('/process/combined', (req, res) => {
    const { text } = req.body
    nlp.combined({
        'text': text,
        'endpoint': ['sentiment', 'summarize', 'hashtags']
    },  (error, apiResponse) => {
        if (apiResponse === null || error) {
            console.log(error);
            return res.send(error)
        }
        return res.send(apiResponse)
    });
})

/**
 * Endpoint to process a review
*/
app.post('/process/review', (req, res) => {
    const { text } = req.body
    const { domain } = req.body
    if (!domain || domain === '') {
        return res.send({error: 'Provide a domain'})
    }
    nlp.aspectBasedSentiment({
        'domain': domain,
        'text': text
    },  (error, apiResponse) => {
        if (error === null) {
            console.log(apiResponse);
            return res.send(apiResponse)
        }
        // No error but empty result
        if (Object.entries(error).length === 0) {
            return res.send({error: 'No results found'})
        }
        return res.send(error)
    });
})


// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})