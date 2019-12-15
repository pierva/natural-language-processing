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


// Test the combined API endpoint
describe('Check combined call', () => {
    test('should post the data', async (done) => {
        const res = await request(app)
            .post('/process/combined')
            .send({text: 'Some dummy text'})
        expect(res.statusCode).toEqual(200)
        done()
    })
})