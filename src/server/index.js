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

// nlp.combined({
//     'text': 'John is a very good football player!',
//     'endpoint': ['sentiment', 'summarize', 'hashtags']
//   }, function(error, response) {
//     if (response === null) {
//        console.log(error);
//     }
//     console.log(response)
//   });

app.use(express.static('dist'))


// Serve the home page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})



app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/process/combined', (req, res) => {
    const { text } = req.body
    console.log(req.body);
    return res.send({'message': 'data received'})
})


// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})