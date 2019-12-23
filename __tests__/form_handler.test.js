// test formHandler.js
import request from '../request'
jest.mock('../request');

const handleSubmit = (endpoint, domain) => {
    return request(endpoint, domain).then(data => data)
}

it('It should call the API and return data', () => {
    return handleSubmit('review', 'restaurants')
        .then(data => expect(data.domain).toBe('restaurants'));
});