const Client = require('../src/client/js/app')

describe('Test octopus functions', () => {
    it('should return a list of domains', () => {
        expect(Array.isArray(Client.octo.getDomains())).toBe(true)
    })
})