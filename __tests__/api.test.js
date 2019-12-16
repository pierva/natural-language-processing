const request = require('supertest')
const app = require('../src/server')

require("regenerator-runtime")

// Test that the Aylien API is reachable
const dotenv = require('dotenv')
dotenv.config()


// Check that API credentials are configured in dotenv
describe("Check API key and ID configuration", () => {
    test('API credentials should be configured in dotenv', () => {
        expect(process.env.AYLIEN_APP_ID).not.toBe(undefined)
        expect(process.env.AYLIEN_API_KEY).not.toBe(undefined)
    })
})


// Test the combined API endpoint - SUCCESS
describe('Test the combined endpoint - success', () => {
    test('should post the data and return json', async (done) => {
        const res = await request(app)
            .post('/process/combined')
            .send({text: 'Some dummy text'})
        expect(res.statusCode).toEqual(200)
        expect(res.text).not.toBe(undefined)
        expect(JSON.parse(res.text)).toHaveProperty('results')
        done()
    })
})

// Test the combined API endpoint - Validation error
describe('Test the combined endpoint - empty data', () => {
    test('should post the data and return error message', async (done) => {
        const res = await request(app)
            .post('/process/combined')
            .send({text: ''})
        expect(res.statusCode).toEqual(400)
        expect(JSON.parse(res.text).error).toEqual('No text to process.')
        done()
    })
})

// Test the review endpoint - SUCCESS
describe('Test the review endpoint - success', () => {
    test('should post the data and return json', async (done) => {
        const res = await request(app)
            .post('/process/review')
            .send({
                text: 'Some dummy text',
                domain: 'restaurants'
            })
        console.log(res.text)
        expect(res.statusCode).toEqual(200)
        expect(res.text).not.toBe(undefined)
        expect(JSON.parse(res.text)).toHaveProperty('aspects')
        done()
    })
})


// Test the review API endpoint - Validation error (text)
describe('Test the review endpoint - empty text', () => {
    test('should post the data and return error message', async (done) => {
        const res = await request(app)
            .post('/process/review')
            .send({
                    text: '',
                    domain: 'restaurants'
                })
        expect(res.statusCode).toEqual(400)
        expect(JSON.parse(res.text).error).toEqual('Please enter a review to process.')
        done()
    })
})

// Test the review API endpoint - Validation error (body)
describe('Test the review endpoint - empty domain', () => {
    test('should post the data and return error message', async (done) => {
        const res = await request(app)
            .post('/process/review')
            .send({
                    text: 'Some beatutiful review',
                    domain: ''
                })
        expect(res.statusCode).toEqual(400)
        expect(JSON.parse(res.text).error).toEqual('Provide a domain')
        done()
    })
})