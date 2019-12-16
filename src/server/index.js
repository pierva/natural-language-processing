const path = require('path')
const express = require('express')
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
    res.sendFile('./dist/index.html')
})

/**
 * Detached function for combined Aylien API call
 * @param {obj} req
 * @param {obj} res
 * 
 * @returns {obj}
 */
const handleCombinedCall = (req, res) => {
    const { text } = req.body
    if (!text || text.trim() === ''){
        // res.sendStatus(400)
        return res.status(400).send({error: "No text to process."})
    }
    nlp.combined({
        'text': text,
        'endpoint': ['sentiment', 'summarize']
    },  (error, apiResponse) => {
        if (apiResponse === null || error) {
            console.log(error);
            // res.sendStatus(500)
            return res.status(500).send(error)
        }
        return res.status(503).send(apiResponse)
    });
}

/**
 * Endpoint to process general text
*/
app.post('/process/combined', (req, res) => {
    return handleCombinedCall(req, res)
})


/**
 * Detached function for aspect based sentiment analysis - Aylien API
 * @param {obj} req
 * @param {obj} res
 * 
 * @returns {obj}
 */

 const handleAbsaCall = (req, res) => {    
    const { text } = req.body
    const { domain } = req.body
    if (!domain || domain === '') {
        // res.sendStatus(400)
        return res.status(400).send({error: 'Provide a domain'})
    }
    if (!text || text === "") {
        // res.sendStatus(400)
        return res.status(400).send({error: 'Please enter a review to process.'})
    }
    nlp.aspectBasedSentiment({
        'domain': domain,
        'text': text
    },  (error, apiResponse) => {
        if (error === null) {
            return res.send(apiResponse)
        }
        // No error but empty result
        if (Object.entries(error).length === 0) {
            // res.sendStatus(404)
            return res.status(404).send({error: 'No results found'})
        }
        console.log(error)
        return res.status(503).send(error)
    })
 }

/**
 * Endpoint to process a review
*/
app.post('/process/review', (req, res) => {
    return handleAbsaCall(req, res)
})


// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})

module.exports = app