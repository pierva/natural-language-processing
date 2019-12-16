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
describe('Test the combined call - success', () => {
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
describe('Test the combined call - empty data', () => {
    test('should post the data and return error message', async (done) => {
        const res = await request(app)
            .post('/process/combined')
            .send({text: ''})
        expect(res.statusCode).toEqual(400)
        console.log(res.text)
        // expect(res.text)
        expect(JSON.parse(res.text).error).toEqual('No text to process.')
        done()
    })
})