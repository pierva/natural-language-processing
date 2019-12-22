// test formHandler.js
jest.mock('../__mocks__/request');

const client = require('../src/client/js/formHandler')

it('It should call the API and return data', () => {
    return client.handleSubmit('/review', 'Super awesome food', 'restaurant')
        .then(data => expect(data).not.toBe(undefined));
  });