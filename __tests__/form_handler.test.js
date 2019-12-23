// test formHandler.js
import request from '../request'
jest.mock('../request');

const handleSubmit = (endpoint, domain) => {
    return request(endpoint, domain).then(data => data)
}

it('should call the API and return data', () => {
    return handleSubmit('review', 'restaurants')
        .then(data => expect(data.domain).toBe('restaurants'));
});

it('test error with async/await', async () => {
    expect.assertions(2)
    try {
        await handleSubmit('review', 'resorts')
    } catch (e) {
        expect(e.error).toEqual('Invalid domain')
    }

    try {
        await handleSubmit('invalid', 'hotels')
    } catch (e) {
        expect(e.error).toEqual('Invalid endpoint')
    }
})